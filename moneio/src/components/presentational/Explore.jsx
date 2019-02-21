import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import BillEntriesHeader from './BillEntriesHeader'
import { fetchExplore } from '../../api'
import BillEntry from './BillEntry'
import EntriesMap from '../container/EntriesMap';

const options = [
  { value: 'top-hits-today', label: 'Top Hits Today' },
  { value: 'top-entered-bills', label: 'Top Entered Bills' },
  { value: 'top-denominations', label: 'Top Denominations' },
]

const selectStyles = {
  container: (base) => ({
    ...base,
    zIndex: 9999,
  })
}

const Explore = () => {
  const [entries, setEntries] = useState(null)
  const [option ,setOption] = useState(options[0])
  useEffect(
    () => {
      fetchExplore(option.value).then(setEntries)
        .catch(() => {
          alert('No entries found (✖╭╮✖)')
          setEntries([])
        })
    },
    [option.value],
  )

  return (
    <div className="explore">
      <Select
        options={options}
        defaultValue={option}
        styles={selectStyles}
        onChange={(opt, { action }) => {
          if (action === 'select-option' && opt !== option) {
            setOption(opt)
          }
        }}
      />
      {entries ? (
        <div className="bill-entries">
          <EntriesMap entries={entries} />
          <BillEntriesHeader />
          {entries.map((entry, id) => (
            <BillEntry {...entry} key={id} />
          ))}
        </div>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  )
}

export default Explore
