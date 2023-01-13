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
  Col, notification, message
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
import qs from 'qs'
import utils from 'utils'
import brandService from 'services/brand'
import _ from 'lodash'
import { useHistory, Link } from 'react-router-dom'
import customerService from 'services/customer'
import constantsService from 'services/constants'
import orderService from 'services/orders'
import moment from 'moment'
import payoutService from 'services/payout'
import vendorService from 'services/vendor'
import vendorPayoutService from 'services/vendorPayout'

const { Option } = Select

const PayoutList = () => {
  const [vendorList, setVendorList] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [userId, setUserId] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [paymentStatuses, setPaymentStatuses] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])
  const [customerPrescriptions, setCustomerPrescriptions] = useState([])
  const [statuses, setStatuses] = useState([])
  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item 
      onClick={() => viewDetails(row)}
      >
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

  const viewDetails = (row) => {
    history.push(`/app/dashboards/vendor-payout/payout-details/${row.id}`)

  }

  const getPayout = async (paginationParams = {}, filterParams) => {
    const data = await vendorPayoutService.getPayouts(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
    if (data) {
      console.log(data.total,"total");
      setUsers(data.data)

      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }


  useEffect(() => {
    getPayout({
      pagination,
    })
    getVendors()
  }, [])


  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  const handleTableChange = (newPagination) => {
    getPayout(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const tableColumns = [
    {
      title: 'Vendor',
      dataIndex: 'vendorName',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Item',
      dataIndex: 'itemName',
    },
    {
      title: 'Order No',
      dataIndex: 'orderNo',
    },
    {
      title: 'Vendor Amount',
      dataIndex: 'vendorAmount',
    },
    {
      title: 'commission Amount',
      render: (_, record) => `${record.commissionAmount}  (${record.commissionPercentage}%)`
    },
    {
      title: 'commission Amount',
      render: (_, record) => `${record.tdsAmount}  (${record.tdsPercentage}%)`
    },
    // {
    //   title: 'tds Amount',
    //   dataIndex: 'tdsAmount',
    // },
    // {
    //   title: 'tds Percentage',
    //   dataIndex: 'tdsPercentage',
    // },
    // {
    //   title: '',
    //   dataIndex: 'actions',
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   ),
    // },
  ]

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })

  const handleFilterSubmit = async () => {
    setPagination(resetPagination())

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // console.log(values, "heyy");
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getPayout({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getPayout({ pagination: resetPagination() }, {})
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
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col> */}

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="userId" label="Vendor Name">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Vendor"
            >
              <Option value="">All</Option>
              {vendorList?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {`${item.firstName} ${item.lastName}`}
                </Option>
              ))}
            </Select>

          </Form.Item>
        </Col>
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="userId" label="Customers">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedUserId(value)}
              // onSelect={handleQuery}
              // value={selectedUserId}
              placeholder="Users"
            >
              <Option value="">All</Option>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}

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

  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) setVendorList(data)
  }

  return (
    <Card>
      <div alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
      </div>
      <div className="table-responsive">
        <Table
          // scroll={{
          //   x: true,
          // }} 

          columns={tableColumns}
          dataSource={users}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  )
}

export default PayoutList