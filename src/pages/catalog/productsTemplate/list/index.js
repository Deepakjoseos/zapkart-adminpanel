/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
  // Input,
  Button,
  Popconfirm,
  Select,
  // Input,
  // Tooltip
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import {
  getProductsTemplate,
  editProductTemplate,
  deleteProductTemplate,
} from 'services/productTemplate'
import { LINKS } from '_constants'
import Filters from './Filters'
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

class ProductTemplate extends React.Component {
  state = {
    tableData: [],
    loading: true,
    selectedData: {},
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

  // FilterUpdate

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
        total: data.length,
      },
    }))
  }

  handleMenuClick = async (e) => {
    const { clickedId, tableData } = this.state
    // console.log('clicked on', e.key, clickedId)
    // const isUpdated = await editBrandStatus(clickedId, e.key)
    // eslint-disable-next-line react/destructuring-assignment
    const { selectedData } = this.state
    const sendingData = {
      brandId: selectedData.brand.id,
      categoryId: selectedData.category.id,
      name: selectedData.name,
      description: selectedData.description,
      images: selectedData.images,
      productType: selectedData.productType,
      allowedPaymentTypes: selectedData.allowedPaymentTypes,
      returnable: selectedData.returnable,
      returnPeriod: selectedData.returnPeriod,
      allowedQuantityPerOrder: selectedData.allowedQuantityPerOrder,
      presriptionRequired: selectedData.presriptionRequired,
      shippingDetail: selectedData.shippingDetail,
      priority: selectedData.priority,
      status: e.key,
    }

    const isUpdated = await editProductTemplate(clickedId, sendingData)
    if (isUpdated) {
      const recordIndex = tableData.findIndex((item) => item.id === clickedId)
      tableData[recordIndex].status = e.key
      return this.setState((prev) => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = (id, sData) => {
    this.setState({ clickedId: id })
    this.setState({ selectedData: sData })
  }

  handleDelete = async (id) => {
    const isDeleted = await deleteProductTemplate(id)
    if (isDeleted) {
      this.setState((m) => {
        const newData = m.tableData.filter((i) => i.id !== id)
        return {
          ...m,
          tableData: newData,
        }
      })
    }
  }

  fetchDetails = async (params = {}) => {
    this.setState({
      loading: true,
    })
    const res = await getProductsTemplate('')
    const availableData = res.data.filter((cur) => cur.status !== 'Deleted')

    if (res && res.data) {
      this.setState({
        loading: false,
        tableData: availableData,
        pagination: {
          ...params.pagination,
          total: res.count,
        },
      })
    } else {
      this.setState({ loading: false })
    }
  }

  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     // statusRowId,
  //     clearFilters,
  //   }) => (
  //       // eslint-disable-next-line react/jsx-indent
  //       <div style={{ padding: 8 }}>
  //         <Input
  //           ref={node => {
  //             this.searchInput = node
  //           }}
  //           placeholder={`Search ${dataIndex}`}
  //           value={selectedKeys[0]}
  //           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //           onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
  //           style={{ width: 188, marginBottom: 8, display: 'block' }}
  //         />
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm)}
  //           icon="search"
  //           size="small"
  //           style={{ width: 90, marginRight: 8 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </div>
  //     ),
  //   filterIcon: filtered => (
  //     <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select())
  //     }
  //   },
  //   render: text => {
  //     // const { searchText } = this.statereturn
  //     // console.log(searchText)
  //     return <span>{text}</span>
  //   },
  // })

  // handleSearch = (selectedKeys, confirm) => {
  //   confirm()
  //   // this.setState({ searchText: selectedKeys[0] })
  // }

  // handleReset = clearFilters => {
  //   clearFilters()
  //   // this.setState({ searchText: '' })
  // }

  // linkSearchInput = node => {
  //   this.searchInput = node
  // }

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
    // /catalog/brands/brand/:id - edit-brand
    // /catalog/brands/add-brand - add-brand
    const { tableData, pagination, selectedRowKeys, loading } = this.state
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
        dataIndex: 'images',
        key: 'images',
        render: (_, record) => (
          <span className="thumbnail-area">
            <img src={record.images[0]} alt={record.name} />
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
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        render: (_, record) => <p>{record.brand.name}</p>,
      },

      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_, record) => <p>{record.category.name}</p>,
      },

      {
        title: 'ProductType',
        dataIndex: 'productType',
        key: 'productType',
      },

      {
        title: 'PresriptionRequired',
        dataIndex: 'presriptionRequired',
        key: 'presriptionRequired',
        render: (_, record) => <p>{record.presriptionRequired ? 'Yes' : 'No'}</p>,
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
              id={record._id}
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
        //     value: 'Hold',
        //   },
        // ],
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            <Link to={`${LINKS.editProductTemplate}/${record.id}`}>
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
        <Helmet title="Products TemplateList" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>ProductsTemplate List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="ProductTemplate"
                link={`${LINKS.addProductTemplate}`}
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
              loading={loading}
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              rowKey={(record) => record._id}
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
        </div>
      </div>
    )
  }
}

export default ProductTemplate
