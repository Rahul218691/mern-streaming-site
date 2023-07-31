import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { dateFormat } from 'utils'

const Item = ({
  data = {},
  onClick = () => { }
}) => {

  const handleClickItem = useCallback(() => {
    onClick(data)
  }, [data, onClick])

  return (
    <div className="video" onClick={handleClickItem}>
    <div className="video__thumbnail">
      <img src={data.poster} alt="" />
    </div>
    <div className="video__details">
      <div className="author">
        <img src="http://aninex.com/images/srvc/web_de_icon.png" alt="" loading='lazy' />
      </div>
      <div className="title">
        <h3>
          {data.name}
        </h3>
        <Link to="/">{data.genre}</Link>
        <span>{data.trackName} • {dateFormat(data.postedDate)}</span>
      </div>
    </div>
  </div>
  )
}

export default Item