import React, { useState, useRef } from 'react'
import { submitForm } from '../../api'

// TODO: input formating and validation
const Submit = () => {
  // Form state
  const [serialCode, setSerialCode] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputImage = useRef(null)

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    setIsSubmitting(true)
    if (!submitted) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            submitForm(serialCode, notes, coords, inputImage.current.files[0])
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
          type="submit"
          value="Submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default Submit