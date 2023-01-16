import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Menu, Tag, notification, Modal, Button } from 'antd'
import { EyeOutlined, SearchOutlined, PlusCircleOutlined ,DeleteOutlined } from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import vendorService from 'services/vendor'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import constantsService from 'services/constants'
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
const VendorList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [pickUpLocations, setPickUpLocations] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statuses, setStatuses] = useState([])


  useEffect(() => {
    const getVendors = async () => {
      const data = await vendorService.getVendors()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getVendors()
    fetchConstants()
  }, [])

  const viewDetails = (row) => {
    history.push(`/app/dashboards/users/vendor/edit-vendor/${row.id}`)
  }
  const addVendor = () => {
    history.push(`/app/dashboards/users/vendor/add-vendor`)

  }
  const viewPickUpLocations = (row) => {
    setPickUpLocations(row.pickupLocations)
    setIsModalVisible(true);
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => viewPickUpLocations(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View PickUpLocations</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  )

  // const addProduct = () => {
  //   history.push(`/app/dashboards/users/usergroup/add-usergroup`)
  // }

  // const viewDetails = (row) => {
  //   history.push(`/app/dashboards/users/usergroup/edit-usergroup/${row.id}`)
  // }

  const deleteRow = async (row) => {
    const resp = await vendorService.deleteVendor(row.id)

    if (resp) {
      const objKey = 'id'
      let data = list
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id)
          setList(data)
          setSelectedRows([])
        })
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id)
        setList(data)
      }
    }
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  const handleStatusChange = async (value, selectedRow) => {
    const updatedProductApproval = await vendorService.editVendorStatus(
      selectedRow.id,
      { status: value }
    )

    if (updatedProductApproval) {
      notification.success({ message: 'Vendor Status Updated' })

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
  const pickUpLocationsColumns = [
    {

      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {

      title: 'City',
      dataIndex: 'city',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'city'),
    },
    {

      title: 'State',
      dataIndex: 'state',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'state'),
    },
    // {

    //   title: 'Country',
    //   dataIndex: 'country',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'country'),
    // },

    {

      title: 'PinCode',
      dataIndex: 'pinCode',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'pinCode'),
    },

  ]

  const tableColumns = [
    {
      title: 'Vendor',
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
    // {
    //   title: 'Commission',
    //   dataIndex: 'commission',
    //   render: (commission) => `${commission}%`,
    // },

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
            <Option value="Blocked">
              <Tag color="red">Blocked</Tag>
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
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {filters()}
          <div>
            <Button
              onClick={addVendor}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Vendor
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />

          {/* <ViewAddresses
          selectedViewAddress={selectedViewAddress}
          setSelectedViewAddress={setSelectedViewAddress}
        /> */}
        </div>
      </Card>
      <Modal title="Basic Model" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={pickUpLocationsColumns} dataSource={pickUpLocations} />

      </Modal>
    </>
  )
}

export default VendorList
