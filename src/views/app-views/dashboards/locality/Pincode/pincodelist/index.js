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
  Modal,
  Col,
  notification,
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
import pincodeService from 'services/pincode'
import districtService from 'services/district'
import stateService from 'services/state'
import countryService from 'services/country'
import _, { get } from 'lodash'

import constantsService from 'services/constants'
import cityService from 'services/city'
import './pincode.css'
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
const Pincodelist = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  let history = useHistory()
  const fileInputRef = React.useRef(null)
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [excelFile, setExcelFile] = useState(null)
  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [cities, setCities] = useState([])
  const [state, setState] = useState([])
  const [country, setCountry] = useState([])
  const [pincode, setPincode] = useState([])
  const [district, setDistrict] = useState([])


  
  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }
  const getCities = async () => {
    const data = await cityService.getCity()
    if (data) {
      setCities(data.data)
    }
  }
  const getState = async () => {
    const data = await stateService.getState()
    if (data) {
      setState(data.data)
    }
  }
  const getDistrict = async () => {
    const data = await districtService.getDistrict()
    if (data) {
      setDistrict(data.data)
    }
  }
  const getCountry = async () => {
    const data = await countryService.getCountry()
    if (data) {
      setCountry(data.data)
    }
  }
  // Changed here for pagination
  const getPincode = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await pincodeService.getPincode(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )

    if (data) {
      setList(data.data)
      setPincode(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    getPincode({
      pagination,
    })
    fetchConstants()
    getCities()
    getDistrict()
    getCountry()
    getState()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
 

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
    history.push(`/app/dashboards/locality/pincode/addpincode`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/locality/pincode/editpincode/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await pincodeService.deletePincode(row.id)

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
      title: SITE_NAME === 'zapkart' ? 'Pincode' : 'City',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    // {
    //   title: 'City',
    //   dataIndex: 'cityName',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'cityName'),
    // },
    // {
    //   title: 'District',
    //   dataIndex: 'districtName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'districtName'),
    // },
    // {
    //   title: 'State',
    //   dataIndex: 'stateName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'stateName'),
    // },
    // {
    //   title: 'Country',
    //   dataIndex: 'countryName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'countryName'),
    // },
    {
      title: 'Priority',
      dataIndex: 'priority',

      sorter: (a, b) => utils.antdTableSorter(a, b, 'priority'),
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
        getPincode({ pagination: resetPagination() }, sendingValues)
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
    getPincode({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }



  const handleTableChange = (newPagination) => {
    getPincode(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
    }

    const sendExcelFile = await pincodeService.createPincodeFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setExcelFile(null)
      notification.success({
        message: 'Pincode Excel File Uploaded',
      })
      getPincode(pagination)
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
        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={4}>
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
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item
            name="orderByPriority"
            label="OrderByPriority"
            className="ml-2"
          >
            <Select className="w-100" placeholder="OrderBy Priority">
              <Option value="">All</Option>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Form.Item>
        </Col> */}




{process.env.REACT_APP_SITE_NAME === 'zapkart' && (
<Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item
            name="pincodeId"
            label="Pincode"
          >
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
              placeholder={SITE_NAME === 'zapkart' ? 'District' : 'Country'}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {pincode.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

)}
 <Col md={6} sm={24} xs={24} lg={4}>
  
        <Form.Item name="cityId" 
         label={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
      >
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
              placeholder={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {cities.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="cityId" label="Emirates">
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
              placeholder="Country"
            // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {city.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        */}
         </Col>


        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item
            name="districtId"
            label={SITE_NAME === 'zapkart' ? 'District' : 'Country'}
          >
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
              placeholder={SITE_NAME === 'zapkart' ? 'District' : 'Country'}
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {district.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>





        {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item
            name="countryId"
            label="country"
          >
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
              placeholder="country"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {country.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        )}




        {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item
            name="stateId"
            label="state"
          >
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
              placeholder="state"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {state.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        )}

       
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
          <Col className="spider" >
          <Flex>
         
        

          <div >
          <Button
            className="mr-2"
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => setIsExcelModalOpen(true)}
          >
            Excel Upload
          </Button>
            <Button icon={<FileImageOutlined />}>
              {' '}
              <a
               href="https://ecommerce-test2.s3.amazonaws.com/samplefiles/pincode.xlsx"
                download={'sample'}
              >
                Download Sample File
              </a>
            </Button>
          </div>
         
        

        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            {SITE_NAME === 'zapkart' ? 'Add Pincode' : 'Add City'}
          </Button>
        </div>
        </Flex>
        </Col>
        
      </Row>
      
    </Form>
    
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
       
        <Modal
        title="Pincode Excel Upload"
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
     
      </Flex>
      <div className="table-responsive">
        <Table
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

export default Pincodelist
