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
import districtService from 'services/district'
import _ from 'lodash'
import cityService from 'services/city'

import constantsService from 'services/constants'
import stateService from 'services/state'

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
        <Tag color="orange">Hold</Tag>
      </>
    )
  }
  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    )
  }
  return null
}
const DistrictList = () => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [states, setStates] = useState([])
  const [city, setCity] = useState([])
  // paginatn
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }
  const getStates = async () => {
    const data = await stateService.getState()
    if (data) {
      setStates(data.data)
    }
  }
  const getCity = async () => {
    const data = await cityService.getCity()
    if (data) {
      setCity(data.data)
    }
  }
  // Changed here for pagination
  const getDistrict = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await districtService.getDistrict(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )

    if (data) {
      setList(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    getDistrict({
      pagination,
    })
    fetchConstants()
    getStates()
    getCity()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    getDistrict(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
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

  const addDistrict = () => {
    history.push(`/app/dashboards/locality/district/adddistrict`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/locality/district/editdistrict/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await districtService.deleteDistrict(row.id)

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
      title: SITE_NAME === 'zapkart' ? 'District' : 'Country',
      dataIndex: 'name',

      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
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
    {
      title: 'Priority',
      dataIndex: 'priority',

      sorter: (a, b) => utils.antdTableSorter(a, b, 'priority'),
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
        getDistrict({ pagination: resetPagination() }, sendingValues)
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
    getDistrict({ pagination: resetPagination() }, {})
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
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="status" label="Status">
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
          </Form.Item>
        </Col>
        {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item
            name="stateId"
            label="State"
            >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              className="w-100"
              style={{ minWidth: 180 }}
              // onChange={(value) => setSelectedBrandId(value)}
              // onSelect={handleQuery}
              placeholder="city"
              // value={selectedBrandId}
            >
              <Option value="">All</Option>
              {states.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        )}




        <Col md={6} sm={24} xs={24} lg={6}>
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
        {filtersComponent()}
        <div>
          <Button
            onClick={addDistrict}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            {SITE_NAME === 'zapkart' ? 'Add District' : 'Add Country'}
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </Card>
  )
}

export default DistrictList
