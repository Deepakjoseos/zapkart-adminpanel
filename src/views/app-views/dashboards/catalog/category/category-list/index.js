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
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import categoryService from 'services/category'

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
  const [selectedRows, setSelectedRows] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedOrderByLevel,setSelectedOrderByLevel] = useState(null)
  const [selectedOrder,setSelectedorder] = useState(null)

  useEffect(() => {
    const getCategories = async () => {
      const data = await categoryService.getCategories()
      if (data) {
        setList(data)
        setSearchBackupList(data)
      }
    }
    getCategories()
  }, [])

  const getParentName = (parentId) => {
    const parentName = searchBackupList.find((cur) => cur.id === parentId)
    return parentName ? parentName.name : ''
  }

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
    history.push(`/app/dashboards/catalog/category/add-category`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/category/edit-category/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await categoryService.deleteCategory(row.id)

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

  const tableColumns = [
    {
      title: 'Category',
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.image}
            name={record.name}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Parent',
      dataIndex: 'parentId',
      render: (parentId) => <span>{getParentName(parentId)}</span>,
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'parentId'),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'parentId'),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
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
  const handleQuery = async () => {
    const query = {}
    if ((selectedOrder) !== 'All')
      query.orderByPriority = selectedOrder
      query.orderByLevel=selectedOrderByLevel

    console.log('query', query)
    const data = await categoryService.getCategories(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }


  const handleClearFilter = async () => {
    setSelectedorder(null)
    setSelectedOrderByLevel(null)
 
    const data = await categoryService.getCategories({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }
  const onSearch = (e) => {
    const value = e.target.value
    const searchArray = e.target.value ? searchBackupList : list
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
      <label className="mt-2">Search</label>

        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mr-md-3 mb-3">
      <label className="mt-2">Status</label>

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
      <label className="mt-2">Order By Priority</label>
      <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedorder(value)}
          // onSelect={handleQuery}
          value={selectedOrder}
          placeholder="OrderBy Priority">
            
             <Option value="">All</Option>
             <Option value="true">Yes</Option>
             <Option value="false">No</Option>
          </Select>
      </div>
      <div className="mr-md-3 mb-3">
      <label className="mt-2">Order By Level</label>
      <Select
          className="w-100"
          style={{ minWidth: 180 }}
          onChange={(value) => setSelectedOrderByLevel(value)}
          // onSelect={handleQuery}
          value={selectedOrderByLevel}
          placeholder="OrderBy Level">
            
             <Option value="">All</Option>
             <Option value="true">Yes</Option>
             <Option value="false">No</Option>
          </Select>
      </div>
      <div >
        <Button type="primary" className="mr-2 mt-4" onClick={handleQuery}>
          Filter
        </Button>
      </div>
      <div>
        <Button type="primary" className="mr-2 mt-4" onClick={handleClearFilter}>
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
            Add Category
          </Button>
        </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default ProductList
