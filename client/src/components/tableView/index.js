import React, { useCallback, useMemo } from 'react'

import Pagination from '../Pagination'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const TableView = ({
    columns,
    data,
    title,
    isGenericSearchRequired = false,
    genericSearch,
    currentPage,
    totalCount,
    pageSize,
    isShowAddForm = false,
    isPaginationRequired = false,
    isServerSideGenericSearch = false,
    onChangeGenericSearch = () => { },
    onToggleAddScreen = () => { },
    onPageChange = () => { }
}) => {

    const handleGenericSearch = useCallback((event) => {
        onChangeGenericSearch(event)
    }, [onChangeGenericSearch])

    const filteredRows = useMemo(() => {
        if (!genericSearch || isServerSideGenericSearch) return data
        const gridFirstItem = Object.values(columns[0])
        return data.filter(row => row[gridFirstItem[0]].toString().toLowerCase().indexOf(genericSearch.toLowerCase()) > -1)
    }, [genericSearch, data, columns, isServerSideGenericSearch])

  return (
    <div className='table-data'>
        <div className='order'>
            <div className='head'>
                <h3>{title}</h3>
                {
                    isGenericSearchRequired && (
                        <>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="form-input">
                                <input type="search" placeholder="Search..." value={genericSearch} onChange={handleGenericSearch}/>
                                <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                            </div>
                        </form>
                        {isShowAddForm && (
                            <i className='bx bx-plus-medical' title='Add New' onClick={onToggleAddScreen}></i>
                        )}
                        </>
                    )
                }
            </div>
            <table>
                <thead>
                    <TableHeader columns={columns} />
                </thead>
                <tbody>
                    <TableRow 
                    data={filteredRows}
                    columns={columns} 
                    />
                </tbody>
            </table>
            {
                isPaginationRequired && 
                <Pagination 
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            }
        </div>
    </div>
  )
}

export default TableView