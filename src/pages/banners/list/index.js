/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
  // Input,
  Button,
  Popconfirm,
  notification,
  Skeleton,
  // Tooltip,
  Select,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import { getBanners, editBannersStatus, deleteBanner } from 'services/banners'
import { LINKS, STRINGS, BANNER_API_URL } from '_constants'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'

const limits = [4, 10, 20, 50]
const INFORMATIONS_URL = BANNER_API_URL.getBanners
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

class BannersList extends React.Component {
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

  fetchDetails = async (params = {}) => {
    this.setState({
      loading: true,
    })
    const res = await getBanners(`${INFORMATIONS_URL}`)
    if (res && res.data)
      this.setState({
        loading: false,
        tableData: res.data,
        pagination: {
          ...params.pagination,
          total: res.data.length,
        },
      })
    else {
      this.setState({ loading: false })
    }
  }

  handleMenuClick = async (e) => {
    const { clickedId, tableData } = this.state
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editBannersStatus(clickedId, e.key)
    if (isUpdated) {
      const recordIndex = tableData.findIndex((item) => item._id === clickedId)
      tableData[recordIndex].status = e.key
      notification.success({ message: STRINGS.success, description: STRINGS.editSuccess })
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
    const isDeleted = await deleteBanner(id)
    if (isDeleted) {
      notification.success({ message: STRINGS.success, description: STRINGS.deleteSuccess })
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
  }

  handleLimitChange = (selLimit) => {
    console.log('SElelLimit', selLimit)
    this.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: Number(selLimit),
      },
    }))
  }

  render() {
    // /catalog/informations/information/:id - edit-information
    // /catalog/informations/add-information - add-information
    const { tableData, selectedRowKeys, pagination, loading } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        search: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Image Text',
        dataIndex: 'shortDescription',
        key: 'shortDescription',
        render: (_, record) => <p>{`${record.shortDescription.slice(0, 100)}...`}</p>,
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
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record._id}
              onClick={() => this.handleStatusClick(record._id)}
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
        render: (record) => (
          <span>
            <Link to={`${LINKS.banners}/edit/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            {/* {tableData.length >= 1 ? ( */}
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
            {/* // ) : null} */}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Banner List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Banner List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="banner"
                link={`${LINKS.addBanners}`}
                // handleDelete={this.handleDelete}
              />
            </div>
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && (
            <div className="card-body">
              <FilterProvider columns={columns} data={tableData}>
                {(filteredData) => (
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
                      // scroll={{ x: true }}
                      rowKey={(record) => record._id}
                      columns={columns.map((i) => omit(i, ['filters']))}
                      dataSource={filteredData}
                      loading={loading}
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
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BannersList
