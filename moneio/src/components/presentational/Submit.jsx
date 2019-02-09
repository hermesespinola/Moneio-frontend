import React, { useState } from 'react'

// TODO: input formating and validation
const Submit = () => {
  const [serialCode, setSerialCode] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = (event: Event) => {
    event.preventDefault()
    setIsSubmitting(true)
    if (!submitted) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          // call api
          console.log({ serialCode, notes, coords })
          setSubmitted(true)
          setIsSubmitting(false)
        },
        (error) => {
          alert('We were unable to find your location')
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
            type="text"
            name="serial-code"
            value={serialCode}
            onChange={({ target }) => {
              setSerialCode(target.value)
            }}
          />
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
            value={notes}
            onChange={({ target }) => {
              setNotes(target.value)
            }}
          />
        </label>
        <input type="submit" value="Submit" disabled={isSubmitting} />
      </form>
    </div>
  )
}

export default Submit