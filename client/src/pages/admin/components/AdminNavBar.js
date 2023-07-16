import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import PeopleImg from 'assets/people.png'

const AdminNavBar = ({
    onToggleMenu = () => { }
}) => {

    const [isChecked, setIsChecked] = useState(false)

    const handleToggleTheme = useCallback((event) => {
        setIsChecked(event.target.checked)
        if (event.target.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [])

    return (
        <nav>
            <i className='bx bx-menu' onClick={onToggleMenu}></i>
            <form style={{
                visibility: 'hidden'
            }}>
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div>
            </form>
            <input type="checkbox" checked={isChecked} id="switch-mode" onChange={handleToggleTheme} hidden />
            <label htmlFor="switch-mode" className="switch-mode"></label>
            <Link to="#" className="notification">
                <i className='bx bxs-bell' ></i>
                <span className="num">8</span>
            </Link>
            <Link to="#" className="profile">
                <img src={PeopleImg} alt='' />
            </Link>
        </nav>
    )
}

export default AdminNavBar