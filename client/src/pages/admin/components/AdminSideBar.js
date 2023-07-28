import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ADMIN_MENU_LINKS } from 'helpers/sidemenulist'
import { userLogout } from 'apiServices/auth'
import { decryptData } from 'utils'

const AdminSideBar = ({
    open,
    onToggleMenu = () => { }
}) => {

    const location = useLocation()

    const handleAdminLogout = useCallback(async(data) => {
        if (data.isLogoutRoute) {
            const data = decryptData('user')
            await userLogout(data.user.userSlug)
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('isAuthorized')
            window.location.reload()
        }
    }, [])

    return (
        <section id="sidebar" className={`${!open ? 'hide' : ''}`} onClick={onToggleMenu}>
            <Link to="/admin/home" className="brand">
                <i className='bx bxs-dashboard'></i>
                <span className="text">AdminHub</span>
            </Link>
            <ul className="side-menu top">
                {
                    ADMIN_MENU_LINKS.commonList.map((item) => (
                        <li className={`${location.pathname === item.path ? 'active' : ''}`} key={item.id}>
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
                        <li className={`${location.pathname === item.path ? 'active' : ''}`} key={item.id} 
                            onClick={() => handleAdminLogout(item)}
                        >
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