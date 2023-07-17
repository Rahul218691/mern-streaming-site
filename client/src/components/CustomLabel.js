import React from 'react'
import { Label } from 'reactstrap'

const CustomLabel = ({
    label = '',
    isRequired = false
}) => {
  return (
    <Label>
        {label} { isRequired && <span className='required__asterisk'>*</span> }
    </Label>
  )
}

export default CustomLabel