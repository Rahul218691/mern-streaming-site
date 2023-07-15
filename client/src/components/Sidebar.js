import React, { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { SideMenuList } from 'helpers/sidemenulist'

const Sidebar = ({
    isOpen,
    onToggleSideMenu = () => { }
}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleRedirectToPage = useCallback((path) => {
        onToggleSideMenu()
        navigate(path)
    }, [navigate, onToggleSideMenu])

    return (
        <div className={`sidebar ${isOpen ? 'show-sidebar' : ''}`}>
            <div className="sidebar__categories">
                {
                    SideMenuList.menu1.map((menu) => (
                        <div className={`sidebar__category ${location.pathname === menu.path ? 'active' : ''}`} key={menu.id} onClick={() => handleRedirectToPage(menu.path)}>
                            <i className="material-icons">{menu.icon}</i>
                            <span>{menu.title}</span>
                        </div>       
                    ))
                }
            </div>
            <hr />
            <div className="sidebar__categories">
                {
                    SideMenuList.menu2.map((menu) => (
                        <div className={`sidebar__category ${location.pathname === menu.path ? 'active' : ''}`} key={menu.id} onClick={() => handleRedirectToPage(menu.path)}>
                            <i className="material-icons">{menu.icon}</i>
                            <span>{menu.title}</span>
                        </div>       
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar