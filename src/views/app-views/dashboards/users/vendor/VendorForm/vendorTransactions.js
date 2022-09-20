import { Button, Card, Drawer, notification, Table, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
// import AddressForm from './AddressForm'
// import customerService from 'services/customer'
import utils from 'utils'
import moment from 'moment'
import { Link } from 'react-router-dom'


const VendorTransactions = ({

    selectedVendorId,
    refetchData,
    transactions
}) => {

    console.log('transactions', transactions)
    const [viewFormModal, setViewFormModal] = useState(false)
    const [formMode, setFormMode] = useState('add')
    const [selectedFormAddress, setSelectedFormAddress] = useState({})

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
    const tableColumns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            //   render: (text) => <Link to={`/app/dashboards/shipments/shipment/shipment-view/${text}`}>
            //     {text}
            //   </Link>
        },
        {
            title: "Type",
            dataIndex: 'type'
        },
        {
            title: 'Confirmed',
            dataIndex: 'confirmed',
            render: (text) => (
                <div>
                    {text ? 'Yes' : 'No'}
                </div>
            ),
            sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (text) => <div>{moment(text).format('YYYY-MM-DD hh:mm:a')}</div>,
        },
        // {
        //     title: 'User',
        //     dataIndex: "userId"
        // },
        {
            title: 'Order',
            render: (_, row) => {
                return (
                    <Flex flexDirection="column" justifyContent="center">

                        {/* {row.name}{row?.variant && `(${row.variant.name})`}   */}
                        <span>OrderId:</span>
                        <Link to={`/app/dashboards/orders/order-view/${row.orderId}`}>
                            {row.orderId}
                        </Link>
                        <p>ItemId:</p>
                        {row.itemId}

                    </Flex>
                )
            }
        },

    ]


    return (
        <div className="table-responsive">
            <Table columns={tableColumns} dataSource={transactions} rowKey="id" />
        </div>



    )
}

export default VendorTransactions
