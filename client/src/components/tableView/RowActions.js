import React, { useCallback } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

const RowActions = ({
    data,
    actionsConfig,
    onSelect = () => { }
}) => {

  const handleSelect = useCallback((event) => {
    const { id } = event.target
    onSelect(id, data)
  }, [onSelect, data])

  return (
    <UncontrolledDropdown
      direction='start'
    >
      <DropdownToggle tag="span">
        <FaEllipsisH className='font_icons'/>
      </DropdownToggle>
      <DropdownMenu>
          {
            actionsConfig.map((config, configIndex) => (
              <DropdownItem key={`action-item-${configIndex}`} id={config} onClick={handleSelect}>
                  {config}
              </DropdownItem>
            ))
          }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default RowActions