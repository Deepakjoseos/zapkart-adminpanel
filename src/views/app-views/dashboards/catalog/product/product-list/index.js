import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  notification,
  Modal,
} from 'antd'

import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import productService from 'services/product'
import DeliveryZoneService from 'services/deliveryZone'
import vendorService from 'services/vendor'
import brandService from 'services/brand'
import { get } from 'lodash'
import categoryService from 'services/category'
import Label from 'views/app-views/components/data-display/timeline/Label'

const { Option } = Select

const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    )
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    )
  }
  return null
}
const ProductList = () => {
  let history = useHistory()
  const fileInputRef = useRef(null)

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [deliveryZones, setDeliveryZones] = useState([])
  const [vendorId, setVendorId] = useState(null)
  const [deliveryZoneId, setDeliveryZoneId] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [vendors, setVendors] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedBrandId, setSelectedBrandId] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [selectedApproval, setSelectedApproval] = useState('')
  const [selectedacquirementMethod, setSelectedacquirementMethod] = useState('')

  // const getDeliveryZoneName = (id) => {
  //   const deliveryZoneName = await DeliveryZoneService.getDeliveryZoneById(id)
  //   return
  // }

  useEffect(() => {
    const getProducts = async () => {
      const data = await productService.getProducts()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    const getBrands = async () => {
      const data = await brandService.getBrands()
      if (data) {
        setBrands(data)
      }
    }
    const getCategories = async () => {
      const data = await categoryService.getCategories()
      if (data) {
        setCategories(data)
      }
    }
    getProducts()
    getBrands()
    getCategories()
    getVendors()
    console.log('vendors', vendors)
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  )

  const getDeliveryZones = async () => {
    const deliveryZonesData =
      await DeliveryZoneService.getDeliveryZonesByVendorId(vendorId)
    if (deliveryZonesData) {
      setDeliveryZones(deliveryZonesData)
    }
  }

  const getVendors = async () => {
    const vendorsData = await vendorService.getVendors()
    if (vendorsData) {
      setVendors(vendorsData)
    }
  }

  useEffect(() => {
    if (isExcelModalOpen) {
      getVendors()
    }
  }, [isExcelModalOpen])

  useEffect(() => {
    if (vendorId) {
      getDeliveryZones()
    }
  }, [vendorId])

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
      deliveryZoneId,
      vendorId,
    }

    const sendExcelFile = await productService.createProductFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setDeliveryZoneId(null)
      setDeliveryZones([])
      setExcelFile(null)
      setVendorId(null)
      setVendors([])
      notification.success({
        message: 'Product Excel File Uploaded',
      })
    }
  }

  const addProduct = () => {
    history.push(`/app/dashboards/catalog/product/add-product`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/product/edit-product/${row.id}`)
  }

  // const deleteRow = async (row) => {
  //   const resp = await productService.deleteProduct(row.id)

  //   if (resp) {
  //     const objKey = 'id'
  //     let data = list
  //     if (selectedRows.length > 1) {
  //       selectedRows.forEach((elm) => {
  //         data = utils.deleteArrayRow(data, objKey, elm.id)
  //         setList(data)
  //         setSelectedRows([])
  //       })
  //     } else {
  //       data = utils.deleteArrayRow(data, objKey, row.id)
  //       setList(data)
  //     }
  //   }
  // }

  const handleApprovalChange = async (value, selectedRow) => {
    const updatedProductApproval = await productService.approvalProduct(
      selectedRow.id,
      value
    )

    if (updatedProductApproval) {
      notification.success({ message: 'Product Approval Updated' })

      // const objKey = 'id'
      // let data = list
      // data = utils.updateArrayRow(
      //   data,
      //   objKey,
      //   selectedRow.id,
      //   'approval',
      //   value
      // )
      // setList(data)
    }
  }

  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  const tableColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    // {
    //   title: 'MRP Price',
    //   dataIndex: 'mrpPrice',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'mrpPrice'),
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price, row) => {
        return (
          <Flex flexDirection="column">
            <div style={{ color: 'gray', textDecoration: 'line-through' }}>
              {row.mrpPrice}
            </div>{' '}
            <div>{price}</div>
          </Flex>
        )
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      render: (brand) => {
        return (
          <Flex flexDirection="column" justifyContent="center">
            {brand?.name}
          </Flex>
        )
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => {
        return (
          <Flex flexDirection="column" justifyContent="center">
            {category?.name}
          </Flex>
        )
      },
    },
    // {
    //   title: 'DeliveryZone',
    //   dataIndex: 'deliveryZone',
    //   render: (deliveryZone) => {
    //     return <Flex>{deliveryZone.name}</Flex>
    //   },
    // },
    {
      title: 'Variant',
      dataIndex: 'variant',
      render: (variant) => {
        return <Flex>{variant?.name}</Flex>
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'deliveryZoneId'),
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'qty'),
    },
    {
      title: 'Vendor',
      dataIndex: 'username',
    },
    {
      title: 'approval',
      dataIndex: 'approval',
      render: (approval, row) => {
        return (
          <Select
            defaultValue={approval.charAt(0).toUpperCase() + approval.slice(1)}
            // style={{ width: 120 }}
            onChange={(e) => handleApprovalChange(e, row)}
          >
            <Option value="Pending">
              <Tag color="blue">Pending</Tag>
              {/* Pending */}
            </Option>
            <Option value="Approved">
              <Tag color="green">Approved</Tag>
            </Option>
            <Option value="On Hold">
              <Tag color="orange">On Hold</Tag>
            </Option>
            <Option value="Rejected">
              <Tag color="red">Rejected</Tag>
            </Option>
          </Select>
        )
      },
      // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  if (process.env.REACT_APP_SITE_NAME === 'awen') {
    tableColumns.splice(tableColumns?.length - 4, 0, {
      title: 'Product Buy Type',
      dataIndex: 'acquirementMethod',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'acquirementMethod'),
    })
  }

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray =   searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }
  const handleQuery = async () => {
    const query = {}
    if ((selectedBrandId || selectedBrandId) !== 'All')
      query.brandId = selectedBrandId
    query.categoryId = selectedCategoryId
    query.vendorId = selectedVendorId
    query.approval = selectedApproval
    query.acquirementMethod = selectedacquirementMethod
    console.log('query', query)
    const data = await productService.getProducts(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedBrandId(null)
    setSelectedCategoryId(null)
    setSelectedApproval(null)
    setSelectedacquirementMethod(null)
    setSelectedVendorId(null)

    const data = await productService.getProducts({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }
  const filters = () => (
    <Flex flexWrap="wrap" className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Search</label>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Status</label>
        <Select
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div>
      <div className=" mr-md-3 mb-3">
        <label className="mt-2">Brands</label>
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedBrandId(value)}
          // onSelect={handleQuery}
          placeholder="Brand"
          value={selectedBrandId}
        >
          <Option value="">All</Option>
          {brands.map((brand) => (
            <Option key={brand.id} value={brand.id}>
              {brand.name}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mr-md-3 mb-3">
        <label className="mt-2">Categories</label>
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          value={selectedCategoryId}
          placeholder="Category"
        >
          <Option value="">All</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Vendors</label>
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedVendorId(value)}
          // onSelect={handleQuery}
          value={selectedVendorId}
          placeholder="Vendor"
        >
          <Option value="">All</Option>
          {vendors?.map((vendor) => (
            <Option value={vendor.id}>
              {vendor?.firstName} {vendor?.lastName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Approval</label>
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedApproval(value)}
          // onSelect={handleQuery}
          value={selectedApproval}
          placeholder="Approval Method"
        >
          <Option value="">All</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Approved">Approved</Option>
          <Option value="On Hold">On Hold</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      </div>
      {process.env.REACT_APP_SITE_NAME === 'awen' ? (
        <div className="mr-md-3 mb-3">
          <label className="mt-2">Acquirement Method</label>
          <Select
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={(value) => setSelectedacquirementMethod(value)}
            // onSelect={handleQuery}
            value={selectedacquirementMethod}
            placeholder="AcquirementMethod"
          >
            <Option value="">All</Option>
            <Option value="Rent">Rent</Option>
            <Option value="Lend">Lend</Option>
            <Option value="Purchase">Purchase</Option>
            <Option value="Giveaway">Giveaway</Option>
          </Select>
        </div>
      ) : (
        ''
      )}

      <div>
        <Button type="primary" className="mr-1 mt-4" onClick={handleQuery}>
          Filter
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          className="mr-1 mt-4"
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </div>
    </Flex>
  )

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
        </Flex>
        <div className="mr-2 d-flex justify-content-between">
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
          >
            Excel Upload
          </Button>
          <div>
            <Button
              onClick={addProduct}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Product
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>

      <Modal
        title="Product Excel Upload"
        visible={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelFile(null)
          setDeliveryZoneId(null)
          setVendorId(null)
          setVendors([])
        }}
        footer={false}
      >
        <Flex flexDirection="column" alignItems="center">
          <Select
            placeholder="Select Delivery Zone"
            style={{ width: '80%' }}
            className="mb-2"
            onChange={(e) => setVendorId(e)}
            value={vendorId}
          >
            {vendors?.map((vendor) => (
              <Option value={vendor.id}>
                {vendor?.firstName} {vendor?.lastName}
              </Option>
            ))}
          </Select>

          {vendorId && (
            <Select
              placeholder="Select Delivery Zone"
              style={{ width: '80%' }}
              className="mb-2"
              onChange={(e) => setDeliveryZoneId(e)}
              value={deliveryZoneId}
            >
              {deliveryZones?.map((zone) => (
                <Option value={zone.id}>{zone.name}</Option>
              ))}
            </Select>
          )}

          {deliveryZoneId && (
            <div className="mb-4 mt-4">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Excel File
              </Button>
              <input
                accept=".xls,.xlsx"
                multiple={false}
                ref={fileInputRef}
                type="file"
                onChange={handleExcelUpload}
                hidden
              />
              <p> {excelFile && excelFile?.name}</p>
            </div>
          )}

          <Button type="primary" disabled={!excelFile} onClick={onExcelSubmit}>
            Submit
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default ProductList
