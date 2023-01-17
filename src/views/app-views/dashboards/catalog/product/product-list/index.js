import React, { useEffect, useRef, useState } from 'react'
import _, { get } from 'lodash'
import qs from 'qs'
import {
  Card,
  Table,
  Form,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  notification,
  Row,
  Col,
} from 'antd'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import productService from 'services/product'
import DeliveryZoneService from 'services/deliveryZone'
import { DownloadOutlined } from '@ant-design/icons'
import brandService from 'services/brand'
import categoryService from 'services/category'
import manufacturerService from 'services/manufacturer'
import productTemplate from 'services/productTemplate'
import Utils from 'utils'
import medicineService from 'services/medicine';
import constantsService from 'services/constants'


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
  const fileInputRef = useRef()
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [deliveryZones, setDeliveryZones] = useState([])
  const [deliveryZoneId, setDeliveryZoneId] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [productsTemplate, setProductsTemplate] = useState([])
  const [selectedManufacture, setSelectedManufacture] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState([])
  const [selectedStatus, setSelectedStatus] = useState([])
  const [selectedMedicine, setSelectedMedicine] = useState([])
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [selectedacquirementMethod, setSelectedacquirementMethod] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })
  // const getDeliveryZoneName = (id) => {
  //   const deliveryZoneName = await DeliveryZoneService.getDeliveryZoneById(id)
  //   return
  // }

  const getDeliveryZones = async () => {
    const deliveryZonesData = await DeliveryZoneService.getDeliveryZones()
    if (deliveryZonesData) {
      setDeliveryZones(deliveryZonesData)
    }
  }

  const getProductTemplates = async () => {
    const data = await productTemplate.getProductTemplates()
    if (data){
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.name} `,
        }
      })
      setProductsTemplate(users)
      // console.log(users,'producttemplate')
    }
  }
  const getMedicines = async () => {
    const data = await medicineService.getMedicinetypes()
    if (data){
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.name} `,
        }
      })
      setSelectedMedicine(users)
    }
    // console.log(data,'medicines')
  }

  const getManufacturer = async () => {
    const data = await manufacturerService.getManufacturer()
    if(data){
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.name} `,
        }
      })
    setSelectedManufacture(users)
    // console.log(users,'manufacture')
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
    // const getVendors = async () =>{
    //   const data= await vendor
    // }
    
    

  const getProducts = async (paginationParams = {},filterParams) => {
    setLoading(true)
    const data = await productService.getProducts(
            qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
      )
    if (data.data) {
      setList(data.data)
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      // setSearchBackupList(data)
      console.log(data, 'show-data')
    }
    setLoading(false)
  }
  useEffect(()=>{
    getProducts({
      pagination,}
    )
    getManufacturer()
    getBrands()
    getMedicines()
    getCategories()
    getProductTemplates()
  }, [])

  // pagination generator
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

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })
  useEffect(() => {
    if (isExcelModalOpen) {
      getDeliveryZones()
    }
  }, [isExcelModalOpen])

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
      deliveryZoneId,
    }

    const sendExcelFile = await productService.createProductFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setDeliveryZoneId(null)
      setDeliveryZones([])
      setExcelFile(null)
      notification.success({
        message: 'Product Excel File Uploaded',
      })
    }
  }
  const handleQuery = async () => {
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

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    },
  }

  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getProducts({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
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

  const addProduct = () => {
    history.push(`/app/dashboards/catalog/product/add-product`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/product/edit-product/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await productService.deleteProduct(row.id)

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

  const tableColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
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
        return <Flex flexDirection="column">{brand?.name}</Flex>
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => {
        return <Flex flexDirection="column">{category?.name}</Flex>
      },
    },
   
    {
      title: 'Variant',
      dataIndex: 'variant',
      render: (variant) => {
        return <Flex>{variant?.name}</Flex>
      },
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'deliveryZoneId'),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'qty'),
    },
    {
      title: 'Approval',
      dataIndex: 'approval',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
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

  if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
    tableColumns.splice(tableColumns?.length - 4, 0, {
      title: 'Pres Required',
      dataIndex: 'prescriptionRequired',
      render: (prescriptionRequired) => (
        <Flex alignItems="center">{prescriptionRequired ? 'Yes' : 'No'}</Flex>
      ),
    })
  } else if (process.env.REACT_APP_SITE_NAME === 'awen') {
    tableColumns.splice(tableColumns?.length - 4, 0, {
      title: 'Product Buy Type',
      dataIndex: 'acquirementMethod',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'acquirementMethod'),
    })
  }

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   const searchArray = e.currentTarget.value ? list : searchBackupList
  //   const data = utils.wildCardSearch(searchArray, value)
  //   setList(data)
  //   setSelectedRowKeys([])
  // }

  const filters = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >

    <Row gutter={8} align="bottom">
    <Col md={4} sm={24} xs={24} lg={4}>
        <Form.Item name="search" label="Search">
        <Input 
          type='text'
          placeholder="Search"
          prefix={<SearchOutlined />}
          // onChange={(e) => setSelectedSearchbar(e.currentTarget.value)}
          // value={selectedSearchbar}
        />
        </Form.Item>
      </Col>
      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="status" label="Status">

        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          // onChange={(value) => setSelectedStatus(value)}
          placeholder="Status"
          // value={selectedStatus}
        >
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
        </Form.Item>
        </Col>
        <Col md={4} sm={24} xs={24} lg={4}>
        <Form.Item name="brandId" label="Brand">
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
          placeholder="Brand"
          // value={selectedBrandId}
        >
          <Option value="All">All</Option>
          {brands.map((brand) => (
            <Option key={brand.id} value={brand.id}>
              {brand.name}
            </Option>
          ))}
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="categoryId" label="Category">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Category"
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
      {/* //New filters */}
      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="productTemplateId" label="Product Template">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Product Template"
        >
          <Option value="">All</Option>
          {productsTemplate.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
        </Select>
        </Form.Item>
      </Col>

      {/* <div className="mr-md-3 mb-3">
      <Form.Item name="productVariantId" label="Product Variant">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Category"
        >
          <Option value="">All</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
        </Form.Item>
      </div> */}

<Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="productType" label="Product Type">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Product Type"
        >
          <Option value="">All</Option>
          <Option value="Medicine">Medicine</Option>
          <Option value="NonMedicine">Non-Medicine</Option>
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="prescriptionRequired" label="Prescription Required">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Prescription Required"
        >
          <Option value="">All</Option>
          <Option value="true">Yes</Option>
          <Option value="false">No</Option>
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="orderByName" label="Order By Name">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Order By Name"
        >
          <Option value="">All</Option>
          <Option value="Asc">Ascending</Option>
          <Option value="Desc">Descending</Option>
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="orderByPrice" label="Order By Price">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Order By Price"
        >
          <Option value="">All</Option>
          <Option value="Low To High">Low To High</Option>
          <Option value="High To Low">High To Low</Option>
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="returnable" label="Returnable">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Returnable"
        >
          <Option value="">All</Option>
          <Option value={true}>Yes</Option>
          <Option value={false}>No</Option>
        </Select>
        </Form.Item>
      </Col>

      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="manufactureId" label="Manufacturer">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Manufacturer"
        >
          <Option value="">All</Option>
          {selectedManufacture.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
        </Select>
        </Form.Item>
      </Col>
      
      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item name="medicineTypeId" label="Medicine Type">
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedCategoryId(value)}
          // onSelect={handleQuery}
          // value={selectedCategoryId}
          placeholder="Medicine Type"
        >
          <Option value="">All</Option>
          {selectedMedicine.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
        </Select>
        </Form.Item>
      </Col>

      {/* //ENd filters */}
      <Col md={4} sm={24} xs={24} lg={4}>
      <Form.Item label="Approval" name="approval">
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
          placeholder="Approval">
          <Option value="">All</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Approved">Approved</Option>
          <Option value="On Hold">On Hold</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
        </Form.Item>
      </Col>
      {process.env.REACT_APP_SITE_NAME === 'awen' ?
        <Col md={4} sm={24} xs={24} lg={4}>
          <Form.Item name="accquirement" label="Acquirement Method">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="w-100"
            style={{ minWidth: 180 }}
            onChange={(value) => setSelectedacquirementMethod(value)}
            // onSelect={handleQuery}
            value={selectedacquirementMethod}
            placeholder="AcquirementMethod">
            <Option value="">All</Option>
            <Option value="Rent">Rent</Option>
            <Option value="Lend">Lend</Option>
            <Option value="Purchase">Purchase</Option>
            <Option value="Giveaway">Giveaway</Option>
          </Select>
          </Form.Item>
        </Col> : ""}

      <Col className="mb-4">
        <Button type="primary" className="mr-1 mt-4" onClick={handleQuery}>
          Filter
        </Button>
      </Col>
      <Col className="mb-4">
        <Button type="primary" className="mr-1 mt-4" onClick={handleClearFilter}>
          Clear
        </Button>
      </Col>
      <Col style={{marginLeft:"500px"}} className="mb-4 ">
      <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
            className="mr-1"
          >
            Excel Upload
          </Button>
          </Col>
          <Col className="mb-4">
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            className="mr-1"
          >
            Add Product
          </Button>
          </Col>
      </Row>
    </Form>
  )

  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}

        </Flex>
        {/* <div className="mr-2">
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
            className="mr-1"
          >
            Excel Upload
          </Button>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            className="mr-1"
          >
            Add Product
          </Button>
        </div> */}

        <div className="table-responsive">
          <Table 
            columns={tableColumns} 
            scroll={{
              x: true,
                    }} 
            dataSource={list}
            onChange={handleTableChange}
            pagination={pagination}
          loading={loading}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              type: 'checkbox',
              preserveSelectedRowKeys: false,
              ...rowSelection,
          }} />
        </div>
      </Card>

      <Modal
        title="Product Excel Upload"
        visible={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelFile(null)
          setDeliveryZoneId(null)
        }}
        footer={false}
      >
        <Flex flexDirection="column" alignItems="center">
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
