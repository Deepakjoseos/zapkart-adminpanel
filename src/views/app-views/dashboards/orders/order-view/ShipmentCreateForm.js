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
import shipmentService from 'services/shipment'
import vendorService from 'services/vendor'

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
  const [vendors, setVendors] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [vendorBasedItems, setVendorBasedItems] = useState([])

  const getPickupLocations = async (id) => {
    // const data = await shipmentService.getPickupLocations()
    // if (data?.shipping_address) {
    //   setPickUpLocations(data.shipping_address)
    // }
    const data = await vendorService.getVendorById(id)
    if (data) {
      setPickUpLocations(data.pickupLocations)
    }
  }

  useEffect(() => {
    console.log(orderItems, 'hjvj')
    if (orderItems?.length > 0) {
      const vendors = orderItems?.map((cur) => {
        return {
          id: cur.vendorId,
          name: cur.vendorName,
        }
      })
      setVendors(vendors)
    }
  }, [orderItems])

  const getVendorItems = (vendorId) => {
    const itemsBasedVendor = orderItems?.filter(
      (cur) => cur.vendorId === vendorId && !cur.shipmentId
    )

    setVendorBasedItems(itemsBasedVendor)
  }

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
            pickupLocation: values.pickupLocation,
            length: values.length,
            breadth: values.breadth,
            height: values.height,
            weight: values.weight,
          },
        }

        const created = await shipmentService.createShipment(sendingValues)
        if (created) {
          message.success(`Created Shipment`)
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
                name="vendorId"
                label="Select Vendor"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Select
                  placeholder="Select Vendor"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => {
                    setSelectedVendorId(e)
                    getVendorItems(e)
                    getPickupLocations(e)

                    // getPickupLocationByVendorId(e)
                    form.resetFields()
                    form.setFieldsValue({
                      vendorId: e,
                      shippedByVendor: false,
                    })

                    setShippedByVendor(false)
                  }}
                >
                  {vendors?.map((cur) => (
                    <Option value={cur.id}>{cur?.name}</Option>
                  ))}
                </Select>
              </Form.Item>

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
                  placeholder="Shipped By Vendor"
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
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  //   size={size}
                  placeholder="Products Items"
                  defaultValue={[]}
                  //   onChange={handleChange}
                >
                  {vendorBasedItems?.map((item) => (
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
                  name="pickupLocation"
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
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default ShipmentCreateForm
