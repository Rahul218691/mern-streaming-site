import React, { lazy, useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const Home = lazy(() => import('pages/Home'))
const Podcasts = lazy(() => import('pages/Podcasts'))
const AuthPage = lazy(() => import('pages/auth/Login'))
const AdminHome = lazy(() => import('pages/admin/AdminHome'))
const ManageArtist = lazy(() => import('pages/admin/artist'))
const ManageGenreAndLanguages = lazy(() => import('pages/admin/genre-and-languages'))
const ManageAlbums = lazy(() => import('pages/admin/albums'))
const NotFoundPage = lazy(() => import('pages/notfound'))
const VerifyAccount = lazy(() => import('pages/auth/VerifyAccount'))

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
          <Route path='/verifyAccount' element={<VerifyAccount />} />
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/manage/artist' element={<ManageArtist />} />
          <Route path='/admin/manage/genre/languages' element={<ManageGenreAndLanguages />} />
          <Route path='/admin/manage/album' element={<ManageAlbums />} />
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App