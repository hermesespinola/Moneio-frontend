const apiURL = process.env.REACT_APP_API_URL
console.log('API_URL:', apiURL)

export const submitForm = (form, latitude, longitude) => {
  const formData = new FormData(form)
  if (latitude && typeof latitude === 'number') formData.append('latitude', latitude)
  if (longitude && typeof longitude === 'number') formData.append('longitude', longitude)
 
  if (!apiURL) {
    // Mock some data
    return Promise.resolve({
      code: 200,
      message: 'Yay!',
    })
  }

  return fetch(`${apiURL}/upload-bill`, {
    method: 'POST',
    body: formData,
  })
}

export const fetchExplore = async (option) => {
  if (!apiURL) {
    return [
      {
        latitude: 52.496912,
        longitude: 13.436738,
        date: 'Sun Feb 10 2019 17:18:06',
        image: 'https://static.vix.com/es/sites/default/files/styles/large/public/btg/curiosidades.batanga.com/files/Que-figuras-historicas-estan-en-los-billetes-de-Mexico-01.png?itok=kGQNOmbs',
        notes: 'Este es es benito, sus amiguitos son María, Nezahualcóyotl, Sor Juana, el buen Diego Rivera y Frida Kalho, y como olvidar a Miguel Hidalgo.',
        serialCode: 'D2356-534-53',
      },
    ]
  }
  return await fetch(`${apiURL}/explore/${option}`, {
    method: 'GET',
  })
  .then(res => res.json())
}

export const fetchEntries = async (serialCode) => {
  if (!apiURL) {
    return [
      {
        latitude: 52.496912,
        longitude: 13.436738,
        date: 'Sun Feb 10 2019 17:18:06',
        image: 'https://static.vix.com/es/sites/default/files/styles/large/public/btg/curiosidades.batanga.com/files/Que-figuras-historicas-estan-en-los-billetes-de-Mexico-01.png?itok=kGQNOmbs',
        notes: 'Este es es benito, sus amiguitos son María, Nezahualcóyotl, Sor Juana, el buen Diego Rivera y Frida Kalho, y como olvidar a Miguel Hidalgo.',
        serialCode,
      },
    ]
  }
  return await fetch(`${apiURL}/entries/${serialCode}`, {
    method: 'GET',
  })
  .then(res => res.json())
}
