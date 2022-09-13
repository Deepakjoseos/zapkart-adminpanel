import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import WidegetListData from 'assets/data/product-list.data.json'
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
import widgetService from 'services/widget'
import moment from 'moment'
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
const WidegetList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedOrder, setSelectedorder] = useState(null)
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    const getWidgets = async () => {
      const data = await widgetService.getWidgets()
      if (data) {
        setList(data)
        setSearchBackupList(data)
        console.log(data, 'show-data')
      }
    }
    getWidgets()
    fetchConstants()
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
    history.push(`/app/dashboards/widget/add-widget`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/widget/edit-widget/${row.id}`)
  }

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  const deleteRow = async (row) => {
    const resp = await widgetService.deleteWidget(row.id)

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
      title: 'Widget',
      dataIndex: 'tabTitle',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'tabTitle'),
    },
    {
      title: 'Show Title',
      dataIndex: 'isTitleShow',
      render: (text) => (
        <Flex justifyContent="center">{text ? 'Yes' : 'No'}</Flex>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'priority'),
    },
    {
      title: 'Number of Items',
      dataIndex: 'numberOfItems',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'numberOfItems'),
    },
    {
      title: 'Listing Type',
      dataIndex: 'listingType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'listingType'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (startDate) => moment(startDate).format('MMMM Do YYYY'),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'startDate'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (endDate) => moment(endDate).format('MMMM Do YYYY'),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'endDate'),
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
      title: 'Actions',
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
  const handleQuery = async () => {
    const query = {}
    if ((selectedOrder) !== 'All')
      query.orderByPriority = selectedOrder
    console.log('query', query)
    const data = await widgetService.getWidgets(query)
    if (data) {
      setList(data)
      setSearchBackupList(data)
    }
  }

  const handleClearFilter = async () => {
    setSelectedorder(null)

    const data = await widgetService.getWidgets({})
    if (data) {
      setList(data)
      setSearchBackupList(data)
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
      <div >
        <Button type="primary" className="mr-2 mt-4 " onClick={handleQuery}>
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
          Add Widget
        </Button>
      </div>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default WidegetList
