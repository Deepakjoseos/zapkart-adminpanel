import { Button, Card, Drawer, notification, Table, Typography,Select } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddressForm from './AddressForm'
import customerService from 'services/customer'
import utils from 'utils'
import {Link} from 'react-router-dom'
import orderService from 'services/orders'
import moment from 'moment'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import constantsService from 'services/constants'
const {Option} = Select



const ViewOrders = ({

    selectedCustomerId,
    refetchData,
    //   ordersList
}) => {

    //   console.log('orders',ordersList)
    //   const [viewFormModal, setViewFormModal] = useState(false)
    //   const [formMode, setFormMode] = useState('add')
    //   const [selectedFormAddress, setSelectedFormAddress] = useState({})
    // const [ordersList, setOrdersList] = useState([])
    const [orders, setOrders] = useState([])
    const [orderStatuses, setOrderStatuses] = useState([])
    // const [paymentStatuses, setPaymentStatuses] = useState([])


    const fetchConstants = async () => {
      const data = await constantsService.getConstants()
      if (data) {
        // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
        setOrderStatuses(Object.values(data.ORDER['ORDER_STATUS']))
        // setPaymentStatuses(Object.values(data.PAYMENT['PAYMENT_STATUS']))
      }
    }
  
    //   const onDeleteAddress = async (addressId) => {
    //     const customerDelete = await customerService.deleteAddress(
    //       selectedCustomerId,
    //       addressId
    //     )

    //     if (customerDelete) {
    //       notification.success({
    //         message: 'Address deleted successfully',
    //       })
    //       refetchData()
    //     }
    //   }
    useEffect(() => {
        getOrders()
        fetchConstants()
        // findCustomerOrders()
    }, [selectedCustomerId])
    const getOrders = async () => {
      const data = await orderService.getOrders({userId:selectedCustomerId})
      if (data) {
          setOrders(data)
          //   setSearchBackupList(data)
          console.log(data, 'show-data')
      }
  }

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
    // const tableColumns = [
    //     {
    //         title: 'City',
    //         dataIndex: 'city',
    //         sorter: (a, b) => utils.antdTableSorter(a, b, 'city'),
    //     },
    //     {
    //         title: 'Country',
    //         dataIndex: 'country',
    //         sorter: (a, b) => utils.antdTableSorter(a, b, 'country'),
    //     },
    // ]
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
              <span class="WebRupee">&#x20B9;</span>
              {totalAmount}
            </div>
          ),
    
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
        //   title: 'Order Date',
        //   dataIndex: 'createdAt',
        //   render: (createdAt) => (
        //     <Flex alignItems="center">
        //       {moment(new Date(createdAt * 1000)).format('DD-MM-YYYY hh:mm:a')}
        //     </Flex>
        //   ),
        //   sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
        // },
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
            //  render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
            //  sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
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
    
        // {
        //   title: '',
        //   dataIndex: 'actions',
        //   render: (_, elm) => (
        //     <div className="text-right">
        //       <Flex>
        //         <EllipsisDropdown menu={dropdownMenu(elm)} />
        //         {elm.status !== 'Cancelled' && (
        //           <Button
        //             type="primary"
        //             className="ml-2"
        //             onClick={() => cancelOrder(elm.id)}
        //           >
        //             Cancel Order
        //           </Button>
        //         )}
        //       </Flex>
        //     </div>
        //   ),
        // },
      ]


    return (
        <Table
        scroll={{
          x: true,
        }}
        columns={tableColumns}
        dataSource={orders}
        rowKey="id"
      
      />
    )
}

export default ViewOrders
