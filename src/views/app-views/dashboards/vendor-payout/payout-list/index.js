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
  Col, notification, message
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
import payoutService from 'services/payout'
import vendorService from 'services/vendor'
import vendorPayoutService from 'services/vendorPayout'

const { Option } = Select

const PayoutList = () => {
  const [vendorList, setVendorList] = useState(null)
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

  const getPayout = async(paginationParams = {}, filterParams) => {
    const data = await vendorPayoutService.getPayouts(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
    if(data) {
      setUsers(data)
      const userIds = data.map((cont) => ({
        id: cont.userId,
        name: cont.userName
      })) 
      setUserId(userIds)
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }

  const approvePayout = async (data) => {
    const res = await payoutService.approvePayout(data)
    if(res){
      message.success('Approved')
    }
    getPayout();
  }

  const clickHandle = (value) => {
    // console.log(value, moment().format('DD-MM-YYYY hh:mm:a'))
    const data={
      walletPayoutId: value.id,
      approved: true,
      approvedOn: moment().format('DD-MM-YYYY hh:mm:a')
    }
    // console.log(data, "rohit")
    approvePayout(data)
  }

  useEffect(() => {
    getPayout({
      pagination,
    })
    getVendors()
  }, [])


  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  const handleTableChange = (newPagination) => {
    getPayout(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const tableColumns = [
    {
      title: 'Vendors',
      dataIndex: 'userName',
    },
    {
      title: 'Bank',
      dataIndex: 'bankAccount',
      render:(data) => {
        // console.log(data,"rohit")
        return (<div>{data?.nickName}</div>)}
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      // render: (text, record) => (
      //   <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
      //     {text}
      //   </Link>
      // ),
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      render:(app) => (app ? 
        <div>Yes</div> : <div>No</div> )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt) => (<div>{moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}</div>)
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (updatedAt) => (<div>{moment(new Date(updatedAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}</div>)
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => {
        const sendingValue = users.filter((user) => user.id === id)
        return(
          <>
              {sendingValue[0].approved ? 
                <>
                <Button disabled>Approved</Button>
                </> : <>
                <Button 
                  onClick={()=> clickHandle(sendingValue[0])}
                  type='primary'
                >Approve</Button>
                </>
              }
          </>
        )
        // return(<Button disabled={sendingValue[0].approved} type='primary' onClick={()=> clickHandle(sendingValue[0])}>Approve</Button>)
      }
      // render: (approved) => (<Button 
      //   onClick={() =>clickHandle()}
      //   type='primary' 
      //   disabled={approved}
      // >{approved ? 'Approved' : 'Approve'}</Button>)
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
        getPayout({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false)
      })
  }

  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getPayout({ pagination: resetPagination() }, {})
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
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col> */}

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="userId" label="Vendor Name">

            <Select showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Vendor"
            >
              <Option value="">All</Option>
              {vendorList?.map((item) => (
              <Option key={item.id} value={item.id}>
                {`${item.firstName} ${item.lastName}`}
              </Option>
            ))}
            </Select>

          </Form.Item>
        </Col>
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="userId" label="Customers">
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedUserId(value)}
              // onSelect={handleQuery}
              // value={selectedUserId}
              placeholder="Users"
            >
              <Option value="">All</Option>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}

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

  const getVendors = async() => {
    const data = await vendorService.getVendors()
    if(data) setVendorList(data)
  }

return(
  <Card> 
    <div alignItems="center" justifyContent="between" mobileFlex={false}>
      {filtersComponent()}
    </div>
    <div className="table-responsive">
        <Table
          scroll={{
            x: true,
          }} pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          columns={tableColumns}
          dataSource={users}
          rowKey="id"
        />
      </div>
  </Card>
)
}

export default PayoutList