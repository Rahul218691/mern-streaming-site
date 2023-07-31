import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import Item from 'components/Item'
import DataLoading from 'components/DataLoading'
import { getPodcastItems } from 'apiServices/podcasts'

const INITIAL_DATA = {
  items: [],
  pageNumber: 1,
  pageLimit: 25
}

const Podcasts = () => {

  const navigate = useNavigate()

  const [podcasts, setPodcasts] = useState(Object.assign({}, INITIAL_DATA))
  const [loading, setLoading] = useState(false)

  const { pageNumber, pageLimit } = useMemo(() => podcasts, [podcasts])

  const handleFetchPodcast = useCallback(async({
    page,
    size
  }) => {
    try {
      setLoading(true)
      const payload = {
        page: page || pageNumber,
        pageLimit: size || pageLimit
      }
      const response = await getPodcastItems(payload)
      const updatedDetails = Object.assign({}, podcasts)
      updatedDetails.items = [...updatedDetails.items, ...response.podcasts]
      setPodcasts(updatedDetails)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error?.response?.data?.msg)
    }
  }, [pageNumber, pageLimit, podcasts])

  const handleMoveToPlayList = useCallback(async(data) => {
    navigate(`/playlist?playlistType=podcast&playerFeed=${data.feedUrl}`)
  }, [navigate])

  useEffect(() => {
    handleFetchPodcast({ page: pageNumber, size: pageLimit })
    //  eslint-disable-next-line
  }, [pageNumber, pageLimit])

  return (
    <div className='videos'>
        <div className='videos__container'>
            {
              loading && <DataLoading />
            }
            {
              podcasts.items.map((item, index) => <Item key={`podcast_${index}`} data={item} onClick={handleMoveToPlayList} />)
            }
        </div>
    </div>
  )
}

export default Podcasts