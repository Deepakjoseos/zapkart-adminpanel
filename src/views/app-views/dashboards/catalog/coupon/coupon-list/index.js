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
import couponService from 'services/coupon'
import moment from 'moment'
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
const CouponList = () => {
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
    pageSize: 10,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  // Changed here for pagination
  const getCoupons = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await couponService.getCoupons(
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
    getCoupons({
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
    getCoupons(
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

  const addProduct = () => {
    history.push(`/app/dashboards/catalog/coupon/add-coupon`)
  }

  const viewDetails = (row) => {
    history.push(`/app/dashboards/catalog/coupon/edit-coupon/${row.id}`)
  }

  const deleteRow = async (row) => {
    const resp = await couponService.deleteCoupon(row.id)

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

  // Pagination
  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 15,
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
        getCoupons({ pagination: resetPagination() }, sendingValues)
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
    getCoupons({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  const tableColumns = [
    {
      title: 'Coupon',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'code'),
    },
    {
      title: 'Value Type',
      dataIndex: 'valueType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'valueType'),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'value'),
    },
    // {
    //   title: 'maxAmount',
    //   dataIndex: 'maxAmount',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'maxAmount'),
    // },
    // {
    //   title: 'minOrderAmount',
    //   dataIndex: 'minOrderAmount',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'minOrderAmount'),
    // },
    {
      title: 'Available Type',
      dataIndex: 'availableType',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'availableType'),
    },
    {
      title: 'Available',
      dataIndex: 'available',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'available'),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (startDate) => moment(startDate).format('MMMM Do YYYY'),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'startDate'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (endDate) => moment(endDate).format('MMMM Do YYYY'),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'endDate'),
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

  // const onSearch = (e) => {
  //   const value = e.currentTarget.value
  //   const searchArray = e.currentTarget.value ? list : searchBackupList
  //   const data = utils.wildCardSearch(searchArray, value)
  //   setList(data)
  //   setSelectedRowKeys([])
  // }

  // const handleShowStatus = (value) => {
  //   if (value !== 'All') {
  //     const key = 'status'
  //     const data = utils.filterArray(searchBackupList, key, value)
  //     setList(data)
  //   } else {
  //     setList(searchBackupList)
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

        <Col className="mb-4 ml-5">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
          <Button className="ml-1" type="primary" onClick={handleClearFilter}>
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
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Coupon
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table scroll={{
          x: true,
        }}
          columns={tableColumns} dataSource={list} rowKey="id" pagination={pagination}
          loading={loading}
          onChange={handleTableChange} />
      </div>
    </Card>
  )
}

export default CouponList
