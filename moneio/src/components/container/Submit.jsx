import React, { useState, useRef } from 'react'
import { submitForm } from '../../api'
import '../../styles/Submit.css'

const denominations = [20, 50, 100, 200, 500, 1000]

// TODO: input formating and validation
const Submit = () => {
  // Form state
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const billForm = useRef(null)

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    setIsSubmitting(true)
    if (!submitted) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            submitForm(billForm.current, coords.latitude, coords.longitude)
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

  return submitted ? (<p>Thanks for your submission!</p>) : (
    <div className="form-submit">
      <form ref={billForm} onSubmit={handleSubmit}>
        <label>
          Serial code:
          <input required name="serialCode" type="text" />
        </label>
        <label>
          Denomination:
          <select
            required
            name="denomination"
          >
            {denominations.map((denom, i) => (
              <option value={denom} key={i}>{denom}</option>
            ))}
          </select>
        </label>
        <label>
          Notes:
          <textarea
            name="notes"
          />
        </label>
        <label>
          Pick an image of the bill:
          <input type="file" name="image" accept="image/*"/>
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