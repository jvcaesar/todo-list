import React from 'react'

// Used in the modal for selcting the status of the todo item
const SelectStatus = ({ statusTypes, value, setStatus}) => {

  // sets the status if new/changed or uses existing value if unchanged
  const handleOnChange = event => {
    if (event.target.value === '' && value) {
      setStatus(value)
    } else {
      setStatus(event.target.value)
    }
  }

  return (
    <div className='modal-status'>
      <label>Status</label>
      <select className='select-status' required defaultValue={value} onChange={handleOnChange}>
          {statusTypes.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
          ))}
      </select>
    </div>
  )
}

export default SelectStatus