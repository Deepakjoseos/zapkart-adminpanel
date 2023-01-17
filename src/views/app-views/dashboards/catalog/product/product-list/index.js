import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Form,
  Row,
  Col,
  Modal,
  notification,
} from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileImageOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
  DownloadOutlined,
  EditOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import utils from 'utils'
import brandService from 'services/brand'
import _, { get } from 'lodash'
import Label from 'views/app-views/components/data-display/timeline/Label'
import productService from 'services/product'
import categoryService from 'services/category'
import DeliveryZoneService from 'services/deliveryZone'

import vendorService from 'services/vendor'
import constantsService from 'services/constants'
import Utils from 'utils'
import productTemplateService from 'services/productTemplate'

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
  const fileInputRef = useRef(null)

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [productTemplates, setTemplates] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [statuses, setStatuses] = useState([])

  let history = useHistory()
  const [form] = Form.useForm()

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [deliveryZones, setDeliveryZones] = useState([])
  const [vendorId, setVendorId] = useState(null)
  const [deliveryZoneId, setDeliveryZoneId] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [vendors, setVendors] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [orderbyname, setOrderbyname] = useState([])
  const [sample, setSample] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
  })
  const [editingRowIds, setEditingRowIds] = useState([])
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      data.GENERAL['STATUS'] &&
        setStatuses(Object.values(data.GENERAL['STATUS']))
      data.GENERAL['NAME_SORT'] &&
        setOrderbyname(Object.values(data.GENERAL['NAME_SORT']))
    }
  }
  const getConstants = async () => {
    const data = await constantsService.getSample()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      data.PRODUCT_EXCEL && setSample(data.PRODUCT_EXCEL)
    }
  }
  // Changed here for pagination
  const getProducts = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await productService.getProducts(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )

    if (data) {
      setList(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }
  // const [selectedBrandId, setSelectedBrandId] = useState(null)
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  // const [selectedVendorId, setSelectedVendorId] = useState(null)
  // const [selectedApproval, setSelectedApproval] = useState('')
  // const [selectedacquirementMethod, setSelectedacquirementMethod] = useState('')

  // const getDeliveryZoneName = (id) => {
  //   const deliveryZoneName = await DeliveryZoneService.getDeliveryZoneById(id)
  //   return
  // }

  useEffect(() => {
    // const getProducts = async () => {
    //   const data = await productService.getProducts()
    //   if (data) {
    //     setList(data)
    //     setSearchBackupList(data)
    //     console.log(data, 'show-data')
    //   }
    // }
    getProducts({
      pagination,
    })
    const getBrands = async () => {
      const data = await brandService.getBrands()
      if (data) {
        setBrands(data.data)
      }
    }

    const getProductTemplates = async () => {
      const data = await productTemplateService.getProductTemplates()
      const activeProductTemplates = data.data.filter(
        (cur) => cur.status === 'Active'
      )
      if (activeProductTemplates) {
        setTemplates(activeProductTemplates)
      }
    }
    const getCategories = async () => {
      const data = await categoryService.getCategories()
      if (data) {
        setCategories(data.data)
      }
    }
    // getProducts()
    getBrands()
    getCategories()
    getVendors()
    getConstants()
    fetchConstants()
    getProductTemplates()
    console.log('vendors', vendors)
  }, [])
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    getProducts(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => Newtab(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Open In New Tab</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item>
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
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        }
      })
      setVendors(vendorsList)
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
  const Newtab = (row) => {
    window.open(`/app/dashboards/catalog/product/edit-product/${row.id}`)
  }
  const deleteRow = async (row) => {
    const resp = await productService.deleteProduct(row.id, row.userId)
    console.log(row, 'hiiiii')
    if (resp) {
      const objKey = 'id'
      let data = list
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id)
          setList(data)
          setSelectedRows([])
        })
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id)
        setList(data)
      }
    }
  }

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

  const onUpdateRow = async (e, id, key, row) => {
    e.preventDefault()
    const inpVal = e.target.elements[0].value

    const sendingValues = {
      ...row,
      vendorId: row.userId,
      deliveryZoneId: row.deliveryZone.id,
      [key]: inpVal,
    }

    if (row?.variant?.id) {
      sendingValues.variantId = row?.variant?.id
    }

    const edited = await productService.editProduct(id, sendingValues)

    if (edited) {
      console.log(edited, 'yesssss')
      notification.success({
        message: `Edited ${key} Successfully Done`,
      })

      const updatedList = Utils.updateArrayRow(list, id, key, inpVal)

      // const removedEditingRows = [...editingRowIds].filter(
      //   (cur) => row.field !== key
      // )
      // setEditingRowIds(removedEditingRows)

      console.log(updatedList, 'got-it')
    }
  }

  // const onClearEdit = (id, field) => {
  //   const removedEditingRows = [...editingRowIds].filter(
  //     (cur) => cur.id !== id && cur.field !== field
  //   )
  //   setEditingRowIds(removedEditingRows)
  // }

  console.log(editingRowIds, 'pdkjedhjk')

  const tableColumns = [
    {
      title: 'Product',

      render: (_, row) => {
        return (
          <Flex flexDirection="column" justifyContent="center">
            {row.name}
            {row?.variant && `(${row.variant.name})`}{' '}
          </Flex>
        )
      },
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
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
        const editingRow = editingRowIds?.find((cur) => cur.id === row.id)

        return editingRow &&
          (editingRow.field === 'price' || editingRow.field === 'mrpPrice') ? (
          <>
            <form onSubmit={(e) => onUpdateRow(e, row.id, 'price', row)}>
              <Input.Group compact>
                <Input
                  style={{
                    width: '65%',
                  }}
                  defaultValue={price}
                />

                <Button
                  htmlType="submit"
                  icon={<CheckOutlined />}
                  // onClick={(e) => console.log(e, 'bjklbjk')}
                />
              </Input.Group>
            </form>
            <form onSubmit={(e) => onUpdateRow(e, row.id, 'mrpPrice', row)}>
              <Input.Group compact>
                <Input
                  style={{
                    width: '65%',
                  }}
                  defaultValue={row.mrpPrice}
                />

                <Button
                  htmlType="submit"
                  icon={<CheckOutlined />}
                  // onClick={(e) => console.log(e, 'bjklbjk')}
                />
              </Input.Group>
            </form>
            {/* <Button onClick={() => onClearEdit(row.id, 'price')}>Clear</Button> */}
          </>
        ) : (
          <>
            <Flex flexDirection="column">
              <div style={{ color: 'gray', textDecoration: 'line-through' }}>
                {row.mrpPrice}
              </div>{' '}
              <div>
                <span class="WebRupee">&#x20B9;</span>
                {price}
              </div>
            </Flex>
            <Button
              type="ghost"
              onClick={() => {
                setEditingRowIds([{ id: row.id, field: 'price' }])
              }}
              icon={<EditOutlined />}
              className="ml-2"
            />
          </>
        )

        // return (
        //   <>
        {
          /* <div className="d-flex align-items-center">
            <Flex flexDirection="column">
              <div style={{ color: 'gray', textDecoration: 'line-through' }}>
                {row.mrpPrice}
              </div>{' '}
              <div>
                <span class="WebRupee">&#x20B9;</span>
                {price}
              </div>
            </Flex>
            <Button type="ghost" icon={<EditOutlined />} className="ml-2" />
          </div> */
        }

        {
          /* {editingRowIds?.includes(row.id) ? (
              <form onSubmit={(e) => onUpdateRow(e, row.id, 'qty', row)}>
                <Input.Group compact>
                  <Input
                    style={{
                      width: '30%',
                    }}
                    defaultValue={qty}
                  />

                  <Button
                    htmlType="submit"
                    icon={<CheckOutlined />}
                    // onClick={(e) => console.log(e, 'bjklbjk')}
                  />
                </Input.Group>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                {qty}
                <Button
                  type="ghost"
                  icon={<EditOutlined />}
                  className="ml-2"
                  onClick={() =>
                    setEditingRowIds((prev) => [
                      ...prev,
                      { id: row.id, field: 'qty' },
                    ])
                  }
                />
              </div>
            )} */
        }
        // </>
        // )
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

    {
      title: 'QTY',
      dataIndex: 'qty',
      render: (qty, row) => {
        const editingRow = editingRowIds?.find((cur) => cur.id === row.id)
        return (
          <>
            {editingRow?.id && editingRow.field === 'qty' ? (
              <form onSubmit={(e) => onUpdateRow(e, row.id, 'qty', row)}>
                <Input.Group compact>
                  <Input
                    style={{
                      width: '65%',
                    }}
                    defaultValue={qty}
                  />

                  <Button
                    htmlType="submit"
                    icon={<CheckOutlined />}
                    // onClick={(e) => console.log(e, 'bjklbjk')}
                  />
                </Input.Group>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                {qty}
                <Button
                  type="ghost"
                  icon={<EditOutlined />}
                  className="ml-2"
                  onClick={() =>
                    setEditingRowIds([{ id: row.id, field: 'qty' }])
                  }
                />
              </div>
            )}
          </>
        )
      },
      sorter: (a, b) => utils.antdTableSorter(a, b, 'qty'),
    },
    {
      title: 'Vendor',
      dataIndex: 'username',
      render: (_, row) => {
        return (
          <Flex flexDirection="column" justifyContent="center">
            {row.username}
            {`(${row.commission + '%'})`}
          </Flex>
        )
      },
    },
    {
      title: 'Approval',
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

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   const searchArray = searchBackupList
  //   const data = utils.wildCardSearch(searchArray, value)
  //   setList(data)
  //   setSelectedRowKeys([])
  // }

  // const handleShowStatus = (value) => {
  //   if (value !== 'All') {
  //     const key = 'status'
  //     const data = utils.filterArray(searchBackupList, key, value)
  //     setList(data)
  //   } else {
  //     setList(searchBackupList)
  //   }
  // }
  // const handleQuery = async () => {
  //   const query = {}
  //   if ((selectedBrandId || selectedBrandId) !== 'All')
  //     query.brandId = selectedBrandId
  //   query.categoryId = selectedCategoryId
  //   query.vendorId = selectedVendorId
  //   query.approval = selectedApproval
  //   query.acquirementMethod = selectedacquirementMethod
  //   console.log('query', query)
  //   const data = await productService.getProducts(query)
  //   if (data) {
  //     setList(data)
  //     setSearchBackupList(data)
  //   }
  // }

  // const handleClearFilter = async () => {
  //   setSelectedBrandId(null)
  //   setSelectedCategoryId(null)
  //   setSelectedApproval(null)
  //   setSelectedacquirementMethod(null)
  //   setSelectedVendorId(null)

  //   const data = await productService.getProducts({})
  //   if (data) {
  //     setList(data)
  //     setSearchBackupList(data)
  //   }
  // }
  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })

  // Filter Submit
  const handleFilterSubmit = async () => {
    setPagination(resetPagination())

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getProducts({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getProducts({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="status" label="Status">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            >
              <Option value="">All</Option>
              {statuses.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="brandId" label="Brands">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="Brands"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="categoryId" label="Categories">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="Categories"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="vendorId" label="Vendors">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedVendorId(value)}
              // onSelect={handleQuery}
              // value={selectedVendorId}
              placeholder="Vendor"
            >
              <Option value="">All</Option>
              {vendors?.map((vendor) => (
                <Option value={vendor.id}>{vendor.fullName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="approval" label="Approval Method">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedApproval(value)}
              // onSelect={handleQuery}
              // value={selectedApproval}
              placeholder="Approval Method"
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="On Hold">On Hold</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </Col>
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="acquirementMethod" label="Acquirement Method">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedApproval(value)}
              // onSelect={handleQuery}
              // value={selectedApproval}
              placeholder="Acquirement Method"
            >
              <Option value="">All</Option>
              <Option value="Rent">Rent</Option>
              <Option value="Lend">Lend</Option>
              <Option value="Purchase">Purchase</Option>
              <Option value="Giveaway">Giveaway</Option>
            </Select>
          </Form.Item>
        </Col> */}
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="orderByName" label="Order By Name">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Order By Name"
            >
              <Option value="">All</Option>
              {orderbyname.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="productTemplateId" label="ProductTemplate">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="productTemplate"
            >
              {productTemplates.map((temp) => (
                <Option value={temp.id}>{temp.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  )

  // const filters = () => (
  //   <Flex flexWrap="wrap" className="mb-1" mobileFlex={false}>
  //     <div className="mr-md-3 mb-3">
  //       <label className="mt-2">Search</label>
  //       <Input
  //         placeholder="Search"
  //         prefix={<SearchOutlined />}
  //         onChange={(e) => onSearch(e)}
  //       />
  //     </div>
  //     <div className="mr-md-3 mb-3">
  //       <label className="mt-2">Status</label>
  //       <Select
  //         defaultValue="All"
  //         className="w-100"
  //         style={{ minWidth: 180 }}
  //         onChange={handleShowStatus}
  //         placeholder="Status"
  //       >
  //         <Option value="All">All</Option>
  //         <Option value="Active">Active</Option>
  //         <Option value="Hold">Hold</Option>
  //       </Select>
  //     </div>
  //     <div className=" mr-md-3 mb-3">
  //       <label className="mt-2">Brands</label>
  //       <Select
  //         showSearch
  //         optionFilterProp="children"
  //         filterOption={(input, option) =>
  //           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //         }
  //         className="w-100"
  //         style={{ minWidth: 180 }}
  //         onChange={(value) => setSelectedBrandId(value)}
  //         // onSelect={handleQuery}
  //         placeholder="Brand"
  //         value={selectedBrandId}
  //       >
  //         <Option value="">All</Option>
  //         {brands.map((brand) => (
  //           <Option key={brand.id} value={brand.id}>
  //             {brand.name}
  //           </Option>
  //         ))}
  //       </Select>
  //     </div>

  //     <div className="mr-md-3 mb-3">
  //       <label className="mt-2">Categories</label>
  //       <Select
  //         showSearch
  //         optionFilterProp="children"
  //         filterOption={(input, option) =>
  //           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //         }
  //         className="w-100"
  //         style={{ minWidth: 180 }}
  //         onChange={(value) => setSelectedCategoryId(value)}
  //         // onSelect={handleQuery}
  //         value={selectedCategoryId}
  //         placeholder="Category"
  //       >
  //         <Option value="">All</Option>
  //         {categories.map((category) => (
  //           <Option key={category.id} value={category.id}>
  //             {category.name}
  //           </Option>
  //         ))}
  //       </Select>
  //     </div>
  //     <div className="mr-md-3 mb-3">
  //       <label className="mt-2">Vendors</label>
  //       <Select
  //         showSearch
  //         optionFilterProp="children"
  //         filterOption={(input, option) =>
  //           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //         }
  //         className="w-100"
  //         style={{ minWidth: 180 }}
  //         onChange={(value) => setSelectedVendorId(value)}
  //         // onSelect={handleQuery}
  //         value={selectedVendorId}
  //         placeholder="Vendor"
  //       >
  //         <Option value="">All</Option>
  //         {vendors?.map((vendor) => (
  //           <Option value={vendor.id}>{vendor.fullName}</Option>
  //         ))}
  //       </Select>
  //     </div>
  //     <div className="mr-md-3 mb-3">
  //       <label className="mt-2">Approval</label>
  //       <Select
  //         showSearch
  //         optionFilterProp="children"
  //         filterOption={(input, option) =>
  //           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //         }
  //         className="w-100"
  //         style={{ minWidth: 180 }}
  //         onChange={(value) => setSelectedApproval(value)}
  //         // onSelect={handleQuery}
  //         value={selectedApproval}
  //         placeholder="Approval Method"
  //       >
  //         <Option value="">All</Option>
  //         <Option value="Pending">Pending</Option>
  //         <Option value="Approved">Approved</Option>
  //         <Option value="On Hold">On Hold</Option>
  //         <Option value="Rejected">Rejected</Option>
  //       </Select>
  //     </div>
  //     {process.env.REACT_APP_SITE_NAME === 'awen' ? (
  //       <div className="mr-md-3 mb-3">
  //         <label className="mt-2">Acquirement Method</label>
  //         <Select
  //           showSearch
  //           optionFilterProp="children"
  //           filterOption={(input, option) =>
  //             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //           }
  //           className="w-100"
  //           style={{ minWidth: 180 }}
  //           onChange={(value) => setSelectedacquirementMethod(value)}
  //           // onSelect={handleQuery}
  //           value={selectedacquirementMethod}
  //           placeholder="AcquirementMethod"
  //         >
  //           <Option value="">All</Option>
  //           <Option value="Rent">Rent</Option>
  //           <Option value="Lend">Lend</Option>
  //           <Option value="Purchase">Purchase</Option>
  //           <Option value="Giveaway">Giveaway</Option>
  //         </Select>
  //       </div>
  //     ) : (
  //       ''
  //     )}

  //     <div>
  //       <Button type="primary" className="mr-1 mt-4" onClick={handleQuery}>
  //         Filter
  //       </Button>
  //     </div>
  //     <div>
  //       <Button
  //         type="primary"
  //         className="mr-1 mt-4"
  //         onClick={handleClearFilter}
  //       >
  //         Clear
  //       </Button>
  //     </div>
  //   </Flex>
  // )

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filtersComponent()}
        </Flex>
        <div
          className="mr-2 d-flex justify-content-between"
          style={{ paddingLeft: '166px', marginBottom: '-39px' }}
        >
          <Button icon={<FileImageOutlined />}>
            {' '}
            <a href={sample}>Download Sample File</a>
          </Button>
        </div>
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
          <Table
            columns={tableColumns}
            dataSource={list}
            scroll={{
              x: true,
            }}
            rowKey="id"
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          />
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
            placeholder="Select Vendor"
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
