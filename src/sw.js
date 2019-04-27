/* eslint-disable no-restricted-globals */
/* global workbox */
workbox.skipWaiting()
workbox.clientsClaim()

self.indexedDB = self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB
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

// TODO: find a way to submit this when back online
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

function getDB(callback) {
  const dbReq = indexedDB.open('pendingBills', dbVersion)

  dbReq.onupgradeneeded = function (event) {
    createObjectStore(event.target.result)
  }
  
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
              createObjectStore(db).then(callback)
            } else {
              callback(db)
            }
        }
    } else {
      callback(db)
    }
  }
}

function enqueue(request) {
  getDB((db) => {
    console.log("Putting request in IndexedDB")

    // Open a transaction to the database
    const transaction = db.transaction(["bills"], 'readwrite')

    // get the current queue
    getQueue(transaction, async (_q) => {
      // write the new queue into indexedDB
      const queue = _q || []
      queue.push(await serialize(request))
      transaction.objectStore("bills").put(queue, "queue")
    })
  })
}

async function flushQueue() {
  getDB((db) => {
    console.log('flushing request queue in IndexedDB')

    // Open a transaction
    const transaction = db.transaction(['bills'], 'readwrite')

    // get the current queue
    getQueue(transaction, async (queue) => {
      if (queue && queue.length) {
        transaction.objectStore('bills').put([], 'queue')
        queue.forEach((serializedReq) => {
          const request = deserialize(serializedReq)
          fetch(request).then(() => console.log('posted!'))
        })
        console.log('queue is now []')
      }
    })
  })
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


// Handle post and delete request when offline or poor connection
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

// Handle messages to check the indexedDB queue
self.addEventListener('message', ({ data, ports: [port] }) => {
  console.log(`SW received message: ${data}`)
  flushQueue().then(() => port.postMessage('Queue flushed!.'))
})

workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
