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
import Flex from 'components/shared-components/Flex'
import StatisticWidget from 'components/shared-components/StatisticWidget'
import ChartWidget from 'components/shared-components/ChartWidget'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import GoalWidget from 'components/shared-components/GoalWidget'
import {
  VisitorChartData,
  AnnualStatisticData,
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
import orderService from 'services/orders'
import customerService from 'services/customer'
import authVendorService from 'services/auth/vendor'
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



function refreshPage() {
  window.location.reload(false);
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

const latestTransactionOption =(getOrders)=> (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span onClick={getOrders} className="ml-2">Refresh</span>
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
    title: 'Order No',
    dataIndex: 'orderNo',
    render: (text, record) => (
      <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
        {text}
      </Link>
    ),
  },

  {
    title: 'Customer Name',
    dataIndex: 'userName',

  },

  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

  },
  {
    title: 'Shipping Charge',
    dataIndex: 'shippingCharge',
    // sorter: (a, b) => utils.antdTableSorter(a, b, 'shippingCharge'),
  },
  
  {
    title: 'Order Date',
    dataIndex: 'createdAt',
    render: (createdAt) => (
      <Flex alignItems="center">
      {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}          
      </Flex>
    ),
    // sorter: (a, b) => utils.antdTableSorter(a, b, 'createdAt'),
  }, 
  {
    title: 'Order Status',
    dataIndex: 'status',
    render: (status, record) => (
      <>
        {status}
      </>
    ),
    // sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus'),
  },
  {
    title: 'Payment Status',
    dataIndex: 'payment',
    render: (payment, record) => {
      return <Flex alignItems="centre" >
       
        {payment?.status === 'COMPLETED' ? 
        <Tag style={{backgroundColor:"#87d068",color:"white"}}>COMPLETED</Tag> : 
        <Tag  style={{backgroundColor:"#f50",color:"white"}}>PENDING</Tag>}
        </Flex>
    },
  },
]

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(VisitorChartData)
  const [annualStatisticData,setAnnualStatisticData] = useState({})
  const [activeMembersData] = useState(ActiveMembersData)
  const [newMembersData, setNewMembersData] = useState([])
  const [recentTransactionData, setRecentTransactionData] = useState([])
  const { direction } = useSelector((state) => state.theme)

  const getOrders = async () => {
    const orders = await orderService.getOrders()
    setRecentTransactionData(orders?.data?.slice(0, 5))
  }
  
  const getStatics = async () => {
    const staticsData = await authVendorService.getStatistics()
    if (staticsData) {
      setAnnualStatisticData(staticsData)
    }
  }

  useEffect(() => {
    getOrders()
    getStatics()
  }, [])
  return(

  <>
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24} lg={24}>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <StatisticWidget
            title="Total Products"
            value={`${annualStatisticData?.products}`}
            // status={elm.status}
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
    
       
              
              {/* <div>
                <Button
                  icon={<UserAddOutlined />}
                  type="default"
                  size="small"
                >
                  Add
                </Button>
              </div> */}
          
         
     
  
  
    <Col xs={24} sm={24} md={24} lg={25}>
      <Card
        title="Latest Orders"
        extra={cardDropdown(latestTransactionOption(getOrders))}
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
