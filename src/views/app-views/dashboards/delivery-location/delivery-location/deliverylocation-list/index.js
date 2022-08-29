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
const ProductList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [vendors,setVendors] = useState(null)
  const [selectedVendorId,setSelectedVendorId]= useState(null)

  useEffect(() => {
    const getDeliveryLocations = async () => {
      const data = await deliveryLocationService.getDeliveryLocations()
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
    getDeliveryLocations()
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

  const addProduct = () => {
    history.push(`/app/dashboards/deliverylocation/delivery-location/add-deliverylocation`)
  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/deliverylocation/delivery-location/edit-deliverylocation/${row.id}`
    )
  }

  const deleteRow = async (row) => {
    const resp = await deliveryLocationService.deleteDeliveryLocation(row.id)

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

  const getParentName = (parentId) => {
    const parentName = searchBackupList.find((cur) => cur.id === parentId)
    return parentName ? parentName.name : ''
  }

  const tableColumns = [
    {
      title: 'Deliverylocation',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'isFinal',
      dataIndex: 'isFinal',
      render: (isFinal) => (
        <Flex alignItems="center">{isFinal ? 'Yes' : 'No'}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'isFinal'),
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
      title: 'Parent',
      dataIndex: 'parentId',
      render: (parentId) => (
        <Flex alignItems="center">{getParentName(parentId)}</Flex>
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
  
    const data = await deliveryLocationService.getDeliveryLocations(query)
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
                {vendor?.fullName}
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
            Add DeliveryLocation
          </Button>
        </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default ProductList
