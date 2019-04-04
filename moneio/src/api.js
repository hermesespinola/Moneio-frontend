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

  return fetch(`${apiURL}/uploadBill`, {
    method: 'POST',
    body: formData,
  })
}

export const fetchEntries = async (serialCode) => {
  const url = serialCode
    ? `${apiURL}/billEntries/${serialCode}`
    : `${apiURL}/billEntries`
  return await fetch(`${url}`, {
    method: 'GET',
  })
    .then(res => res.json())
}
