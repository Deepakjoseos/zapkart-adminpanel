import React, { Component, useEffect, useRef, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Card, Table, Button, Select, notification, Image, Modal } from 'antd'
// import { invoiceData } from '../../../pages/invoice/invoiceData'
import NumberFormat from 'react-number-format'
import { useParams, Link } from 'react-router-dom'
import orderService from 'services/orders'
// import ShipmentCreateForm from './ShipmentCreateForm'
import Flex from 'components/shared-components/Flex'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import customerService from 'services/customer'
// import PrescriptionSelector from './PrescriptionSelector'
import shipmentService from 'services/shipment'
import utils from 'utils'


const { Column } = Table
const { Option } = Select
const ShipmentView = () => {
  const { id } = useParams()
  const [shipment, setShipment] = useState({})
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
    console.log('shipmnt', id)

  }, [id])
  console.log('shipment', shipment)


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
    console.log('id',id)
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
    }
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
    }
  }
  const generateInvoice = async (id) => {
    const data = await shipmentService.generateInvoice({
      shipmentId: id,
    })
    if (data) {
      notification.success({
        message: 'Success',
        description: 'Label Generated Successfully',
      })
      // getShipments()
    }
  }
  return (

    <>
      <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <div className="d-flex">
          <Button
            onClick={()=>generateAwb(id)}
            block type="primary"
            className="mr-2"
          >
           Generate AWB
          </Button>
          <Button
            onClick={()=>generateLabel(id)}
            type="primary"
            block className="mr-2"
          >
            Generate Label
          </Button>
          <Button
            onClick={()=>generateManifest(id)}
            type="primary"
            block className="mr-2"
          >
            Generate Manifest
          </Button>
          <Button
            onClick={()=>generateInvoice(id)}
            type="primary"
            block className="mr-2"
          >
            Generate Invoice
          </Button>
        </div>
      </Flex>
        <h3>Shipment</h3>
        {shipment?.items?.map((item, index) => (
          <>
            <div>
              <span>OrderId:</span>
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


      </Card>
    </>
  )
}


export default ShipmentView
