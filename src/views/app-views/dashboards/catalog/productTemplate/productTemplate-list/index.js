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
  message,
} from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
  FileImageOutlined,
  DownloadOutlined,
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
import productTemplate from 'services/productTemplate'
import manufacturerService from 'services/manufacturer'
import categoryService from 'services/category'
import medicineTypeService from 'services/medicineType'
import constantsService from 'services/constants'
import BulkProductTemplateImageUpload from './BulkProductTemplateImageUpload'

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
        <Tag color="orange">Hold</Tag>
      </>
    )
  }
  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    )
  }
  return null
}
const ProductTemplateList = () => {
  let history = useHistory()
  const fileInputRef = React.useRef(null)
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  // const [selectedBrandId, setSelectedBrandId] = useState(null)
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [isBulkImageModalOpen, setIsBulkImageModalOpen] = useState(false)
  const [excelFile, setExcelFile] = useState(null)
  const [medicineTypes, setMedicineTypes] = useState([])
  // const [selectedMedicineTypeId, setSelectedMedicineTypeId] = useState(null)
  const [manufacturers, setManufacturers] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })

  // Changed here for pagination
  const getProductTemplates = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await productTemplate.getProductTemplates(
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

  useEffect(() => {
    getProductTemplates({
      pagination,
    })
    const getBrands = async () => {
      const data = await brandService.getBrands()
      if (data) {
        setBrands(data.data)
      }
    }
    const getCategories = async () => {
      const data = await categoryService.getCategories()
      if (data) {
        setCategories(data.data)
      }
    }
    getBrands()
    getCategories()
    getMedicineTypes()
    getManufacturers()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    getProductTemplates(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }
  // const [searchBackupList, setSearchBackupList] = useState([])

  // const [selectedManufacturerId, setSelectedManufacturerId] = useState(null)
  // const [selectedPrescriptionrequired, setSelectedPrescriptionRequired] =
  // useState(null)

  // const getProductTemplates = async () => {
  //   const data = await productTemplate.getProductTemplates()
  //   if (data) {
  //     setList(data)
  //     setSearchBackupList(data)
  //     console.log(data, 'show-data')
  //   }
  // }
  const getMedicineTypes = async () => {
    const data = await medicineTypeService.getMedicineTypes()
    const activeMedicineTypes = data.data.filter(
      (item) => item.status === 'Active'
    )
    setMedicineTypes(activeMedicineTypes)
  }

  const getManufacturers = async () => {
    const data = await manufacturerService.getManufacturers()
    const activeManufacturers = data.data.filter(
      (item) => item.status === 'Active'
    )
    setManufacturers(activeManufacturers)
  }

  useEffect(() => {
    // const getBrands = async () => {
    //   const data = await brandService.getBrands()
    //   if (data) {
    //     setBrands(data.data)
    //   }
    // }
    // const getCategories = async () => {
    //   const data = await categoryService.getCategories()
    //   if (data) {
    //     setCategories(data.data)
    //   }
    // }
    // getProductTemplates()
    // getBrands()
    // getCategories()
    // getMedicineTypes()
    // getManufacturers()
    fetchConstants()
  }, [])

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
    history.push(`/app/dashboards/catalog/producttemplate/add-producttemplate`)
  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/catalog/producttemplate/edit-producttemplate/${row.id}`
    )
  }

  const deleteRow = async (row) => {
    const resp = await productTemplate.deleteProductTemplate(row.id)

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

  const handleStatusChange = async (value, selectedRow) => {
    const sendingValues = {
      ...selectedRow,
      categoryId: selectedRow.category.id,
      taxCategoryId: selectedRow.taxCategory.id,
      status: value,
    }

    const edited = await productTemplate.editProductTemplate(
      selectedRow.id,
      sendingValues
    )
    if (edited) {
      message.success(`Status Edited Successfully:  ${selectedRow.name}`)
    }
  }
  const tableColumns = [
    {
      title: 'Product Template',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.images[0]}
            name={record.name}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },

    {
      title: 'Brand',
      dataIndex: 'brand',
      render: (brand) => (
        <Flex alignItems="center">{brand ? brand?.name : '-'}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'brand.name'),
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      render: (manufacturer) => (
        <Flex alignItems="center">
          {manufacturer ? manufacturer?.name : '-'}
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'brand.name'),
    },
    {
      title: 'Medicine Type',
      dataIndex: 'medicineType',
      // render: (brand) => <Flex alignItems="center">{brand ? brand?.name : "-"}</Flex>,
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'brand.name'),
    },
    {
      title: 'Vendor Commission',
      dataIndex: 'commission',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => <Flex alignItems="center">{category?.name}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, 'category.name'),
    },

    {
      title: 'Returnable',
      dataIndex: 'returnable',
      render: (returnable) => (
        <Flex alignItems="center">{returnable ? 'Yes' : 'No'}</Flex>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'category.name'),
    },

    // {
    //   title: 'Vendor',
    //   dataIndex: 'username',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'username'),
    // },
    {
      title: 'Status',
      dataIndex: 'status',

      // render: (status) => (
      //   <Flex alignItems="center">{getStockStatus(status)}</Flex>
      // ),
      render: (status, row) => {
        return status !== 'Deleted' ? (
          <Select
            defaultValue={status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            // style={{ width: 120 }}
            onChange={(e) => handleStatusChange(e, row)}
          >
            <Option value="Active">
              <Tag color="green">Active</Tag>
            </Option>
            <Option value="Hold">
              <Tag color="orange">Hold</Tag>
            </Option>

            {/* <Option value="Deleted">
              <Tag color="red">Deleted</Tag>
            </Option> */}
          </Select>
        ) : (
          getStockStatus(status)
        )
      },
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

  // Only for Zapkart
  if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
    tableColumns.splice(
      tableColumns?.length - 4,
      0,
      {
        title: 'Product Type',
        dataIndex: 'productType',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'productType'),
      },
      {
        title: 'Pres Required',
        dataIndex: 'prescriptionRequired',
        render: (prescriptionRequired) => (
          <Flex alignItems="center">{prescriptionRequired ? 'Yes' : 'No'}</Flex>
        ),
      }
    )
  }
  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 15,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }
  // Filter Submit
  const handleFilterSubmit = async () => {
    setPagination(resetPagination())

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getProductTemplates({ pagination: resetPagination() }, sendingValues)
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
    getProductTemplates({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   const searchArray = e.currentTarget.value ? list : searchBackupList
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

  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
    }

    const sendExcelFile = await productTemplate.createProductFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setExcelFile(null)
      notification.success({
        message: 'Product Excel File Uploaded',
      })
      getProductTemplates(pagination)
    }
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
          <Form.Item name="medicineTypeId" label="Medicine Types">
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
              placeholder="Medicine Types"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {medicineTypes.map((medicineType) => (
                <Option key={medicineType.id} value={medicineType.id}>
                  {medicineType.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="manufactureId" label="Manufactures">
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
              placeholder="Manufacturers"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {manufacturers.map((manufacturer) => (
                <Option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="prescriptionRequired" label="Prescription Required">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedPrescriptionRequired(value)}
              // onSelect={handleQuery}
              // value={selectedPrescriptionrequired}
              placeholder="Prescription Required"
            >
              <Option value="">All</Option>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
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

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
      </Flex>
      <div className="mr-2 d-flex justify-content-between">
        <Flex>
          <Button
            className="mr-2"
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
          >
            Excel Upload
          </Button>
          <Button
            type="primary"
            icon={<FileImageOutlined />}
            onClick={() => setIsBulkImageModalOpen(true)}
          >
            Upload Bulk Images
          </Button>
        </Flex>

        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Product Template
          </Button>
        </div>
      </div>

      <Modal
        title="Product Template Excel Upload"
        visible={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelFile(null)
        }}
        footer={false}
      >
        <Flex flexDirection="column" alignItems="center">
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

          <Button type="primary" disabled={!excelFile} onClick={onExcelSubmit}>
            Submit
          </Button>
        </Flex>
      </Modal>

      <BulkProductTemplateImageUpload
        setIsBulkImageModalOpen={setIsBulkImageModalOpen}
        isBulkImageModalOpen={isBulkImageModalOpen}
      />

      <div className="table-responsive">
        <Table
          scroll={{
            x: true,
          }}
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  )
}

export default ProductTemplateList
