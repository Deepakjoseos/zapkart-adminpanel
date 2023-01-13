import React from "react";
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
} from "antd";
import qs from "qs";
// import Flex from 'components/shared-components/Flex'
// import AvatarStatus from 'components/shared-components/AvatarStatus';
// import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
// import DonutChartWidget from 'components/shared-components/DonutChartWidget'
// import NumberFormat from 'react-number-format';
import Flex from "components/shared-components/Flex";

import {
  CloudDownloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserSwitchOutlined,
  FileDoneOutlined,
  SyncOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";

import {
  weeklyRevenueData,
  topProductData,
  customerChartData,
  sessionData,
  sessionLabels,
  conbinedSessionData,
  sessionColor,
  recentOrderData,
} from "./SalesDashboardData";
// import moment from 'moment';
// import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
// import utils from 'utils'
import { useSelector } from "react-redux";
import salesService from "services/sales";
import { useState, useEffect } from "react";
import _ from "lodash";
import vendorService from "services/vendor";
import productTemplateService from "services/productTemplate";
import customerService from "services/customer";
import SalesVendor from "./salelistvendor";
import SalesCustomer from "./salescusttomer";
import SalesOrder from "./salesorder";
import SalesProducts from "./salesproducts";
const { Option } = Select;
const { TabPane } = Tabs;

const SalesDashboard = () => {
  return (
    <div className="container">
      <h2 className="mb-3">Sales</h2>
      <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
        <TabPane tab="Vendor" key="1">
          <SalesVendor />
        </TabPane>
        <TabPane tab="Customer" key="2">
          <SalesCustomer />
        </TabPane>
        <TabPane tab="Orders" key="3">
          <SalesOrder />
        </TabPane>

        <TabPane tab="Products" key="4">
          <SalesProducts />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SalesDashboard;
