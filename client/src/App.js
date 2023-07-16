import React, { lazy, useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const Home = lazy(() => import('./pages/Home'))
const Podcasts = lazy(() => import('./pages/Podcasts'))
const AuthPage = lazy(() => import('./pages/Login'))

const App = () => {

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

  const handleToggleSideMenu = useCallback(() => {
    setIsOpenSideMenu((prev) => !prev)
  }, [])

  return (
    <BrowserRouter>
      <Header onToggleSideMenu={handleToggleSideMenu} />
      <div className='mainBody'>
        <Sidebar isOpen={isOpenSideMenu} onToggleSideMenu={handleToggleSideMenu} />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/podcasts' element={<Podcasts />} />
          <Route path='/login' element={<AuthPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App