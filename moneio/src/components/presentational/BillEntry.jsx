import React from 'react'
import '../../styles/BillEntry.css'

const BillEntry = ({ serialCode, latitude, longitude, image, notes, date }) => (
  <div className="entry">
    <div className="entry-date">
      <time>{date}</time>
    </div>
    <div className="entry-coordinates">
      <span>lat: {latitude}</span>
      <span>lng: {longitude}</span>
    </div>
    <div className="entry-notes">
      <p>{notes}</p>
    </div>
    <div>
      <img className="entry-image" src={image} alt={`bill ${serialCode}, entry from ${date}`}/>
    </div>
  </div>
)

export default BillEntry
