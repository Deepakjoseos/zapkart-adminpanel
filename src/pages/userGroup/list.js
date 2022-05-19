/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Icon, Input,
  Button,
  notification,
  Skeleton,
  Dropdown,
  Icon,
  Select,
  Popconfirm,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getuserGroup, edituserGroup, deleteuserGroup } from 'services/usergroups'
import { STRINGS } from '_constants'
// import FilterProvider from 'components/RenderProps/FiltersProvider'
import Filters from './Filters'
// import styles from './style.module.scss'

const limits = [5, 10, 20, 50]
const menuItems = [
  {
    key: 'Active',
    title: 'Active',
  },
  {
    key: 'Hold',
    title: 'Hold',
  },
]

const addUserGroup = '/userGroup/create'

class UserGroupList extends React.Component {
  state = {
    // tableData: [],
    data: [],
    seletedData: {},
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
    this.fetchData({ pagination })
  }

  // When Filters Change
  updateTableData = (data) => {
    // this.setState({ data })
    this.setState((prev) => ({
      ...prev,
      data,
      pagination: {
        current: 1,
        pageSize: prev.pagination.pageSize,
        total: data.length,
      },
    }))
  }

  fetchData = async (params = {}) => {
    this.setState({ loading: true })
    // ROLES.enduser
    const data = await getuserGroup()
    if (data && data.length > 0) {
      const availableData = data.filter((cur) => cur.status !== 'Deleted')
      this.setState({
        loading: false,
        data: availableData,
        pagination: {
          ...params.pagination,
          total: data.length,
        },
      })
    } else {
      this.setState({ loading: false })
      notification.warning({
        message: 'No User Group',
      })
    }
  }

  handleMenuClick = async (e) => {
    const { clickedId, data, selectedData } = this.state
    console.log('clicked on', e.key, clickedId)

    const sendingData = {
      name: selectedData.name,
      type: selectedData.type,
      status: e.key,
    }

    const isUpdated = await edituserGroup(clickedId, sendingData)
    if (isUpdated) {
      const recordIndex = data.findIndex((item) => item.id === clickedId)
      data[recordIndex].status = e.key
      return this.setState((prev) => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = (id, sData) => {
    this.setState({ clickedId: id, selectedData: sData })
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

  handleDelete = async (id) => {
    const a = await deleteuserGroup(id)
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        // search: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        // search: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          let badge = 'badge-success'
          if (record.status === 'Hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record.id}
              overlay={menu}
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id, record)}
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
            <Link to={`/userGroup/edit/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            {data.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="UserGroup List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>UserGroup List</strong>
              <AddNew add link={addUserGroup} attribute="usergroup" />
            </div>
          </div>

          <div className="card-body">
            {loading && (
              <div className="card-body">
                <Skeleton active />
              </div>
            )}
            {!loading && (
              // <FilterProvider columns={columns} data={data}>
              //   {(filteredData) => (
              <>
                <Filters updateData={this.updateTableData} />
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
                  loading={loading}
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  // rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                  limits={limits}
                  currentPage={pagination.current}
                  limit={pagination.pageSize}
                  total={pagination.total}
                  pagination={pagination}
                  onChange={this.handleTableChange}
                />
              </>
              //   )}
              // </FilterProvider>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default UserGroupList
