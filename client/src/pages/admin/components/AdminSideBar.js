import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ADMIN_MENU_LINKS } from 'helpers/sidemenulist'

const AdminSideBar = ({
    open,
    onToggleMenu = () => { }
}) => {

    const location = useLocation()

    return (
        <section id="sidebar" className={`${!open ? 'hide' : ''}`} onClick={onToggleMenu}>
            <Link to="/admin/home" className="brand">
                <i className='bx bxs-dashboard'></i>
                <span className="text">AdminHub</span>
            </Link>
            <ul className="side-menu top">
                {
                    ADMIN_MENU_LINKS.commonList.map((item) => (
                        <li className={`${location.pathname === item.path ? 'active' : ''}`}>
                            <Link to={item.path}>
                                <i className={`bx ${item.icon}`}></i>
                                <span className="text">{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <ul className="side-menu">
                {
                    ADMIN_MENU_LINKS.settingsList.map((item) => (
                        <li className={`${location.pathname === item.path ? 'active' : ''}`}>
                            <Link to={item.path}>
                                <i className={`bx ${item.icon}`}></i>
                                <span className="text">{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default AdminSideBar