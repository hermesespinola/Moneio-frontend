export const submitForm = ({ serialCode, notes, coords, image }) => {
  console.log({ serialCode, notes, coords, image })
  const formData = new FormData()
  formData.append('serialCode', serialCode)
  if (notes && typeof notes === 'string') formData.append('notes', notes)
  if (coords && typeof coords === 'object') formData.append('coords', coords)
  if (image && typeof image === 'object') formData.append('image', image)

  return fetch(`${process.env.API_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  })
}
