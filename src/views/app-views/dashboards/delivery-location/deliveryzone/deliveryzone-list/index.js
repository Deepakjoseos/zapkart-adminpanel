import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import ProductListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import deliveryLocationService from 'services/deliveryLocation'
import vendorService from 'services/vendor'
import deliveryLocation from 'services/deliveryZone'
import deliveryzoneService from 'services/deliveryZone'

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
const DeliveryZonesList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [vendors,setVendors] = useState(null)
  const [selectedVendorId,setSelectedVendorId]= useState(null)
  const [selectedStatus,setSelectedStatus] = useState(null)

  useEffect(() => {
    const getDeliveryZones = async () => {
      const data = await deliveryzoneService.getDeliveryZones()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    const getVendors = async () => {
      const data = await vendorService.getVendors()
      if (data) {
         const vendorsList = data.map(cur => {
           return {
             ...cur, fullName: `${cur.firstName} ${cur.lastName}`
           }
         })
        setVendors(vendorsList)
      }
    }
  
    getDeliveryZones()
    getVendors()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => addDeliveryZoneLocation(row)}>
        <Flex alignItems="center">
          {/* <EyeOutlined /> */}
          <span className="ml-2">Add Delivery Zone Location</span>
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

  const addProduct = () => {
    // history.push(`/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone`)
    history.push(`/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone`)

  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/deliverylocation/deliveryzone/edit-deliveryzone/${row.id}`
    )
  }

//   const deleteRow = async (row) => {
//     const resp = await deliveryLocationService.dele(row.id)

//     if (resp) {
//       const objKey = 'id'
//       let data = list
//       if (selectedRows.length > 1) {
//         selectedRows.forEach((elm) => {
//           data = utils.deleteArrayRow(data, objKey, elm.id)
//           setList(data)
//           setSelectedRows([])
//         })
//       } else {
//         data = utils.deleteArrayRow(data, objKey, row.id)
//         setList(data)
//       }
//     }
//   }
const addDeliveryZoneLocation = (row) => {
  history.push(
     `/app/dashboards/deliverylocation/deliveryzone/add-deliveryzone-location/${row.id}`

  )
}
   const getVendorName = (vendorId) => {
    //  console.log('vendorId',vendorId)
    //  const vendor= vendors.find(e => e.id  === vendorId);
    //  console.log('vendor',vendor)
    //  return vendor?.fullName ? vendor.fullName :"-" 
    const getVendorName = vendors?.find((cur) => cur.id === vendorId)
    return getVendorName ? getVendorName.fullName : ''
   }
  const tableColumns = [
    {
      title: 'DeliveryZone',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    // {
    //   title: 'isFinal',
    //   dataIndex: 'isFinal',
    //   render: (isFinal) => (
    //     <Flex alignItems="center">{isFinal ? 'Yes' : 'No'}</Flex>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'isFinal'),
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
     {
       title: 'Vendor',
       dataIndex: 'vendorId',
      render: (vendorId) => (
        <Flex alignItems="center">{getVendorName(vendorId)}</Flex>
      ),
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
  const handleQuery = async () => {
    const query = {}
    if ((selectedVendorId) !== 'All')
      query.vendorId = selectedVendorId
      query.status=selectedStatus
  
    const data = await deliveryLocation.getDeliveryZones(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedVendorId(null)

    const data = await deliveryLocationService.getDeliveryLocations({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
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
      <label className='mt-2'>Search</label>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mr-md-3 mb-3">
      <label className='mt-2'>Status</label>
        <Select  
        // onChange={(value) => setSelectedStatus(value)}
          // onSelect={handleQuery}
          // value={selectedStatus}
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
      <div className="mr-md-3 mb-3">
        <label className='mt-2'>Vendors</label>
      <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedVendorId(value)}
          // onSelect={handleQuery}
          value={selectedVendorId}
          placeholder="Vendor">
             <Option value="">All</Option>
            {vendors?.map((vendor) => (
              <Option value={vendor.id}>
                {vendor?.firstName} {vendor?.lastName}
              </Option>
            ))}
          </Select>
      </div>
     
      <div >
        <Button type="primary" className="mr-1 mt-4" onClick={handleQuery}>
          Filter
        </Button>
      </div>
      <div>
        <Button type="primary" className="mr-1 mt-4" onClick={handleClearFilter}>
          Clear
        </Button>
      </div>
    </Flex>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
       
      </Flex>
      <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            
          >
            Add DeliveryZone
          </Button>
        </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default DeliveryZonesList
