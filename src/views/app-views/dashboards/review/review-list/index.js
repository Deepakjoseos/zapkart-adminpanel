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
  Col,
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
import { useHistory , Link } from 'react-router-dom'
import qs from 'qs'
import utils from 'utils'
import orderService from 'services/orders'
import cityService from 'services/city'
import _ from 'lodash'
import moment from 'moment'
import productService from 'services/product'
import customerService from 'services/customer'
import vendorService from 'services/vendor'
import reviewService from 'services/review'
const { Option } = Select


const ReviewList = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME

  let history = useHistory()
  const [form] = Form.useForm()
  const [orders, setOrders] = useState([])
  const [customers, setUsers] = useState([])
  const [vendors, setVendors] = useState([])
  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [reviews, setReviews] = useState([])
  const [products, setProducts] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
 
  useEffect(() => {
    getReviews(pagination)
    getVendors()
    getCustomers()
    getProductsTemplate()
    }, [])



  const getReviews = async (paginationParams = {}, filterParams) => {
    const data = await reviewService.getReviews( qs.stringify(getPaginationParams(paginationParams)),
    qs.stringify(filterParams))
    
    if (data) {
      setList(data.data)
      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
    }
    setLoading(false)

    // console.log(data,'reviews')
  }

  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        }
      })
      setVendors(users)
    }
  }

  const getProductsTemplate = async () => {
    const data = await productService.getPublicProducts(
    )
    const productsTemplate = data.data;
    if (productsTemplate) {
      const users = productsTemplate.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.name} `,
        }
      })
      setProducts(users)
      // console.log(users,'products');
    }
  }

  const getCustomers = async () => {
    const data = await customerService.getCustomers()
    if (data) {
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        }
      })
      setUsers(users)
      // console.log(users,'Customers')
    }
  }

  

  // useEffect(() => {
  //   // getReviews(pagination)
  //   getVendors()
  //   getCustomers()
  //   getProductsTemplate()
  //   }, [])


  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  })
  const handleTableChange = (newPagination) => {
    getReviews(
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
    getReviews({ pagination: resetPagination() }, {})
    setFilterEnabled(false)

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getReviews({ pagination: resetPagination() }, sendingValues)
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
    getReviews({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }

  const tableColumns = [
    {
      title: "Order No",
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.orderId}`}>
          {text}
        </Link>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'orderNo'),
    },
    {
      title: "Vendor Name",
      dataIndex: 'vendorName',
      render: (text, record) => (
      <Link to={`/app/dashboards/users/vendor/edit-vendor/${record.vendorId}`}>
          {text}
        </Link>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'vendorName'),
    },
    {
      title: "Product Name",
      dataIndex: 'itemName',
      render: (text, record) => (
        <Link to={`/app/dashboards/catalog/product/edit-product/${record.itemId}`}>
            {text}
          </Link>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'itemName'),
    },
    {
      title: 'Customers',
      dataIndex: 'userName',
      render: (_, record) => (
        <Flex alignItems="center">
          <AvatarStatus
            size={60}
            type="square"
            src={record.image}
            name={record.name}
          />
          <Link to={`/app/dashboards/users/customer/edit-customer/${record.userId}`}>
          {record.userName}
          </Link>
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'userName'),
    },
    
    
    {
      title: "Title & Rating",
      dataIndex: 'title',
      render: (_, record) => (
        <Flex alignItems="center">
          {record.title}({record.rating})
        </Flex>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'title'),
    },

    {
      title: "Message",
      dataIndex: 'message',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'message'),
    },
    // {
    //   title: "Rating",
    //   dataIndex: 'rating',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'rating'),
    // },
    
    {
      title: "Review Time",
      dataIndex: 'updatedAt',
      render: (createdAt) => (
        <Flex alignItems="center">
        {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}          
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'updatedAt'),
    },
    

  ]

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
        <Col md={6} sm={24} xs={24} lg={6}>
           <Form.Item name="userId" label="Customers">
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Customers"
            >
              <Option value="">All</Option>
              {customers.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item> 
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
           <Form.Item name="vendorId" label="Vendors">
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Vendors"
            >
              <Option value="">All</Option>
              {vendors.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item> 
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
           <Form.Item name="itemId" label="Products">
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Products"
            >
              <Option value="">All</Option>
              {products.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item> 
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
           <Form.Item name="orderNo" label="Order No">
           <Input placeholder="Order No" prefix={<SearchOutlined />} />
          </Form.Item> 
        </Col>
        {/* <Col md={6} sm={24} xs={24} lg={6}>
           <Form.Item name="orderId" label="Order Id">
           <Input placeholder="Order Id" prefix={<SearchOutlined />} />
          </Form.Item> 
        </Col> */}

        {/* &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; */}
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
        {/* <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item
            name="orderByPriority"
            label="OrderByPriority"
            className="ml-2"
          >
            <Select className="w-100" placeholder="OrderBy Priority">
              <Option value="">All</Option>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Form.Item>
        </Col> */}
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
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          reviews={reviews}
        />
      </div>
    </Card>
  )
}

export default ReviewList
