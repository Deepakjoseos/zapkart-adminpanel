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
import deliveryLocation from 'services/deliveryZone'
import deliveryzoneService from 'services/deliveryZone'
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
const DeliveryZonesList = () => {
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
    pageSize: 15,
  })
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [vendors, setVendors] = useState(null)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
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
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }
  const getDeliveryZones = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await deliveryzoneService.getDeliveryZones(
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
    getDeliveryZones({
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
    getDeliveryZones(
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
      {/* <Menu.Item onClick={() => addDeliveryZoneLocation(row)}>
        <Flex alignItems="center">
          <span className="ml-2">Add Delivery Zone Location</span>
        </Flex>
      </Menu.Item> */}
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
    // history.push(`/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone`)
    history.push(
      `/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone`
    )
  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/deliverylocation/deliveryzone/edit-deliveryzone/${row.id}`
    )
  }

    const deleteRow = async (row,vendorId) => {
      const resp = await deliveryzoneService.deleteDeliveryZone(row.id,vendorId)

      if (resp) {
        const objKey = 'id'
        let data = list
        if (selectedRows.length > 1) {
          selectedRows.forEach((elm) => {
            data = utils.deleteArrayRow(data, objKey, elm.id,vendorId)
            setList(data)
            setSelectedRows([])
          })
        } else {
          data = utils.deleteArrayRow(data, objKey, row.id,vendorId)
          setList(data)
        }
      }
    }
  const addDeliveryZoneLocation = (row) => {
    history.push(
      `/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone-location/${row.id}`
    )
  }
  const getVendorName = (vendorId) => {
    const getVendorName = vendors?.find((cur) => cur.id === vendorId)
    return getVendorName ? getVendorName.fullName : ''
  }
  const tableColumns = [
    {
      title: 'DeliveryZone',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    // {
    //   title: 'isFinal',
    //   dataIndex: 'isFinal',
    //   render: (isFinal) => (
    //     <Flex alignItems="center">{isFinal ? 'Yes' : 'No'}</Flex>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'isFinal'),
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorId',
      render: (vendorId) => (
        <Flex alignItems="center">{getVendorName(vendorId)}</Flex>
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
        getDeliveryZones({ pagination: resetPagination() }, sendingValues)
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
    getDeliveryZones({ pagination: resetPagination() }, {})
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
          <Form.Item name="vendorId" label="Vendors">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedVendorId(value)}
              // onSelect={handleQuery}
              // value={selectedVendorId}
              placeholder="Vendors"
            >
              <Option value="">All</Option>
              {vendors?.map((vendor) => (
                <Option value={vendor.id}>
                  {vendor?.firstName} {vendor?.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="mb-4">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
          <Button className="ml-2" type="primary" onClick={handleClearFilter}>
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
          Add DeliveryZone
        </Button>
      </div>
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

export default DeliveryZonesList
