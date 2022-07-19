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
} from 'antd'
// import CustomerListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import customerService from 'services/customer'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import ViewAddresses from './ViewAddresses'

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
const CustomerList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedViewAddress, setSelectedViewAddress] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    const getCustomers = async () => {
      const data = await customerService.getCustomers()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getCustomers()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editUserRedirect(row.id)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit User</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => setSelectedViewAddress(row.address)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Address</span>
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

  const handleStatusChange = async (value, selectedRow) => {
    const updatedProductApproval = await customerService.ediCustomerStatus(
      selectedRow.id,
      { status: value }
    )

    if (updatedProductApproval) {
      notification.success({ message: 'Customer Status Updated' })

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

  const tableColumns = [
    {
      title: 'Customer',
      dataIndex: 'firstName',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.displayImage}
            name={record.firstName}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
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
      render: (status, row) => {
        return (
          <Select
            defaultValue={status.charAt(0).toUpperCase() + status.slice(1)}
            // style={{ width: 120 }}
            onChange={(e) => handleStatusChange(e, row)}
          >
            <Option value="Active">
              <Tag color="green">Active</Tag>
            </Option>
            <Option value="Hold">
              <Tag color="red">Hold</Tag>
            </Option>
          </Select>
        )
      },
      // render: (isUnlimited) => <Flex>{isUnlimited ? 'Yes' : 'No'}</Flex>,
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'approval'),
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
        {/* <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add UserGroup
          </Button>
        </div> */}
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />

        <ViewAddresses
          selectedViewAddress={selectedViewAddress}
          setSelectedViewAddress={setSelectedViewAddress}
        />
      </div>
    </Card>
  )
}

export default CustomerList
