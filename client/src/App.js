import React, { lazy, useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const Home = lazy(() => import('./pages/Home'))
const Podcasts = lazy(() => import('./pages/Podcasts'))
const AuthPage = lazy(() => import('./pages/Login'))
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))

const App = () => {

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
  const [isAdmin] = useState(true)

  const handleToggleSideMenu = useCallback(() => {
    setIsOpenSideMenu((prev) => !prev)
  }, [])

  return (
    <BrowserRouter>
      {!isAdmin && <Header onToggleSideMenu={handleToggleSideMenu} />}
      <div className='mainBody'>
        {!isAdmin && <Sidebar isOpen={isOpenSideMenu} onToggleSideMenu={handleToggleSideMenu} />}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/podcasts' element={<Podcasts />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/admin/home' element={<AdminHome />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App