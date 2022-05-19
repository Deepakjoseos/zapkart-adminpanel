/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  Table,
  // Icon,
  //   Dropdown,
  // Input,
  Select,
  Button,
  Popconfirm,
  Skeleton,
  Tooltip,
  notification,
} from 'antd'
import { Helmet } from 'react-helmet'
import callApi from 'utils/callApi'
// import { Link } from 'react-router-dom'
import useFetching from 'hooks/useFetching'
// import AddNew from 'components/CustomComponents/AddNew'
// import Menu from 'components/Menu'
// import {editAlerts} from 'services/alerts'
import { STRINGS } from '_constants'
import SearchProvider from 'components/RenderProps/SearchProvider'

 
const limits = [4, 10, 20,50]
const List = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableData, setTableData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  // const [loading, setLoading] = useState(true)

  const [{ response, loading, error }] = useFetching('/api/catalog/v1/tags')
  // const [{ response2}] = useFetching('AIzaSyAqu6fqJ9JMsC83CNtkOje2X-KylbDnoss')

  console.log('response', response, loading, error)
  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      setTableData([...tableData, ...response.data])
      setPagination((prev) => ({
        ...prev,
        total:response.data.length
      })) 
    }
    if (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  const handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    setPagination((prev) => ({
      ...prev,
        current: Number(paginationParams.current),
        pageSize: Number(paginationParams.pageSize),
      }
    ))
    // this.fetchAttributes({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // })
  }

const  handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit', selLimit)
    setPagination((prev) => ({
      ...prev,
        pageSize: Number(selLimit),
    }))
  }

  const handleDelete = async (id) => {
    console.log('id', id)
    try{
      const isDeleted = await callApi(`/api/backend/v1/tag/${id}`, { method: 'DELETE' })
      console.log('isdeleted', isDeleted)
      if (isDeleted) {
        notification.success({
          message: 'Success!',
          description: 'Deleted Successfully!',
        })
        const filterObj=tableData.filter((i) => i.id !== id)
        setTableData(filterObj)
        console.log("tableData",tableData,filterObj)
      }
    }
    catch(err){
      notification.error({ message: STRINGS.error,description:err.message})
      return false
     }

  return null
  }

  const columns = [
    {
      title: '#id',
      dataIndex: 'id',
      key: 'id',
      // search: true,
      render: (text, record, index) => `#${index + 1}`,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      // search: true,
      render: (_,record) => {
        console.log(record)
     return <span>{record}</span>
      }
    },
    // {
    //   title: 'Logo',
    //   dataIndex: 'Logo',
    //   key: 'Logo',
    //   render: (text, record) => (
    //     <Link to={`/logo/edit/${record.DomainName}`} className="thumbnail-area">
    //       {/* <div className="image-view"> */}
    //       {console.log('record', record, record.Logo)}
    //       <img className="image-view" src={record.Logo} alt={record.DomainName} />
    //       {/* </div> */}
    //     </Link>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (record) => (
    //     <span>
    //       {/* <Link to={`/tags/edit/${record.id}`}>
    //         <Button icon="edit" className="mr-1 bg-primary" size="small" />
    //       </Link> */}
    //       <Tooltip placement="bottomRight" title="Delete">
    //         <Popconfirm title="Delete record?" onConfirm={() => handleDelete(record.id)}>
    //           <Button icon="delete" className="mr-1" size="small" />
    //         </Popconfirm>
    //       </Tooltip>
    //     </span>
    //   ),
    // },
  ]

  return (
    <div>
      <Helmet title="Banner List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Tag List</strong>
            {/* <AddNew
              add
              //   selectedRowKeys={selectedRowKeys}
              attribute="tag"
              link="/tags/add"
            /> */}
          </div>
        </div>
        {loading && (
          <div className="card-body">
            <Skeleton active />
          </div>
        )}
        {!loading && (
          <div className="card-body">
            <SearchProvider columns={columns}>
              {(columnsWithSearch) => (
                               <>
                               {limits.length > 0 && (
                                 <div className="right-flex">
                                   <span>
                                     <strong>Items per page:&nbsp;</strong>
                                   </span>
                                   <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
                                     {limits.map((i) => (
                                       <Select.Option key={i}>{Number(i)}</Select.Option>
                                     ))}
                                   </Select>
                                 </div>
                               )}
                <Table
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  // rowSelection={rowSelection}
                  columns={columnsWithSearch}
                  dataSource={tableData}
                  rowKey={(record) => record}
                  limits={limits}
                  currentPage={pagination.current}
                  limit={pagination.pageSize}
                  total={pagination.total}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
                </>
              )}
            </SearchProvider>
          </div>
        )}
      </div>
    </div>
  )
}

export default List
