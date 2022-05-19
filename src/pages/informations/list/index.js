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
  // Tooltip,
  notification,
  Select,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import omit from 'lodash/omit'
import { getInformations, editInformation, deleteInformation } from 'services/informations'
import { LINKS, STRINGS } from '_constants'
import Filters from './Filters'
// import SearchProvider from 'components/RenderProps/SearchProvider'
// import FilterProvider from 'components/RenderProps/FiltersProvider'

const limits = [4, 10, 20, 50]
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

class InformationsList extends React.Component {
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
    selectedData: {},
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    const { pagination } = this.state
    this.fetchDetails({ pagination })
  }

  // When Filters Change
  updateTableData = (data) => {
    // this.setState({ data })
    this.setState((prev) => ({
      ...prev,
      tableData: data,
      pagination: {
        current: 1,
        pageSize: prev.pagination.pageSize,
        total: data?.length,
      },
    }))
  }

  fetchDetails = async (params = {}) => {
    this.setState({
      loading: true,
    })
    const res = await getInformations()
    if (res && res.data)
      this.setState({
        loading: false,
        tableData: res.data.filter((cur) => cur.status !== 'Deleted'),
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

    const { selectedData } = this.state
    const sendingData = {
      name: selectedData.name,
      image: selectedData.image,
      description: selectedData.description,
      priority: selectedData.priority,
      status: e.key,
    }

    const isUpdated = await editInformation(clickedId, sendingData)
    if (isUpdated) {
      const recordIndex = tableData.findIndex((item) => item.id === clickedId)
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

  handleStatusClick = (id, sData) => {
    this.setState({ clickedId: id, selectedData: sData })
  }

  handleDelete = async (id) => {
    const isDeleted = await deleteInformation(id)
    if (isDeleted) {
      notification.success({ message: STRINGS.success, description: STRINGS.deleteSuccess })
      this.setState((m) => {
        const newData = m.tableData.filter((i) => i.id !== id)
        return {
          ...m,
          tableData: newData,
        }
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

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
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
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (_, record) => (
          <p>
            {record.description.length >= 50
              ? `${record.description.slice(0, 50)}...`
              : record.description}
          </p>
        ),
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',

        // eslint-disable-next-line no-unused-vars
        // search: true,
        // sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          let badge = 'badge-success'
          // if (record.status === 'Hold') badge = 'badge-warning'
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
        //     value: 'Active',
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
            <Link to={`${LINKS.informations}/edit/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            {tableData.length >= 1 ? (
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
        <Helmet title="Informations List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Informations List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="information"
                link={`${LINKS.addInformations}`}
                handleDelete={this.handleDelete}
              />
            </div>
            {/* <div className='pull-right'>
              <Tooltip placement='topLeft' title='Add new product'>
                <Button type='link'>
                  <Icon
                    type='plus-circle'
                    theme='filled'
                    style={{ fontSize: '30px' }}
                  />
                </Button>
              </Tooltip>
              {selectedRowKeys.length > 0 && (
                <Tooltip
                  placement='bottomRight'
                  title={
                    selectedRowKeys.length === 1
                      ? 'Delete product'
                      : 'Delete products'
                  }
                >
                  <Popconfirm
                    title={`Delete ${selectedRowKeys.length} ${
                      selectedRowKeys.length === 1 ? 'product' : 'products'
                      }`}
                    onConfirm={() => this.handleDelete()}
                  >
                    <Button type='link'>
                      <Icon
                        theme='filled'
                        type='delete'
                        style={{ fontSize: '30px' }}
                      />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              )}
            </div> */}
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && (
            <div className="card-body">
              <Filters updateData={this.updateTableData} />
              {/* <FilterProvider columns={columns} data={tableData}>
                {(filteredData) => (
                  <> */}
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
                // rowSelection={rowSelection}
                columns={columns.map((i) => omit(i, ['filters']))}
                dataSource={tableData}
                rowKey={(record) => record.id}
                loading={loading}
                limits={limits}
                currentPage={pagination.current}
                limit={pagination.pageSize}
                total={pagination.total}
                pagination={pagination}
                onChange={this.handleTableChange}
              />
              {/* </>
                )}
              </FilterProvider> */}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default InformationsList
