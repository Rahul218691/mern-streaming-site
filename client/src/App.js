import React, { lazy, useCallback, useEffect, useState, useContext } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import { AuthContext } from 'context/authContext';
import { setDefaultAxiosConfig } from 'utils/axiosConfig';
import AuthRoute from 'customRoutes/AuthRoute';
import PrivateRoute from 'customRoutes/PrivateRoute';
import { decryptData } from 'utils';

const Home = lazy(() => import('pages/Home'))
const Podcasts = lazy(() => import('pages/Podcasts'))
const AuthPage = lazy(() => import('pages/auth/Login'))
const AdminHome = lazy(() => import('pages/admin/AdminHome'))
const ManageArtist = lazy(() => import('pages/admin/artist'))
const ManageGenreAndLanguages = lazy(() => import('pages/admin/genre-and-languages'))
const ManageAlbums = lazy(() => import('pages/admin/albums'))
const NotFoundPage = lazy(() => import('pages/notfound'))
const VerifyAccount = lazy(() => import('pages/auth/VerifyAccount'))
const ForgotPassword = lazy(() => import('pages/auth/ForgotPassword')) 
const LiveStreams = lazy(() => import('pages/live-stream')) 
const CreateLiveStream = lazy(() => import('pages/live-stream/CreateStream'))

const App = () => {

  const location = useLocation()
  const {state, dispatch} = useContext(AuthContext)

  const { access_token } = state

  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)
  const [isAdminRoute, setIsAdminRoute] = useState(false)

  const handleToggleSideMenu = useCallback(() => {
    setIsOpenSideMenu((prev) => !prev)
  }, [])

  useEffect(() => {
    if (location.pathname) {
      const path = location.pathname
      if (path.startsWith('/admin')) {
        setIsAdminRoute(true)
      } else {
        setIsAdminRoute(false)
      }
    }
  }, [location])

  useEffect(() => {
    if (access_token) {
      setDefaultAxiosConfig(access_token)
    }
  }, [access_token])

  useEffect(() => {
    if (window.localStorage.getItem('isAuthorized') && window.localStorage.getItem('user')) {
      const data = decryptData('user')
      const filterData = ({ msg, ...rest }) => rest
		  const payload = filterData(data)
      dispatch({
        type: 'LOG_IN_USER',
        payload
      })
    }
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && <Header onToggleSideMenu={handleToggleSideMenu} />}
      <div className='mainBody'>
        {!isAdminRoute && <Sidebar isOpen={isOpenSideMenu} onToggleSideMenu={handleToggleSideMenu} />}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/podcasts' element={<Podcasts />} />
          <Route path='/liveStream' element={<LiveStreams />} />
          <Route path='/login' element={<AuthRoute><AuthPage /></AuthRoute>} />
          <Route path='/verifyAccount' element={<VerifyAccount />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/manage/artist' element={<ManageArtist />} />
          <Route path='/admin/manage/genre/languages' element={<ManageGenreAndLanguages />} />
          <Route path='/admin/manage/album' element={<ManageAlbums />} />
          <Route path='/create/new-stream' element={<PrivateRoute><CreateLiveStream /></PrivateRoute>} />
          <Route path='*' element={<NotFoundPage />} />
      </Routes>
      </div>
    </>
  )
}

export default App