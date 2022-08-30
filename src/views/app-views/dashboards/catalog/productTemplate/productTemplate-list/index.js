import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Modal,
  notification,
  message,
} from 'antd'
// import ProductTemplateListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileAddOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import productTemplate from 'services/productTemplate'
import brandService from 'services/brand'
import categoryService from 'services/category'
import medicineTypeService from 'services/medicineType'
import manufacturerService from 'services/manufacturer'

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
const ProductTemplateList = () => {
  let history = useHistory()
  const fileInputRef = React.useRef(null)

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedBrandId, setSelectedBrandId] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [excelFile, setExcelFile] = useState(null)
  const [medicineTypes, setMedicineTypes] = useState([])
  const [selectedMedicineTypeId, setSelectedMedicineTypeId] = useState(null)
  const [manufacturers, setManufacturers] = useState([])
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null)
  const [selectedPrescriptionrequired, setSelectedPrescriptionRequired] =
    useState(null)

  const getProductTemplates = async () => {
    const data = await productTemplate.getProductTemplates()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      console.log(data, 'show-data')
    }
  }
  const getMedicineTypes = async () => {
    const data = await medicineTypeService.getMedicineTypes()
    const activeMedicineTypes = data.filter((item) => item.status === 'Active')
    setMedicineTypes(activeMedicineTypes)
  }

  const getManufacturers = async () => {
    const data = await manufacturerService.getManufacturer()
    const activeManufacturers = data.filter((item) => item.status === 'Active')
    setManufacturers(activeManufacturers)
  }

  useEffect(() => {
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
    getProductTemplates()
    getBrands()
    getCategories()
    getMedicineTypes()
    getManufacturers()
  }, [])
  const handleQuery = async () => {
    const query = {}
    if ((selectedBrandId || selectedBrandId) !== 'All')
      query.brandId = selectedBrandId
    query.categoryId = selectedCategoryId
    query.manufacturerId = selectedManufacturerId
    query.prescriptionRequired = selectedPrescriptionrequired
    console.log('medicineTypeId', selectedMedicineTypeId)
    console.log('manufacturerId', selectedManufacturerId)

    query.medicineTypeId = selectedMedicineTypeId
    console.log('query', query)
    const data = await productTemplate.getProductTemplates(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedBrandId(null)
    setSelectedCategoryId(null)
    setSelectedMedicineTypeId(null)
    setSelectedManufacturerId(null)
    setSelectedPrescriptionRequired(null)
    const data = await productTemplate.getProductTemplates({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
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
        return (
          <Select
            defaultValue={status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            // style={{ width: 120 }}
            onChange={(e) => handleStatusChange(e, row)}
          >
            <Option value="Active">
              <Tag color="green">Active</Tag>
            </Option>
            <Option value="Hold">
              <Tag color="red">Hold</Tag>
            </Option>
          </Select>
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

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
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
      getProductTemplates()
    }
  }

  const filters = () => (
    <Flex className="mb-1 flex-wrap" mobileFlex={false}>
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
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Brands</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
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
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
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
        <label className="mt-2">Medicine Types</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedMedicineTypeId(value)}
          // onSelect={handleQuery}
          value={selectedMedicineTypeId}
          placeholder="Medicine Types"
        >
          <Option value="">All</Option>
          {medicineTypes.map((medicineType) => (
            <Option key={medicineType.id} value={medicineType.id}>
              {medicineType.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Manufacturers</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedManufacturerId(value)}
          // onSelect={handleQuery}
          value={selectedManufacturerId}
          placeholder="Manufacturers"
        >
          <Option value="">All</Option>
          {manufacturers.map((man) => (
            <Option key={man.id} value={man.id}>
              {man.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mr-md-3 mb-3">
        <label className="mt-2">Presecription Required</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedPrescriptionRequired(value)}
          // onSelect={handleQuery}
          value={selectedPrescriptionrequired}
          placeholder="Prescription Required"
        >
          <Option value="">All</Option>
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
          
        </Select>
      </div>
      <div>
        <Button type="primary" className="mr-2 mt-4 " onClick={handleQuery}>
          Filter
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          className="mr-2 mt-4"
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </div>
    </Flex>
  )

  return (
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

      <div className="table-responsive">
        <Table
          scroll={{
            x: true,
          }}
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
        />
      </div>
    </Card>
  )
}

export default ProductTemplateList
