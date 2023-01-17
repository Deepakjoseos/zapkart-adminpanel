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
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import authVendorService from 'services/auth/vendor'
import shipmentService from 'services/shipment'

const ShipmentCreateForm = ({
  setIsFormOpen,
  isFormOpen,
  orderItems,
  orderNo,
  orderId,
}) => {
  const [form] = Form.useForm()
  const history = useHistory()

  const [shippedByVendor, setShippedByVendor] = useState(null)
  const { Option } = Select

  const [pickupLocations, setPickUpLocations] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const getPickupLocations = async () => {
    const data = await authVendorService.getProfile()
    if (data?.pickupLocations) {
      setPickUpLocations(data.pickupLocations)
    }
  }

  useEffect(() => {
    getPickupLocations()
  }, [])

  const onFinish = async () => {
    setSubmitLoading(true)

    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          shippedByVendor: values.shippedByVendor,
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
          message.success(`Created ${values.name} to Shipment list`)
          history.goBack()
          setIsFormOpen(false)
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

  return (
    <Drawer
      title="Shipment Form"
      width={720}
      onClose={() => {
        setIsFormOpen(false)
        form.resetFields()
      }}
      visible={isFormOpen}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          <Button
            onClick={() => {
              setIsFormOpen(false)
              form.resetFields()
            }}
          >
            Cancel
          </Button>
          <Button type="primary" loading={submitLoading} onClick={onFinish}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            <Card title="Basic Info">
              <h3>Order No: {orderNo}</h3>
              <Form.Item
                name="shippedByVendor"
                label="Shipped By Vendor"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Select
                  placeholder="Shipped By Vendoratus"
                  onChange={(e) => {
                    setShippedByVendor(e)
                  }}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
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
                  {orderItems?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {shippedByVendor && (
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
            {shippedByVendor === false && (
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
                      <Option value={item?.pickup_location}>
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
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default ShipmentCreateForm
