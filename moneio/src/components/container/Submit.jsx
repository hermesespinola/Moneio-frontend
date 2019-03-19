import React, { useState, useRef } from 'react'
import { submitForm } from '../../api'
import '../../styles/Submit.css'

// TODO: input formating and validation
const Submit = () => {
  // Form state
  const [serialCode, setSerialCode] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputImage = useRef(null)
  const [denomination, setDenomination] = useState(20)

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    setIsSubmitting(true)
    if (!submitted) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            submitForm(serialCode, notes, coords.latitude, coords.longitude, inputImage.current.files[0], denomination)
            setSubmitted(true)
            setIsSubmitting(false)
          } catch(err) {
            alert('There was an error! ヽ(●ﾟ´Д｀ﾟ●)ﾉﾟ')
            console.error(err.message)
          }
        },
        (error) => {
          alert('We were unable to find your location. ꒰๑˃͈꒳˂͈๑꒱ﾉ*ﾞ̥')
          console.error(error)
          setIsSubmitting(false)
        }
      )
    }
  }

  return submitted ? (<p>Thanks for your submittion!</p>) : (
    <div className="form-submit">
      <form onSubmit={handleSubmit}>
        <label>
          Serial code:
          <input
            required
            type="text"
            value={serialCode}
            onChange={({ target }) => {
              setSerialCode(target.value)
            }}
          />
        </label>
        <label>
          Denomination:
          <select
            required
            value={denomination}
            onChange={({ target }) => {
              setDenomination(Number.parseInt(target.value))
            }}
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </label>
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={({ target }) => {
              setNotes(target.value)
            }}
          />
        </label>
        <label>
          Pick an image of the bill:
          <input
            type="file"
            ref={inputImage}
            accept="image/*"
          />
        </label>
        <input
          className="submit"
          type="submit"
          value="Submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default Submit