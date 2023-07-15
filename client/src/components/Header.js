import React from 'react'

const Header = ({
  onToggleSideMenu = () => { }
}) => {
  return (
    <div className="header">
      <div className="header__left">
        <i id="menu" className="material-icons" onClick={onToggleSideMenu}>menu</i>
        <img
          src="https://www.youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg?cache=72a5d9c"
          alt=""
        />
      </div>

      <div className="header__search">
        <form>
          <input type="text" placeholder="Search" />
          <button><i className="material-icons">search</i></button>
        </form>
      </div>

      <div className="header__icons">
        <i className="material-icons display-this">search</i>
        <i className="material-icons">notifications</i>
        <i className="material-icons accountCircle">account_circle</i>
      </div>
    </div>
  )
}

export default Header