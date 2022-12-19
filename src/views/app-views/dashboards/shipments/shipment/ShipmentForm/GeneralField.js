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
import moment from 'moment'
import shipmentService from 'services/shipment'
import vendorService from 'services/vendor'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  vendorId: [
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
  const [shippedBy, setShippedBy] = useState(null)
  const [pickupLocations, setPickUpLocations] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [vendors, setVendors] = useState([])

  // const getPickupLocations = async () => {
  //   const data = await shipmentService.getPickupLocations()
  //   if (data?.shipping_address) {
  //     setPickUpLocations(data.shipping_address)
  //   }
  // }
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const setCorrectVendorInfo = data?.map((cur) => {
        return { ...cur, fullName: cur?.firstName + ' ' + cur?.lastName }
      })
      setVendors(setCorrectVendorInfo)
    }
  }

  const getPickupLocationByVendorId = (vendorId) => {
    const vendor = vendors?.find((cur) => cur.id === vendorId)

    setPickUpLocations(vendor?.pickupLocations)
  }

  useEffect(() => {
    // getPickupLocations()
    getVendors()
  }, [])
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <Form.Item
            name="vendorId"
            label="Select Vendor"
            rules={rules.vendorId}
          >
            <Select
              placeholder="Select Vendor"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => {
                setSelectedVendorId(e)

                getPickupLocationByVendorId(e)

                form?.setFieldsValue({
                  shippedByVendor: false,
                  expectedDeliveryDate: moment(),
                  items: [
                    {
                      orderId: '',
                      itemIds: [],
                    },
                  ],
                  description: '',
                  pickupLocation: '',
                  length: '',
                  breadth: '',
                  height: '',
                  weight: '',
                })
                setShippedBy(null)
              }}
            >
              {vendors?.map((cur) => (
                <Option value={cur.id}>{cur?.fullName}</Option>
              ))}
            </Select>
          </Form.Item>

          {selectedVendorId && (
            <Form.Item
              name="shippedBy"
              label="Shipped By"
              rules={rules.shippedByVendor}
            >
              <Select
                placeholder="Shipped By"
                onChange={(e) => {
                  setShippedBy(e)
                }}
              >
                <Option value={'Vendor'}>Vendor</Option>
                <Option value={'Ship Rocket'}>Ship Rocket</Option>
                <Option value={'Track On'}>Track On</Option>
              </Select>
            </Form.Item>
          )}

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

          {selectedVendorId && (
            <Form.List name="items">
              {(fields, { add, remove }) => {
                console.log(fields, 'show-filelds')
                return (
                  <OrderSelectionField
                    selectedVendorId={selectedVendorId}
                    add={add}
                    fields={fields}
                    remove={remove}
                    form={form}
                  />
                )
              }}
            </Form.List>
          )}

          {/* <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item> */}
        </Card>
        {shippedBy && shippedBy !== 'Vendor' && (
          <Card title="Shipment Details">
            <Form.Item name="description" label="Description">
              <Input placeholder="Description" />
            </Form.Item>

            <Form.Item name="pickupLocation" label="Pickup Location">
              <Select placeholder="Pickup Location">
                {pickupLocations?.map((item) => (
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
  )
}

export default GeneralField
