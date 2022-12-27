import React from 'react'
import {
  Row,
  Col,
  Button,
  Card,
  Table,
  Tag,
  Select,
  Form,
  Badge,
  Tabs,
  DatePicker,
} from 'antd'
import qs from 'qs'
import salesService from 'services/sales'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import vendorService from 'services/vendor'
import productTemplateService from 'services/productTemplate'
import customerService from 'services/customer'
import moment from 'moment';
const { Option } = Select



const SalesCustomer = () => {
  
  const [customers, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [productTemplates, setTemplates] = useState([])

  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })
  const [list, setList] = useState([])
  const [vendors, setVendors] = useState([])
  const [filterEnabled, setFilterEnabled] = useState(false)

  const getSales = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await salesService.getSales(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
    console.log(data, 'hihihihihih')
    if (data) {
      setList([data])
      console.log(data, 'hihihihihih')
      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }

  const getProductTemplates = async () => {
    const data = await productTemplateService.getProductTemplates()
    const activeProductTemplates = data.data.filter(
      (cur) => cur.status === 'Active'
    )
    if (activeProductTemplates) {
      setTemplates(activeProductTemplates)
    }
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

  useEffect(() => {
    getProductTemplates()
  }, [])

  useEffect(() => {
    getVendors()
  }, [])

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
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  useEffect(() => {
    getSales({
      pagination,
    })
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })
  const handleTableChange = (newPagination) => {
    getSales(
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
        getSales({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getSales({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  // const handleQuery = async () => {
  //   const query = {}
  //   if ((selectedOrder) !== 'All')
  //     query.orderByPriority = selectedOrder

  //   console.log('query', query)
  //   const data = await informationService.getInformations(query)
  //   if (data) {
  //     setList(data)
  //     setSearchBackupList(data)
  //   }
  // }

  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="fromDate" label="From Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={4}>
          <Form.Item name="toDate" label="To Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="vendorIds" label="Vendors">
            <Select
              mode="multiple"
              className="w-100"
              style={{ minWidth: 100 }}
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

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="customerIds" label="Customers">
            <Select
              mode="multiple"
              className="w-100"
              style={{ minWidth: 100 }}
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

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="productTemplateIds" label="product Templates">
            <Select
              mode="multiple"
              className="w-100"
              style={{ minWidth: 100 }}
              placeholder="Product Templates"
            >
              <Option value="">All</Option>
              {productTemplates.map((temp) => (
                <Option value={temp.id}>{temp.name}</Option>
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

  
  const tableColumns2 = [
    {
      title: 'Total Customers',
      dataIndex: 'totalCustomers',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
  ]

 
  return (
    <div>
        <Card>
      <span alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
      </span>
      {/* <br></br>
      <Row gutter={5}>
      </Row>
      <br></br> */}
      <Row gutter={16}>
        <Col span={24}>
          <Table
            scroll={{
              x: true,
            }}
            columns={tableColumns2}
            dataSource={list}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
           
           
       
           
            loading={loading}
          
          />
        </Col>

       
    
      </Row>
      </Card>
    </div>
  )
}

export default SalesCustomer
