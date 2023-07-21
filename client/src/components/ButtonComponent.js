import React from 'react'

const ButtonComponent= ({
    text,
    icon,
    onImport = () => { }
}) => {
  return (
    <div className='head-title'>
        <button className="btn-download" onClick={onImport}>
            <i className={`bx ${icon}`} ></i>
            <span className="text">{text}</span>
        </button>
    </div>
  )
}

export default ButtonComponent