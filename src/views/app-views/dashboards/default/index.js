import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,
  Tag,
} from 'antd'
import StatisticWidget from 'components/shared-components/StatisticWidget'
import ChartWidget from 'components/shared-components/ChartWidget'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import GoalWidget from 'components/shared-components/GoalWidget'
import {
  VisitorChartData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData,
} from './DefaultDashboardData'
import ApexChart from 'react-apexcharts'
import { apexLineChartDefaultOption, COLOR_2 } from 'constants/ChartConstant'
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons'
import utils from 'utils'
import { withRouter,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import customerService from 'services/customer'
import orderService from 'services/orders'
import authAdminService from 'services/auth/admin'
import moment from 'moment'

const MembersChart = (props) => <ApexChart {...props} />

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
}

const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add all</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
)

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    {/* <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item> */}
  </Menu>
)

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
)

const tableColumns = [
  {
    title: 'OrderNo',
    dataIndex: 'orderNo',
    render: (text, record) => (
      <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
        {text}
      </Link>
    ),
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

    // render: (items, record) => <div>{items?.length}</div>,
  },
  // {
  //   title: 'Date',
  //   dataIndex: 'date',
  //   key: 'date',
  // },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render :(totalAmount)=><div>{totalAmount}</div>,

  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  // {
  //   title: () => <div className="text-right">Status</div>,
  //   key: 'status',
  //   // render: (_, record) => (
  //   //   <div className="text-right">
  //   //     <Tag
  //   //       className="mr-0"
  //   //       color={
  //   //         record.status === 'Approved'
  //   //           ? 'cyan'
  //   //           : record.status === 'Pending'
  //   //           ? 'blue'
  //   //           : 'volcano'
  //   //       }
  //   //     >
  //   //       {record.status}
  //   //     </Tag>
  //   //   </div>
  //   // ),
  // },
]

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData)
  const [annualStatisticData, setAnnualStatisticData] = useState({})
  const [activeMembersData] = useState(ActiveMembersData)
  const [newMembersData, setNewMembersData] = useState([])
  const [recentTransactionData, setRecentTransactionData] = useState([])
  const { direction } = useSelector((state) => state.theme)

  const getCustomers = async () => {
    const customers = await customerService.getCustomers('limit=5')
    setNewMembersData(customers?.slice(0, 5))
  }

  const getOrders = async () => {
    const orders = await orderService.getOrders("","limit=5")
    console.log('orders',orders)
    setRecentTransactionData(orders?.data)
   
  }

  const getStatics = async () => {
    const staticsData = await authAdminService.getStatistics()
    if (staticsData) {
      setAnnualStatisticData(staticsData)
    }
  }

  useEffect(() => {
    getCustomers()
    getOrders()

    getStatics()
  }, [])

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <StatisticWidget
                title="Total Transaction"
                value={`${annualStatisticData?.transactions}`}
                // status={elm.status}
                subtitle={`This Year ${moment().year()}`}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <StatisticWidget
                title="Total Sales"
                value={annualStatisticData?.orders}
                subtitle={`This Year ${moment().year()}`}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <StatisticWidget
                title="Total Customers"
                value={annualStatisticData?.customers}
                subtitle={`This Year ${moment().year()}`}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <StatisticWidget
                title="Total Vendors"
                value={annualStatisticData?.vendors}
                subtitle={`This Year ${moment().year()}`}
              />
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Unique Visitors"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={'400px'}
                direction={direction}
              />
            </Col>
          </Row> */}
        </Col>
        {/* <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget 
            title="Monthly Target" 
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          <StatisticWidget
            title={
              <MembersChart
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            value="17,329"
            status={3.7}
            subtitle="Total Vendors"
          />
        </Col> */}
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="New Customers">
            <div className="mt-3">
              {newMembersData?.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    src={elm.displayImage}
                    name={`${elm.firstName} ${elm.lastName}`}
                    subTitle={elm?.email}
                  />
                  {/* <div>
                    <Button
                      icon={<UserAddOutlined />}
                      type="default"
                      size="small"
                    >
                      Add
                    </Button>
                  </div> */}
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card
            title="Latest Orders"
            extra={cardDropdown(latestTransactionOption)}
          >
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default withRouter(DefaultDashboard)
