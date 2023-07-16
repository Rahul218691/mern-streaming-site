import React, { useCallback, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import AdminNavBar from './AdminNavBar'

const AdminWrapper = ({
    children
}) => {

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
                {children}
            </main>
        </section>
    </>
  )
}

export default AdminWrapper