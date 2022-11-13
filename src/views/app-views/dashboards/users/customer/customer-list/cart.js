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
  notification,
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
import qs from 'qs'
import utils from 'utils'
import cartService from 'services/cart'
import _ from 'lodash'
import { useHistory, Link } from 'react-router-dom'
import constantsService from 'services/constants'
import orderService from 'services/orders'
import moment from 'moment'

const { Option } = Select

const Cart = ({
  selectedCustomerId,
  refetchData,
  sendingValues,
  //   ordersList
}) => {
  const [cart, setCart] = useState([])
  const SITE_NAME = process.env.REACT_APP_SITE_NAME

  const getCart = async () => {
    const data = await cartService.getCart(selectedCustomerId, sendingValues)
    if (data) {
      setCart(data.items)
    }
  }

  useEffect(() => {
    if (selectedCustomerId) {
      getCart()
    }
  }, [selectedCustomerId])

  const tableColumns = [
    {
      title: 'name',
      dataIndex: 'product',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      render: (product) => (
        <Link
          to={`/app/dashboards/catalog/product/edit-product/${product?.id}`}
          className="flex"
        >
          <AvatarStatus
            size={60}
            type="square"
            src={product.images[0]}
            name={product.name}
          />
        </Link>
      ),
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'totalAmount'),

      // render: (items, record) => <div>{items?.length}</div>,
    },

    {
      title: 'Price',
      dataIndex: 'product',
      render: (product) => {
        return (
          <Flex alignItems="centre">
            {SITE_NAME === 'zapkart'
              ? `₹ ${product?.price}`
              : `AED ${product?.price}`}
          </Flex>
        )
      },
    },

    {
      title: 'Variant',
      dataIndex: 'product',
      render: (product) => {
        return (
          <Flex alignItems="centre">
            {product?.variant ? product?.variant?.name : '-'}
          </Flex>
        )
      },
    },
    {
      title: 'Vendor Name',
      dataIndex: 'product',
      render: (product) => {
        return <Flex alignItems="centre">{product?.vendorName}</Flex>
      },
    },
  ]

  if (SITE_NAME === 'awen') {
    tableColumns.push({
      title: 'Acquirement Method',
      dataIndex: 'product',
      render: (product) => {
        return <Flex alignItems="centre">{product?.acquirementMethod}</Flex>
      },
    })
  }

  if (SITE_NAME === 'zapkart') {
    tableColumns.push({
      title: 'Prescription Required',
      dataIndex: 'product',
      render: (product) => {
        return (
          <Flex alignItems="centre">
            {product?.prescriptionRequired ? 'Yes' : 'No'}
          </Flex>
        )
      },
    })
  }

  return (
    <Table
      scroll={{
        x: true,
      }}
      columns={tableColumns}
      dataSource={cart}
      rowKey="id"
    />
  )
}

export default Cart
