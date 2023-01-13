import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag } from 'antd'
// import TemplateListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import qs from 'qs'
import notificationService from 'services/notification'
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
const NotificationList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [statuses,setStatuses] = useState([])

  const getTemplates = async (paginationParams, filterParams={}) => {
    const data = await notificationService.getNotifications(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
    if (data) {
      setList(data.data)
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      // setLoading(false)
      setSearchBackupList(data.data)
      console.log(data, 'show-data', list , "list")
    }
  }

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
  
      setStatuses(Object.values(data.GENERAL['STATUS']))
  
    }
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })

  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })

  const handleTableChange = (newPagination) => {
    getTemplates(
      {
        pagination: newPagination,
      },
      // filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  useEffect(() => {

    getTemplates(pagination)
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
      
    </Menu>
  )

  const addProduct = () => {
    history.push(`/app/dashboards/notifications/add-notification`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/notifications/edit-notification/${row.id}`)
  }





  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Notification Category',
      dataIndex: 'notificationCategoryType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Listing Type',
      dataIndex: 'listingType',
      // render: (status) => (
      //   <Flex alignItems="center">{getStockStatus(status)}</Flex>
      // ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    // {
    //   title: '',
    //   dataIndex: 'actions',
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   ),
    // },
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
            {statuses?.map((item) => (
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
        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Template
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table 
          columns={tableColumns} 
          dataSource={list} 
          rowKey="id" 
          pagination={pagination}
          //  loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  )

  }
export default NotificationList
