import {
  Button,
  Image,
  message,
  Modal,
  notification,
  Select,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import orderService from 'services/orders'
import PrescriptionSelector from '../PrescriptionSelector'

const orderStatuses = [
  'Confirmed',
  'Verifying Prescription',
  'Prescriptions Missing',
]

const Prescription = ({
  orderId,
  userId,
  products,
  reFetchOrderData,
  prescriptions,
  next,
  orderStatus,
}) => {
  const { Column } = Table
  const { Option } = Select

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)

  useEffect(() => {
    if (products?.length === 0) {
      message.success('Prescription Part is Done')
      next()
    }
  }, [products])

  const handleOrderStatusChange = async (value, selectedRow) => {
    const updatedOrderStatus = await orderService.updateOrderItemStatus(
      orderId,
      {
        itemIds: [selectedRow.id],
        status: value,
      }
    )

    if (updatedOrderStatus) {
      notification.success({ message: 'Order Status Updated' })

      // reFetchOrderData()
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000)
    }
  }

  return (
    <>
      {prescriptions?.length > 0 && (
        <>
          <p>Prescriptions: </p>
          {prescriptions?.map((cur) => (
            <Image width={100} src={cur} />
          ))}
        </>
      )}

      {orderStatus === 'Prescriptions Missing' && (
        <div className="d-flex right">
          <Button
            type="primary"
            className="mb-4 mr-2"
            onClick={() => setIsPrescriptionModalOpen(true)}
          >
            Re-Upload Prescription
          </Button>
        </div>
      )}

      <Modal
        title="Re Upload Prescription"
        visible={isPrescriptionModalOpen}
        onCancel={() => {
          setIsPrescriptionModalOpen(false)
        }}
        footer={false}
      >
        <PrescriptionSelector
          orderId={orderId}
          userId={userId}
          setIsPrescriptionModalOpen={setIsPrescriptionModalOpen}
        />
      </Modal>

      <Table
        dataSource={products}
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
      </Table>
    </>
  )
}

export default Prescription
