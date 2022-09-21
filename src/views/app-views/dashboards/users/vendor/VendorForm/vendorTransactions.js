import { Button, Card, Drawer, notification, Table, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { WalletOutlined, PlusCircleOutlined } from '@ant-design/icons'
// import AddressForm from './AddressForm'
// import customerService from 'services/customer'
import utils from 'utils'
import moment from 'moment'
import { Link } from 'react-router-dom'
import walletService from 'services/Wallet'
import WithdrawBalance from './withdrawBalance'
import paymentService from 'services/payment'
import AddBalancetoWallet from './addBalancetoWallet'
import RemoveBalanceForm from './removeBalanceFromWallet'


const VendorTransactions = ({

    selectedVendorId,
    refetchData,
    transactions,
    wallet
}) => {

    console.log('transactions', transactions)
    console.log('wallet', wallet)

    const [isFormOpen, setisFormOpen] = useState(false)
    const [bank_accounts, setBankAccounts] = useState([])
    const [addBalanceForm,setAddBalanceForm] = useState(false)
    const [removeBalanceForm,setRemoveBalanceForm] = useState(false)
    const getBankAccounts = async () => {
        // const data = await paymentService.getBankAccounts({ userId: selectedVendorId })
        // if (data) {
        //     setBankAccounts(data)
        //     console.log(data, 'show-bankacccounts')
        // }
        if(wallet.bankAccounts.length > 0){
            setBankAccounts(wallet.bankAccounts)
        }
    }
    useEffect(() => {
        getBankAccounts()
    }, [])

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
            title: "Description",
            dataIndex: 'description'
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
            render: (text) => <div>{moment(new Date(text * 1000)).format('YYYY-MM-DD hh:mm:a')}</div>,
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
                        <p>Item Name:</p>
                        {row.itemName}
                        <p>Item Quantity</p>
                        {row.itemQty}

                    </Flex>
                )
            }
        },

    ]
    // const withdrawBalance = async() =>{
    //     const data= await walletService.withdrawBalanceofVendor({selectedVendorId})
    //     if(data){
    //      setTransactions(data)
    //     }
    //     console.log('trans',data)
    //    }


    return (
        <>
            <Card>
                <div className="table-responsive">
                    <div>
                        <Flex justifyContent='end'>


                            <div>
                                {/* <span>   <WalletOutlined /></span> */}
                                <h3>Wallet</h3>
                                <p>Balance:{wallet.balance}</p>
                                <p>Pending Balance:{wallet.pendingBalance}</p>
                            </div>
                            <Button className='ml-2' type="primary" onClick={() => { setisFormOpen(true) }} > Withdraw Balance From Wallet</Button>
                            <Button className='ml-2' type="primary" onClick={() => { setAddBalanceForm(true) }} > Add Balance to Wallet</Button>
                            <Button className='ml-2' type="primary" onClick={() => { setRemoveBalanceForm(true) }} > Remove Balance to From Wallet</Button>

                            {/* <Button
                        type="primary"
                        className="mr-1"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setOpenBankAccountForm(true)}
                    >Add Bank account</Button> */}
                        </Flex>
                    </div>
                    <Table columns={tableColumns} dataSource={transactions} rowKey="id" />
                </div>
            </Card>
            <WithdrawBalance setisFormOpen={setisFormOpen} isFormOpen={isFormOpen} bank_accounts={bank_accounts} selectedVendorId={selectedVendorId} />
            <AddBalancetoWallet setAddBalanceForm={setAddBalanceForm} addBalanceForm={addBalanceForm} selectedVendorId={selectedVendorId}/>
            <RemoveBalanceForm selectedVendorId={selectedVendorId} removeBalanceForm={removeBalanceForm} setRemoveBalanceForm={setRemoveBalanceForm}/>
        </>



    )
}

export default VendorTransactions
