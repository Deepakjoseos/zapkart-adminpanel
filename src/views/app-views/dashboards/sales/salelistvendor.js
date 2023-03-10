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
// import Flex from 'components/shared-components/Flex'
// import AvatarStatus from 'components/shared-components/AvatarStatus';
// import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
// import DonutChartWidget from 'components/shared-components/DonutChartWidget'
// import NumberFormat from 'react-number-format';
import Flex from 'components/shared-components/Flex'
import {
  CloudDownloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserSwitchOutlined,
  FileDoneOutlined,
  SyncOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import ChartWidget from 'components/shared-components/ChartWidget'
import { COLORS } from 'constants/ChartConstant'

import {
  weeklyRevenueData,
  topProductData,
  customerChartData,
  sessionData,
  sessionLabels,
  conbinedSessionData,
  sessionColor,
  recentOrderData,
} from './SalesDashboardData'
// import moment from 'moment';
// import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
// import utils from 'utils'
import { useSelector } from 'react-redux'
import salesService from 'services/sales'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import vendorService from 'services/vendor'
import productTemplateService from 'services/productTemplate'
import customerService from 'services/customer'
const { Option } = Select
const { TabPane } = Tabs
// const getPaymentStatus = status => {

// 	if(status === 'Paid') {
// 		return 'success'
// 	}
// 	if(status === 'Pending') {
// 		return 'warning'
// 	}
// 	if(status === 'Expired') {
// 		return 'error'
// 	}
// 	return ''
// }

// const getShippingStatus = status => {
// 	if(status === 'Ready') {
// 		return 'blue'
// 	}
// 	if(status === 'Shipped') {
// 		return 'cyan'
// 	}
// 	return ''
// }

const WeeklyRevenue = () => {
  const { direction } = useSelector((state) => state.theme)
  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <flex
            className="h-100"
            flexDirection="column"
            justifyContent="between"
          >
            <div>
              <h4 className="mb-0">Weekly Revenue</h4>
              <span className="text-muted">8 - 15 Jul, 2020</span>
            </div>
            <div className="mb-4">
              <h1 className="font-weight-bold">$27,188.00</h1>
              <p className="text-success">
                <span>
                  <ArrowUpOutlined />
                  <span> 17% </span>
                </span>
                <span>growth from last week</span>
              </p>
              <p>
                Total gross income figure based from the date range given above.
              </p>
            </div>
          </flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="mb-3 text-right">
            <Button icon={<CloudDownloadOutlined />}>Download Report</Button>
          </div>
          <ChartWidget
            card={false}
            series={weeklyRevenueData.series}
            xAxis={weeklyRevenueData.categories}
            title="Unique Visitors"
            height={250}
            type="bar"
            customOptions={{ colors: COLORS }}
            direction={direction}
          />
        </Col>
      </Row>
    </Card>
  )
}

// const DisplayDataSet = () => (
// 	<Row gutter={16}>
// 		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
// 			<DataDisplayWidget
// 				icon={<FileDoneOutlined />}
// 				value="11,831"
// 				title="Total order"
// 				color="cyan"
// 				vertical={true}
// 				avatarSize={55}
// 			/>
// 			<DataDisplayWidget
// 				icon={<BarChartOutlined />}
// 				value="$6,922"
// 				title="Total profit"
// 				color="gold"
// 				vertical={true}
// 				avatarSize={55}
// 			/>
// 		</Col>
// 		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
// 			<DataDisplayWidget
// 				icon={<SyncOutlined />}
// 				value="26.9%"
// 				title="Conversion rate"
// 				color="blue"
// 				vertical={true}
// 				avatarSize={55}
// 			/>
// 			<DataDisplayWidget
// 				icon={<UserSwitchOutlined />}
// 				value="873"
// 				title="Daily visitors"
// 				color="volcano"
// 				vertical={true}
// 				avatarSize={55}
// 			/>
// 		</Col>
// 	</Row>
// )

// const TopProduct = () => (
// 	<Card
// 		title="Top Product"
// 		extra={
// 			<Select defaultValue="week" size="small" style={{minWidth: 110}}>
// 				<Option value="week">This Week</Option>
// 				<Option value="month">This Month</Option>
// 				<Option value="year">This Year</Option>
// 			</Select>
// 		}
// 	>
// 		{topProductData.map(elm => (
// 			<Flex className="w-100 py-3" justifyContent="between" alignItems="center" key={elm.name}>
// 				<AvatarStatus shape="square" src={elm.image} name={elm.name} subTitle={elm.category}/>
// 				<Flex>
// 					<div className="mr-3 text-right">
// 						<span className="text-muted">Sales</span>
// 						<div className="mb-0 h5 font-weight-bold">
// 							<NumberFormat prefix={'$'} value={elm.sales} thousandSeparator={true} displayType="text" />
// 							{elm.status === 'up' ? <ArrowUpOutlined className="text-success"/> : <ArrowDownOutlined className="text-danger"/>}
// 						</div>
// 					</div>
// 				</Flex>
// 			</Flex>
// 		))}
// 	</Card>
// )

// const SalesByCategory = () => (
// 	<DonutChartWidget
// 		series={sessionData}
// 		labels={sessionLabels}
// 		title="Sales by Category"
// 		customOptions={{colors: sessionColor}}
// 		bodyClass="mb-2 mt-3"
// 		extra={
// 			<Row  justify="center">
// 				<Col xs={20} sm={20} md={20} lg={24}>
// 					<div className="mt-4 mx-auto" style={{maxWidth: 200}}>
// 						{conbinedSessionData.map(elm => (
// 							<Flex alignItems="center" justifyContent="between" className="mb-3" key={elm.label}>
// 								<div>
// 									<Badge color={elm.color} />
// 									<span className="text-gray-light">{elm.label}</span>
// 								</div>
// 								<span className="font-weight-bold text-dark">{elm.data}</span>
// 							</Flex>
// 						))}
// 					</div>
// 				</Col>
// 			</Row>
// 		}
// 	/>
// )

const SalesVendor = () => {
  const [sales, setSales] = useState([])
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
  const tableColumns1 = [
    {
      title: 'Total Products',
      dataIndex: 'totalProducts',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),
    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (totalAmount) => {
        return <Flex alignItems="centre">{totalAmount}</Flex>
      },
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
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
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
        <Col md={6} sm={24} xs={24} lg={2}>
          <Form.Item name="fromDate" label="From Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={2}>
          <Form.Item name="toDate" label="To Date">
            <DatePicker />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="vendorIds" label="Vendors">
            <Select
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

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="customerIds" label="Customers">
            <Select
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

        <Col md={6} sm={24} xs={24} lg={5}>
          <Form.Item name="productTemplateIds" label="product Templates">
            <Select
              className="w-100"
              style={{ minWidth: 180 }}
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

  const tableColumns3 = [
    {
      title: 'Total Vendors',
      dataIndex: 'totalVendors',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },

    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (totalAmount) => {
        return <Flex alignItems="centre">{totalAmount}</Flex>
      },
    },
  ]

  
  return (
    <div>
        <Card>
      <span alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
      </span>
      <br></br>
      <Row gutter={16}>
        <Col span={24}>
          <Table
            scroll={{
              x: true,
            }}
            columns={tableColumns3}
            dataSource={list}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
				<DisplayDataSet />
			</Col> */}
      </Row>
      </Card>
    </div>
  )
}

export default SalesVendor
