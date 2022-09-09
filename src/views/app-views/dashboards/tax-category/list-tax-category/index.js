import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  notification,
  Drawer,
} from 'antd'
// import CustomerListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import customerService from 'services/customer'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { groupList } from 'views/app-views/pages/profile/profileData'
import taxCategoryService from 'services/TaxCategory'

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
const TaxCategoryList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedViewAddress, setSelectedViewAddress] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [customerAddressOpen, setCustomerAddressOpen] = useState(false)
  const [customerAddFormOpen, setCustomerAddFormOpen] = useState(false)

  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [selectedPrescriptionCustomerId, setSelectedPrescriptionCustomerId] =
    useState(null)

  const getTaxCategories = async () => {
    const data = await taxCategoryService.getTaxCategories()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      console.log(selectedViewAddress, 'show-data')

     
    }
  }

  useEffect(() => {
    getTaxCategories()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editUserRedirect(row.id)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit User</span>
        </Flex>
      </Menu.Item>
      {/* <Menu.Item
        onClick={() => {
          setSelectedViewAddress(row.address)
          setSelectedCustomerId(row.id)
          setCustomerAddressOpen(true)
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Address</span>
        </Flex>
      </Menu.Item> */}
      {/* <Menu.Item
        onClick={() => {
          setSelectedPrescriptionCustomerId(row.id)
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Prescriptions</span>
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

  // const addProduct = () => {
  //   history.push(`/app/dashboards/users/usergroup/add-usergroup`)
  // }

  const editUserRedirect = (id) => {
    history.push(`/app/dashboards/users/customer/edit-customer/${id}`)
  }

  // const deleteRow = async (row) => {
  //   const resp = await customerService.deleteUserGroup(row.id)

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
  const addCustomer = () => {
    history.push(`/app/dashboards/users/customer/add-customer`)
  }



  const tableColumns = [
    // {
    //   title: 'Customer',
    //   dataIndex: 'firstName',
    //   render: (_, record) => (
    //     <div className="d-flex">
    //       <AvatarStatus
    //         size={60}
    //         type="square"
    //         src={record.displayImage}
    //         name={record.firstName}
    //       />
    //     </div>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    // },
    {
      title: 'Groups',
      dataIndex: 'groups',
      render: (groups) => {
        return (
          <>
            {groups?.map((group) => (
              <>
                <p>{group.name}</p>
                {/* <p>Type:{group.type}</p>
          <p>Status:{group.status}</p> */}
              </>
            ))}
          </>
        )
      },
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => (
          <Flex alignItems="center">{getStockStatus(status)}</Flex>
        ),
        sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
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
          defaultValue="All"
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={handleShowStatus}
          placeholder="Status"
        >
          <Option value="All">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Hold">Hold</Option>
        </Select>
      </div>
    </Flex>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={addCustomer}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Customer
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />

        {/* <ViewAddresses
          selectedViewAddress={selectedViewAddress}
          setSelectedViewAddress={setSelectedViewAddress}
          setCustomerAddressOpen={setCustomerAddressOpen}
          customerAddressOpen={customerAddressOpen}
          selectedCustomerId={selectedCustomerId}
          refetchData={getCustomers}
        />
        
        <ViewPrescriptions
          selectedPrescriptionCustomerId={selectedPrescriptionCustomerId}
          setSelectedPrescriptionCustomerId={setSelectedPrescriptionCustomerId}
        /> */}
      </div>
    </Card>
  )
}

export default TaxCategoryList
