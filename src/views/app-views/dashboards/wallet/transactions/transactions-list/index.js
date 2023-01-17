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
const TransactionList = () => {
    let history = useHistory()

    const [list, setList] = useState([])
    const [searchBackupList, setSearchBackupList] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [checkIfDeliverableOpen, setCheckIfDeliverableOpen] = useState(false)
    const [statuses, setStatuses] = useState([])

    // Getting Brands List to display in the table
    const getTransactions = async () => {
        const data = await walletService.getTransactions()
        if (data) {
            setList(data)
            setSearchBackupList(data)
            console.log(data, 'show-data')
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
        getTransactions()
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

    const addShipment = () => {
        history.push(`/app/dashboards/shipments/shipment/add-shipment`)
    }

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
            title: 'Amount',
            dataIndex: 'amount',
            //   render: (text) => <Link to={`/app/dashboards/shipments/shipment/shipment-view/${text}`}>
            //     {text}
            //   </Link>
        },
        {
            title:"Type",
            dataIndex:'type'
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
        {
            title:'User',
            dataIndex:"userId"
        },
        {
            title: 'Order',
            render: (_, row) => {
                return (
                    <Flex flexDirection="column" justifyContent="center">

                        {/* {row.name}{row?.variant && `(${row.variant.name})`}   */}
                        <span>OrderId:</span>
                        <Link to={`/app/dashboards/orders/order-view/${row.orderId}`}>
                            {row.orderId}
                            <p>ItemId:</p>
                            {row.itemId}
                        </Link>
                    </Flex>
                )
            }
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
    const filters = () => (
        <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
                <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => onSearch(e)}
                />
            </div>
            <div className="mb-3">
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
            </div>
        </Flex>
    )




    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                {filters()}
                <div className="d-flex">
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
                </div>
            </Flex>
            <div className="table-responsive">
                <Table columns={tableColumns} dataSource={list} rowKey="id" />
            </div>
         
        </Card>
    )
}

export default TransactionList
