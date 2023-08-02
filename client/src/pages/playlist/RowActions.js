import React, { useCallback } from 'react'
import { MdPlayArrow, MdPause } from 'react-icons/md'

const RowActions = ({
    data,
    isSecureDomain,
    selected,
    isPlaying,
    onPause = () => { },
    onPlaySelected = () => { }
}) => {

  const handlePlay = useCallback(() => {
    onPlaySelected(data)
  }, [data, onPlaySelected])

  return (
    <div>
        {
          selected && isPlaying && (data.id === selected.id) ?
            <MdPause size={20} className='font_icons' onClick={onPause} />
          : <MdPlayArrow size={20} className='font_icons' onClick={handlePlay} />
        }
    </div>
  )
}

export default RowActions