/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Icon, Input,
  notification,
  Skeleton,
  Dropdown,
  Icon,
  Select,
} from 'antd'
import { Helmet } from 'react-helmet'
import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getAllMerchantRequest, editMerchant } from 'services/merchantRequest'

// import styles from './style.module.scss'
const limits = [1, 10, 20, 30, 50]
const { Option } = Select
const menuItems = [
  {
    key: 'approve',
    title: 'Approve',
  },
  {
    key: 'reject',
    title: 'Reject',
  },
  {
    key: 'request',
    title: 'Request',
  },
]

class MerchantList extends React.Component {
  state = {
    // tableData: [],
    data: [],
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  }

  componentDidMount() {
    const { pagination } = this.state
    this.fetchDetails('request', {pagination})
  }

  // fetchData = async () => {
  //   this.setState({ loading: true })
  //   const data = await getuserGroup(ROLES.merchant)
  //   const a = await getAllMerchantRequest('reject')
  //   console.log('Res', a)
  //   if (data && data.length > 0) this.setState({ loading: false, data })
  //   else {
  //     this.setState({ loading: false })
  //     notification.warning({
  //       message: 'No User Group',
  //     })
  //   }
  // }

  fetchDetails = async (e, params = {}) => {
    console.log("PAgination",params)
    this.setState({ loading: true })
    const res = await getAllMerchantRequest(e)
    console.log('Res', res)
    // const {requests}=data
    if (res)
      this.setState({
        loading: false,
        data: res.requests,
        pagination: {
          ...params.pagination,
          total: res.count,
        },
      })
    else {
      this.setState({ loading: false })
      notification.warning({
        message: 'No Merchant',
      })
    }
  }

  handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    this.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: Number(paginationParams.current),
        pageSize: Number(paginationParams.pageSize),
      },
    }))
    // this.fetchAttributes({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // })
  }

  handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit', selLimit)
    this.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: Number(selLimit),
      },
    }))
  }

  onChange = (e) => {
    console.log('e', e)
    this.fetchDetails(e)
  }

  handleMenuClick = async (e) => {
    const { clickedId, data } = this.state
    console.log('clicked on', e.key, data, clickedId)
    const isUpdated = await editMerchant(clickedId, { request: e.key })
    console.log('merchant', isUpdated)
    if (isUpdated) {
      const recordIndex = data.findIndex((item) => item.id === clickedId)
      data[recordIndex].request = e.key
      return this.setState((prev) => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = (id) => {
    this.setState({ clickedId: id })
  }

  render() {
    const {
      loading,
      data,
      pagination,
      // searchText, filtered, filterDropdownVisible
    } = this.state

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Company Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
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
        title: 'Name',
        dataIndex: 'companyName',
        key: 'companyName',
        // sorter: (a, b) => a.name.length - b.name.length,
        render: (text, record) => {
          console.log('text', text, record)
          return (
            <span className={`'font-size-12 badge badgeText'`}>
              {record.user.firstName}&nbsp;&nbsp;{record.user.lastName}
              {/* <p>{record.user.firstName}</p> */}
            </span>
          )
        },
      },

      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => {
          console.log('text', text, record)
          return <span className={`'font-size-12 badge badgeText'`}>{record.user.email}</span>
        },
      },
      {
        title: 'Mobile No.',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record) => {
          console.log('text', text, record)
          return <span className={`'font-size-12 badge badgeText'`}>{record.user.phone}</span>
        },
      },
      {
        title: 'Request',
        dataIndex: 'request',
        key: 'request',
        render: (text, record) => {
          let badge = 'badge-success'
          if (record.request === 'reject') badge = 'badge-danger'
          console.log('record', record)
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {/* {text.toUpperCase()} */}
                {text}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
      },
    ]

    return (
      <div>
        <Helmet title="Merchant List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Merchant Request List</strong>
            </div>
          </div>
          <div style={{ marginLeft: '40px' }}>
            <Select
              name="request"
              placeholder="Select Request type"
              onChange={(a) => this.onChange(a)}
              style={{ width: '20%' }}
              defaultValue="request"
              // onPopupScroll={this.handlePopupScroll}
            >
              <Option value="request">Request</Option>
              <Option value="reject">Reject</Option>
              <Option value="approve">Approve</Option>
            </Select>
          </div>
          <div className="card-body">
            {loading && (
              <div className="card-body">
                <Skeleton active />
              </div>
            )}
            {!loading && (
              <SearchProvider columns={columns}>
                {(columnsWithSearch) => (
                  <>
                    {limits.length > 0 && (
                      <div className="right-flex">
                        <span>
                          <strong>Items per page:&nbsp;</strong>
                        </span>
                        <Select
                          value={Number(pagination.pageSize)}
                          onChange={this.handleLimitChange}
                        >
                          {limits.map((i) => (
                            <Select.Option key={i}>{Number(i)}</Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}
                    <Table
                      className="utils__scrollTable"
                      scroll={{ x: '100%' }}
                      rowKey={(record) => record.id}
                      columns={columnsWithSearch}
                      dataSource={data}
                      limits={limits}
                      currentPage={pagination.current}
                      limit={pagination.pageSize}
                      total={pagination.total}
                      pagination={pagination}
                      onChange={this.handleTableChange}
                    />
                  </>
                )}
              </SearchProvider>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MerchantList
