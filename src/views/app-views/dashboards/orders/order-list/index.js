// import React, { useEffect, useState } from 'react'
// import { Card, Table, Select, Input, Tag, notification } from 'antd'
// import {
//   // EyeOutlined,
//   // DeleteOutlined,
//   SearchOutlined,
// } from '@ant-design/icons'
// // import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
// import Flex from 'components/shared-components/Flex'
// import { useHistory } from 'react-router-dom'
// import utils from 'utils'
// import orderService from 'services/orders'
// // import DeliveryZoneService from 'services/deliveryZone'

// const { Option } = Select

// const getStockStatus = (status) => {
//   if (status === 'Active') {
//     return (
//       <>
//         <Tag color="green">Active</Tag>
//       </>
//     )
//   }
//   if (status === 'Hold') {
//     return (
//       <>
//         <Tag color="red">Hold</Tag>
//       </>
//     )
//   }
//   return null
// }
// const ProductList = () => {
//   let history = useHistory()

//   const [list, setList] = useState([])
//   const [searchBackupList, setSearchBackupList] = useState([])
//   const [selectedRows, setSelectedRows] = useState([])
//   const [selectedRowKeys, setSelectedRowKeys] = useState([])

//   // const getDeliveryZoneName = (id) => {
//   //   const deliveryZoneName = await DeliveryZoneService.getDeliveryZoneById(id)
//   //   return
//   // }

//   useEffect(() => {
//     const getOrders = async () => {
//       const data = await orderService.getOrders()
//       if (data) {
//         setList(data)
//         setSearchBackupList(data)
//         console.log(data, 'show-data')
//       }
//     }
//     getOrders()
//   }, [])

//   // const dropdownMenu = (row) => (
//   //   <Menu>
//   //     <Menu.Item onClick={() => viewDetails(row)}>
//   //       <Flex alignItems="center">
//   //         <EyeOutlined />
//   //         <span className="ml-2">View Details</span>
//   //       </Flex>
//   //     </Menu.Item>
//   //     <Menu.Item onClick={() => deleteRow(row)}>
//   //       <Flex alignItems="center">
//   //         <DeleteOutlined />
//   //         <span className="ml-2">
//   //           {selectedRows.length > 0
//   //             ? `Delete (${selectedRows.length})`
//   //             : 'Delete'}
//   //         </span>
//   //       </Flex>
//   //     </Menu.Item>
//   //   </Menu>
//   // )

//   // const addProduct = () => {
//   //   history.push(`/app/dashboards/catalog/product/add-product`)
//   // }

//   // const viewDetails = (row) => {
//   //   history.push(`/app/dashboards/catalog/product/edit-product/${row.id}`)
//   // }

//   // const deleteRow = async (row) => {
//   //   const resp = await orderService.deleteProduct(row.id)

//   //   if (resp) {
//   //     const objKey = 'id'
//   //     let data = list
//   //     if (selectedRows.length > 1) {
//   //       selectedRows.forEach((elm) => {
//   //         data = utils.deleteArrayRow(data, objKey, elm.id)
//   //         setList(data)
//   //         setSelectedRows([])
//   //       })
//   //     } else {
//   //       data = utils.deleteArrayRow(data, objKey, row.id)
//   //       setList(data)
//   //     }
//   //   }
//   // }

//   const handleOrderStatusChange = async (value, selectedRow) => {
//     const updatedProductApproval = await orderService.updateOrderStatus(
//       [selectedRow.id],
//       value
//     )

//     if (updatedProductApproval) {
//       notification.success({ message: 'Product Approval Updated' })

//       // const objKey = 'id'
//       // let data = list
//       // data = utils.updateArrayRow(
//       //   data,
//       //   objKey,
//       //   selectedRow.id,
//       //   'approval',
//       //   value
//       // )
//       // setList(data)
//     }
//   }

//   const tableColumns = [
//     {
//       title: 'Order',
//       dataIndex: 'orderNo',
//       sorter: (a, b) => utils.antdTableSorter(a, b, 'orderNo'),
//     },
//     {
//       title: 'User Id',
//       dataIndex: 'userId',
//       sorter: (a, b) => utils.antdTableSorter(a, b, 'userId'),
//     },
//     {
//       title: 'Invoice No',
//       dataIndex: 'invoice',
//       render: (invoice, row) => <>{invoice.invoiceNo}</>,
//     },

//     {
//       title: 'Products',
//       dataIndex: 'items',
//       render: (items, row) => (
//         <>
//           {items?.map((item) => (
//             <>
//               <div key={item.id}>
//                 <span>{item.name}</span>
//                 <span>{item.price}</span>
//                 <span>{item.quantity}</span>
//               </div>

//               <hr />
//             </>
//           ))}
//         </>
//       ),
//     },

//     {
//       title: 'TotalAmount',
//       dataIndex: 'totalAmount',
//     },

//     {
//       title: 'shipping Charge',
//       dataIndex: 'shippingCharge',
//     },
//     // {
//     //   title: 'MRP Price',
//     //   dataIndex: 'mrpPrice',
//     //   sorter: (a, b) => utils.antdTableSorter(a, b, 'mrpPrice'),
//     // },
//     // {
//     //   title: 'Price',
//     //   dataIndex: 'price',
//     //   render: (price, row) => {
//     //     return (
//     //       <Flex flexDirection="column">
//     //         <div style={{ color: 'gray', textDecoration: 'line-through' }}>
//     //           {row.mrpPrice}
//     //         </div>{' '}
//     //         <div>{price}</div>
//     //       </Flex>
//     //     )
//     //   },
//     // },

//     // {
//     //   title: 'DeliveryZone',
//     //   dataIndex: 'deliveryZone',
//     //   render: (deliveryZone) => {
//     //     return <Flex>{deliveryZone.name}</Flex>
//     //   },
//     // },

//     // {
//     //   title: 'approval',
//     //   dataIndex: 'approval',
//     //   render: (approval, row) => {
//     //     return (
//     //       <Select
//     //         defaultValue={approval.charAt(0).toUpperCase() + approval.slice(1)}
//     //         // style={{ width: 120 }}
//     //         onChange={(e) => handleOrderStatusChange(e, row)}
//     //       >
//     //         <Option value="Pending">
//     //           <Tag color="blue">Pending</Tag>
//     //           {/* Pending */}
//     //         </Option>
//     //         <Option value="Approved">
//     //           <Tag color="green">Approved</Tag>
//     //         </Option>
//     //         <Option value="On Hold">
//     //           <Tag color="orange">On Hold</Tag>
//     //         </Option>
//     //         <Option value="Rejected">
//     //           <Tag color="red">Rejected</Tag>
//     //         </Option>
//     //       </Select>
//     //     )
//     //   },
//     //   // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
//     //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
//     // },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: (status) => (
//         // {getStockStatus(status)}
//         // <Flex alignItems="center">{status}</Flex>
//         <>{status}</>
//       ),
//       sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
//     },
//     // {
//     //   title: '',
//     //   dataIndex: 'actions',
//     //   render: (_, elm) => (
//     //     <div className="text-right">
//     //       <EllipsisDropdown menu={dropdownMenu(elm)} />
//     //     </div>
//     //   ),
//     // },
//   ]

//   const onSearch = (e) => {
//     const value = e.currentTarget.value
//     const searchArray = e.currentTarget.value ? list : searchBackupList
//     const data = utils.wildCardSearch(searchArray, value)
//     setList(data)
//     setSelectedRowKeys([])
//   }

//   const handleShowStatus = (value) => {
//     if (value !== 'All') {
//       const key = 'status'
//       const data = utils.filterArray(searchBackupList, key, value)
//       setList(data)
//     } else {
//       setList(searchBackupList)
//     }
//   }

//   const filters = () => (
//     <Flex className="mb-1" mobileFlex={false}>
//       <div className="mr-md-3 mb-3">
//         <Input
//           placeholder="Search"
//           prefix={<SearchOutlined />}
//           onChange={(e) => onSearch(e)}
//         />
//       </div>
//       <div className="mb-3">
//         <Select
//           defaultValue="All"
//           className="w-100"
//           style={{ minWidth: 180 }}
//           onChange={handleShowStatus}
//           placeholder="Status"
//         >
//           <Option value="All">All</Option>
//           <Option value="Active">Active</Option>
//           <Option value="Hold">Hold</Option>
//         </Select>
//       </div>
//     </Flex>
//   )

//   return (
//     <Card>
//       <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
//         {filters()}
//         {/* <div>
//           <Button
//             onClick={addProduct}
//             type="primary"
//             icon={<PlusCircleOutlined />}
//             block
//           >
//             Add Product
//           </Button>
//         </div> */}
//       </Flex>
//       <div className="table-responsive">
//         <Table columns={tableColumns} dataSource={list} rowKey="id" />
//       </div>
//     </Card>
//   )
// }

// export default ProductList

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
import OrderListData from 'assets/data/order-list.data.json'
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
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import orderService from 'services/orders'
import { useHistory } from 'react-router-dom'

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

// const paymentStatusList = ['Paid', 'Pending', 'Expired']

const Orders = () => {
  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const history = useHistory()

  useEffect(() => {
    const getOrders = async () => {
      const data = await orderService.getOrders()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getOrders()
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

  const cancelOrder = async (userId, orderId) => {
    const cancelOrder = await orderService.cancelOrder(userId, orderId)

    if (cancelOrder) {
      notification.success({ message: 'Order Cancelled' })
    }
  }

  const tableColumns = [
    {
      title: 'OrderNo',
      dataIndex: 'orderNo',
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
            <Button
              type="primary"
              className="ml-2"
              onClick={() => cancelOrder(elm.userId, elm.id)}
            >
              Cancel Order
            </Button>
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

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
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
        <div>
          <Button
            onClick={() => history.push('/app/dashboards/orders/create-order')}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Create Order
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: 'checkbox',
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  )
}

export default Orders
