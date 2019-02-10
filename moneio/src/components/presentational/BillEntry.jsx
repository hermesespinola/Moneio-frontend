import React from 'react'

const BillEntry = ({ serialCode, coords, image, notes, date }) => (
  <div className="entry">
          <div className="entry-date">
            <time>{date}</time>
          </div>
          <div className="entry-coordinates">
            <span>lat: {coords.latitude}</span>
            <span>lng: {coords.longitude}</span>
          </div>
          <div className="entry-notes">
            <p>{notes}</p>
          </div>
          <div className="entry-image">
            <img src={image} alt={`bill ${serialCode}, entry from ${date}`}/>
          </div>
        </div>
)

export default BillEntry
