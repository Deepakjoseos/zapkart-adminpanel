/* eslint-disable */
import React from 'react'
import { Table, Select, Tooltip, Button, notification, Dropdown, Icon, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { STRINGS } from '_constants'
// import SearchAndFilters from 'components/SearchAndFilters'
// import startsWith from 'lodash/'
// import isEmpty from 'lodash/isEmpty'startsWith
// import Table from 'components/Table'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'
import callApi from 'utils/callApi'
// import styles from './style.module.scss'

const limits = [5, 10, 20, 30, 50]
const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'redeem',
    title: 'Redeem',
  },
  {
    key: 'block',
    title: 'Block',
  },
]

class GiftCardList extends React.PureComponent {
  state = {
    // tableData: [],
    data: [],
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    loading: false,
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  }

  componentDidMount() {
    const { pagination } = this.state
    this.fetchData({ pagination })
  }

  fetchData = async (params = {}) => {
    this.setState({ loading: true })
    const { data } = await callApi('/api/backend/v1/giftcard', { method: 'GET' })
    console.log('data in gigt*****', data)

    if (data && data.length > 0)
      this.setState({
        loading: false,
        data,
        pagination: {
          ...params.pagination,
          total: data.length,
        },
      })
    else {
      this.setState({ loading: false })
      notification.warning({
        message: 'No Gift card',
        description: 'Please add !',
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

  handleMenuClick = async (e) => {
    const { clickedId, data } = this.state
    // console.log('clicked on', e.key, clickedId)/api/backend/v1/giftcard?
    try {
      const isUpdated = await callApi(`/api/backend/v1/giftcard/${clickedId}/?status=${e.key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (isUpdated) {
        const recordIndex = data.findIndex((item) => item.id === clickedId)
        data[recordIndex].status = e.key
        notification.success({
          message: 'Success!',
          description: 'Status Updated Successfully!',
        })
        return this.setState((prev) => ({
          ...prev.data,
          clickedId: null,
        }))
      }
      this.setState({ clickedId: null })
    } catch (err) {
      console.log('ERror', err)
      notification.error({
        message: 'Error!',
        description: 'Error updating! Please try again later!',
      })
    }
    return null
  }

  handleStatusClick = (id) => {
    this.setState({ clickedId: id })
  }

  handleDelete = async (id) => {
    const a = await callApi(`/api/backend/v1/giftcard/${id}`, { method: 'DELETE' })
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      this.setState((prev) => {
        const newData = prev.data.filter((i) => i.id !== id)
        return {
          ...prev,
          data: [...newData],
        }
      })
    }
  }

  onSelectChange = (sRkeys) => {
    console.log('selectedRowKeys changed: ', sRkeys)
    this.setState({ selectedRowKeys: sRkeys })
  }

  deleteRecords = () => {
    this.setState({ loading: true })
    console.log('will delete ok')
    this.setState({ loading: false })
  }

  render() {
    const {
      loading,
      data,
      selectedRowKeys,
      pagination,
      // searchText, filtered, filterDropdownVisible
    } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        // sorter: (a, b) => a.code.length - b.code.length,
        render: (text) => <span className="capitalize">{text}</span>,
        // search: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          let badge = 'badge-success'
          if (record.status === 'block') badge = 'badge-danger'
          if (record.status === 'redeem') badge = 'badge-primary'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record.id}
              overlay={menu}
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text.toUpperCase()}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
        // filters: [
        //   {
        //     label: 'Active',
        //     value: 'active',
        //   },
        //   {
        //     label: 'Hold',
        //     value: 'hold',
        //   },
        // ],
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            <Link to={`/gift/edit/${record.id}`}>
              <Tooltip title="Edit">
                <Button icon="edit" className="mr-1" size="small" />
              </Tooltip>
            </Link>
            <Tooltip placement="bottomRight" title="Delete">
              <Popconfirm title="Delete record?" onConfirm={() => this.handleDelete(record.id)}>
                <Button icon="close" className="mr-1" size="small" />
              </Popconfirm>
            </Tooltip>
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Category List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Gift Card List</strong>
              <AddNew add link="/gift/create" attribute="add gift" />
            </div>
          </div>

          <div className="card-body">
            {/* <SearchProvider columns={columns}>
                 {columnsWithSearch => ( */}

            <FilterProvider data={data} columns={columns}>
              {(filteredData) => (
                <>
                  {limits.length > 0 && (
                    <div className="right-flex">
                      <span>
                        <strong>Items per page:&nbsp;</strong>
                      </span>
                      <Select value={Number(pagination.pageSize)} onChange={this.handleLimitChange}>
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
                    columns={columns.map((i) => omit(i, ['filters']))}
                    loading={loading}
                    dataSource={filteredData}
                    // rowSelection={rowSelection}
                    limits={limits}
                    currentPage={pagination.current}
                    limit={pagination.pageSize}
                    total={pagination.total}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                  />
                </>
              )}
            </FilterProvider>
            {/* )}
               </SearchProvider> */}
          </div>
        </div>
      </div>
    )
  }
}

export default GiftCardList
