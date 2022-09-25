import React, { Component, useEffect, useRef, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Card, Table, Button, Select, notification, Image, Modal } from 'antd'
import { invoiceData } from '../../../pages/invoice/invoiceData'
import NumberFormat from 'react-number-format'
import { useParams, Link } from 'react-router-dom'
import orderService from 'services/orders'
import ShipmentCreateForm from './ShipmentCreateForm'
import Flex from 'components/shared-components/Flex'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import customerService from 'services/customer'
import PrescriptionSelector from './PrescriptionSelector'
import CreateInvoiceForm from './CreateInvoiceForm'
import './Order.css'

const { Column } = Table
const { Option } = Select
const OrderView = () => {
  const { id } = useParams()
  const [order, setOrder] = useState({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [printing, setPrinting] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false)

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

  console.log(printing, 'ljkshdl')

  const getOrderById = async () => {
    const orderData = await orderService.getOrderById(id)

    if (order) {
      setOrder(orderData)
    }
    console.log('order payment', order.payment)
  }

  useEffect(() => {
    getOrderById()
  }, [id])

  const orderStatuses = [
    'Pending',
    'Received',
    'Confirmed',
    'Shipping Soon',
    'Shipped',
    'Shipment Delayed',
    'Arriving Early',
    'Out for Delivery',
    'Delivery Refused by Customer',
    'Delivery Rescheduled',
    'Delivered',
    'Shipment Failed',
    'Items damaged during transit',
    'and being returned back to us',
    'Payment Failed',
    'Cancelled',
    'Attempting Cancellation',
    'Return Requested',
    'Return Initiated',
    'Return Rescheduled',
    'Return Completed',
    'Items Returning Back',
    'Return Delayed',
    'Return Items Received',
    'Return Items Verification Failed',
    'Return Items Verification Completed',
    'Return Failed',
    'Return Cancelled',
    'Refund Initiated',
    'Refund Delayed',
    'Refund Completed',
    'Refund Failed',
  ]

  const handleOrderStatusChange = async (value, selectedRow) => {
    const updatedOrderStatus = await orderService.updateOrderItemStatus(id, {
      itemIds: [selectedRow.id],
      status: value,
    })

    if (updatedOrderStatus) {
      notification.success({ message: 'Order Status Updated' })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const cancleOrderItem = async (itemId) => {
    const cancel = await orderService.cancelOrderItem(id, itemId)

    if (cancel) {
      notification.success({ message: 'Order Item Cancelled' })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  const handleOrderStatus = async (value) => {
    const updatedOrderStatus = await orderService.updateOrderStatus(
      order.id,
      value
    )

    if (updatedOrderStatus) {
      notification.success({ message: 'Order Status Updated' })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  // const getCustomerPrescription = async(value) => {
  //   await customerService.getCustomerPrescription
  // }

  return (
    <div className="container">
      <Flex justifyContent="end">
        {order.status === 'Verifying Prescription' && (
          <Button
            type="primary"
            className="mb-4 mr-2"
            onClick={() => handleOrderStatus('Pending')}
          >
            Verify Prescription
          </Button>
        )}

        {order?.status === 'Prescriptions Missing' && (
          <Button
            type="primary"
            className="mb-4 mr-2"
            onClick={() => setIsPrescriptionModalOpen(true)}
          >
            Re-Upload Prescription
          </Button>
        )}
        {order.status === 'Cancelled' ? (
          ''
        ) : (
          <>
            <Button
              type="primary"
              className="mb-4 mr-2"
              onClick={() => setIsFormOpen(true)}
            >
              Create Shipment
            </Button>
            <Button
              type="primary"
              className="mb-4 mr-2"
              onClick={() => setIsInvoiceFormOpen(true)}
            >
              Create Invoice
            </Button>
          </>
        )}

        <Button type="primary" className="mb-4" onClick={handlePrint}>
          Print this out!
        </Button>
      </Flex>
      <div>
        <Card>
          <div className="d-md-flex justify-content-md-between">
            <div>
              <address>
                <p>
                  <span className="font-weight-semibold text-dark font-size-md">
                    {order?.userName}
                  </span>
                  <br />
                  {/* <span>Invoice No: {order?.invoice?.invoiceNo}</span> */}

                  <br />
                  <span>
                    {/* ShippingAddress: */}
                    {order?.shippingAddress?.addressLine1},{' '}
                    {order?.shippingAddress?.city},{' '}
                    {order?.shippingAddress?.stateOrRegion},{' '}
                    {order?.shippingAddress?.country}
                    {order?.shippingAddress?.uniqueId}
                  </span>
                  {/* <span>
                  {
      title: 'OrderNo',
      dataIndex: 'orderNo',
      render: (text, record) => (
        <Link to={`/app/dashboards/orders/order-view/${record.id}`}>
          {text}
        </Link>
      ),
    },
                  </span> */}

                  <br />
                  <abbr className="text-dark" title="Phone">
                    Phone:{' '}
                  </abbr>
                  <span>{order?.shippingAddress?.mobileNumber}</span>
                  <br />
                  <abbr className="text-dark" title="Phone">
                    Address Type:{' '}
                  </abbr>
                  <span>{order?.shippingAddress?.addressType}</span>
                </p>
              </address>
            </div>
            <div className="text-right">
              {/* <p>GSTIN:</p>
              <p>Drug License No:</p> */}
              <h4 className="mb-1 font-weight-semibold">
                Order No: {order?.orderNo}
              </h4>

              <h6>
                Order Date:
                {moment(new Date(order?.createdAt * 1000)).format('DD-MM-YYYY')}
                {/* {moment(parseInt(order?.createdAt)).format('YYYY-MM-DD')} */}
              </h6>
              {/* <p>Status: {order?.status}</p> */}
              {/* <p>shipping Charge: {order?.shippingCharge}</p> */}
              {order?.transaction ? (
                <p>Transaction ID : {order?.transaction?.id}</p>
              ) : (
                ''
              )}
              {/* <p>Total Amount: ₹{order?.totalAmount}</p> */}

              <address>
                <p>
                  <span className="font-weight-semibold text-dark font-size-md">
                    Payment Status: {order?.payment?.status}
                  </span>
                  <br />
                  {/* <span>8626 Maiden Dr. </span>
                <br />
                <span>Niagara Falls, New York 14304</span> */}
                </p>
              </address>
            </div>
          </div>
          <div>
            {/* <h4 className="mb-1 font-weight-semibold">
                Invoice  Date: 
              </h4> */}

            {/* <h4 className="mb-1 font-weight-semibold">
                Customer Name : {order?.items.map((item)=>{
                  return  item.vendorName
                })}
              </h4> */}
            {/* <h4 className="mb-1 font-weight-semibold">
               Customer GST No(If Any): 
              </h4> */}
          </div>

          {order?.prescriptions?.length > 0 && (
            <>
              <p>Prescriptions: </p>
              {order?.prescriptions?.map((cur) => (
                <Image width={100} src={cur} />
              ))}
            </>
          )}
          <div className="mt-4">
            <Table
              dataSource={order?.items}
              pagination={false}
              className="mb-5"
              scroll={{
                x: true,
              }}
            >
              {/* <Column title="SN" dataIndex="name" key="name" /> */}
              <Column
                title="Shipment"
                dataIndex="shipmentId"
                key="shipmentId"
                render={(text) =>
                  text ? (
                    <Link
                      to={`/app/dashboards/shipments/shipment/shipment-view/${text}`}
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
                          <p>Amount:{item.taxAmount}</p>
                          <p>Percentage:{item.taxPercentage}</p>
                          <p>Type:{item.taxType}</p>
                        </>
                      ))}
                    </>
                  )
                }}
              />

              {/* <Column title="AMOUNT" dataIndex="price" key="price" /> */}

              <Column title="Vendor" dataIndex="vendorName" key="vendorName" />

              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Column
                  title="Prescription Required"
                  dataIndex="prescriptionRequired"
                  key="prescriptionRequired"
                  render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                />
              )}

              <Column
                title="Status"
                dataIndex="status"
                key="status"
                render={(status, row) => (
                  <Select
                    defaultValue={status}
                    style={{ width: 150 }}
                    onChange={(e) => handleOrderStatusChange(e, row)}
                  >
                    {orderStatuses.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {!printing && (
                <Column
                  title="Action"
                  render={(_, row) => {
                    return (
                      row.status !== 'Cancelled' && (
                        <Button
                          type="primary"
                          onClick={() => cancleOrderItem(row.id)}
                        >
                          Cancel Order Item
                        </Button>
                      )
                    )
                  }}
                />
              )}
            </Table>
            <div className="d-flex justify-content-end">
              <div className="text-right ">
                <span className="mr-1">
                  shipping Charge: {order?.shippingCharge}
                </span>
                <div>Payment method : {order?.payment?.type}</div>
                <div>
                  {order?.couponCode ? (
                    <div className="mr-1">Coupon Code: {order?.couponCode}</div>
                  ) : (
                    ''
                  )}

                  {order?.discount ? (
                    <div className="mr-1">
                      Discount Amount(-): {order?.discount}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <h2 className="font-weight-semibold mt-3">
                  <span className="mr-1">Grand Total: </span>₹
                  {order?.totalAmount}
                </h2>
              </div>
            </div>
            {/* <p className="mt-5">
            <small>
              In exceptional circumstances, Financial Services can provide an
              urgent manually processed special cheque. Note, however, that
              urgent special cheques should be requested only on an emergency
              basis as manually produced cheques involve duplication of effort
              and considerable staff resources. Requests need to be supported by
              a letter explaining the circumstances to justify the special
              cheque payment
            </small>
          </p> */}
          </div>
          {/* <hr className="d-print-none" />
        <div className="text-right d-print-none">
          <Button type="primary" onClick={() => window.print()}>
            <PrinterOutlined type="printer" />
            <span className="ml-1">Print</span>
          </Button>
        </div> */}
        </Card>
      </div>

      {/* ------------------------------PRINT SCREEN CONTENTS HERE----------------------------------------------- */}

      {/* PRINT SCREEN CONTENTS */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <Card>
            <hr className="line" />

            <br />
            <br />

            <div className="d-md-flex justify-content-md-between">
              <div>
                <address>
                  <p>
                    <span className="font-weight-semibold text-dark font-size-lg">
                      {order?.userName}
                    </span>

                    {/* <span>Invoice No: {order?.invoice?.invoiceNo}</span> */}
                    <br />
                    <span>
                      {/* ShippingAddress: */}
                      {order?.shippingAddress?.addressLine1},{' '}
                      {order?.shippingAddress?.city},{' '}
                      {order?.shippingAddress?.stateOrRegion},{' '}
                      {order?.shippingAddress?.country}
                    </span>
                    <br />
                    <p className="" title="Phone">
                      Phone: <span>{order?.shippingAddress?.mobileNumber}</span>
                    </p>
                  </p>
                </address>
              </div>
              <div className="text-right">
                <h4 className="mb-1 font-weight-semibold">
                  Order No: {order?.orderNo}
                </h4>

                <h6>
                  Order Date:
                  {moment(new Date(order?.createdAt * 1000)).format(
                    'DD-MM-YYYY'
                  )}
                  {/* {moment(parseInt(order?.createdAt)).format('YYYY-MM-DD')} */}
                </h6>
                <h4 className="mb-1 font-weight-semibold">
                  Payment Status: {order?.payment?.status}
                </h4>
                {/* <p>Status: {order?.status}</p> */}
                {/* <p>shipping Charge: {order?.shippingCharge}</p> */}
                {order?.transaction ? (
                  <p>Transaction ID : {order?.transaction?.id}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div>
              {/* <h4 className="mb-1 font-weight-semibold">
                Invoice  Date: 
              </h4> */}

              {/* <h4 className="mb-1 font-weight-semibold">
                Customer Name : {order?.items.map((item)=>{
                  return  item.vendorName
                })}
              </h4> */}
              {/* <h4 className="mb-1 font-weight-semibold">
               Customer GST No(If Any): 
              </h4> */}
            </div>

            {order?.prescriptions?.length > 0 && (
              <>
                <p>Prescriptions: </p>
                {order?.prescriptions?.map((cur) => (
                  <Image width={100} src={cur} />
                ))}
              </>
            )}
            <div className="mt-4">
              <Table
                dataSource={order?.items}
                pagination={false}
                className="mb-5"
              >
                {/* <Column title="Shipment" dataIndex="shipmentId" key="shipmentId" render={(text) => text ? <Link to={`/app/dashboards/shipments/shipment/shipment-view/${text}`}> {text}</Link> : "Shipment not available"} /> */}

                <Column title="Product Name" dataIndex="name" key="name" />
                <Column title="HSN" dataIndex="hsn" key="hsn" />
                <Column
                  title="BATCH"
                  dataIndex="batchNumber"
                  key="batchNumber"
                />
                <Column title="EXP" dataIndex="expiryDate" key="expiryDate" />
                <Column title="QTY" dataIndex="quantity" key="quantity" />
                <Column title="PRICE" dataIndex="price" key="price" />
                <Column title="DISC" dataIndex="discount" key="discount" />
                <Column
                  title="TAX"
                  dataIndex="taxSplitup"
                  render={(taxSplitup) => {
                    return (
                      <>
                        {taxSplitup?.map((item) => (
                          <>
                            <p>Amount:{item.taxAmount}</p>
                            <p>Percentage:{item.taxPercentage}</p>
                            <p>Type:{item.taxType}</p>
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
              <div className="d-flex justify-content-end">
                <div className="text-right ">
                  <h2 className="font-weight-semibold mt-3">
                    <span className="mr-1">
                      Shipping Charge: {order?.shippingCharge}
                    </span>
                    <div>
                      {order?.couponCode ? (
                        <div className="mr-1">
                          Coupon Code: {order?.couponCode}
                        </div>
                      ) : (
                        ''
                      )}

                      {order?.discount !== 0 ? (
                        <div className="mr-1">
                          Discount Amount(-): {order?.discount}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <span className="mr-1">Grand Total: </span>₹
                    {order?.totalAmount}
                  </h2>
                </div>
              </div>
              {/* <p className="mt-5">
            <small>
              In exceptional circumstances, Financial Services can provide an
              urgent manually processed special cheque. Note, however, that
              urgent special cheques should be requested only on an emergency
              basis as manually produced cheques involve duplication of effort
              and considerable staff resources. Requests need to be supported by
              a letter explaining the circumstances to justify the special
              cheque payment
            </small>
          </p> */}
            </div>
            {/* <hr className="d-print-none" />
        <div className="text-right d-print-none">
          <Button type="primary" onClick={() => window.print()}>
            <PrinterOutlined type="printer" />
            <span className="ml-1">Print</span>
          </Button>
        </div> */}
          </Card>
        </div>
      </div>

      <Modal
        title="Product Excel Upload"
        visible={isPrescriptionModalOpen}
        onCancel={() => {
          setIsPrescriptionModalOpen(false)
        }}
        footer={false}
      >
        <PrescriptionSelector
          orderId={order.id}
          userId={order.userId}
          setIsPrescriptionModalOpen={setIsPrescriptionModalOpen}
        />
      </Modal>

      <ShipmentCreateForm
        setIsFormOpen={setIsFormOpen}
        isFormOpen={isFormOpen}
        orderItems={order?.items}
        orderNo={order?.orderNo}
        orderId={order?.id}
      />

      <CreateInvoiceForm
        refetchOrderData={getOrderById}
        items={order?.items}
        isInvoiceFormOpen={isInvoiceFormOpen}
        setIsInvoiceFormOpen={setIsInvoiceFormOpen}
        orderId={order?.id}
      />
    </div>
  )
}
//   total() {
//     let total = 0
//     invoiceData.forEach((elm) => {
//       total += elm.price
//     })
//     return total
//   }

//   render() {
//     return (
//       <div className="container">
//         <Card>
//           <div className="d-md-flex justify-content-md-between">
//             <div>
//               <address>
//                 <p>
//                   <span className="font-weight-semibold text-dark font-size-md">
//                     Emilus, Inc.
//                   </span>
//                   <br />
//                   <span>9498 Harvard Street</span>
//                   <br />
//                   <span>Fairfield, Chicago Town 06824</span>
//                   <br />
//                   <abbr className="text-dark" title="Phone">
//                     Phone:
//                   </abbr>
//                   <span>(123) 456-7890</span>
//                 </p>
//               </address>
//             </div>
//             <div className="mt-3 text-right">
//               <h2 className="mb-1 font-weight-semibold">Invoice #9972</h2>
//               <p>25/7/2018</p>
//               <address>
//                 <p>
//                   <span className="font-weight-semibold text-dark font-size-md">
//                     Genting Holdings.
//                   </span>
//                   <br />
//                   <span>8626 Maiden Dr. </span>
//                   <br />
//                   <span>Niagara Falls, New York 14304</span>
//                 </p>
//               </address>
//             </div>
//           </div>
//           <div className="mt-4">
//             <Table dataSource={invoiceData} pagination={false} className="mb-5">
//               <Column title="No." dataIndex="key" key="key" />
//               <Column title="Product" dataIndex="product" key="product" />
//               <Column title="Quantity" dataIndex="quantity" key="quantity" />
//               <Column
//                 title="Price"
//                 render={(text) => (
//                   <NumberFormat
//                     displayType={'text'}
//                     value={(Math.round(text.price * 100) / 100).toFixed(2)}
//                     prefix={'$'}
//                     thousandSeparator={true}
//                   />
//                 )}
//                 key="price"
//               />
//               <Column
//                 title="Total"
//                 render={(text) => (
//                   <NumberFormat
//                     displayType={'text'}
//                     value={(
//                       Math.round(text.price * text.quantity * 100) / 100
//                     ).toFixed(2)}
//                     prefix={'$'}
//                     thousandSeparator={true}
//                   />
//                 )}
//                 key="total"
//               />
//             </Table>
//             <div className="d-flex justify-content-end">
//               <div className="text-right ">
//                 <div className="border-bottom">
//                   <p className="mb-2">
//                     <span>Sub - Total amount: </span>
//                     <NumberFormat
//                       displayType={'text'}
//                       value={(Math.round(this.total() * 100) / 100).toFixed(2)}
//                       prefix={'$'}
//                       thousandSeparator={true}
//                     />
//                   </p>
//                   <p>
//                     vat (10%) :{' '}
//                     {(
//                       Math.round((this.total() / 100) * 10 * 100) / 100
//                     ).toFixed(2)}
//                   </p>
//                 </div>
//                 <h2 className="font-weight-semibold mt-3">
//                   <span className="mr-1">Grand Total: </span>
//                   <NumberFormat
//                     displayType={'text'}
//                     value={(
//                       Math.round(this.total() * 100) / 100 -
//                       (this.total() / 100) * 10
//                     ).toFixed(2)}
//                     prefix={'$'}
//                     thousandSeparator={true}
//                   />
//                 </h2>
//               </div>
//             </div>
//             <p className="mt-5">
//               <small>
//                 In exceptional circumstances, Financial Services can provide an
//                 urgent manually processed special cheque. Note, however, that
//                 urgent special cheques should be requested only on an emergency
//                 basis as manually produced cheques involve duplication of effort
//                 and considerable staff resources. Requests need to be supported
//                 by a letter explaining the circumstances to justify the special
//                 cheque payment
//               </small>
//             </p>
//           </div>
//           <hr className="d-print-none" />
//           <div className="text-right d-print-none">
//             <Button type="primary" onClick={() => window.print()}>
//               <PrinterOutlined type="printer" />
//               <span className="ml-1">Print</span>
//             </Button>
//           </div>
//         </Card>
//       </div>
//     )
//   }
// }

export default OrderView
