import React, { useEffect, useRef, useState } from "react";
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
  notification,
} from "antd";
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import qs from "qs";
import utils from "utils";
import cartService from "services/cart";
import _ from "lodash";
import { useHistory, Link } from "react-router-dom";
import constantsService from "services/constants";
import orderService from "services/orders";
import moment from "moment";

const { Option } = Select;

const Cart = ({
  selectedCustomerId,
  refetchData,
  sendingValues
  //   ordersList
}) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const data = await cartService.getCart(selectedCustomerId,sendingValues);
    if (data) {
      setCart(data.data);
    }
  };

  useEffect(() => {
    getCart();
  }, [selectedCustomerId]);

  const tableColumns = [
    {
        title: 'name',
        dataIndex: 'name',
        // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),
  
        // render: (items, record) => <div>{items?.length}</div>,
      },
      {
        title: 'Payment Status',
        dataIndex: 'productTemplate',
        render: (items) => {
          return <Flex alignItems="centre">{items?.product?.productTemplate?.name}</Flex>
        },
      },
      {
        title: 'Shipping Charge',
        dataIndex: 'product',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'data?.items?.productid'),
        // render: (items, record) => <div>{items?.length}</div>,
      },
      {
        title: 'name',
        dataIndex: 'name',
        // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),
  
        // render: (items, record) => <div>{items?.length}</div>,
      },
  ];

  return (
    <Table
      scroll={{
        x: true,
      }}
      columns={tableColumns}
      dataSource={cart}
      rowKey="id"
    />
  );
};

export default Cart;
