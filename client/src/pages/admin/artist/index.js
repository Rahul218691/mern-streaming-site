import React, { useState, useMemo, useCallback } from 'react'

import TableView from 'components/tableView'
import AdminWrapper from '../components/AdminWrapper'
import CreateArtist from './createArtist'
import { getColumnConfig } from './TableConfig'

const INITIAL_DATA = {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecords: 0,
    hasNextPage: false,
    hasPreviousPage: false
  }
  

const ArtistPage = () => {

    const [artistDetails] = useState(Object.assign({}, INITIAL_DATA))
    const [isShowAddScreen, setIsShowAddScreen] = useState(false)

    const { items, pageSize, pageNumber, totalRecords } = useMemo(() => artistDetails, [artistDetails])

    const columns = useMemo(() => {
        return getColumnConfig({})
    }, [])

    const handleToggleAddScreen = useCallback(() => {
      setIsShowAddScreen(prevState => !prevState)
    }, [])

  return (
    <AdminWrapper>
        {
          isShowAddScreen && <CreateArtist onCloseAddScreen={handleToggleAddScreen} />
        }
        <TableView 
            title="Manage Artist"
            columns={columns}
            data={items}
            isPaginationRequired
            isGenericSearchRequired
            isShowAddForm
            currentPage={pageNumber}
            totalCount={totalRecords}
            pageSize={pageSize}
            onToggleAddScreen={handleToggleAddScreen}
        />
    </AdminWrapper>
  )
}

export default ArtistPage