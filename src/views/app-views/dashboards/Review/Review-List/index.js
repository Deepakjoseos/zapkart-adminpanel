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
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import utils from 'utils'

import cityService from 'services/city'
import _ from 'lodash'

import constantsService from 'services/constants'
import districtService from 'services/district'
import stateService from 'services/state'
import reviewService from 'services/review'
const { Option } = Select


const ReviewList = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME

  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [reviews, setReviews] = useState([])
  
  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
 
  const getReviews = async (paginationParams = {}, filterParams) => {
    const data = await reviewService.getReviews( qs.stringify(getPaginationParams(paginationParams)),
    qs.stringify(filterParams))
    
    if (data) {
      setList(data)
    }
  }
 

  useEffect(() => {
  getReviews(pagination)
  }, [])
  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
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
        console.log('info', info)
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
      title: 'userImage',
      dataIndex: 'userImage',
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
      sorter: (a, b) => utils.antdTableSorter(a, b, 'userImage'),
    },
    {
      title: "userName",
      dataIndex: 'userName',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'userName'),
    },
    
    {
      title: "title",
      dataIndex: 'title',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'title'),
    },
    {
      title: "message",
      dataIndex: 'message',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'message'),
    },
    {
      title: "rating",
      dataIndex: 'rating',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'rating'),
    },
    
    // {
    //   title: 'District',
    //   dataIndex: 'districtName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'districtName'),
    // },
    // {
    //   title: 'State',
    //   dataIndex: 'stateName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'stateName'),
    // },
    // {
    //   title: 'Country',
    //   dataIndex: 'countryName',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'countryName'),
    // },
    

  ]

  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          {/* <Form.Item name="status" label="Status">
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
          </Form.Item> */}
        </Col>

        &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;
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
