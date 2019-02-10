import React from 'react'

const BillEntriesHeader = ({ serialCode }) => (
  <>
    <h2 className='bill-entries-title'>{serialCode}</h2>
    <div className="bill-entries-header">
      <span>Date</span>
      <span>Coordinates</span>
      <span>Notes</span>
      <span>Image</span>
    </div>
  </>
)

export default BillEntriesHeader
