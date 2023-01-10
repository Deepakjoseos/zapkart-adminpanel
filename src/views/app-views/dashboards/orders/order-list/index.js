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
  Col, notification, DatePicker
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
import vendorService from 'services/vendor'

const { Option } = Select

const getPaymentStatus = (status) => {
  if (status === 'Paid') {
    return 'success'
  }
  if (status === 'Pending') {
    return 'warning'
  }
  if (status === 'Expired') {
    return 'error'
  }
  return ''
}

const getShippingStatus = (status) => {
  if (status === 'Ready') {
    return 'blue'
  }
  if (status === 'Shipped') {
    return 'cyan'
  }
  return ''
}

const Orders = () => {
  const [paymentType, setPaymentType] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [users, setUsers] = useState([])
  const [vendorList, setVendorList] = useState(null)
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
    pageSize: 15,
  })

  const statusOtherThanList= [
'Pending',
'Verifiying Prescription',
'Prescription Missing',
// 'Failed',
'Confirmed',
'Shipping Soon',
'Shipped',
'Delivered',
'Cancelled',
'Returned',
'Completed'
  ]

  const getCustomers = async () => {
    const data = await customerService.getCustomers()
    if (data) {
      const users = data.map(cur => {
        return {
          ...cur, fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setUsers(users)
    }
  }

  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const users = data.map(cur => {
        return {
          ...cur, 
          fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setVendorList(users)
      // console.log(users, "rohit");
    }
  }



  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
      setOrderStatuses(Object.values(data.ORDER['ORDER_STATUS']))
      setPaymentStatuses(Object.values(data.PAYMENT['PAYMENT_STATUS']))
      setStatuses(Object.values(data.ORDER['ORDER_ITEM_STATUS']))
      setPaymentType(Object.values(data.GENERAL['PAYMENT_TYPE']))
    }
  }
  const getOrders = async (paginationParams = { }, filterParams) => {
    setLoading(true)
    // if (filterParams.statusOtherThan === ''){
    //   filterParams.statusOtherThan = '1Failed'
    // }
    const defaultQuery = {
      statusOtherThan: "Failed"
    }
    const data = await orderService.getOrders(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams ? filterParams : defaultQuery )
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
    getOrders({
      pagination,
    })
    getVendors()
    fetchConstants()
    getCustomers()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    
    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values 
        const sendingValues = _.pickBy({...values,
          fromDate: values.fromDate ? moment(values.fromDate).format() : '', 
          toDate: values.toDate ? moment(values.toDate).format():'',
        }, _.identity,)

        getOrders({ pagination: newPagination }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })

    // getOrders(
    //   {
    //     pagination: newPagination,
    //   },
    //   filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    // )
  }

  // console.log('order Status', orderStatuses)

  // const handleShowStatus = (value) => {
  //   if (value !== 'All') {
  //     const key = 'paymentStatus'
  //     const data = utils.filterArray(OrderListData, key, value)
  //     setList(data)
  //   } else {
  //     setList(OrderListData)
  //   }
  // }

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() =>
          history.push(`/app/dashboards/orders/order-view/${row.id}`)
        }
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  )

  // const orderStatuses = [
  //   'Prescriptions Missing',
  //   'Pending',
  //   'Received',
  //   'Confirmed',
  //   'Shipping Soon',
  //   'Shipped',
  //   'Shipment Delayed',
  //   'Arriving Early',
  //   'Out for Delivery',
  //   'Delivery Refused by Customer',
  //   'Delivery Rescheduled',
  //   'Delivered',
  //   'Shipment Failed',
  //   'Items damaged during transit',
  //   'and being returned back to us',
  //   'Payment Failed',
  //   'Cancelled',
  //   'Attempting Cancellation',
  //   'Return Requested',
  //   'Return Initiated',
  //   'Return Rescheduled',
  //   'Return Completed',
  //   'Items Returning Back',
  //   'Return Delayed',
  //   'Return Items Received',
  //   'Return Items Verification Failed',
  //   'Return Items Verification Completed',
  //   'Return Failed',
  //   'Return Cancelled',
  //   'Refund Initiated',
  //   'Refund Delayed',
  //   'Refund Completed',
  //   'Refund Failed',
  // ]

  const handleOrderStatusChange = async (value, selectedRow) => {
    const updatedOrderStatus = await orderService.updateOrderStatus(
      selectedRow.id,
      value
    )

    if (updatedOrderStatus) {
      notification.success({ message: 'Order Status Updated' })

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
  const handlePaymentStatusChange = () => { }

  const getCustomerPrescriptions = async (customerId) => {
    const data = await customerService.getCustomerPrescription(customerId)
    if (data) {
      setCustomerPrescriptions(data.prescriptions)
    }
  }

  const cancelOrder = async (orderId) => {
    notification.warning({ message: 'Order Cancelling...' })
    const cancelOrder = await orderService.cancelOrder(orderId)

    if (cancelOrder) {
      notification.success({ message: 'Order Cancelled' })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const tableColumns = [
    {
      title: 'OrderNo',
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
          {text}
        </Link>
      ),
    },
    // {
    //   title: 'shipment',
    //   dataIndex: 'items',
    //   render: (items) => {`
    //     return (
    //       <>
    //         {items?.map((item) => (
    //           <>
    //           {item.shipmentId ? 
    //           <Link to={`/app/dashboards/shipments/shipment/shipment-view/${item.shipmentId}`}> {item.shipmentId}</Link>
    //           :
    //           "No shipment"}
    //             {/* {item.shipmentId ? item.shipmentId :"No Shipment"} */}
    //             {/* <p>Type:{group.type}</p>
    //       <p>Status:{group.status}</p> */}
    //           </>
    //         ))}
    //       </>
    //     )
    //   },
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
    // },

    {
      title: 'Customer Name',
      dataIndex: 'userName',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },


    // {
    //   title: 'Products Count',
    //   dataIndex: 'items',
    //   render: (items, record) => <div>{items?.length}</div>,
    // },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (totalAmount) => (
        <div>
          
          {totalAmount}
        </div>
      ),

      sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },
    // {
    //   title: 'Shipping Charge',
    //   dataIndex: 'shippingCharge',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'shippingCharge'),
    //   // render: (items, record) => <div>{items?.length}</div>,
    // },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <Flex alignItems="center">
          {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   render: (_, record) => (
    //     <span>{moment.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'date'),
    // },
    // {
    //   title: 'Order status',
    //   dataIndex: 'status',
    //   render: (status, record) => (
    //     <>
    //       {status}
    //     </>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus'),
    // },

    {
      title: 'Order status',
      dataIndex: 'status',
      render: (status, row) => {
        return (
          <Select
            defaultValue={status}
            style={{ width: 150 }}
            onChange={(e) => handleOrderStatusChange(e, row)}
          >
            {orderStatuses?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        )
      },
      // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment',
      render: (payment) => {
        return <Flex alignItems="centre">{payment?.status}</Flex>
      },
    },
    // {
    //   title: 'Payment status',
    //   dataIndex: 'status',
    //   render: (status, row) => {
    //     return (
    //       <Select
    //         defaultValue={status}
    //         style={{ width: 150 }}
    //         onChange={(e) => handlePaymentStatusChange(e, row)}
    //       >
    //         {paymentStatuses?.map((item) => (
    //           <Option key={item} value={item}>
    //             {item}
    //           </Option>
    //         ))}
    //       </Select>
    //     )
    //   },
    //   // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
    // },
    // {
    //   title: 'Payment status',
    //   dataIndex: 'payment',
    //   render: (payment, record) => (
    //     <>
    //       {/* <Badge status={getPaymentStatus(record.paymentStatus)} /> */}
    //       <span>{payment.completed ? 'Completed' : 'Not Completed'}</span>
    //     </>
    //   ),
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus'),
    // },

    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <Flex>
            <EllipsisDropdown menu={dropdownMenu(elm)} />
            {elm.status !== 'Cancelled' && (
              <Button
                type="primary"
                className="ml-2"
                onClick={() => cancelOrder(elm.id)}
              >
                Cancel Order
              </Button>
            )}
          </Flex>
        </div>
      ),
    },
  ]

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    },
  }

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
        const sendingValues = _.pickBy({...values,
          fromDate: values.fromDate ? moment(values.fromDate).format() : '', 
          toDate: values.toDate ? moment(values.toDate).format():'',
          // statusOtherThan: values.statusOtherThan ? values.statusOtherThan : 'Failed'
        }, _.identity)
        getOrders({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getOrders({ pagination: resetPagination() },)
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

      <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="fromDate" label="From Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="toDate" label="To Date">
            <DatePicker />
          </Form.Item>
        </Col>


        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="status" label="Status">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            >
              <Option value="">All</Option>
              {orderStatuses?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="statusOtherThan" label="Status Other Than">

            <Select
              mode='multiple'
              defaultValue='Failed' 
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            >
              {/* <Option value="">All</Option> */}
              {statusOtherThanList?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="itemStatus" label="Item Status">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            >
              <Option value="">All</Option>
              {statuses?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={5}>
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
              placeholder="Customers"
            >
              <Option value="">All</Option>
              {users?.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="vendorId" label="Vendor">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Vendors"
            >
              <Option value="">All</Option>
              {vendorList?.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>

          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="paymentType" label="Payment Type">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Payment Type"
            >
              <Option value="">All</Option>
              {paymentType?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>

        <Col className="mb-4 ml-2">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
          <Button className="ml-1" type="primary" onClick={handleClearFilter}>
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
        {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <label className="mt-2"> Search</label>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mr-md-3 mb-3">
            <label className="mt-2">Status</label>
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setSelectedStatus(value)}
              // onSelect={handleQuery}
              value={selectedStatus}
              placeholder="Status"
            >
              <Option value="">All</Option>
              {orderStatuses?.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <label className="mt-2">Customers</label>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={(value) => setSelectedUserId(value)}
              // onSelect={handleQuery}
              value={selectedUserId}
              placeholder="Users"
            >
              <Option value="">All</Option>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </div>
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
          {/* <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowStatus}
              placeholder="Status"
            >
              <Option value="All">All payment </Option>
              {paymentStatusList.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div> */}
      </Flex>
      {/* </Flex> */}
      {/* </Flex> */}
      <div>
        <Button
          onClick={() => history.push('/app/dashboards/orders/create-order')}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          Create Order
        </Button>
      </div>
      <div className="table-responsive">
        <Table
          scroll={{
            x: true,
          }} pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
        // rowSelection={{
        //   selectedRowKeys: selectedRowKeys,
        //   type: 'checkbox',
        //   preserveSelectedRowKeys: false,
        //   ...rowSelection,
        // }}
        />

      </div>
    </Card>
  )
}

export default Orders
