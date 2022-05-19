/* eslint-disable */
import React from 'react'
import {
  Table,
  // Icon, Input,
  Button,
  notification,
  Dropdown,
  Icon,
  Popconfirm,
  Select,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getCategories, editStatus, deleteCategory, editCategory } from 'services/categories'
import { LINKS, STRINGS } from '_constants'
// import SearchAndFilters from 'components/SearchAndFilters'
// import startsWith from 'lodash/startsWith'
// import isEmpty from 'lodash/isEmpty'
// import Table from 'components/Table'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'
import EditableCell from 'components/EditableCellNumber'
// import styles from './style.module.scss'

const limits = [4, 10, 20, 30, 50]
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

class CategoryList extends React.PureComponent {
  state = {
    // tableData: [],
    data: [],
    selectedData: {},
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
    const data = await getCategories()

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
        message: 'No categories',
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
    // console.log('clicked on', e.key, clickedId)
    const { selectedData } = this.state
    const sendingData = {
      name: selectedData.name,
      image: selectedData.image,

      status: e.key,
    }

    if (selectedData?.parentId) {
      sendingData.parentId = selectedData.parentId
    }

    const isUpdated = await editCategory(clickedId, sendingData)
    if (isUpdated) {
      notification.success({ message: STRINGS.editSuccess })
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

  handleDelete = async (id) => {
    const a = await deleteCategory(id)
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

  onCellChange = (id, key) => {
    return async (value) => {
      console.log(id, key, value)
      const edited = await editCategory(id, { [key]: value })
      if (edited) {
        notification.success({ message: STRINGS.editSuccess })
        return true
      }
      return false
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text) => <span className="capitalize">{text}</span>,
        search: true,
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => (
          <span className="thumbnail-area">
            <img src={record.image} alt={record.name} />
          </span>
        ),
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
              // visible={this.state.clickedId === record._id}
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
        filters: [
          {
            label: 'Active',
            value: 'Active',
          },
          {
            label: 'Hold',
            value: 'Hold',
          },
        ],
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
      },
      // {
      //   title: 'ParentId',
      //   dataIndex: 'parentId',
      //   key: 'parentId',
      //   // render: (_, record) => (
      //   //   <span className="capitalize">
      //   //     {record.parent && record.parent.name ? record.parent.name : '-'}
      //   //   </span>
      //   // ),
      //   // sorter: (a, b) => a.parent - b.parent,
      // },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            <Link to={`/catalog/category/edit/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
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
              <strong>Category List</strong>
              <AddNew add link={LINKS.addCategory} attribute="category" />
            </div>
          </div>

          <div className="card-body">
            {/* <SearchProvider columns={columns}>
                 {columnsWithSearch => ( */}

            <FilterProvider data={data} columns={columns}>
              {(filteredData) => (
                <>
                  {selectedRowKeys.length > 0 && (
                    <Popconfirm
                      placement="topLeft"
                      title={`Delete ${selectedRowKeys.length} item(s)?`}
                      onConfirm={this.deleteRecords}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" className="mb-2 d-flex ml-auto align-items-center">
                        Delete
                      </Button>
                    </Popconfirm>
                  )}
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

export default CategoryList
