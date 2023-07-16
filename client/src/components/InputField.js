import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({
    isLabelRequired = false,
    isRequired = false,
    inputLabel = '',
    placeholder = '',
    value = '',
    type = '',
    id  = '',
    name = '',
    className = '',
    autoComplete = 'off',
    errors={},
    onChangeInput = () => { },
    ...props
}) => {
  return (
    <FormGroup>
        {
            isLabelRequired && <label>
                {inputLabel} 
                {
                    isRequired && <span className='required__asterisk'>*</span>
                }
            </label>
        }
        <input 
            id={id}
            name={name}
            className={className}
            type={type}
            invalid={errors && !!errors[id]}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => onChangeInput(e, id)}
            {...props}
        />
        {
            errors && <span className='error__message'>{errors[id]}</span>
        }
    </FormGroup>
  )
}

InputField.propTypes = {
    isLabelRequired: PropTypes.bool,
    isRequired: PropTypes.bool,
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    onChangeInput: PropTypes.func,
    errors: PropTypes.object,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default InputField
