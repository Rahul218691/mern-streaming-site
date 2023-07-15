import React from 'react'
import { Link } from 'react-router-dom'

const Item = () => {
  return (
    <div className="video">
    <div className="video__thumbnail">
      <img src="https://img.youtube.com/vi/PpXUTUXU7Qc/maxresdefault.jpg" alt="" />
    </div>
    <div className="video__details">
      <div className="author">
        <img src="http://aninex.com/images/srvc/web_de_icon.png" alt="" />
      </div>
      <div className="title">
        <h3>
          Top 5 Programming Languages to Learn in 2021 | Best Programming Languages to Learn
        </h3>
        <Link to="/">FutureCoders</Link>
        <span>10M Views • 3 Months Ago</span>
      </div>
    </div>
  </div>
  )
}

export default Item