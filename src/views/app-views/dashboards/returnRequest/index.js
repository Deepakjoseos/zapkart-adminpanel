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
  Col, notification
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
import customerService from 'services/customer'
import constantsService from 'services/constants'
import orderService from 'services/orders'
import moment from 'moment'
import returnReqService from 'services/returnRequest'

const { Option } = Select

const Payout = () => {
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [userId, setUserId] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [paymentStatuses, setPaymentStatuses] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])
  const [customerPrescriptions, setCustomerPrescriptions] = useState([])
  const [statuses, setStatuses] = useState([])
  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const getReturnReqList = async(filterParams) => {
    const data = await returnReqService.getAllItems(
      // qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
    if(data) {
      setUsers(data.data)
      const userIds = data.data.map((cont) => { 
        return ({
        id: cont.userId,
        fullName: cont.userName
        })
    }) 
      setUserId(userIds)
      // {users.map((user) => (
      //   <Option key={user.id} value={user.id}>
      //     {user.fullName}
      //   </Option>
      // ))}
    }
  }

  useEffect(() => {
    getReturnReqList()
  }, [])


  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  const handleTableChange = (newPagination) => {
    getReturnReqList(
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const tableColumns = [
    {
      title: 'Order No',
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.orderId}`}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      render: (text, record) => (
        <Link to={`/app/dashboards/catalog/product/edit-product/${record.id}`}>
          {text}
        </Link>
      ),
    },

    {
      title: 'Quantity',
      dataIndex:'quantity',
    },

    {
      title: 'Price',
      dataIndex:'price',
    },
    // {
    //   title: 'Approved',
    //   dataIndex: 'approved',
    //   render:(app) => (app ? 
    //     <div>Yes</div> : <div>No</div> )
    // },
    {
      title: 'Order Date',
      dataIndex: 'orderedAt',
      render: (orderedAt) => (<div>{moment(new Date(orderedAt * 1000)).format('DD-MM-YYYY hh:mm:a')}</div>)
    },
    {
      title: 'Return-Requested Date',
      dataIndex: 'returnRequestedAt',
      render: (returnRequestedAt) => <div>{moment(new Date(returnRequestedAt * 1000)).format('DD-MM-YYYY hh:mm:a')}</div>
    },
    {
      title: '',
      dataIndex: 'status',
      render: (status) => <Button 
        type={status === "Return Requested" ? "primary" : ""}
        disabled={status === "Return Requested" ? false : true}
        onClick={() => { }}
      >{status === "Return Requested" ? "Approve" : "Approved"}</Button>
      // {data === 'Return Requested' ?(<Button type='primary'>Approve</Button>):(<Button disabled>Approved</Button>)}
    },
  ]

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })

  const handleFilterSubmit = async () => {
    setPagination(resetPagination())

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // console.log(values, "heyy");
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getReturnReqList(sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getReturnReqList()
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
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="userId" label="Customers">
            <Select
              showSearch
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Users"
            >
              <Option value="">All</Option>
              {userId.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
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

return(
  <Card> 
    <span alignItems="center" justifyContent="between" mobileFlex={false}>
      {filtersComponent()}
    </span>
    <div className="table-responsive">
        <Table
          // scroll={{
          //   x: true,
          // }} 
         // pagination={pagination}
          loading={loading}
          // onChange={handleTableChange}
          columns={tableColumns}
          dataSource={users}
          rowKey="id"
        />
      </div>
  </Card>
)
}

export default Payout