/* eslint-disable */
import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import { Button, Popconfirm, Dropdown, Icon,Select,Table, notification, Tooltip } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import EditableCell from 'components/EditableCellNumber'
import useFetching from 'hooks/useFetching'
import callApi from 'utils/callApi'
import isEmpty from 'lodash/isEmpty'
// import Table from 'components/Table'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import { editTherepy } from 'services/therepy'
import { STRINGS } from '_constants'
import { reducer, initialState } from './reducer'

const limits = [10, 20, 30, 40]
const menuItems = [
  {
    key: 'active',
    title: 'Active',
    badge: 'badge-success',
  },
  {
    key: 'hold',
    title: 'Hold',
    badge: 'badge-danger',
  },
]

const UsersList = (props) => {
  console.log(props)
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // const [itemsPerPage, setItemsPerPage] = useState(2)
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('useReducer state', state)

  const { pagination, searchQuery, filterQuery, sortQuery, sort, refresh, users } = state

  // const [{ response, loading }] = useFetching(
  //   `/api/backend/v1/users/all?userTypeId=2` +
  //     `&page=${pagination.current}&limit=${pagination.pageSize}` +
  //     `${!isEmpty(searchQuery) ? `&${searchQuery}` : ''}` +
  //     `${!isEmpty(sortQuery) ? `&${sortQuery}` : ''}`,
  //   {},
  //   refresh,
  // )
  // /api/catalog/v1/therapeuticClass?status=active&sort[priorityOrder]=1&field[]=name&field[]=slug&parent=null

  // /api/catalog/v1/therapeuticClass?status=active&sort[priorityOrder]=1

  console.log('REDucer state', pagination, searchQuery, sortQuery, 'sort', sort, refresh, users)

  const [{ response, loading }] = useFetching(
    // `/api/catalog/v1/therapeuticClass?page=${pagination.current}&limit=${pagination.pageSize}`,
    `/api/catalog/v1/therapeuticClass?page=${pagination.current}&limit=${pagination.pageSize}${
      isEmpty(sortQuery) ? '' : `&${sortQuery}`
    }${isEmpty(searchQuery) ? '' : `&${searchQuery}`}${
      isEmpty(filterQuery) ? '' : `&${filterQuery}`
    }`,
    {},
    refresh,
  )
  console.log('RESPONSE in list', response)

  const handleDelete = async (id) => {
    console.log('id', id)

    const a = await callApi(`/api/catalog/v1/therapeuticClass/${id}`, { method: 'DELETE' })
    console.log('a', a)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      dispatch({
        type: 'deleteClass',
        payload: id,
      })
      dispatch({ type: 'refreshData' })
      // return setDatas(filteredData)
    }
    return null
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

  const handleStatusChange = async (e) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log('handleStatus', clickId.current, e.key)
    const { name } = users.find((item) => item._id === clickId.current)
    const res = await editTherepy(clickId.current, { status: e.key, name })
    console.log('USER EDIT', res)
    if (res) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.editSuccess,
      })
      dispatch({
        type: 'updateClickedStatus',
        payload: {
          id: clickId.current,
          value: e.key,
        },
      })
    }

    clickId.current = null
  }
  const handleIdClick = (id) => {
    return () => {
      clickId.current = id
    }
  }

  const menu = <Menu items={menuItems} onClick={handleStatusChange} />
  const clickId = useRef(null)

  useEffect(() => {
    console.log(response)
    if (response && response.data) {
      dispatch({
        type: 'setUsers',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.count,
      })
    }
  }, [response])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const onCellChange = (id, key) => {
    return async (value) => {
      console.log('cell edit', id, key, value)
      const { name, status } = users.find((item) => item._id === id)
      console.log('priosiryt', name, status)
      const edited = await editTherepy(id, { name, status, [key]: value })

      // const edited = await editSafety(id, { [key]: value })
      console.log('hello', edited)
      if (edited) {
        notification.success({ message: STRINGS.success, description: STRINGS.editSuccess })
        return true
      }
      return false
    }
  }

  const setRowKey = useCallback((record) => {
    // console.log(record)
    return record._id
  })

  const handleTableChange = ({ pagination: params, sorters: sortParams, filters }) => {
    console.log(
      'list handleTableChange params',
      params,
      'sorPAtams',
      sortParams,
      'filters',
      filters,
    )
    dispatch({
      type: 'setCurrentPage',
      payload: params.current,
    })
    dispatch({
      type: 'setPageSize',
      payload: params.pageSize,
    })
    if (!isEmpty(filters.search)) {
      if (filters.search.priorityOrder) {
        dispatch({
          type: 'setSorters',
          payload: { priorityOrder: filters.search.priorityOrder },
        })
      }
    }

    if (!isEmpty(sortParams)) {
      console.log('sortParams.field', sortParams.field)
      console.log('sortParams.order', sortParams.order)
      dispatch({
        type: 'setSorters',
        payload: {
          [sortParams.field]: sortParams.order === 'descend' ? 2 : 3,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })

    dispatch({
      type: 'setFilters',
      payload: filters.filters,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => `${text}`,
      sorter: {
        multiple: 1,
      },
      search: true,
    },
    // {
    //   title: 'Slug',
    //   dataIndex: 'slug',
    //   key: 'slug',
    //   // search: true,
    // },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
      render: (_, record) => <span>{record.parent === null ? '-' : record.parent.name}</span>,
      // search: true,
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
    // {
    //   title: 'Orders placed',
    //   dataIndex: 'orders',
    //   key: 'orders',
    //   render: () => '0',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'

        return (
          <Dropdown
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            ref={clickId}
            id={record._id}
            onClick={handleIdClick(record._id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/catalog/therepyClass/edit/${record._id}`}>
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

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }

  return (
    <div>
      <Helmet title="Users List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Therapeutic Class List</strong>
            <AddNew add attribute="Attributes" link="/catalog/therepyClass/create" />
          </div>
        </div>

        <div className="card-body">
          <FilterProvider data={users} columns={columns}>
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

export default UsersList
