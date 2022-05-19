import React, { useState, useEffect } from 'react'
import { Button, Modal,Table, notification, Select, Radio, Tabs } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL } from '_constants'
import { getFormattedDate } from 'utils'
// import Table from 'components/Table'
import AddNew from 'components/CustomComponents/AddNew'
import { connect } from 'react-redux'

const { TabPane } = Tabs

const limits = [5, 10, 30, 40]
const paymentBadges = {
  pending: 'badge-warning',
  failed: 'badge-dandgr',
  success: 'badge-success',
}

const orderBadges = {
  hold: 'badge-dark',
  pending: 'badge-warning',
  processing: 'badge-primary',
  completed: 'badge-success',
}

const OrdersList = ({ user }) => {
  const [isModalOpen, toggleodal] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [{ response, error, loading }] = useFetching(
    user.userTypeId === 1 ? CATALOG_API_URL.getAllOrders : CATALOG_API_URL.getMerchantsOrder,
  )

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      setPagination((prev) => ({
        ...prev,
        total: response.data.length,
      }))
    }
    if (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  const handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    setPagination((prev) => ({
      ...prev,
      current: Number(paginationParams.current),
      pageSize: Number(paginationParams.pageSize),
    }))
    // this.fetchAttributes({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // })
  }

  const handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit', selLimit)
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(selLimit),
    }))
  }

  const columns = [
    // order id - id
    // customer - user.name user.profile_img
    // status - status
    // total - total
    // date added - created_at
    // date modified - modified_at
    // action
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link
          className="utils__link--underlined"
          to={`/order-management/orders/order/${record.id}`}
        >
          {`#${text}`}
        </Link>
      ),
    },
    {
      title: 'Order No.',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Order Created Date.',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => getFormattedDate(text),
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'orderSubtotal',
      key: 'orderSubtotal',
      render: (text) => `₹ ${text}`,
    },

    {
      title: 'Payment status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text) => {
        // pending completed failure refund initiated refunded
        return <span className={`badge ${paymentBadges[text]}`}>{text}</span>
      },
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text) => {
        return <span className={`badge ${orderBadges[text]}`}>{text}</span>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Link to={`/order-management/orders/order/${record.id}`}>
            <Button icon="eye" type="primary" className="mr-1" size="small" />
          </Link>
          {/* <Link to={`/order-management/orders/order/${record.id}`}>
            <Button icon="close" type="danger" className="mr-1" size="small" />
          </Link> */}
        </>
      ),
    },
  ]

  const actions = [
    {
      key: 'createShipment',
      Component: (
        <Button icon="plus" type="primary">
          Create Shipment
        </Button>
      ),
      actionType: 'createShipment',
    },
  ]

  const handleActionClick = (ids, actionType) => {
    if (actionType === 'createShipment') {
      toggleodal(true)
    }
  }
  return (
    <div>
      <Modal
        visible={isModalOpen}
        title="Chose Create Type"
        destroyOnClose
        onCancel={() => toggleodal(false)}
        footer={null}
      >
        <div className="row justify-content-center">
          <Radio.Group size="small">
            <Radio.Button value="large">Selt Delivery</Radio.Button>
            <Radio.Button value="default">Forword To Shipping agency</Radio.Button>
          </Radio.Group>
        </div>
      </Modal>
      <Helmet title="Orders List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Orders List</strong>
            {user && user.userTypeId === 1 && (
              <AddNew add link="/order-management/orders/add-new" />
            )}
          </div>
        </div>
        <div className="card-body">
          {limits.length > 0 && (
            <div className="right-flex">
              <span>
                <strong>Items per page:&nbsp;</strong>
              </span>
              <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
                {limits.map((i) => (
                  <Select.Option key={i}>{Number(i)}</Select.Option>
                ))}
              </Select>
            </div>
          )}
          <Tabs
            onChange={() => {
              console.log('sdfsdf')
            }}
            type="card"
          >
            <TabPane tab="All orders" key="1">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={response && response.data ? response.data : []}
                loading={loading}
                rowKey={(record) => record.id}
                actionButtons={actions}
                onActionClick={handleActionClick}
                limits={limits}
                currentPage={pagination.current}
                limit={pagination.pageSize}
                total={pagination.total}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </TabPane>
            <TabPane tab="Pending Orders" key="2">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={
                  response && response.data
                    ? response?.data.filter((i) => i.orderStatus === 'hold')
                    : []
                }
                loading={loading}
                actionButtons={actions}
                onActionClick={(w) => {
                  console.log('aaalcik', w)
                }}
                rowKey={(record) => record.id}
                limits={limits}
                currentPage={pagination.current}
                limit={pagination.pageSize}
                total={pagination.total}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </TabPane>
            <TabPane tab="Completed order" key="3">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={
                  response && response.data
                    ? response?.data.filter((i) => i.orderStatus === 'completed')
                    : []
                }
                loading={loading}
                actionButtons={actions}
                onActionClick={(w) => {
                  console.log('aaalcik', w)
                }}
                rowKey={(record) => record.id}
                limits={limits}
                currentPage={pagination.current}
                limit={pagination.pageSize}
                total={pagination.total}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(OrdersList)
