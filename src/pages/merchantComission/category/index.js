/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react'
import { Button, Icon, Dropdown, notification, Select, Table, Modal } from 'antd'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { editData } from 'services'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import { API_COMMISSION_CATAGORY } from '_constants'
import { connect } from 'react-redux'
import { reducer, initialState } from './reducer'
import Form from './add-edit'

const limits = [5, 10, 20, 30, 40]
const menuItems = [
  {
    key: 'pending',
    title: 'Pending',
  },
  {
    key: 'processe',
    title: 'Processed',
  },
  {
    key: 'approve',
    title: 'Approve',
  },
]

const Zone = ({ user, match }) => {
  const { params } = match
  const { type } = params

  console.log('taype', type)
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);
  // const URL = `${API_COMMISSION_CATAGORY.list}`
  const URL = `${API_COMMISSION_CATAGORY.list}?type=${type}`

  const [isModaal, setModal] = useState(false)
  const [selected, setselected] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state.searchQuery)

  const [{ response, loading, error }] = useFetching(URL)

  const handleMenuClick = async (e) => {
    if (state.statusClickedId) {
      const res = await editData(
        `${API_COMMISSION_CATAGORY.edit}/${state.statusClickedId}`,
        {
          approvestatus: e.key,
        },
        'json',
      )
      if (res?.success) {
        dispatch({
          type: 'updateClickedProdStatus',
          payload: e.key,
        })
        notification.success({
          message: 'Success!',
          description: 'Status Updated Successfully!',
        })
      }
      dispatch({
        type: 'clearStatusClickedId',
      })
    }
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      dispatch({
        type: 'setData',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.data.length,
      })
    }
    console.log(error, response)
    if (error) {
      dispatch({
        type: 'clearData',
      })
      dispatch({
        type: 'clearPagination',
      })
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  // const handleDelete = (id) => {
  //   return async () => {
  //     const isDeleted = await deleteData(`${URL}/${id}`)
  //     if (isDeleted) {
  //       dispatch({
  //         type: 'deleteItem',
  //         payload: id,
  //       })
  //     }
  //   }
  // }

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
      payload: Number(selLimit),
    })
  }

  const handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    dispatch({
      type: 'setCurrentPage',
      payload: Number(paginationParams.current),
    })
    dispatch({
      type: 'setPageSize',
      payload: Number(paginationParams.pageSize),
    })
    // if (!isEmpty(filters.search)) {
    //   if (filters.search.priorityOrder) {
    //     dispatch({
    //       type: 'setSorters',
    //       payload: { priorityOrder: filters.search.priorityOrder },
    //     })
    //   }
    // }

    if (!isEmpty(sorters)) {
      console.log('sortParams.field', sorters.field)
      console.log('sortParams.order', sorters.order)
      dispatch({
        type: 'setSorters',
        payload: {
          [sorters.field]: sorters.order === 'descend' ? 2 : 3,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    }

    // dispatch({
    //   type: 'setSearchers',
    //   payload: filters.search,
    // })

    // dispatch({
    //   type: 'setFilters',
    //   payload: filters.filters,
    // })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

  const columns = [
    //     approvestatus: "approve"
    // commission: 4
    // deleted: false
    // merchant: {id: 99, firstName: "riolabz", lastName: "riolabz", email: "riolabz@gmail.com", phone: "1234567898"}
    // merchentId: 99
    // type: "brand"
    // _id: "5fa534bc74671d75feed7bd1"

    {
      title: 'Merchant',
      dataIndex: 'merchant.firstName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
    },
    // {
    //   title: 'Type Detail',
    //   dataIndex: 'typedetail',
    // },
    {
      title: 'Approve status',
      dataIndex: 'approvestatus',
      key: 'approvestatus',
      render: (text, record) => {
        if (user.userTypeId === 1) {
          let badge = 'badge-danger'
          if (record.approvestatus === 'approve') badge = 'badge-success'
          if (record.approvestatus === 'processe') badge = 'badge-warning'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              // ref={this.clickId}
              id={record._id}
              onClick={() => handleStatusClick(record._id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        }
        let badge = 'badge-danger'
        if (record.approvestatus === 'approve') badge = 'badge-success'
        if (record.approvestatus === 'processe') badge = 'badge-warning'
        return <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text}</span>
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
      render: (record) =>
        user.userTypeId === 1 && (
          <span>
            <Button
              icon="edit"
              className="mr-1"
              size="small"
              onClick={() => {
                setModal(true)
                setselected(record._id)
              }}
            />
            {/* {state.data.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record._id)}>
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null} */}
          </span>
        ),
    },
  ]

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }

  return (
    <div>
      <Helmet title="List" />
      <Modal footer onCancel={() => setModal(false)} onOk visible={isModaal}>
        <Form id={selected} onResponse={() => setModal(false)} />
      </Modal>
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>List</strong>
            <AddNew
              add
              attribute="commission"
              onClick={() => {
                setModal(true)
                setselected('')
              }}
            />
          </div>
        </div>
        <div className="card-body">
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
            rowKey={setRowKey}
            columns={columns.map((i) => omit(i, ['filters']))}
            loading={loading}
            dataSource={state.data}
            limits={limits}
            currentPage={pagination.current}
            limit={pagination.pageSize}
            total={pagination.total}
            pagination={pagination}
            onChange={handleTableChange}
            // rowSelection={rowSelection}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Zone)
