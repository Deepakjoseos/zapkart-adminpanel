import React, { Component, useEffect, useRef, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Card, Table, Button, Select, notification, Image, Modal, Row, Col } from 'antd'
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




const requestPickupOrder = async (id) => {
  console.log('shipmentidpickuporder',id)
  const data = await shipmentService.requestPickupOrder({
    shipmentId: id,
  })
  if (data) {
    notification.success({
      message: 'Success',
      description: 'Request pickup successful',
    })
    // getShipments()
  }
}

const ShipmentView = () => {
  const { id } = useParams()
  const [shipment, setShipment] = useState({})
  const [AWB, setAWB] = useState(false)
  const [pickupDetails, setPickupDetails] = useState(false)
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
  const generateAwb = async (id) => {
    console.log('id', id)
    const data = await shipmentService.generateAwb({
      shipmentId: id,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'AWB Generated Successfully',
      })
      // getShipments()
    }
  }
  const showAWBDetails = () => {
    setAWB(true)
  }


  const generateManifest = async (id) => {
    const data = await shipmentService.generateManifest({
      shipmentId: id,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Manifest Generated Successfully',
      })
      // getShipments()
      // window.open(data.data.shiprocket.manifest, '_blank', 'noopener,noreferrer')

    }

  }
  const downloadManifest = () => {
    window.open(shipment.shiprocket?.manifest, '_blank', 'noopener,noreferrer')

  }

  const generateLabel = async (id) => {
    const data = await shipmentService.generateLabel({
      shipmentId: id,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Label Generated Successfully',
      })
      // getShipments()
      // window.open(data.data.shiprocket.label, '_blank', 'noopener,noreferrer')

    }
  }
  const downloadLabel = () => {
    window.open(shipment.shiprocket?.label, '_blank', 'noopener,noreferrer')

  }
  const generateInvoice = async (id) => {
    const data = await shipmentService.generateInvoice({
      shipmentId: id,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Invoice Generated Successfully',
      })
      // getShipments()
      console.log('invoice,', data.data.shiprocket.invoice)
      // window.open(data.data.shiprocket.invoice, '_blank', 'noopener,noreferrer')
    }
  }
  const downlodInvoice = () => {
    window.open(shipment.shiprocket?.invoice, '_blank', 'noopener,noreferrer')

  }
  const showPickUpDetails = () => {
    setPickupDetails(true)
  }

  return (

    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          {shipment.shippedByVendor ?
            "" :
            <div className="d-flex right">
              {!shipment.shiprocket?.awb ?
                <Button
                  onClick={() => generateAwb(id)}
                  block type="primary"
                  className="mr-2"
                >
                  Generate AWB
                </Button>
                :
                <Button
                  onClick={showAWBDetails}
                  block type="primary"
                  className="mr-2"
                >
                  Show AWB Details
                </Button>
              }
              {!shipment.shiprocket?.label ?
                <Button
                  onClick={() => generateLabel(id)}
                  type="primary"
                  block className="mr-2"
                >
                  Generate Label
                </Button> :
                <Button
                  onClick={downloadLabel}
                  type="primary"
                  block className="mr-2"
                >
                  Download Label
                </Button>
              }
              {!shipment.shiprocket?.manifest ?
                <Button
                  onClick={() => generateManifest(id)}
                  type="primary"
                  block className="mr-2"
                >
                  Generate Manifest
                </Button> :
                <Button
                  onClick={ downloadManifest}
                  type="primary"
                  block className="mr-2"
                >
                  Download Manifest
                </Button>
              }

              {!shipment.shiprocket?.invoice ?
                <Button
                  onClick={() => generateInvoice(id)}
                  type="primary"
                  block className="mr-2"
                >
                  Generate Invoice
                </Button> : <Button
                  onClick={downlodInvoice}
                  type="primary"
                  block className="mr-2"
                >
                  Download Invoice
                </Button>}



              {shipment.status === 'Pickup Requested' ?
                <Button onClick={showPickUpDetails} type="primary">

                  <span className="ml-2">View Pickup Details</span>

                </Button>
                : 
                <Button onClick={() => requestPickupOrder(id)} type="primary">

                  <span className="ml-2">Request PickupOrder</span>

                </Button>}

            </div>}

        </Flex>
        <br /> <br />

        <h3>Shipment</h3>
        {shipment?.items?.map((item, index) => (
          <>
            <div>
              <span>Order Id:</span>
              <Link to={`/app/dashboards/orders/order-view/${item.orderId}`}>
                {item?.orderId}
              </Link>
            </div>
            <div>Products: {item?.items?.map((cur) => `${cur.name}, `)}</div>
          </>
        ))}
        <span>Status:</span>
        {shipment.status} <br />
        <span>Shipped By Vendor:</span>
        {shipment.shippedByVendor ? "Yes" : "No"}
        <Row>
          <Col>
            {AWB ?
              <div className='mt-3'>
                <h3>AWB Details</h3>
                <p>AWB Code: {shipment.shiprocket?.awbDetails.awb_code}</p>
                <p>AWB Code Status: {shipment.shiprocket?.awbDetails.awb_code_status}</p>
                <p>COD: {shipment.shiprocket?.awbDetails.cod}</p>


                <p>Courier Name: {shipment.shiprocket?.awbDetails.courier_name}</p>
                <p>Applied weight: {shipment.shiprocket?.awbDetails.applied_weight}</p>
                <p>Invoice Number: {shipment.shiprocket?.awbDetails.invoice_no}</p>
                <p>Company Id: {shipment.shiprocket?.awbDetails.company_id}</p>
                <p>Courier Company Id: {shipment.shiprocket?.awbDetails.courier_company_id}</p>
                <p>Date: {shipment.shiprocket?.awbDetails.assigned_date_time.date}</p>
                <p>Transporter Id :{shipment.shiprocket?.awbDetails.transporter_id} </p>

                <p>Transporter Name :{shipment.shiprocket?.awbDetails.transporter_name} </p>
                <h5>Shipping Details</h5>
                <p>Shipper Company Name :{shipment.shiprocket?.awbDetails.shipped_by.shipper_company_name} </p>
                <p>RTO Country :{shipment.shiprocket?.awbDetails.shipped_by.rto_country} </p>
                <p>RTO State :{shipment.shiprocket?.awbDetails.shipped_by.rto_state} </p>

                <p>RTO City :{shipment.shiprocket?.awbDetails.shipped_by.rto_city} </p>
                <p>RTO Phone :{shipment.shiprocket?.awbDetails.shipped_by.rto_phone} </p>
                <p>RTO Phone :{shipment.shiprocket?.awbDetails.shipped_by.rto_phone} </p>
                <p>RTO PostCode :{shipment.shiprocket?.awbDetails.shipped_by.rto_postcode} </p>
                <p>RTO Email :{shipment.shiprocket?.awbDetails.shipped_by.rto_email} </p>
                <p>Shipper Address :{shipment.shiprocket?.awbDetails.shipped_by.shipper_address_1} </p>
                <p>Shipper City :{shipment.shiprocket?.awbDetails.shipped_by.shipper_city} </p>
                <p>Shipper Country :{shipment.shiprocket?.awbDetails.shipped_by.shipper_country} </p>
                <p>Shipper Email :{shipment.shiprocket?.awbDetails.shipped_by.shipper_email} </p>
                <p>Shipper Phone :{shipment.shiprocket?.awbDetails.shipped_by.shipper_phone} </p>
                <p>Shipper PostCode :{shipment.shiprocket?.awbDetails.shipped_by.shipper_postcode} </p>
                <p>Shipper State :{shipment.shiprocket?.awbDetails.shipped_by.shipper_state} </p>

              </div>
              : ""}
          </Col>
          <Col>
            {pickupDetails ?
              <div className='mt-3'>
                <h3>Pick Up Details</h3>
                <h6>{shipment.shiprocket?.pickup?.data}</h6>
                <p>Scheduled Date:{moment(shipment.shiprocket?.pickup?.pickup_scheduled_date).format('YYYY-MM-DD hh:mm a')}</p>
                <p>Pick Up Token Number:{shipment.shiprocket?.pickup?.pickup_token_number}</p>
                <p>Status:{shipment.shiprocket?.pickup?.status}</p>

              </div> : ""}
          </Col>

        </Row>

      </Card>
    </>
  )
}


export default ShipmentView
