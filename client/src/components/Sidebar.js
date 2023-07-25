import React, { useCallback, useContext, useEffect, useState, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { SideMenuList } from 'helpers/sidemenulist'
import { AuthContext } from 'context/authContext'
import { userLogout } from 'apiServices/auth'
import { decryptData } from 'utils'

const Sidebar = ({
    isOpen,
    onToggleSideMenu = () => { }
}) => {

    const navigate = useNavigate()
    const location = useLocation()
    const { state } = useContext(AuthContext)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleUserLogout = useCallback(async() => {
        const data = decryptData('user')
        await userLogout(data.user.userSlug) 
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('isAuthorized')
        window.location.reload()
    }, [])

    const handleRedirectToPage = useCallback((menuItem) => {
        onToggleSideMenu()
        if (menuItem.isLogoutRoute) {
            handleUserLogout()
        }
        navigate(menuItem.path)
    }, [navigate, onToggleSideMenu, handleUserLogout])

    useEffect(() => {
        if (!!state.user) {
            setIsAuthenticated(true)
        }
    }, [state])

    return (
        <div className={`sidebar ${isOpen ? 'show-sidebar' : ''}`}>
            <div className="sidebar__categories">
                {
                    SideMenuList(isAuthenticated).map((menu) => (
                        <div className={`sidebar__category ${location.pathname === menu.path ? 'active' : ''}`} key={menu.id} onClick={() => handleRedirectToPage(menu)}>
                            <i className="material-icons">{menu.icon}</i>
                            <span>{menu.title}</span>
                        </div>       
                    ))
                }
            </div>
        </div>
    )
}

export default memo(Sidebar)