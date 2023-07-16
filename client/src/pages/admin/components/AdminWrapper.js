import React, { useCallback, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import AdminNavBar from './AdminNavBar'
import AdminInfoBox from './AdminInfoBox'

const AdminWrapper = () => {

    const [toggleMenu, setToggleMenu] = useState(true)

    const handleToggleMenuBar = useCallback(() => {
        setToggleMenu((prev) => !prev)
    }, [])

  return (
    <>
        <AdminSideBar open={toggleMenu} onToggleMenu={handleToggleMenuBar} />
        <section id="content">
            <AdminNavBar onToggleMenu={handleToggleMenuBar} />
            <main>
                <AdminInfoBox />
            </main>
        </section>
    </>
  )
}

export default AdminWrapper