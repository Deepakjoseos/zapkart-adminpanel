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
import brandService from 'services/brand'
import _ from 'lodash'
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
const BrandList = () => {
  let history = useHistory()
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
  // Changed here for pagination
  const getBrands = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await brandService.getBrands(
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
      fetchConstants()
    }
  }

  useEffect(() => {
    getBrands({
      pagination,
    })
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
    getBrands(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => Newtab(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Open In New Tab</span>
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
    history.push(`/app/dashboards/catalog/brand/add-brand`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/brand/edit-brand/${row.id}`)
  }
  const Newtab = (row) => {
    window.open(`/app/dashboards/catalog/brand/edit-brand/${row.id}`)
  }

  // For deleting a row
  const deleteRow = async (row) => {
    const resp = await brandService.deleteBrand(row.id)

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

  // Reset Pagination
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
        getBrands({ pagination: resetPagination() }, sendingValues)
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
    getBrands({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Brand',
      dataIndex: 'name',
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
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
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

  // Table Filters JSX Elements
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


        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="showDeleted" label="Show Deleted">

            <Select
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="showDeleted"
            >
              <Option value="">All</Option>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Form.Item>
        </Col>



        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="orderByPriority" label="Order By Priority">
            <Select className="w-100" placeholder="Order By Priority">
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
      {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}> */}
      {filtersComponent()}
      {/* </Flex> */}
      <div>
        <Button
          onClick={addProduct}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          Add Brand
        </Button>
      </div>
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

export default BrandList
