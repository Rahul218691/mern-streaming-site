import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { toast } from 'react-toastify'

import TableView from 'components/tableView'
import DataLoading from 'components/DataLoading'
import { getPodcastPlaylist } from 'apiServices/podcasts'
import { getColumnConfig } from './TableConfig'
import { PLAYLIST_TYPES } from './config'
import styles from './playlist.module.css'
import { dateFormat } from 'utils'

const PlayList = () => {

  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [playlistDetails, setPlayListDetails] = useState({})

  const isSecureDomain = useMemo(() => {
    return window.location.protocol === "https:"
  }, [])

  const columns = useMemo(() => {
    return getColumnConfig({ isSecureDomain })
  }, [isSecureDomain])

  const handleFetchPlayListDetails = useCallback(async() => {
    try {
      setLoading(true)
      const type = searchParams.get('playlistType')
      const feedUrl = searchParams.get('playerFeed')
      if (type === PLAYLIST_TYPES.PODCAST){
        if (!feedUrl) return navigate(-1)
        const response = await getPodcastPlaylist(feedUrl)
        setPlayListDetails(response.playlist)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.msg)
      navigate(-1)
    }
  }, [navigate, searchParams])

  useEffect(() => {
    handleFetchPlayListDetails()
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    if (!searchParams.get('playlistType')) {
      navigate(-1)
    }
    // eslint-disable-next-line 
  }, [searchParams])

  if (loading) {
    return (
      <div className='videos'>
        <div className='videos__container'>
          <DataLoading />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.playlist_wrapper}>
      <Row>
        <Col md={4}>
          <img className={styles.playlistPoster} src={playlistDetails?.podcastImage} alt='' loading='lazy' />
          <p>{playlistDetails?.mainDescription}</p>
          <p>Published On: <b>{dateFormat(playlistDetails?.publishedDate)}</b></p>
        </Col>
        <Col md={8}>
          <div>
            <h2 className='mb-0'>{playlistDetails?.mainTitle}</h2>
            <span className={styles.subtext}>{playlistDetails?.items?.length} podcasts</span>
            <div>
              <button className={styles.play_all_btn}><i className='bx bx-play'></i> Play Songs</button>
            </div>
          </div>
          <section id="content" className={styles.playerList}>
            <main>
              <TableView
                columns={columns}
                data={playlistDetails.items || []}
              />
            </main>
          </section>
        </Col>
      </Row>
    </div>
  )
}

export default PlayList