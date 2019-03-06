import React from 'react'
import '../../styles/BillEntriesHeader.css'

const BillEntriesHeader = ({ serialCode }) => (
  <>
    {serialCode && <h2 className='bill-entries-title'>{serialCode}</h2>}
    <div className="bill-entries-header">
      <span>Date</span>
      <span>Coordinates</span>
      <span>Notes</span>
      <span>Image</span>
    </div>
  </>
)

export default BillEntriesHeader
