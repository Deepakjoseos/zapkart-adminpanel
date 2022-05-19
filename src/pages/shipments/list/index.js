import React, { useState, useEffect } from 'react'
import { CATALOG_API_URL, LINKS } from '_constants'
import useFetching from 'hooks/useFetching'
import NotFound from 'pages/404'
import { Table, Select, Button, notification } from 'antd'
import Link from 'react-router-dom/Link'
import CardWrapper from 'components/CardWrapper'
import Loader from 'components/LayoutComponents/Loader'
import { Helmet } from 'react-helmet'
import map from 'lodash/map'
import { getFormattedDate, getFormattedTime } from 'utils'

const limits = [5, 10, 20, 30, 50]
const index = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [tableData, setTableData] = useState([])
  const { match } = props
  const { params } = match
  const { masterOrderId } = params
  let url = CATALOG_API_URL.getShipments
  if (masterOrderId) url = `${url}/?masterOrderId=${masterOrderId}`

  const [{ response, loading, error }] = useFetching(url)

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      setTableData([...tableData, ...response.data])
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

  let columns = [
    // sku, title, price, qty, total, delete
    {
      title: 'Shipment ID',
      dataIndex: 'id',
      render: (text) => `#${text}`,
    },
    {
      title: 'OrderId',
      dataIndex: 'masterOrderId',
      render: (text, record) => (
        <Link
          to={`${LINKS.viewEditOrder}/${record.masterOrderId}`}
          className="utils__link--underlined"
        >
          #{text}
        </Link>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'user',

      render: (_, record) =>
        record.masterOrder &&
        record.masterOrder.user &&
        `${record.masterOrder.user.firstName} ${record.masterOrder.user.lastName}`,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (text) => `${getFormattedDate(text)} ${getFormattedTime(text)}`,
    },
    {
      title: 'Origin',
      dataIndex: 'shipmentOriginDetails',

      render: (_, record) =>
        record.shipmentOriginDetails &&
        map(record.shipmentOriginDetails, (i) => {
          return (
            <>
              {i}
              <br />
            </>
          )
        }),
    },
    {
      title: 'Destination',
      dataIndex: 'shipmentDestinationAddress',

      render: (_, record) =>
        record.shipmentDestinationAddress &&
        map(record.shipmentDestinationAddress, (i) => {
          return (
            <>
              {i}
              <br />
            </>
          )
        }),
    },
    {
      title: 'Logistic Partner',
      dataIndex: 'otherLogisticPartner',
    },
    {
      title: 'Tracking Number',
      dataIndex: 'otherTrackingUrl',
    },
    {
      title: 'Current Status',
      dataIndex: 'shippingStatus',
      render: (text) => {
        // pending
        // shipped
        // pickup
        // delivered
        // cancelled
        // dispatched
        let badge = 'badge-warning'
        switch (text) {
          case 'shipped':
            badge = 'badge-info'
            break
          case 'pickup':
            badge = 'badge-primary'
            break
          case 'delivered':
            badge = 'badge-success'
            break
          case 'cancelled':
            badge = 'badge-danger'
            break
          case 'dispatched':
            badge = 'badge-dark'
            break
          default:
            break
        }
        return <span className={`badge ${badge}`}>{text}</span>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <span>
            <Link to={`/shipment/view/${record.id}`}>
              <Button icon="eye" />
            </Link>
          </span>
          <span>
            <Link to={`/shipment/edit/${record.id}`}>
              <Button icon="edit" />
            </Link>
          </span>
        </>
      ),
    },
  ]

  if (masterOrderId)
    columns = columns.filter((i) => i.dataIndex !== 'user' && i.dataIndex !== 'masterOrderId')

  let title = 'Shipment List'
  if (masterOrderId) title = `${title} for  Order #${masterOrderId}`

  if (response && response.data) {
    return (
      <>
        <Helmet title={title} />
        <CardWrapper title={title}>
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
          <Table
            className="utils__scrollTable"
            scroll={{ x: '100%' }}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData}
            rowKey={(record) => record.id}
            limits={limits}
            currentPage={pagination.current}
            limit={pagination.pageSize}
            total={pagination.total}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </CardWrapper>
      </>
    )
  }

  if (loading) return <Loader />

  if (error) return <NotFound title="Error" subtitle={error.message} />
  return null
}

export default index
