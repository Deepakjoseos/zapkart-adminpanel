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
} from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import utils from 'utils'
import brandService from 'services/brand'
import _ from 'lodash'
import deliveryLocationService from 'services/deliveryLocation'
import vendorService from 'services/vendor'
import deliveryLocation from 'services/deliveryLocation'
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
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const [searchBackupList, setSearchBackupList] = useState([])

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [vendors, setVendors] = useState(null)
  const [selectedVendorId, setSelectedVendorId] = useState(null)



  // Changed here for pagination
  const getDeliveryLocations = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await deliveryLocation.getDeliveryLocations(
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
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  useEffect(() => {
    getDeliveryLocations({
      pagination,
    })
    getVendors()
    fetchConstants()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    getDeliveryLocations(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map(cur => {
        return {
          ...cur, fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setVendors(vendorsList)
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
    history.push(`/app/dashboards/deliverylocation/delivery-location/add-deliverylocation`)
  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/deliverylocation/delivery-location/edit-deliverylocation/${row.id}`
    )
  }

  const deleteRow = async (row) => {
    const resp = await deliveryLocationService.deleteDeliveryLocation(row.id)

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

  const getParentName = async (parentId) => {
    // const parentName = searchBackupList.find((cur) => cur.id === parentId)
    // return parentName ? parentName.name : ''
    console.log('parentId', parentId)
    const parent = await deliveryLocation.getDeliveryLocationById(parentId)
    if (parent) {
      console.log(parent, 'parentvfv')
      return parent?.name
    }
    // console.log('parent,',parent)


  }

  const tableColumns = [
    {
      title: 'Deliverylocation',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'isFinal',
      dataIndex: 'isFinal',
      render: (isFinal) => (
        <Flex alignItems="center">{isFinal ? 'Yes' : 'No'}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'isFinal'),
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
      title: 'Parent',
      dataIndex: 'parentId',
      render: async (parentId) => (
        <Flex alignItems="center">{parentId && await getParentName(parentId)}</Flex>
      ),
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
        getDeliveryLocations({ pagination: resetPagination() }, sendingValues)
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
    getDeliveryLocations({ pagination: resetPagination() }, {})
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

        <Col className="mb-4 ml-5">
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
      <div>
        <Button
          onClick={addProduct}
          type="primary"
          icon={<PlusCircleOutlined />}

        >
          Add DeliveryLocation
        </Button>
      </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" pagination={pagination}
          loading={loading}
          onChange={handleTableChange} />
      </div>
    </Card>
  )
}

export default ProductList
