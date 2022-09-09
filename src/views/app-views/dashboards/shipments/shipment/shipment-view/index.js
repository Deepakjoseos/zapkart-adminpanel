import React, { Component, useEffect, useRef, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Card, Table, Button, Select, notification, Image, Modal } from 'antd'
// import { invoiceData } from '../../../pages/invoice/invoiceData'
import NumberFormat from 'react-number-format'
import { useParams,Link } from 'react-router-dom'
import orderService from 'services/orders'
// import ShipmentCreateForm from './ShipmentCreateForm'
import Flex from 'components/shared-components/Flex'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import customerService from 'services/customer'
// import PrescriptionSelector from './PrescriptionSelector'
import shipmentService from 'services/shipment'

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
console.log('shipmentidid',id)

  const getShipmentById = async () => {
    const shipment = await shipmentService.getShipmentById(id)

    if (shipment) {
      setShipment(shipment)
    }
     console.log('shipmen',shipment)
  }

  useEffect(() => {
    getShipmentById()
    console.log('shipmnt',id)

  }, [id])


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

  return (
    // <div className="container">
    //   <Flex justifyContent="end">
    //     {order.status === 'Verifying Prescription' && (
    //       <Button
    //         type="primary"
    //         className="mb-4 mr-2"
    //         onClick={() => handleOrderStatus('Pending')}
    //       >
    //         Verify Prescription
    //       </Button>
    //     )}

    //     {order?.status === 'Prescriptions Missing' && (
    //       <Button
    //         type="primary"
    //         className="mb-4 mr-2"
    //         onClick={() => setIsPrescriptionModalOpen(true)}
    //       >
    //         Re-Upload Prescription
    //       </Button>
    //     )}

    //     <Button
    //       type="primary"
    //       className="mb-4 mr-2"
    //       onClick={() => setIsFormOpen(true)}
    //     >
    //       Create Shipment
    //     </Button>
    //     <Button type="primary" className="mb-4" onClick={handlePrint}>
    //       Print this out!
    //     </Button>
    //   </Flex>
    //   <div>
    //     <Card>
    //       <div className="d-md-flex justify-content-md-between">
    //         <div>
    //           <address>
    //             <p>
    //               <span className="font-weight-semibold text-dark font-size-md">
    //                 {order?.userName}
    //               </span>
    //               <br />
    //               <span>Invoice No: {order?.invoice?.invoiceNo}</span>

    //               <br />
    //               <span>
    //                 ShippingAddress: {order?.shippingAddress?.addressLine1},{' '}
    //                 {order?.shippingAddress?.city},{' '}
    //                 {order?.shippingAddress?.stateOrRegion},{' '}
    //                 {order?.shippingAddress?.country}
    //               </span>
              

    //               <br />
    //               <abbr className="text-dark" title="Phone">
    //                 Phone:{' '}
    //               </abbr>
    //               <span>{order?.shippingAddress?.mobileNumber}</span>
    //               <br />
    //               <abbr className="text-dark" title="Phone">
    //                 Address Type:{' '}
    //               </abbr>
    //               <span>{order?.shippingAddress?.addressType}</span>
    //             </p>
    //           </address>
    //         </div>
    //         <div className="mt-3 text-right">
    //           <h2 className="mb-1 font-weight-semibold">
    //             Order No: {order?.orderNo}
    //           </h2>
    //           <p>
    //             Order Date:
    //             {moment(new Date(order?.createdAt * 1000)).format('DD-MM-YYYY')}
    //             {/* {moment(parseInt(order?.createdAt)).format('YYYY-MM-DD')} */}
    //           </p>
    //           <p>Status: {order?.status}</p>
    //           <p>shipping Charge: {order?.shippingCharge}</p>
    //           <p>Payment method : {order?.payment?.type}</p>
    //           {order?.transaction ? (
    //             <p>Transaction ID : {order?.transaction?.id}</p>
    //           ) : (
    //             ''
    //           )}
    //           <p>Total Amount: ₹{order?.totalAmount}</p>
    //           <p>Order Date: {moment(new Date(order?.createdAt * 1000)).format('DD-MM-YYYY hh:mm:a')}
    //           </p>
    //           <address>
    //             <p>
    //               <span className="font-weight-semibold text-dark font-size-md">
    //                 Payment Status:{' '}
    //                 {order?.payment?.completed ? 'Completed' : 'Not Completed'}
    //               </span>
    //               <br />
    //               {/* <span>8626 Maiden Dr. </span>
    //             <br />
    //             <span>Niagara Falls, New York 14304</span> */}
    //             </p>
    //           </address>
    //         </div>
    //       </div>
    //       {order?.prescriptions?.length > 0 && (
    //         <>
    //           <p>Prescriptions: </p>
    //           {order?.prescriptions?.map((cur) => (
    //             <Image width={100} src={cur} />
    //           ))}
    //         </>
    //       )}
    //       <div className="mt-4">
    //         <Table
    //           dataSource={order?.items}
    //           pagination={false}
    //           className="mb-5"
    //         >
    //          <Column title="ShipmentId" dataIndex="shipmentId" key="shipmentId" render={(shipmentId) => <Link to={`/app/dashboards/shipments/shipmen-view/${order?.shipmentId}`}> {order?.shipmentId}</Link>}  />
    //           <Column title="Product" dataIndex="name" key="name" />
    //           <Column title="Quantity" dataIndex="quantity" key="quantity" />
    //           <Column title="Price" dataIndex="price" key="price" />
    //           <Column title="Customer" dataIndex="vendorName" key="vendorName" />

    //           {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
    //             <Column
    //               title="Prescription Required"
    //               dataIndex="prescriptionRequired"
    //               key="prescriptionRequired"
    //               render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
    //             />
    //           )}

    //           <Column
    //             title="Status"
    //             dataIndex="status"
    //             key="status"
    //             render={(status, row) => (
    //               <Select
    //                 defaultValue={status}
    //                 style={{ width: 150 }}
    //                 onChange={(e) => handleOrderStatusChange(e, row)}
    //               >
    //                 {orderStatuses.map((item) => (
    //                   <Option key={item} value={item}>
    //                     {item}
    //                   </Option>
    //                 ))}
    //               </Select>
    //             )}
    //           />
    //           {!printing && (
    //             <Column
    //               title="Action"
    //               render={(_, row) => {
    //                 return (
    //                   row.status !== 'Cancelled' && (
    //                     <Button
    //                       type="primary"
    //                       onClick={() => cancleOrderItem(row.id)}
    //                     >
    //                       Cancel Order Item
    //                     </Button>
    //                   )
    //                 )
    //               }}
    //             />
    //           )}
    //         </Table>
    //         <div className="d-flex justify-content-end">
    //           <div className="text-right ">
    //             <h2 className="font-weight-semibold mt-3">
    //               <span className="mr-1">Grand Total: </span>₹
    //               {order?.totalAmount}
    //             </h2>
    //           </div>
    //         </div>
       
          
    //       </div>

    //     </Card>
    //   </div>

    //   {/* ------------------------------PRINT SCREEN CONTENTS HERE----------------------------------------------- */}

    //   {/* PRINT SCREEN CONTENTS */}
    //   <div style={{ display: 'none' }}>
    //     <div ref={componentRef}>
    //       <Card>
    //         <div className="d-md-flex justify-content-md-between">
    //           <div>
    //             <address>
    //               <p>
    //                 <span className="font-weight-semibold text-dark font-size-md">
    //                   {order?.userName}
    //                 </span>
    //                 <br />
    //                 <span>Invoice No: {order?.invoice?.invoiceNo}</span>
    //                 <br />
    //                 <span>
    //                   ShippingAddress: {order?.shippingAddress?.addressLine1},{' '}
    //                   {order?.shippingAddress?.city},{' '}
    //                   {order?.shippingAddress?.stateOrRegion},{' '}
    //                   {order?.shippingAddress?.country}
    //                 </span>
    //                 <br />
    //                 <abbr className="text-dark" title="Phone">
    //                   Phone:{' '}
    //                 </abbr>
    //                 <span>{order?.shippingAddress?.mobileNumber}</span>
    //                 <br />
    //                 <abbr className="text-dark" title="Phone">
    //                   Address Type:{' '}
    //                 </abbr>
    //                 <span>{order?.shippingAddress?.addressType}</span>
    //               </p>
    //             </address>
    //           </div>
    //           <div className="mt-3 text-right">
    //             <h2 className="mb-1 font-weight-semibold">
    //               Order No: {order?.orderNo}
    //             </h2>
    //             <p>
    //               Order Date:
    //               {moment(new Date(order?.createdAt * 1000)).format(
    //                 'DD-MM-YYYY'
    //               )}
    //               {/* {moment(parseInt(order?.createdAt)).format('YYYY-MM-DD')} */}
    //             </p>
    //             <p>Status: {order?.status}</p>
    //             <p>shipping Charge: {order?.shippingCharge}</p>
    //             <p>Payment method : {order?.payment?.type}</p>
    //             {order?.transaction ? (
    //               <p>Transaction ID : {order?.transaction?.id}</p>
    //             ) : (
    //               ''
    //             )}
    //             <p>Total Amount: ₹{order?.totalAmount}</p>
    //             <address>
    //               <p>
    //                 <span className="font-weight-semibold text-dark font-size-md">
    //                   Payment Status:{' '}
    //                   {order?.payment?.completed
    //                     ? 'Completed'
    //                     : 'Not Completed'}
    //                 </span>
    //                 <br />
    //                 {/* <span>8626 Maiden Dr. </span>
    //             <br />
    //             <span>Niagara Falls, New York 14304</span> */}
    //               </p>
    //             </address>
    //           </div>
    //         </div>
    //         {order?.prescriptions?.length > 0 && (
    //           <>
    //             <p>Prescriptions: </p>
    //             {order?.prescriptions?.map((cur) => (
    //               <Image width={100} src={cur} />
    //             ))}
    //           </>
    //         )}
    //         <div className="mt-4">
    //           <Table
    //             dataSource={order?.items}
    //             pagination={false}
    //             className="mb-5"
    //           >
    //             <Column title="Product" dataIndex="name" key="name" />
    //             <Column title="Quantity" dataIndex="quantity" key="quantity" />
    //             <Column title="Price" dataIndex="price" key="price" />
    //             <Column
    //               title="Vendor"
    //               dataIndex="vendorName"
    //               key="vendorName"
    //             />
    //             {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
    //               <Column
    //                 title="Prescription Required"
    //                 dataIndex="prescriptionRequired"
    //                 key="prescriptionRequired"
    //                 render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
    //               />
    //             )}

    //             <Column title="Status" dataIndex="status" key="status" />
    //           </Table>
    //           <div className="d-flex justify-content-end">
    //             <div className="text-right ">
    //               <h2 className="font-weight-semibold mt-3">
    //                 <span className="mr-1">Grand Total: </span>₹
    //                 {order?.totalAmount}
    //               </h2>
    //             </div>
    //           </div>
             
    //         </div>
           
    //       </Card>
    //     </div>
    //   </div>

    //   <Modal
    //     title="Product Excel Upload"
    //     visible={isPrescriptionModalOpen}
    //     onCancel={() => {
    //       setIsPrescriptionModalOpen(false)
    //     }}
    //     footer={false}
    //   >
    //     <PrescriptionSelector
    //       orderId={order.id}
    //       userId={order.userId}
    //       setIsPrescriptionModalOpen={setIsPrescriptionModalOpen}
    //     />
    //   </Modal>

      {/* <ShipmentCreateForm
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        orderItems={order?.items}
        orderNo={order?.orderNo}
        orderId={order?.id}
      /> */}
    // </div>
  )
}


export default ShipmentView
