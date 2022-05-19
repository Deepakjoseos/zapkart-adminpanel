/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
  // Input,
  Button,
  Popconfirm,
  Skeleton,
  Select,
  // Tooltip
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import {
  getDeliveryLocation,
  editDeliveryLocationStatus,
  deleteDeliveryLocation,
  getAdminDeliveryLocation,
} from 'services/deliverLocation'
import { connect } from 'react-redux'
// import { LINKS } from '_constants'
// import omit from 'lodash/omit'
import SearchProvider from 'components/RenderProps/SearchProvider'
import AdminDetails from './adminDetails'

const limits = [4, 10, 20, 30, 50]
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

class List extends React.Component {
  state = {
    tableData: [],
    loading: true,
    // // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    const { pagination } = this.state
    this.fetchDetails({ pagination })
  }

  fetchAdminDetails = async (value) => {
    this.setState({
      loading: true,
    })
    console.log('value', value)
    const res = await getAdminDeliveryLocation(value)
    console.log('response', res)
    if (res && res.data) this.setState({ loading: false, tableData: res.data })
    else {
      this.setState({ loading: false })
    }
  }

  fetchDetails = async (params = {}) => {
    this.setState({
      loading: true,
    })
    const res = await getDeliveryLocation()
    console.log('response', res)
    if (res && res.data)
      this.setState({
        loading: false,
        tableData: res.data,
        pagination: {
          ...params.pagination,
          total: res.count,
        },
      })
    else {
      this.setState({ loading: false })
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

  handleMenuClick = async (e) => {
    const { clickedId, tableData } = this.state
    console.log('clicked on', e.key, clickedId)
    const isUpdated = await editDeliveryLocationStatus(clickedId, e.key)
    console.log('isupdate', isUpdated)
    if (isUpdated) {
      const recordIndex = tableData.findIndex((item) => item._id === clickedId)
      tableData[recordIndex].status = e.key
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

  handleDelete = async (id) => {
    console.log('id', id)
    const isDeleted = await deleteDeliveryLocation(id)
    console.log('isdeleted', isDeleted)
    if (isDeleted) {
      this.setState((m) => {
        const newData = m.tableData.filter((i) => i._id !== id)
        return {
          ...m,
          tableData: newData,
        }
      })
    }
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    // /catalog/informations/information/:id - edit-information
    // /catalog/informations/add-information - add-information
    const { tableData, pagination, selectedRowKeys, loading } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Location Name',
        dataIndex: 'location_name',
        key: 'location_name',
        search: true,
        sorter: (a, b) => a.location_name.localeCompare(b.location_name),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          console.log('record', record)
          let badge = 'badge-success'
          if (record.status === 'hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record._id}
              onClick={() => this.handleStatusClick(record._id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            {/* {user.userTypeId === 1 && ( */}
            <Link to={`/deliverLocation/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>

            {tableData.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null}
          </span>
        ),
      },
    ]
    console.log('user', this.props)
    const { user } = this.props
    return (
      <div>
        <Helmet title="Delivery Zone" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Delivery Zone</strong>
              {user.userTypeId === 1 && <AdminDetails fetchAdminDetails={this.fetchAdminDetails} />}
              {/* {user.userTypeId === 1 && ( */}
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="delivery"
                link="/deliverLocation/add-edit"
                // handleDelete={this.handleDelete}
              />
              {/* // )} */}
              {/* {user.userTypeId === 3 && (
                <AddNew
                  add
                  selectedRowKeys={selectedRowKeys}
                  attribute="delivery-location"
                  link="/deliverLocation/merchant/add-edit"
                  handleDelete={this.handleDelete}
                />
              )} */}
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
                      // rowSelection={rowSelection}
                      columns={columnsWithSearch}
                      dataSource={tableData}
                      rowKey={(record) => record._id}
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
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(({ user }) => ({ user }))(List)
