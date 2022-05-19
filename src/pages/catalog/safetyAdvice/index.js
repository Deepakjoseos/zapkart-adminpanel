/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useReducer, useEffect } from 'react'
import { Button, Icon, Table, Select, Tooltip, notification, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import EditableCell from 'components/EditableCellNumber'
// import Table from 'components/Table'
// import { getAllMerchantRequest, editMerchant } from 'services/merchantRequest'
import useFetching from 'hooks/useFetching'
import { STRINGS } from '_constants'
import callApi from 'utils/callApi'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import { reducer, initialState } from './reducer'
// import styles from './style.module.scss'

const limits = [10, 20, 30]

const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

const SafetyAdviceList = (props) => {
  console.log('props', props)
  // const initialFilterState={
  //   name:'',
  //   icon:'',
  //   priorityOrder:''
  // }

  // const [datas, setDatas] = useState([])
  const [clickedId, setClickedId] = useState('')

  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('useReducer state', state)

  const { pagination, searchQuery, sortQuery, refresh, datas } = state
  console.log('PAGINATION', pagination, searchQuery, sortQuery, refresh, datas)
  // /api/catalog/v1/safetyadvice?page=1&limit=4&field[]=name&field[]=icon.url
  // /api/catalog/v1/safetyadvice?page=1&limit=5&field[]=name&field[]=icon.url&sort[priorityOrder]=1
  const [{ response, loading, error }] = useFetching(
    `/api/catalog/v1/safetyadvice?page=${pagination.current}&limit=${pagination.pageSize}`,
    {},
    refresh,
  )

  console.log('response in safetyAdvice list', response, loading, error)

  // useEffect(() => {
  //   if (response && response.data) {
  //     setDatas(response.data)
  //   }
  // }, [response, error])
  const handleMenuClick = async (e) => {
    console.log('eventt', e.key, clickedId)

    try {
      const a = await callApi(`/api/catalog/v1/safetyadvice/${clickedId}/?status=${e.key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response status', a)
      if (a) {
        // const recordIndex = datas.findIndex(item => item._id === clickedId)
        // console.log("recordIndex", recordIndex)
        // datas[recordIndex].status = e.key
        dispatch({
          type: 'updateClickedStatus',
          payload: {
            id: clickedId,
            value: e.key,
          },
        })
        dispatch({ type: 'refreshData' })
        notification.success({
          message: 'Success!',
          description: 'Status Updated Successfully!',
        })
      }
      setClickedId(null)
    } catch (err) {
      console.log('ERror', err)
      notification.error({
        message: 'Error!',
        description: 'Error updating! Please try again later!',
      })
    }

    return null
  }

  const handleDelete = async (id) => {
    console.log('id', id)

    const a = await callApi(`/api/catalog/v1/safetyadvice/${id}`, { method: 'DELETE' })
    console.log('a')
    if (a) {
      // const filteredData = datas.filter((item) => item._id !== id)
      // console.log('filtered Data', filteredData)
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      dispatch({
        type: 'deletedatas',
        payload: id,
      })
      dispatch({ type: 'refreshData' })
      // return setDatas(filteredData)
    }
    return null
  }

  const onCellChange = (id, key) => {
    return async (value) => {
      console.log('cell edit', id, key, value)

      const {success} = await callApi(`/api/catalog/v1/safetyadvice/${id}/?priorityOrder=${value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // const edited = await editSafety(id, { [key]: value })
      console.log('hello', success)
      if (success) {
        notification.success({ message: STRINGS.success, description: STRINGS.editSuccess })
        return true
      }
      return false
    }
  }
  const handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit')
    //  dispatch({
    //       type: 'setCurrentPage',
    //       payload: params.current,
    //     })
    dispatch({
      type: 'setPageSize',
      payload: selLimit,
    })
  }
  useEffect(() => {
    console.log(response)
    if (response && response.data) {
      dispatch({
        type: 'setdatas',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
  }, [response])

  const setRowKey = useCallback((record) => {
    // console.log(record)
    return record._id
  })

  const handleTableChange = (page, pageSize) => {
    console.log('list handleTableChange params', page, pageSize)
    //   dispatch({
    //     type: 'setCurrentPage',
    //     payload: params.current,
    //   })
    //   dispatch({
    //     type: 'setPageSize',
    //     payload: params.pageSize,
    //   })
    //   if (!isEmpty(sortParams)) {
    //     dispatch({
    //       type: 'setSorters',
    //       payload: {
    //         [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
    //       },
    //     })
    //     // const sortObj = {
    //     //   sort: {
    //     //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
    //     //   },
    //     // }
    //     // setSortQuery(qs.stringify(sortObj))
    //   }

    //   dispatch({
    //     type: 'setSearchers',
    //     payload: filters.search,
    //   })
    //   // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => {
        console.log('text', text, record)
        return (
          <span className={`'font-size-12 badge badgeText'`}>
            {text}
            {/* <p>{record.user.firstName}</p> */}
          </span>
        )
      },
      search: true,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'icon',
      key: 'icon',
      render: (text, record) => (
        <Link to={`safetyAdvice/${record._id}`} className="thumbnail-area">
          {/* <div className="image-view"> */}
          <img className="image-view" src={record.icon.url} alt={record.title} />
          {/* </div> */}
        </Link>
      ),
      // search: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'
        return (
          <Dropdown
            overlay={menu}
            ref={clickedId}
            id={record._id}
            onClick={() => setClickedId(record._id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
      // sorter: (a, b) => a.status.localeCompare(b.status),
      // onFilter: (value, record) => record.status.indexOf(value) === 0,
      filters: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Hold',
          value: 'hold',
        },
      ],
      // search:true
    },
    {
      title: 'Priority',
      dataIndex: 'priorityOrder',
      key: 'priorityOrder',
      sorter: (a, b) => a.priorityOrder - b.priorityOrder,
      render: (text, record) => (
        <EditableCell
          type="number"
          value={text}
          onChange={onCellChange(record._id, 'priorityOrder')}
        />
      ),
      // sorter: {
      //   multiple: 2,
      // },
      // search: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          {console.log('record', record)}
          <Link to={`/catalog/safetyAdvice/edit/${record._id}`}>
            <Tooltip title="Edit">
              <Button icon="edit" className="mr-1" size="small" />
            </Tooltip>
          </Link>
          <Tooltip placement="bottomRight" title="Delete">
            <Popconfirm title="Delete record?" onConfirm={() => handleDelete(record._id)}>
              <Button icon="close" className="mr-1" size="small" />
            </Popconfirm>
          </Tooltip>
        </span>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Safety Advice List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Safety Advice List</strong>
            <AddNew add attribute="Attributes" link="/catalog/safetyAdvice/create" />
          </div>
        </div>
        <div style={{ marginLeft: '40px' }} />
        {/* <div className="filter-container">
          <h5>
            <strong>Filters</strong>
          </h5>
          <div>
            <div className="filter-item">
              <div className="label">Name</div>
              <Input allowClear onChange={handleChangeName} name="name" value={name} />
            </div>
          </div>

          <div className="filter-footer">
            <Button loading={loading} onClick={handleSubmitForm} type="primary">
              Submit
            </Button>
            <Button type="dashed">Cancel</Button>
          </div>
        </div> */}
        {/* {limits.length > 0 && (
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
        )} */}

        <div className="card-body">
          <FilterProvider data={datas} columns={columns}>
            {(filteredData) => (
              <>
                {console.log('filterData', filteredData)}
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
                  loading={loading}
                  limits={limits}
                  initialLimit={limits[0]}
                  currentPage={pagination.current}
                  limit={pagination.pageSize}
                  total={pagination.total}
                  // pagination={PagePagination}
                  // onLimitChange={handleItemsChange}
                  // scroll={scrollStyle}
                  // pagination={pagination}
                  // rowSelection={rowSelection}
                  // sortDirections={['ascend']}
                  pagination={pagination}
                  columns={columns}
                  dataSource={filteredData}
                  rowKey={setRowKey}
                  onChange={handleTableChange}
                />
              </>
            )}
          </FilterProvider>
        </div>
      </div>
    </div>
  )
}

export default SafetyAdviceList
