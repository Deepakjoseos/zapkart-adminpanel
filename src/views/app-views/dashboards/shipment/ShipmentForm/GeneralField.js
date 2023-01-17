import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  Space,
  DatePicker,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import OrderSelectionField from './OrderSelectionField'
import authVendorService from 'services/auth/vendor'
import moment from 'moment'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  image: [
    {
      required: true,
      message: 'Required',
    },
  ],
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
  priority: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ form }) => {
  const [shippedByVendor, setShippedByVendor] = useState(null)
  const [pickupLocations, setPickUpLocations] = useState([])

  const getPickupLocations = async () => {
    const data = await authVendorService.getProfile()
    if (data?.pickupLocations) {
      setPickUpLocations(data.pickupLocations)
    }
  }

  useEffect(() => {
    getPickupLocations()
  }, [])
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <Form.Item
            name="shippedBy"
            label="Shipped By Vendor"
            rules={rules.shippedByVendor}
          >
            <Select
              placeholder="Shipped By Vendor"
              onChange={(e) => {
                setShippedByVendor(e)
              }}
            >
              <Option value={'Vendor'}>Yes</Option>
              <Option value={'Not Selected'}>No</Option>
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

          <Form.List name="items">
            {(fields, { add, remove }) => {
              console.log(fields, 'show-filelds')
              return (
                <OrderSelectionField
                  add={add}
                  fields={fields}
                  remove={remove}
                />
              )
            }}
          </Form.List>

          {/* <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item> */}
        </Card>
        {shippedByVendor === false && (
          <Card title="Shipment Details">
            <Form.Item name="description" label="Description">
              <Input placeholder="Description" />
            </Form.Item>

            <Form.Item name="pickup_location" label="Pickup Location">
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
  )
}

export default GeneralField
