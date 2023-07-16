import React from 'react'

const CustomLabel = ({
    label = '',
    isRequired = false
}) => {
  return (
    <label>
        {label} { isRequired && <span className='required__asterisk'>*</span> }
    </label>
  )
}

export default CustomLabel
