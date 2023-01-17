import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Form,
  Row,
  Col, notification, DatePicker
} from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import qs from 'qs'
import utils from 'utils'
import brandService from 'services/brand'
import _ from 'lodash'
import { useHistory, Link } from 'react-router-dom'
// import customerService from 'services/customer'
// import constantsService from 'services/constants'
import orderService from 'services/orders'
import constantsService from 'services/constants'
import moment from 'moment'

const { Option } = Select

const getPaymentStatus = (status) => {
  if (status === 'Paid') {
    return 'success'
  }
  if (status === 'Pending') {
    return 'warning'
  }
  if (status === 'Expired') {
    return 'error'
  }
  return ''
}

const getShippingStatus = (status) => {
  if (status === 'Ready') {
    return 'blue'
  }
  if (status === 'Shipped') {
    return 'cyan'
  }
  return ''
}

const Orders = () => {
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [paymentStatuses, setPaymentStatuses] = useState([])
  const [, setOrderStatuses] = useState([])
  const [paymentType, setPaymentType] = useState([])
  const [statuses, setStatuses] = useState([])
  const [orderStats, setOrderStats] = useState([])
  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })
  
  const orderStatuses = ["Pending","Verifying Prescription","Prescriptions Missing","Failed","Confirmed","Shipping Soon","Shipped","Delivered","Cancelled","Returned","Completed"]

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
      // console.log(data)
      // setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
      setPaymentType(Object.values(data.GENERAL['PAYMENT_TYPE']))
    data.ORDER['ORDER_STATUS'] 
      &&
      setOrderStats(Object.values(data.ORDER['ORDER_STATUS']))
      // data.TEMPLATE['NOTIFICATION_TYPE'] &&
      //     setNotificationType(Object.values(data.TEMPLATE['NOTIFICATION_TYPE']))
      // data.TEMPLATE['NOTIFICATION_CATEGORY_TYPE'] &&
      //     setNotificationCategory(Object.values(data.TEMPLATE['NOTIFICATION_CATEGORY_TYPE']))
    }

  }
  
  const getOrders = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await orderService.getOrders(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )

    if (data.data) {
      setList(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    } 
    console.log(data,'orders')
  }

  useEffect(() => {
    getOrders({
      pagination,
    })
    fetchConstants() 
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    
    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values 
        const sendingValues = _.pickBy({...values,
          fromDate: values.fromDate ? moment(values.fromDate).format() : '', 
          toDate: values.toDate ? moment(values.toDate).format():'',
        }, _.identity,)

        getOrders({ pagination: newPagination }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // console.log('order Status', orderStatuses)


  
  

  const tableColumns = [
    {
      title: 'Order No',
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
          {text}
        </Link>
      ),
    },

    {
      title: 'Customer Name',
      dataIndex: 'userName',

    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

    },
    {
      title: 'Shipping Charge',
      dataIndex: 'shippingCharge',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'shippingCharge'),
    },
    
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <Flex alignItems="center">
        {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}          
        </Flex>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      render: (status, record) => (
        <>
          {status}
        </>
      ),
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus'),
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment',
      render: (payment, record) => {
        return <Flex alignItems="centre" >
         
          {payment?.status === 'COMPLETED' ? 
          <Tag style={{backgroundColor:"#87d068",color:"white"}}>COMPLETED</Tag> : 
          <Tag  style={{backgroundColor:"#f50",color:"white"}}>PENDING</Tag>}
          </Flex>
      },
    },
  ]

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows)
      setSelectedRowKeys(key)
    },
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
        const sendingValues = _.pickBy({...values,
          fromDate: values.fromDate ? moment(values.fromDate).format() : '', 
          toDate: values.toDate ? moment(values.toDate).format():''},           
          _.identity)
        getOrders({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getOrders({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Flex className="mb-1 flex-wrap" mobileFlex={false}>
        <Col md={7} sm={24} xs={24} lg={7}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>

        <Col md={7} sm={24} xs={24} lg={7}>
          <Form.Item name="status" label="Order Status">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Order Status"
            >
              <Option value="">All</Option>
              {orderStats?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>

        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="statusOtherThan" label="Status Other Than">

            <Select showSearch
              defaultValue="Failed"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status Other Than"
            >
              <Option value="">All</Option>
              {orderStats?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col> */}

        <Col md={7} sm={24} xs={24} lg={7}>
          <Form.Item name="paymentType" label="Payment Type">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Payment Type"
            >
              <Option value="">All</Option>
              {paymentType?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>        
                
        <Col className="mr-md-3 mb-3">
          <Form.Item name="fromDate" label="From Date">

          <DatePicker/>

          </Form.Item>
        </Col>

        <Col className="mr-md-3 mb-3">
          <Form.Item name="toDate" label="To Date">

          <DatePicker />

          </Form.Item>
        </Col>

        <Col className="mt-4">
          <Button  className='mr-3'  type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
          {/* </Col> */}

          {/* <Col md={3} sm={6} xs={6} lg={6}> */}
          <Button  type="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Col>
        </Flex>
      </Row>
      
    </Form>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
    
      </Flex>
     
      <div className="table-responsive">
        <Table
          scroll={{
            x: true,
          }} pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: 'checkbox',
            preserveSelectedRowKeys: false,
            ...rowSelection,
        }}
        />

      </div>
    </Card>
  )
}

export default Orders
