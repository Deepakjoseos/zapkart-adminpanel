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
  Modal,
  notification,
} from 'antd'

import AvatarStatus from 'components/shared-components/AvatarStatus'
import Flex from 'components/shared-components/Flex'
import qs from 'qs'
import utils from 'utils'
import _ from 'lodash'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import reviewService from 'services/review'


const { Option } = Select

const Reviews = ({
  selectedCustomerId,
  refetchData,
  sendingValues,
 
  //   ordersList
}) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [review, setReview] = useState([])
  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedFormAddress, setSelectedFormAddress] = useState({})
  const [productsTemplate, setProductsTemplate] = useState([])

  const SITE_NAME = process.env.REACT_APP_SITE_NAME

  // const getCart = async () => {
  //   const data = await cartService.getCart(selectedCustomerId, sendingValues)
  //   if (data) {
  //     setCart(data.items)
  //   }
  //   console.log(data.items,'carts')
  // }

  const getReviews = async () => {
    const data = await reviewService.getReviewsById(selectedCustomerId, sendingValues)
    if (data.data) {
      setReview(data.data)
    }
    // console.log(data.data,'reviews')
  }
 

  useEffect(() => {
    if (selectedCustomerId) {
      getReviews()
    }
  }, [selectedCustomerId])


 
  const tableColumns = [
    {
      title: "Order No",
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.orderId}`}>
          {text}
        </Link>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'orderNo'),
    },
    {
      title: "Vendor Name",
      dataIndex: 'vendorName',
      render: (text, record) => (
      <Link to={`/app/dashboards/users/vendor/edit-vendor/${record.vendorId}`}>
          {text}
        </Link>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'vendorName'),
    },
    {
      title: "Product Name",
      dataIndex: 'itemName',
      render: (text, record) => (
        <Link to={`/app/dashboards/catalog/product/edit-product/${record.itemId}`}>
            {text}
          </Link>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'itemName'),
    },
    {
      title: 'Customers',
      dataIndex: 'userName',
      render: (_, record) => (
        <Flex alignItems="center">
          <AvatarStatus
            size={60}
            type="square"
            src={record.image}
            name={record.name}
          />
          <Link to={`/app/dashboards/users/customer/edit-customer/${record.userId}`}>
          {record.userName}
          </Link>
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'userName'),
    },
    
    
    {
      title: "Title & Rating",
      dataIndex: 'title',
      render: (_, record) => (
        <Flex alignItems="center">
          {record.title}({record.rating})
        </Flex>),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'title'),
    },
    {
      title: "Message",
      dataIndex: 'message',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'message'),
    },
    {
      title: "Review Time",
      dataIndex: 'updatedAt',
      render: (createdAt) => (
        <Flex alignItems="center">
        {moment(new Date(createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}          
        </Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'updatedAt'),
    },
  ]
  

  return (
    <Card>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={review}
          rowKey="id"
          loading={loading}
        />
      </div>
   </Card>
    

  )
  
}

export default Reviews
