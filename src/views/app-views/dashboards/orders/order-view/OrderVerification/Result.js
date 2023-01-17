import {
  Button,
  Card,
  Modal,
  notification,
  Popconfirm,
  Table,
  Tabs,
  Tag,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import shipmentService from 'services/shipment'

const Result = ({ products, vendorInvoices, reFetchOrderData }) => {
  const { Column } = Table
  const [vendorBasedItems, setVendorBasedItems] = useState([])
  const [shiprocketBasedItems, setShiprocketBasedItems] = useState([])
  const [trackOnBasedItems, setTrackOnBasedItems] = useState([])
  const [waitingListItems, setWaitingListItems] = useState([])

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  const getShipmentBasedItems = (products) => {
    // This will return Following Array items like this
    // [{
    //     sipmentId: id,
    //     items: [{}, {},..]
    //   },
    // ....
    // ]
    return Object.values(
      products?.reduce((a, c) => {
        ;(
          a[c.shipmentId] ||
          (a[c.shipmentId] = {
            shipmentId: c.shipmentId,
            shipmentAwb: c?.shipmentAwb,
            shipmentInvoice: c?.shipmentInvoice,
            shipmentLabel: c?.shipmentLabel,
            pickup: c?.shipmentPickup,
            shipmentStatus: c?.shipmentStatus,
            items: [],
          })
        ).items.push(c)
        return a
      }, {})
    )
  }

  useEffect(() => {
    if (products?.length > 0) {
      const vendorBasedProducts = getShipmentBasedItems(
        products?.filter((prod) => prod.shipmentType === 'Vendor')
      )

      const shipmentBasedProducts = getShipmentBasedItems(
        products?.filter((prod) => prod.shipmentType === 'Ship Rocket')
      )

      const trackOnBasedProducts = getShipmentBasedItems(
        products?.filter((prod) => prod.shipmentType === 'Track On')
      )

      const waitingListProducts = getShipmentBasedItems(
        products?.filter((prod) => prod.shipmentType === 'Not Selected')
      )

      setVendorBasedItems(vendorBasedProducts)
      setShiprocketBasedItems(shipmentBasedProducts)
      setTrackOnBasedItems(trackOnBasedProducts)
      setWaitingListItems(waitingListProducts)
    }
  }, [products])

  const downloadToDesktop = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const requestPickupOrder = async (shipmentId) => {
    console.log('shipmentidpickuporder', shipmentId)

    const data = await shipmentService.requestPickupOrder({
      shipmentId,
      // courierId: selectedCourierId,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Request pickup successful',
      })

      reFetchOrderData()

      console.log('pickuprequested data', data)
    }
  }

  const updateShipmentStatusToDelivered = async (shipmentId) => {
    const updateStatusShipment = await shipmentService.updateShipmentStatus({
      shipmentId,
      status: 'Delivered',
    })

    if (updateStatusShipment) {
      notification.success({ message: 'Shipment Status Updated As Delivered' })
      reFetchOrderData()
    }
  }

  return (
    <>
      <Modal
        title="Invoices"
        visible={isInvoiceModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsInvoiceModalOpen(false)}
      >
        <Table dataSource={vendorInvoices} pagination={false} className="mb-5">
          {/* <Column title="Shipment" dataIndex="shipmentId" key="shipmentId" render={(text) => text ? <Link to={`/app/dashboards/shipments/shipment/shipment-view/${text}`}> {text}</Link> : "Shipment not available"} /> */}

          <Column
            title="Invoice Number"
            dataIndex="invoiceId"
            key="invoiceId"
          />
          <Column
            title="Actions"
            render={(_, row) => {
              return (
                <Button
                  type="primary"
                  onClick={() => downloadToDesktop(row.invoiceUrl)}
                >
                  Download
                </Button>
              )
            }}
          />
        </Table>
      </Modal>

      {vendorInvoices?.length > 0 && (
        <Button
          type="primary"
          className="mb-4 mr-2"
          onClick={() => setIsInvoiceModalOpen(true)}
        >
          Download Vendor Invoices
        </Button>
      )}

      <Tabs defaultActiveKey="1">
        {vendorBasedItems?.length > 0 && (
          <Tabs.TabPane tab="Vendor" key="1">
            {vendorBasedItems?.map((item, i) => (
              <Card title={`Shipment: #${i + 1}`}>
                {item?.shipmentStatus !== 'Delivered' &&
                  item?.shipmentStatus !== 'Cancelled' && (
                    <div className="d-flex">
                      <Popconfirm
                        placement="top"
                        title={'Are you sure?'}
                        onClick={() =>
                          updateShipmentStatusToDelivered(item?.shipmentId)
                        }
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary">Mark As Delivered</Button>
                      </Popconfirm>
                    </div>
                  )}

                <Table
                  dataSource={item?.items}
                  pagination={false}
                  className="mb-5"
                  scroll={{
                    x: true,
                  }}
                >
                  {/* <Column title="SN" dataIndex="name" key="name" /> */}
                  <Column
                    title="Shipment"
                    dataIndex="shipmentNo"
                    key="shipmentNo"
                    render={(text, row) =>
                      text ? (
                        <Link
                          to={`/app/dashboards/shipment/shipment-view/${row.shipmentId}`}
                        >
                          {' '}
                          {text}
                        </Link>
                      ) : (
                        'Not Shipped Yet'
                      )
                    }
                  />

                  <Column title="Product Name" dataIndex="name" key="name" />
                  <Column title="HSN" dataIndex="hsn" key="hsn" />
                  <Column title="BATCH" dataIndex="batch" key="batch" />

                  <Column title="EXP" dataIndex="expiry" key="expiry" />
                  <Column title="QTY" dataIndex="quantity" key="quantity" />
                  <Column title="PRICE" dataIndex="price" key="price" />
                  <Column title="DISC" dataIndex="discount" key="discount" />
                  {/* <Column title="TAXABLE" dataIndex="taxableAmount" key="taxableAmount" /> */}
                  <Column
                    title="TAX"
                    dataIndex="taxSplitup"
                    render={(taxSplitup) => {
                      return (
                        <>
                          {taxSplitup?.map((item) => (
                            <>
                              {/* <p>Amount:{item.taxAmount}</p>
                              <p>Percentage:{item.taxPercentage}</p>
                              <p>Type:{item.taxType}</p> */}
                    <p>{item.taxType}-{item.taxAmount}({item.taxPercentage}%)</p>
                            </>
                          ))}
                        </>
                      )
                    }}
                  />

                  {/* <Column title="AMOUNT" dataIndex="price" key="price" /> */}

                  {/* <Column
                    title="Vendor"
                    dataIndex="vendorName"
                    key="vendorName"
                  /> */}

                  {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                    <Column
                      title="Prescription Required"
                      dataIndex="prescriptionRequired"
                      key="prescriptionRequired"
                      render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                    />
                  )}

                  <Column
                    title="Order Item Status"
                    dataIndex="status"
                    key="status"
                  />
                  <Column
                    title="Shipment Status"
                    dataIndex="shipmentStatus"
                    key="shipmentStatus"
                  />
                </Table>
              </Card>
            ))}
          </Tabs.TabPane>
        )}

        {shiprocketBasedItems?.length > 0 && (
          <Tabs.TabPane tab="ShipRocket" key="2">
            {shiprocketBasedItems?.map((item, i) => (
              <Card title={`Shipment: #${i + 1}`}>
                {item?.shipmentAwb ? (
                  <div
                    style={{ width: 'fit-content' }}
                    className="d-flex flex-row justify-content-end"
                  >
                    {item?.shipmentLabel && (
                      <Button
                        onClick={() => downloadToDesktop(item?.shipmentLabel)}
                        type="primary"
                        block
                        className="mr-2"
                      >
                        Download Label
                      </Button>
                    )}
                    {item?.shipmentManifest && (
                      <Button
                        onClick={() =>
                          downloadToDesktop(item?.shipmentManifest)
                        }
                        type="primary"
                        block
                        className="mr-2"
                      >
                        Download Manifest
                      </Button>
                    )}

                    {item?.shipmentInvoice && (
                      <Button
                        onClick={() => downloadToDesktop(item?.shipmentInvoice)}
                        type="primary"
                        block
                        className="mr-2"
                      >
                        Download Shipment Invoice
                      </Button>
                    )}

                    {!item?.pickup && item?.shipmentAwb ? (
                      <Button
                        onClick={() => {
                          // requestPickupOrder(id)
                          // setCheckIfDeliverableOpen(true)
                          // setCurrentActionButton('request-pickup')
                          requestPickupOrder(item?.shipmentId)
                        }}
                        type="primary"
                      >
                        <span className="ml-2">Request to Pickup Order</span>
                      </Button>
                    ) : item?.pickup && item?.shipmentAwb ? (
                      <Button disabled>
                        <span>Already Created Pickup Request</span>
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <h3>Waiting For Admin Approval...</h3>
                )}
                <Table
                  dataSource={item?.items}
                  pagination={false}
                  className="mb-5"
                  scroll={{
                    x: true,
                  }}
                >
                  {/* <Column title="SN" dataIndex="name" key="name" /> */}
                  <Column
                    title="Shipment"
                    dataIndex="shipmentNo"
                    key="shipmentNo"
                    render={(text, row) =>
                      text ? (
                        <Link
                          to={`/app/dashboards/shipment/shipment-view/${row.shipmentId}`}
                        >
                          {' '}
                          {text}
                        </Link>
                      ) : (
                        'Not Shipped Yet'
                      )
                    }
                  />

                  <Column title="Product Name" dataIndex="name" key="name" />
                  <Column title="HSN" dataIndex="hsn" key="hsn" />
                  <Column title="BATCH" dataIndex="batch" key="batch" />

                  <Column title="EXP" dataIndex="expiry" key="expiry" />
                  <Column title="QTY" dataIndex="quantity" key="quantity" />
                  <Column title="PRICE" dataIndex="price" key="price" />
                  <Column title="DISC" dataIndex="discount" key="discount" />
                  {/* <Column title="TAXABLE" dataIndex="taxableAmount" key="taxableAmount" /> */}
                  <Column
                    title="TAX"
                    dataIndex="taxSplitup"
                    render={(taxSplitup) => {
                      return (
                        <>
                          {taxSplitup?.map((item) => (
                            <>
                              {/* <p>Amount:{item.taxAmount}</p>
                              <p>Percentage:{item.taxPercentage}</p>
                              <p>Type:{item.taxType}</p> */}
                    <p>{item.taxType}-{item.taxAmount}({item.taxPercentage}%)</p>
                            </>
                          ))}
                        </>
                      )
                    }}
                  />

                  {/* <Column title="AMOUNT" dataIndex="price" key="price" /> */}

                  {/* <Column
                    title="Vendor"
                    dataIndex="vendorName"
                    key="vendorName"
                  /> */}

                  {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                    <Column
                      title="Prescription Required"
                      dataIndex="prescriptionRequired"
                      key="prescriptionRequired"
                      render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                    />
                  )}

                  <Column title="Status" dataIndex="status" key="status" />
                </Table>
              </Card>
            ))}
          </Tabs.TabPane>
        )}
        {trackOnBasedItems?.length > 0 && (
          <Tabs.TabPane tab="TrackOn" key="3">
            {trackOnBasedItems?.map((item, i) => (
              <Card title={`Shipment: #${i + 1}`}>
                <Table
                  dataSource={item?.items}
                  pagination={false}
                  className="mb-5"
                  scroll={{
                    x: true,
                  }}
                >
                  {/* <Column title="SN" dataIndex="name" key="name" /> */}
                  <Column
                    title="Shipment"
                    dataIndex="shipmentNo"
                    key="shipmentNo"
                    render={(text, row) =>
                      text ? (
                        <Link
                          to={`/app/dashboards/shipment/shipment-view/${row.shipmentId}`}
                        >
                          {' '}
                          {text}
                        </Link>
                      ) : (
                        'Not Shipped Yet'
                      )
                    }
                  />

                  <Column title="Product Name" dataIndex="name" key="name" />
                  <Column title="HSN" dataIndex="hsn" key="hsn" />
                  <Column title="BATCH" dataIndex="batch" key="batch" />

                  <Column title="EXP" dataIndex="expiry" key="expiry" />
                  <Column title="QTY" dataIndex="quantity" key="quantity" />
                  <Column title="PRICE" dataIndex="price" key="price" />
                  <Column title="DISC" dataIndex="discount" key="discount" />
                  {/* <Column title="TAXABLE" dataIndex="taxableAmount" key="taxableAmount" /> */}
                  <Column
                    title="TAX"
                    dataIndex="taxSplitup"
                    render={(taxSplitup) => {
                      return (
                        <>
                          {taxSplitup?.map((item) => (
                            <>
                              {/* <p>Amount:{item.taxAmount}</p>
                              <p>Percentage:{item.taxPercentage}</p>
                              <p>Type:{item.taxType}</p> */}
                    <p>{item.taxType}-{item.taxAmount}({item.taxPercentage}%)</p>
                            </>
                          ))}
                        </>
                      )
                    }}
                  />

                  {/* <Column title="AMOUNT" dataIndex="price" key="price" /> */}

                  <Column
                    title="Vendor"
                    dataIndex="vendorName"
                    key="vendorName"
                  />

                  {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                    <Column
                      title="Prescription Required"
                      dataIndex="prescriptionRequired"
                      key="prescriptionRequired"
                      render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                    />
                  )}

                  <Column title="Status" dataIndex="status" key="status" />
                </Table>
              </Card>
            ))}
          </Tabs.TabPane>
        )}

        {waitingListItems?.length > 0 && (
          <Tabs.TabPane
            tab="Waiting List (Waiting For Admin To Select Shipment Type)"
            key="4"
          >
            {waitingListItems?.map((item, i) => (
              <Card title={`Shipment: #${i + 1}`}>
                <Table
                  dataSource={item?.items}
                  pagination={false}
                  className="mb-5"
                  scroll={{
                    x: true,
                  }}
                >
                  {/* <Column title="SN" dataIndex="name" key="name" /> */}
                  <Column
                    title="Shipment"
                    dataIndex="shipmentNo"
                    key="shipmentNo"
                    render={(text, row) =>
                      text ? (
                        <Link
                          to={`/app/dashboards/shipment/shipment-view/${row.shipmentId}`}
                        >
                          {' '}
                          {text}
                        </Link>
                      ) : (
                        'Not Shipped Yet'
                      )
                    }
                  />

                  <Column
                    title="shipment Type"
                    dataIndex="shipmentType"
                    key="shipmentType"
                    render={(text) => <Tag color="red">{text}</Tag>}
                  />
                  <Column title="Product Name" dataIndex="name" key="name" />
                  <Column title="HSN" dataIndex="hsn" key="hsn" />
                  <Column title="BATCH" dataIndex="batch" key="batch" />

                  <Column title="EXP" dataIndex="expiry" key="expiry" />
                  <Column title="QTY" dataIndex="quantity" key="quantity" />
                  <Column title="PRICE" dataIndex="price" key="price" />
                  <Column title="DISC" dataIndex="discount" key="discount" />
                  {/* <Column title="TAXABLE" dataIndex="taxableAmount" key="taxableAmount" /> */}
                  <Column
                    title="TAX"
                    dataIndex="taxSplitup"
                    render={(taxSplitup) => {
                      return (
                        <>
                          {taxSplitup?.map((item) => (
                            <>
                              {/* <p>Amount:{item.taxAmount}</p>
                              <p>Percentage:{item.taxPercentage}</p>
                              <p>Type:{item.taxType}</p> */}
                    <p>{item.taxType}-{item.taxAmount}({item.taxPercentage}%)</p>
                            </>
                          ))}
                        </>
                      )
                    }}
                  />

                  {/* <Column title="AMOUNT" dataIndex="price" key="price" /> */}

                  <Column
                    title="Vendor"
                    dataIndex="vendorName"
                    key="vendorName"
                  />

                  {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                    <Column
                      title="Prescription Required"
                      dataIndex="prescriptionRequired"
                      key="prescriptionRequired"
                      render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                    />
                  )}

                  <Column title="Status" dataIndex="status" key="status" />
                </Table>
              </Card>
            ))}
          </Tabs.TabPane>
        )}
      </Tabs>
    </>
  )
}

export default Result
