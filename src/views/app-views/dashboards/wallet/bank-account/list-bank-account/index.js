import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  notification
} from 'antd'

// import ShipmentListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import _ from 'lodash'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format'
import { useHistory, Link } from 'react-router-dom'
import utils from 'utils'
import shipmentService from 'services/shipment'
// import CheckIfDeliverable from './CheckIfDeliverable'
import constantsService from 'services/constants'
import walletService from 'services/Wallet'
import moment from 'moment'
import paymentService from 'services/payment'
// import BankAccountForm from './BankAccountForm'

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
const BankAccountList = ({ selectedVendorId }) => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkIfDeliverableOpen, setCheckIfDeliverableOpen] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [currentUserId, setCurrentUserId] = useState([])
  const [wallet, setWallet] = useState({})
  const [isFormOpen,setIsFormOpen] = useState(false)

  // const getUser = async ()=>{
  //     const data = await authVendorService.getProfile()
  //     if(data){
  //         setCurrentUserId(data.id)
  //     }
  // }

  // Getting Brands List to display in the table
  const getBankAccounts = async () => {
    const data = await paymentService.getBankAccounts()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      // console.log(data, 'show-bankacccounts')
    }
  }



  //   const fetchConstants = async () => {
  //     const data = await constantsService.getConstants()
  //     if (data) {
  //       // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

  //       setStatuses(Object.values(data.GENERAL['STATUS']))

  //     }
  //   }

  useEffect(() => {
    // getUser()
    getBankAccounts()

  }, [])

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item onClick={() => generateAwb(row.id)}>
        <Flex alignItems="center">
          <span className="ml-2">Generate AWB</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => generateManifest(row.id)}>
        <Flex alignItems="center">
          <span className="ml-2">Generate Manifest</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => generateLabel(row.id)}>
        <Flex alignItems="center">
          <span className="ml-2">Generate Label</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => generateInvoice(row.id)}>
        <Flex alignItems="center">
          <span className="ml-2">Generate Invoice</span>
        </Flex>
      </Menu.Item> */}
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
    history.push(`/app/dashboards/shipments/shipment/edit-shipment/${row.id}`)
  }

  // For deleting a row
  // const deleteRow = async (row) => {
  //   const resp = await shipmentService.dele(row.id)

  //   if (resp) {
  //     const objKey = 'id'
  //     let data = list
  //     if (selectedRows.length > 1) {
  //       selectedRows.forEach((elm) => {
  //         data = utils.deleteArrayRow(data, objKey, elm.id)
  //         setList(data)
  //         setSelectedRows([])
  //       })
  //     } else {
  //       data = utils.deleteArrayRow(data, objKey, row.id)
  //       setList(data)
  //     }
  //   }
  // }

  // Antd Table Columns
  const tableColumns = [
    {
      title: "Account Type",
      dataIndex: 'account_type',
      render: (text) => (
        <Flex alignItems="center">
          {text ==='bank_account' ? "Bank Account" : text ==='card' ? "CARD": "VPA UPI"}
        </Flex>
      ),
    },
    
    {
      title: "Details",
      dataIndex: 'id',
      render: (_,record) => (
        <Flex alignItems="center">
          <div>
          <p>{record?.bank_account?.bank_name}</p>
          <p>{record?.bank_account?.ifsc}</p>
          {/* <br></br> */}
          <p>{record?.bank_account?.name}</p>
          {/* <br></br> */}
          <p>{record?.bank_account?.account_number}</p>
          </div>
          {/* <br></br> */}
          <div>
          <p>{record?.vpa?.address}</p>
          </div>
        </Flex>
      ),
    },
    // {
    //   title: "Details",
    //   dataIndex: 'vpa',
    //   render: (text) => (
    //     <Flex alignItems="center">
    //       {text?.address}
    //     </Flex>
    //   ),
    // },
    // {
    //   title: "Account Holder Name",
    //   dataIndex: 'bank_account',
    //   render: (text) => (
    //     <Flex alignItems="center">
    //       {text.name}
    //     </Flex>
    //   ),
    // },
    {
      title: "Created Date",
      dataIndex: "created_at",
      render: (text) => (
        <Flex alignItems="center">
          {moment(new Date(text * 1000)).format('DD-MMM-YYYY hh:mm:a')}
        </Flex>
      ),
    },
    {
      title: "Active",
      dataIndex: 'active',
      render: (text) => (
        <Flex alignItems="center">
          {text ? "Yes" :"No"}
        </Flex>
      ),
    },

  ]

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }

  // Table Filters JSX Elements
  // const filters = () => (
  //     <Flex className="mb-1" mobileFlex={false}>
  //         <div className="mr-md-3 mb-3">
  //             <Input
  //                 placeholder="Search"
  //                 prefix={<SearchOutlined />}
  //                 onChange={(e) => onSearch(e)}
  //             />
  //         </div>
  //         <div className="mb-3">
  //             <Select
  //                 className="w-100"
  //                 style={{ minWidth: 180 }}
  //                 placeholder="Status"
  //             >
  //                 <Option value="">All</Option>
  //                 {statuses.map((item) => (
  //                     <Option key={item.id} value={item}>
  //                         {item}
  //                     </Option>
  //                 ))}
  //             </Select>
  //         </div>
  //     </Flex>
  // )
const addBankAccount = ()=>{
  
        history.push(`/app/dashboards/wallet/bank-account/add-bank-account`)
    

}



  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {/* {filters()} */}
          {/* <div className="d-flex">
                    <Button
                        onClick={() => setCheckIfDeliverableOpen(true)}
                        block
                        className="mr-2"
                    >
                        Check If Deliverable?
                    </Button>
                    <Button
                        onClick={addShipment}
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        block
                    >
                        Add Shipment
                    </Button>
                </div> */}
        </Flex>
        <div className="table-responsive">
          <div >
            <Flex justifyContent='end'>
              <Button
                onClick={addBankAccount}
                type="primary"
                icon={<PlusCircleOutlined />}

              >
                Add Bank Account
              </Button>
            </Flex>
          </div>
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>

      </Card>
      {/* <BankAccountForm  setIsFormOpen={setIsFormOpen}  isFormOpen={isFormOpen} selectedVendorId={selectedVendorId} /> */}
    </>
  )



}

export default BankAccountList
