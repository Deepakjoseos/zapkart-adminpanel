/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  Tag,
  notification,
} from 'antd'
import {
  EyeOutlined,
  FileExcelOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import utils from 'utils'
import orderService from 'services/orders'
import { useHistory, Link } from 'react-router-dom'
import customerService from 'services/customer'

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
  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const history = useHistory()
  const [selectedStatus, setSelectedStatus] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    const getOrders = async () => {
      const data = await orderService.getOrders()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    const getCustomers = async () => {
      const data = await customerService.getCustomers()
      if (data) {
        setUsers(data)
        console.log('users', data)
      }
    }
    getOrders()
    getCustomers()
  }, [])

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

  const orderStatuses = [
    'Prescriptions Missing',
    'Pending',
    'Received',
    'Confirmed',
    'Shipping Soon',
    'Shipped',
    'Shipment Delayed',
    'Arriving Early',
    'Out for Delivery',
    'Delivery Refused by Customer',
    'Delivery Rescheduled',
    'Delivered',
    'Shipment Failed',
    'Items damaged during transit',
    'and being returned back to us',
    'Payment Failed',
    'Cancelled',
    'Attempting Cancellation',
    'Return Requested',
    'Return Initiated',
    'Return Rescheduled',
    'Return Completed',
    'Items Returning Back',
    'Return Delayed',
    'Return Items Received',
    'Return Items Verification Failed',
    'Return Items Verification Completed',
    'Return Failed',
    'Return Cancelled',
    'Refund Initiated',
    'Refund Delayed',
    'Refund Completed',
    'Refund Failed',
  ]

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
    {
      title: 'OrderDate',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <Flex alignItems="center">
          {moment(parseInt(createdAt)).format('YYYY-MM-DD')}
        </Flex>
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },

    {
      title: 'Products Count',
      dataIndex: 'items',
      render: (items, record) => <div>{items?.length}</div>,
    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },
    {
      title: 'Shipping Charge',
      dataIndex: 'shippingCharge',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'shippingCharge'),
      // render: (items, record) => <div>{items?.length}</div>,
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <Flex alignItems="center">
          {moment(parseInt(createdAt)).format('L')}
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
            {orderStatuses.map((item) => (
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
      title: 'Payment status',
      dataIndex: 'payment',
      render: (payment, record) => (
        <>
          {/* <Badge status={getPaymentStatus(record.paymentStatus)} /> */}
          <span>{payment.completed ? 'Completed' : 'Not Completed'}</span>
        </>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus'),
    },

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
  const handleQuery = async () => {
    const query = {}
    if (selectedStatus !== 'All') query.status = selectedStatus
    query.userId = selectedUserId

    console.log('query', query)
    const data = await orderService.getOrders(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedStatus(null)

    const data = await orderService.getOrders({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
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
              {orderStatuses.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mr-md-3 mb-3">
            <label className="mt-2">Customers</label>
            <Select
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
                  {user.firstName} {user.lastName}
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
      </Flex>
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
