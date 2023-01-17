
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import authVendorService from 'services/auth/vendor'
import shipmentService from 'services/shipment'

const Shipment = ({
  products,
  shipmentAvailableProducts,
  orderNo,
  next,
  orderId,
  reFetchOrderData,
}) => {
  const [form] = Form.useForm()
  const [shipmentFormOpen, setShipmentFormOpen] = useState(false)

  const [shippedBy, setShippedBy] = useState(null)
  const { Option } = Select

  const [pickupLocations, setPickUpLocations] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const getPickupLocations = async () => {
    const data = await authVendorService.getProfile()
    if (data?.pickupLocations) {
      setPickUpLocations(data.pickupLocations)
      console.log('helppp', data.pickupLocations)
    }
  }
  let addShipment = products.reduce((acc,items) => {
    return items.status === 'Confirmed' && !items.shipped ? acc + 1 : 0
},0)

  useEffect(() => {
    getPickupLocations()
    if(products?.length === 0 && addShipment === 0)
    {
      // message.success('Shipment Part is Done')
      next()
    }
  }, [addShipment])

  console.log(products, 'ejk')

  const onFinish = async () => {
    setSubmitLoading(true)

    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          shippedBy: values.shippedBy,
          items: [
            {
              orderId: orderId,
              itemIds: values.itemIds,
            },
          ],
          expectedDeliveryDate: moment(values.expectedDeliveryDate).format(
            'YYYY-MM-DD'
          ),
          shipRocket: {
            pickupLocation: values.pickup_location,
            length: values.length,
            breadth: values.breadth,
            height: values.height,
            weight: values.weight,
          },
        }

        const created = await shipmentService.createShipment(sendingValues)
        if (created) {
          reFetchOrderData()
          message.success(`Created Shipment Successfully`)
          setShipmentFormOpen(false)
          // history.goBack()
          // setIsFormOpen(false)
          form.resetFields()
        }

        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  const { Column } = Table

  

  return (
    <>
      <Tag color="orange">
        Note: You can Only Add Shipment If Product Status is Confirmed
      </Tag>
      {addShipment > 0 && (
        <Button
          style={{ float: 'right' }}
          type="primary"
          onClick={() => setShipmentFormOpen(true)}
        >
          Add Shipment
        </Button>
      )}

      <Table
        dataSource={shipmentAvailableProducts}
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

        <Column title="EXP" dataIndex="expiry" key="expiry"
        render={(expiry) => {
          return (
            <>
              {moment(new Date(expiry)).format(
            'DD-MMM-YYYY'
          )}
            </>
          )
        }}
        />
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

        <Column title="Status" dataIndex="status" key="status" />
      </Table>

      {/* Form */}
      <Drawer
        title="Shipment Form"
        width={'50%'}
        onClose={() => {
          setShipmentFormOpen(false)
        }}
        visible={shipmentFormOpen}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Card title="Basic Info">
                <h3>Order No: {orderNo}</h3>
                <Form.Item
                  name="shippedBy"
                  label="Shipped By Vendor"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Select
                    placeholder="Shipped By Vendor"
                    onChange={(e) => {
                      setShippedBy(e)
                    }}
                  >
                    <Option value={'Vendor'}>Yes</Option>
                    <Option value={'Not Selected'}>No</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="itemIds"
                  label="Products"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    //   size={size}
                    placeholder="Products Items"
                    defaultValue={[]}
                    //   onChange={handleChange}
                  >
                    {products?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {shippedBy === 'Vendor' && (
                  <Form.Item
                    name="expectedDeliveryDate"
                    label="Expected Delivery Date"
                  >
                    <DatePicker
                      defaultValue={moment()}
                      format="YYYY-MM-DD"
                      onChange={(date, dateString) => {
                        // console.log(date, dateString, 'plss')
                        form.setFieldsValue({
                          expectedDeliveryDate: moment(dateString),
                        })
                      }}
                    />
                  </Form.Item>
                )}

                {/* <Form.List name="items">
                {(fields, { add, remove }) => {
                  console.log(fields, 'show-filelds')
                  return (
                    <OrderSelectionFiel
                      add={add}
                      fields={fields}
                      remove={remove}
                    />
                  )
                }}
              </Form.List> */}

                {/* <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item> */}
              </Card>
              {shippedBy !== 'Vendor' && shippedBy !== null && (
                <Card title="Shipment Details">
                  <Form.Item name="description" label="Description">
                    <Input placeholder="Description" />
                  </Form.Item>

                  <Form.Item
                    name="pickup_location"
                    label="Pickup Location"
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                      },
                    ]}
                  >
                    <Select placeholder="Pickup Location">
                      {pickupLocations.map((item) => (
                        <Option value={item?.pickupLocation}>
                          {`${item.address}, ${item.city}, ${item.state}, ${item?.pinCode}`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item name="length" label="Length">
                        <InputNumber
                          placeholder="Length"
                          // size="large"
                          style={{ width: '100%' }}
                          min={0}
                          max={100000}
                          addonAfter="cm"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item name="breadth" label="Breadth">
                        <InputNumber
                          placeholder="Breadth"
                          style={{ width: '100%' }}
                          // size="large"
                          min={0}
                          max={100000}
                          addonAfter="cm"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item name="height" label="Height">
                        <InputNumber
                          placeholder="Height"
                          style={{ width: '100%' }}
                          // size="large"
                          min={0}
                          max={100000}
                          addonAfter="cm"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8}>
                      <Form.Item name="weight" label="Weight">
                        <InputNumber
                          placeholder="Weight"
                          style={{ width: '100%' }}
                          // size="large"
                          min={0}
                          max={100000}
                          addonAfter="kg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              )}
              <Button type="primary" loading={submitLoading} onClick={onFinish}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default Shipment
