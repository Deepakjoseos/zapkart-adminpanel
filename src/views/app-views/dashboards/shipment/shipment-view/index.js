import React, { Component, useEffect, useRef, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import {
  Card,
  Table,
  Button,
  Select,
  notification,
  Image,
  Modal,
  Row,
  Col,
} from 'antd'
// import { invoiceData } from '../../../pages/invoice/invoiceData'
import NumberFormat from 'react-number-format'
import { useParams, Link } from 'react-router-dom'
import orderService from 'services/orders'
// import ShipmentCreateForm from './ShipmentCreateForm'
import Flex from 'components/shared-components/Flex'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

// import PrescriptionSelector from './PrescriptionSelector'
import shipmentService from 'services/shipment'
import CheckIfDeliverable from '../shipment-list/CheckIfDeliverable'

const ShipmentView = () => {
  const { id } = useParams()
  const [shipment, setShipment] = useState({})
  const [AWB, setAWB] = useState(false)
  const [AWB_button, showAWBButton] = useState(false)
  const [label_button, showLabelButton] = useState(false)
  const [manifest_button, showManifestButton] = useState(false)
  const [invoice_button, showInvoiceButton] = useState(false)
  const [pickupDetails, setPickupDetails] = useState(false)
  const [checkIfDeliverableOpen, setCheckIfDeliverableOpen] = useState(false)
  const [selectedCourierId, setSelectedCourierId] = useState(null)
  const [currentActionButton, setCurrentActionButton] = useState(null)
  //   const [isFormOpen, setIsFormOpen] = useState(false)
  //   const [printing, setPrinting] = useState(false)
  //   const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // onBeforeGetContent: () => {
    //   setPrinting(true)
    // },
    // onBeforePrint: () => {
    //   setPrinting(true)
    //   setPrintRef(componentRef)
    // },

    // onAfterPrint: () => {
    //   setPrinting(false)
    //   setPrintRef(null)
    // },
  })

  //   console.log(printing, 'ljkshdl')
  console.log('shipmentidid', id)

  const getShipmentById = async () => {
    console.log('shipment_id', id)
    const shipmentData = await shipmentService.getShipmentById(id)

    if (shipmentData) {
      setShipment(shipmentData)
    }
    console.log('shipmen', shipmentData)
  }

  useEffect(() => {
    getShipmentById()
    // requestPickupOrder()

    console.log('shipmntId', id)
  }, [id])
  console.log('shipment', shipment)
  console.log('shiprocket', shipment.shiprocket)

  //   const handleOrderStatusChange = async (value, selectedRow) => {
  //     const updatedOrderStatus = await orderService.updateOrderItemStatus(id, {
  //       itemIds: [selectedRow.id],
  //       status: value,
  //     })

  //     if (updatedOrderStatus) {
  //       notification.success({ message: 'Order Status Updated' })
  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 2000)
  //     }
  //   }

  //   const cancleOrderItem = async (itemId) => {
  //     const cancel = await orderService.cancelOrderItem(id, itemId)

  //     if (cancel) {
  //       notification.success({ message: 'Order Item Cancelled' })
  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 2000)
  //     }
  //   }

  //   const handleOrderStatus = async (value) => {
  //     const updatedOrderStatus = await orderService.updateOrderStatus(
  //       order.id,
  //       value
  //     )

  //     if (updatedOrderStatus) {
  //       notification.success({ message: 'Order Status Updated' })

  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 2000)
  //     }
  //   }

  // const getCustomerPrescription = async(value) => {
  //   await customerService.getCustomerPrescription
  // }
  // const tableColumns = [
  //   {
  //     title: 'Shipment',
  //     dataIndex: 'items',
  //     render: (_, record) => (
  //       <div>
  //         {record.items.map((item, index) => (
  //           <>
  //             <div>
  //               <span>OrderId:</span>
  //               <Link to={`/app/dashboards/orders/order-view/${item.orderId}`}>
  //                  {item?.orderId}
  //               </Link>
  //             </div>
  //             <div>Products: {item?.items?.map((cur) => `${cur.name}, `)}</div>
  //           </>
  //         ))}
  //       </div>
  //     ),
  //     sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
  //   },
  //   {
  //     title: 'shippedByVendor',
  //     dataIndex: 'shippedByVendor',
  //     render: (text) => <div>{text ? 'Yes' : 'No'}</div>,
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
  //   }
  // ]

  console.log(shipment, 'opskhsjlgbui')
  const requestPickupOrder = async () => {
    console.log('shipmentidpickuporder', id)

    const data = await shipmentService.requestPickupOrder({
      shipmentId: id,
      // courierId: selectedCourierId,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Request pickup successful',
      })
      setCheckIfDeliverableOpen(false)
      setSelectedCourierId(null)
      setCurrentActionButton(null)
      window.location.reload(true)
      // getShipments()
      console.log('pickuprequested data', data)
      // if (!shipment.shiprocket?.awbDetails) {
      //   showAWBButton(true)
      // }
      // if (!shipment.shiprocket?.label) {
      //   showLabelButton(true)
      // }
      // if (!shipment.shiprocket?.manifest) {
      //   showManifestButton(true)
      // }
      // if (!shipment.shiprocket?.invoice) {
      //   showInvoiceButton(true)
      // }
    }
  }

  useEffect(() => {
    if (shipment?.shiprocket) {
      // if (!shipment.shiprocket?.awbDetails) {
      //   showAWBButton(true)
      // }
      if (!shipment.shiprocket?.label) {
        showLabelButton(true)
      }
      if (!shipment.shiprocket?.manifest) {
        showManifestButton(true)
      }
      // if (!shipment.shiprocket?.invoice) {
      //   showInvoiceButton(true)
      // }
    }
  }, [shipment])

  // const generateAwb = async () => {
  //   const data = await shipmentService.generateAwb({
  //     shipmentId: id,
  //     courierId: selectedCourierId,
  //   })
  //   if (data) {
  //     setCheckIfDeliverableOpen(false)
  //     setSelectedCourierId(null)
  //     setCurrentActionButton(null)
  //     notification.success({
  //       message: 'Success',
  //       description: 'AWB Generated Successfully',
  //     })
  //     // getShipments()
  //   }
  // }
  const showAWBDetails = () => {
    setAWB(true)
  }

  // const generateManifest = async (id) => {
  //   const data = await shipmentService.generateManifest({
  //     shipmentId: id,
  //   })
  //   if (data) {
  //     notification.success({
  //       message: 'Success',
  //       description: 'Manifest Generated Successfully',
  //     })
  //     alert('msshjh')
  //     // getShipments()
  //     // window.open(data.data.shiprocket.manifest, '_blank', 'noopener,noreferrer')
  //   }
  // }
  const downloadManifest = () => {
    window.open(shipment.shiprocket?.manifest, '_blank', 'noopener,noreferrer')
  }

  // const generateLabel = async (id) => {
  //   const data = await shipmentService.generateLabel({
  //     shipmentId: id,
  //   })
  //   if (data) {
  //     notification.success({
  //       message: 'Success',
  //       description: 'Label Generated Successfully',
  //     })
  //     // getShipments()
  //     // window.open(data.data.shiprocket.label, '_blank', 'noopener,noreferrer')
  //   }
  // }
  const downloadLabel = () => {
    window.open(shipment.shiprocket?.label, '_blank', 'noopener,noreferrer')
  }
  // const generateInvoice = async (id) => {
  //   const data = await shipmentService.generateInvoice({
  //     shipmentId: id,
  //   })

  //   if (data) {
  //     notification.success({
  //       message: 'Success',
  //       description: 'Invoice Generated Successfully',
  //     })
  //     // getShipments()
  //     console.log('invoice,', data.data.shiprocket.invoice)
  //     // window.open(data.data.shiprocket.invoice, '_blank', 'noopener,noreferrer')
  //   }
  // }
  const downlodInvoice = () => {
    window.open(shipment.shiprocket?.invoice, '_blank', 'noopener,noreferrer')
  }
  const showPickUpDetails = () => {
    setPickupDetails(true)
  }

  // useEffect(() => {
  //   if (selectedCourierId) {
  //     if (currentActionButton === 'request-pickup') {
  //       requestPickupOrder()
  //     } else if (currentActionButton === 'AWB') {
  //       generateAwb()
  //     }
  //   }
  // }, [selectedCourierId])

  return (
    <>
      <Card>
        <Flex alignItems="right" justifyContent="between" mobileFlex={false}>
          {shipment.shippedByVendor ? (
            ''
          ) : (
            <div className="d-flex right">
              {/* {AWB_button ? (
                <Button
                  onClick={() => {
                    // generateAwb(id)
                    setCheckIfDeliverableOpen(true)
                    setCurrentActionButton('AWB')
                  }}
                  block
                  type="primary"
                  className="mr-2"
                >
                  Generate AWB
                </Button>
              ) : (
                ''
              )} */}
              {/* {shipment.shiprocket?.awbDetails ? <Button
                  onClick={showAWBDetails}
                  block type="primary"
                  className="mr-2"
                >
                  Show AWB Details
                </Button> : ""} */}

              {/* {label_button ? (
                <Button
                  onClick={() => generateLabel(id)}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Generate Label
                </Button>
              ) : (
                ''
              )} */}
              {shipment.shiprocket?.label ? (
                <Button
                  onClick={downloadLabel}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Download Label
                </Button>
              ) : (
                ''
              )}

              {/* {manifest_button ? (
                <Button
                  onClick={() => generateManifest(id)}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Generate Manifest
                </Button>
              ) : (
                ''
              )} */}
              {shipment.shiprocket?.manifest ? (
                <Button
                  onClick={downloadManifest}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Download Manifest
                </Button>
              ) : (
                ''
              )}

              {/* {invoice_button ? (
                <Button
                  onClick={() => generateInvoice(id)}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Generate Invoice
                </Button>
              ) : (
                ''
              )} */}
              {/* {shipment.shiprocket?.invoice ? (
                <Button
                  onClick={downlodInvoice}
                  type="primary"
                  block
                  className="mr-2"
                >
                  Download Invoice
                </Button>
              ) : (
                ''
              )} */}

              {/* {shipment.status === 'Pickup Requested' ?
                <Button onClick={showPickUpDetails} type="primary">

                  <span className="ml-2">View Pickup Details</span>

                </Button>
                : ""} */}

              {!shipment.shiprocket?.pickup &&
              shipment.shiprocket?.awbDetails?.awb_code ? (
                <Button
                  onClick={() => {
                    // requestPickupOrder(id)
                    // setCheckIfDeliverableOpen(true)
                    // setCurrentActionButton('request-pickup')
                    requestPickupOrder()
                  }}
                  type="primary"
                >
                  <span className="ml-2">Request to Pickup Order</span>
                </Button>
              ) : (
                ''
              )}
            </div>
          )}
        </Flex>
        <br /> <br />
        <h3>Shipment</h3>
        {shipment?.items?.map((item, index) => (
          <>
            <div>
              <span>Order:</span>
              <Link to={`/app/dashboards/orders/order-view/${item.orderId}`}>
                {item?.orderNo}
              </Link>
            </div>
            <div>Products: {item?.items?.map((cur) => `${cur.name}, `)}</div>
          </>
        ))}
        <span>Status:</span>
        {shipment.status} <br />
        <span>Shipped By Vendor: </span>
        {shipment.shippedByVendor ? 'Yes' : 'No'}
        <br />
        {shipment?.shippedBy && (
          <>
            <span>Shipped By: </span>
            {shipment?.shippedBy}
          </>
        )}
        <Row style={{ width: '100%' }}>
          <Col md={12} sm={24} lg={12}>
            {shipment.shiprocket?.awbDetails?.awb_code ? (
              <Card>
                <div className="mt-3">
                  <Row>
                    <Col>
                      <h3>AWB Details</h3>
                      <p>
                        AWB Code: {shipment.shiprocket?.awbDetails.awb_code}
                      </p>
                      <p>
                        AWB Code Status:{' '}
                        {shipment.shiprocket?.awbDetails.awb_code_status}
                      </p>
                      <p>COD: {shipment.shiprocket?.awbDetails.cod}</p>

                      <p>
                        Courier Name:{' '}
                        {shipment.shiprocket?.awbDetails.courier_name}
                      </p>
                      <p>
                        Applied weight:{' '}
                        {shipment.shiprocket?.awbDetails.applied_weight}
                      </p>
                      <p>
                        Invoice Number:{' '}
                        {shipment.shiprocket?.awbDetails.invoice_no}
                      </p>
                      <p>
                        Company Id: {shipment.shiprocket?.awbDetails.company_id}
                      </p>
                      <p>
                        Courier Company Id:{' '}
                        {shipment.shiprocket?.awbDetails?.courier_company_id}
                      </p>
                      <p>
                        Date:{' '}
                        {
                          shipment.shiprocket?.awbDetails?.assigned_date_time
                            ?.date
                        }
                      </p>
                      <p>
                        Transporter Id :
                        {shipment.shiprocket?.awbDetails.transporter_id}{' '}
                      </p>
                      {shipment.shiprocket?.awbDetails.transporter_name ? (
                        <p>
                          Transporter Name :
                          {shipment.shiprocket?.awbDetails.transporter_name}{' '}
                        </p>
                      ) : (
                        ''
                      )}
                    </Col>
                    <Col>
                      <h5>Shipping Details</h5>
                      <p>
                        Shipper Company Name :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_company_name
                        }{' '}
                      </p>
                      <p>
                        RTO Country :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.rto_country
                        }{' '}
                      </p>
                      <p>
                        RTO State :
                        {shipment.shiprocket?.awbDetails?.shipped_by?.rto_state}{' '}
                      </p>
                      <p>
                        RTO City :
                        {shipment.shiprocket?.awbDetails?.shipped_by?.rto_city}{' '}
                      </p>
                      <p>
                        RTO Phone :
                        {shipment.shiprocket?.awbDetails?.shipped_by?.rto_phone}{' '}
                      </p>
                      <p>
                        RTO Phone :
                        {shipment.shiprocket?.awbDetails?.shipped_by?.rto_phone}{' '}
                      </p>
                      <p>
                        RTO PostCode :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.rto_postcode
                        }{' '}
                      </p>
                      <p>
                        RTO Email :
                        {shipment.shiprocket?.awbDetails?.shipped_by?.rto_email}{' '}
                      </p>
                      <p>
                        Shipper Address :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_address_1
                        }{' '}
                      </p>
                      <p>
                        Shipper City :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_city
                        }{' '}
                      </p>
                      <p>
                        Shipper Country :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_country
                        }{' '}
                      </p>
                      <p>
                        Shipper Email :
                        {
                          shipment?.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_email
                        }{' '}
                      </p>
                      <p>
                        Shipper Phone :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_phone
                        }{' '}
                      </p>
                      <p>
                        Shipper PostCode :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_postcode
                        }{' '}
                      </p>
                      <p>
                        Shipper State :
                        {
                          shipment.shiprocket?.awbDetails?.shipped_by
                            ?.shipper_state
                        }{' '}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            ) : (
              shipment?.shippedBy !== 'Vendor' && (
                <h2 className="mt-3">Waiting For Admin Pending...</h2>
              )
            )}
          </Col>
          <Col md={12} sm={24} lg={12}>
            {shipment.shiprocket?.pickup ? (
              <Card>
                <div className="mt-3">
                  <h3>Pick Up Details</h3>
                  <h6>{shipment.shiprocket?.pickup?.data}</h6>
                  <p>
                    Scheduled Date:
                    {moment(
                      shipment.shiprocket?.pickup?.pickup_scheduled_date
                    ).format('YYYY-MM-DD hh:mm a')}
                  </p>
                  <p>
                    Pick Up Token Number:
                    {shipment.shiprocket?.pickup?.pickup_token_number}
                  </p>
                  <p>Status:{shipment.shiprocket?.pickup?.status}</p>
                </div>
              </Card>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Card>
      <CheckIfDeliverable
        setCheckIfDeliverableOpen={setCheckIfDeliverableOpen}
        checkIfDeliverableOpen={checkIfDeliverableOpen}
        selectable={true}
        setSelectedCourierId={setSelectedCourierId}
        shipment={shipment?.shiprocket?.order}
        title="Select Courier"
      />
    </>
  )
}

export default ShipmentView
