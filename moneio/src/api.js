const apiURL = process.env.API_URL
console.log('API_URL:', apiURL);

// TODO: include denomination
export const submitForm = (serialCode, notes, coords, image, denomination) => {
  const formData = new FormData()
  formData.append('serialCode', serialCode)
  formData.append('denomination', denomination)
  if (notes && typeof notes === 'string') formData.append('notes', notes)
  if (coords && typeof coords === 'object') formData.append('coords', coords)
  if (image && typeof image === 'object') formData.append('image', image)

  if (!apiURL) {
    // Mock some data
    return Promise.resolve({
      code: 200,
      message: 'Yay!',
    })
  }

  return fetch(`${apiURL}/upload-bill`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  })
}

export const fetchExplore = async (option) => {
  if (!apiURL) {
    return [
      {
        coords: {
          latitude: 52.496912,
          longitude: 13.436738,
        },
        date: 'Sun Feb 10 2019 17:18:06',
        image: 'https://static.vix.com/es/sites/default/files/styles/large/public/btg/curiosidades.batanga.com/files/Que-figuras-historicas-estan-en-los-billetes-de-Mexico-01.png?itok=kGQNOmbs',
        notes: 'Este es es benito, sus amiguitos son María, Nezahualcóyotl, Sor Juana, el buen Diego Rivera y Frida Kalho, y como olvidar a Miguel Hidalgo.',
        serialCode: 'D2356-534-53',
      },
    ]
  }
  return await fetch(`${apiURL}/explore/${option}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
}

export const fetchEntries = async (serialCode) => {
  if (!apiURL) {
    return [
      {
        coords: {
          latitude: 52.496912,
          longitude: 13.436738,
        },
        date: 'Sun Feb 10 2019 17:18:06',
        image: 'https://static.vix.com/es/sites/default/files/styles/large/public/btg/curiosidades.batanga.com/files/Que-figuras-historicas-estan-en-los-billetes-de-Mexico-01.png?itok=kGQNOmbs',
        notes: 'Este es es benito, sus amiguitos son María, Nezahualcóyotl, Sor Juana, el buen Diego Rivera y Frida Kalho, y como olvidar a Miguel Hidalgo.',
        serialCode,
      },
    ]
  }
  return await fetch(`${apiURL}/entries/${serialCode}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
}
