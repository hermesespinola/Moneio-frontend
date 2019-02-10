import React, { useEffect, useState } from 'react'
import { fetchEntries } from '../../api';
import BillEntry from '../presentational/BillEntry'
import BillEntriesHeader from '../presentational/BillEntriesHeader'
import EntriesMap from './EntriesMap';

const BillEntries = ({ match }) => {
  const { serialCode } = match.params
  const [entries, setEntries] = useState(null)
  useEffect(
    () => {
      fetchEntries(serialCode).then(setEntries)
        .catch(() => {
          alert('No entries found (✖╭╮✖)')
          setEntries([])
        })
    },
    [serialCode],
  )

  return (
    entries ? (
      <div className="bill-entries">
        <EntriesMap entries={entries} />
        <BillEntriesHeader serialCode={serialCode} />
        {entries.map((entry, id) => (
          <BillEntry {...entry} serialCode={serialCode}  key={id} />
        ))}
      </div>
    ) : (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  )
}

export default BillEntries
