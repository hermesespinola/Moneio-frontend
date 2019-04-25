/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
workbox.skipWaiting()
workbox.clientsClaim()

self.indexedDB = self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB
const IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.OIDBTransaction || self.msIDBTransaction
const dbVersion = 1

const serialize = (request) => {
  const headers = {}

  for (let entry of request.headers.entries()) {
    headers[entry[0]] = entry[1]
  }

  const serialized = {
    url: request.url,
    headers: headers,
    method: request.method,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer,
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return request.clone().text().then(body => {
      serialized.body = body
      return Promise.resolve(serialized)
    })
  }
  return Promise.resolve(serialized)
}

const deserialize = data => Promise.resolve(new Request(data.url, data))

async function createObjectStore(db) {
  console.log("Creating objectStore")
  db.createObjectStore("bills")
  return db
}

function getQueue(transaction, cb) {
  transaction.objectStore("bills").get("queue").onsuccess = event => {
    const queue = event.target.result
    console.log('current queue:', queue)
    cb(queue)
  }
}

async function enqueue(request) {
  const serialized = await serialize(request)
  const putRequest = (db) => {
    console.log("Putting request in IndexedDB");

    // Open a transaction to the database
    var transaction = db.transaction(["bills"], IDBTransaction.READ_WRITE)

    // get the current queue
    getQueue(transaction, _q => {
      // write the new queue into indexedDB
      const queue = _q || []
      queue.push(serialized)
      transaction.objectStore("bills").put(request, "queue")
      getQueue(transaction, newQueue => {
        console.log('Updated queue:', newQueue)
      })
    })
  }
  const dbReq = indexedDB.open('pendingBills', dbVersion)
  
  dbReq.onsuccess = event => {
    console.log("Success creating/accessing IndexedDB database")
    const db = dbReq.result
    db.onerror = event => {
      console.log("Error creating/accessing IndexedDB database")
    }

    // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    if (db.setVersion && db.version !== dbVersion) {
        db.setVersion(dbVersion).onsuccess = () => {
            if (db.createObjectStore) {
              db.createObjectStore("bills")
              putRequest(db)
              // createObjectStore(db).then(putRequest)
            } else {
              putRequest(db)
            }
        }
    } else if (db.createObjectStore) {
      db.createObjectStore("bills")
      putRequest(db)
      // createObjectStore(db).then(putRequest)
    } else {
      putRequest(db)
    }
  }

  request.onupgradeneeded = function (event) {
    createObjectStore(event.target.result)
  }
}

workbox.routing.registerRoute(
  /^https:\/\/*.min\.(css|js)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-cache',
  })
)

workbox.routing.registerRoute(
  /^http:\/\/localhost:8080\/*/,
  workbox.strategies.networkFirst(),
)

self.addEventListener('fetch', (event) => {
  if (['POST', 'DELETE'].includes(event.request.method)) {
    if (navigator.onLine) {
      event.respondWith(
        fetch(event.request).catch(err => {
          console.log('Error fetching!')
          return new Response(
            'Oh no!',
            { status: 400 },
            )
        })
      )
    } else {
      enqueue(event.request)
      event.respondWith(
        enqueue(event.request)
          .then(() => {
            console.log('stored in indexedDB')
            return new Response(
              'This action is disabled while app is offline. We will try to upload it when you go back online!',
            { status: 200 },
            )
          })
          .catch(() => {
            console.log('Failed to store request in indexedDB')
            return new Response(
              'This action is disabled while app is offline.',
              { status: 400 },
            )
          })
      )
    }
  }
})

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
