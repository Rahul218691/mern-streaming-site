import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from 'context/authContext'
import Item from 'components/Item'
import styles from './liveStream.module.css'

const LiveStreams = () => {

    const navigate = useNavigate()
    const { state } = useContext(AuthContext)

    const handleCreateNewStream = useCallback(() => {
        navigate('/create/new-stream')
    }, [navigate])

  return (
    <div className='videos'>
        {
            state.user && <div className={styles.create_stream_button}>
            <button type='button' className='glow-on-hover' onClick={handleCreateNewStream}>
            <i className="material-icons">live_tv</i> Create Stream
            </button>
        </div>
        }
        <div className='videos__container'>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </div>
    </div>
  )
}

export default LiveStreams