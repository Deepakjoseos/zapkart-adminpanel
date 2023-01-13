import React, { useEffect, useState } from 'react'
import { Card, Table, Select, Input, Button, Menu, Tag, Form ,Col ,Row, Modal} from 'antd'
// import TemplateListData from 'assets/data/product-list.data.json'
import {
  DownloadOutlined,
  FileImageOutlined,
  FileAddOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import _, { get } from 'lodash'
import utils from 'utils'
import notificationService from 'services/notification'
import constantsService from 'services/constants'
import moment from 'moment'


const { Option } = Select

// const getStockStatus = (status) => {
//   if (status === 'Active') {
//     return (
//       <>
//         <Tag color="green">Active</Tag>
//       </>
//     )
//   }
//   if (status === 'Hold') {
//     return (
//       <>
//         <Tag color="red">Hold</Tag>
//       </>
//     )
//   }
//   return null
// }

const NotificationList = () => {
  let history = useHistory()
  const [listingtype, setListingtype] = useState([])
  const [form] = Form.useForm()
  const [notificationtype, setNotificationType] = useState([])
  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [notificationCategory, setNotificationCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses,setStatuses] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
  })

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
  
      // setStatuses(Object.values(data.GENERAL['STATUS']))
      data.TEMPLATE['NOTIFICATION_HISTORY_LISTING_TYPES'] &&
          setListingtype(Object.values(data.TEMPLATE['NOTIFICATION_HISTORY_LISTING_TYPES']))
      data.TEMPLATE['NOTIFICATION_TYPE'] &&
          setNotificationType(Object.values(data.TEMPLATE['NOTIFICATION_TYPE']))
      data.TEMPLATE['NOTIFICATION_CATEGORY_TYPE'] &&
          setNotificationCategory(Object.values(data.TEMPLATE['NOTIFICATION_CATEGORY_TYPE']))
    }
  }
  const getTemplates = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await notificationService.getNotifications(
      qs.stringify(getPaginationParams(paginationParams)),
    qs.stringify(filterParams)
    )
    if (data) {
      console.log(data.data)
      setList(data.data)
      setSearchBackupList(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
      // console.log(data, 'show-notifications')
      // console.log(pagination,'setpagination')
      // console.log(data.total)
    }
  }
  
  useEffect(() => {
    getTemplates({
      pagination,
    })
    getTemplates()
    fetchConstants()
  }, [])


// pagination generator
const getPaginationParams = (params) => ({
  limit: params.pagination?.pageSize,
  page: params.pagination?.current,
  // ...params,
})


  // On pagination Change
  const handleTableChange = (newPagination) => {
    getTemplates(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })


// Filter Submit
const handleFilterSubmit = async () => {
  setPagination(resetPagination())

  form
    .validateFields()
    .then(async (values) => {
      setFilterEnabled(true)
      // Removing falsy Values from values
      const sendingValues = _.pickBy(values, _.identity)
      getTemplates({ pagination: resetPagination() }, sendingValues)
    })
    .catch((info) => {
      console.log('info', info)
      setFilterEnabled(false)
    })
}

const handleClearFilter = async () => {
  form.resetFields()

  setPagination(resetPagination())
  getTemplates({ pagination: resetPagination() }, {})
  setFilterEnabled(false)
}

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

  // const addProduct = () => {
  //   history.push(`/app/dashboards/notifications/add-notification`)
  // }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/notifications/notification-history/edit-notification/${row.id}`)
  }





  const tableColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => (
        <Flex alignItems="center">{email?.email}</Flex>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'email.email'),
    },
    {
      title: 'Email Subject',
      dataIndex: 'email',
      render: (email) => (
        <Flex alignItems="center">{email?.subject}</Flex>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'subject'),
    },
    {
      title: 'Listing Type',
      dataIndex: 'listingType',
      render: (listingType) => (
        <Flex alignItems="center">{listingType}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'listingType'),
    },  
    {
      title: 'Notification Category Type',
      dataIndex: 'notificationCategoryType',
      render: (notificationCategoryType) => (
        <Flex alignItems="center">{notificationCategoryType}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'notificationCategoryType'),
    },{
      title: 'Send Time',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <Flex alignItems="center">
        {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}           
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
    },{
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   // setSelected(prev => ({ ...prev, searchdata:(e.currentTarget.value)}))
  //   const searchArray = e.currentTarget.value ? list : searchBackupList
  //   const data = utils.wildCardSearch(searchArray, value)
  //   setList(data.data)
  //   setSelectedRowKeys([])

  // }
  const addNotification = () => {
    history.push(`/app/dashboards/notifications/notification-history/add-notification`)
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
    <Form
    layout="vertical"
    form={form}
    name="filter_form"
    className="ant-advanced-search-form"
  >
    <Row gutter={8} align="bottom">
      <Col md={6} sm={24} xs={24} lg={6}>
        <Form.Item name="search" label="Search">
          <Input 
            placeholder="Search" 
            prefix={<SearchOutlined />} 
            // onChange={(e) => onSearch(e)}
             />
          </Form.Item>
          </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="listingType" label="Listing Type">
            <Select
              className="w-100"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ minWidth: 180 }}
              placeholder="Listing Type"
            >
              <Option value="">All</Option>
              {listingtype.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="notificationCategoryType" label="Notification Category Type">
            <Select
              className="w-100"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ minWidth: 180 }}
              placeholder="Notification Category Type"
            >
              <Option value="">All</Option>
              {notificationCategory.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="notificationType" label="Notification Type">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Notification Type"
            >
              <Option value="">All</Option>
              {notificationtype.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div className='mt-5'>
          <Button
            onClick={addNotification}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
            className='mt-2'
          >
            Add General Notification
          </Button>
        </div>
        </Flex>
      <div className="table-responsive">
        <Table 
          columns={tableColumns}
          dataSource={list} 
          scroll={{
            x: true,
          }}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowKey="id" />
      </div>
    </Card>
  )

  }
export default NotificationList