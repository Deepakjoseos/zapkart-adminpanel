import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  InputNumber,
  TreeSelect,
} from 'antd'
const { Option } = Select
const SITE_NAME = process.env.REACT_APP_SITE_NAME

const GeneralField = ({
  form,
  vendors,
  state,
  pincode,
  city,
  setFieldValue,
  getPincode,
  getCity,
}) => {
  console.log('hiiii')
  console.log(pincode)
  return (
    <Card>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Phone" type="tel" />
          </Form.Item>
        </Col>

        {/* <Col span={12}>
          <Form.Item
            name="state"
            label={SITE_NAME === 'zapkart' ? 'State' : 'Emirates'}
          >
            <Select
              placeholder={SITE_NAME === 'zapkart' ? 'State' : 'Emirates'}
              onChange={(val) => {
                form.setFieldsValue({ city: null })
                getCity('', `stateName=${val}`)
              }}
            >
              {state.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          {SITE_NAME === 'zapkart' && (
            <Form.Item name="state" label="State">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="State"
                onChange={(val) => {
                  form.setFieldsValue({ city: null, zipcode: null })
                  getCity(`stateName=${val}`)
                }}
              >
                {state.map((item) => (
                  <Option key={item.name} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
        <Col span={8}>
          <Form.Item
            name="city"
            label={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
          >
            <Select
              placeholder={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(val) => {
                form.setFieldsValue({ zipcode: null })
                getPincode(`cityName=${val}`)
              }}
            >
              {city.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="pinCode"
            label={SITE_NAME === 'zapkart' ? 'Zipcode' : 'City'}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder={SITE_NAME === 'zapkart' ? 'Zipcode' : 'City'}
            >
              {pincode.map((pincode) => (
                <Option key={pincode.name} value={pincode.name}>
                  {pincode.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* 
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
          >
            <Select placeholder={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}>
              <Option value=""></Option>
              {city.map((city) => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="pin_code"
            label={SITE_NAME === 'zapkart' ? 'Pincode' : 'City'}
          >
            <Select
              //  disabled={mode === 'EDIT' ? true : false}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Pincode"
            >
              {pincode.map((pincode) => (
                <Option key={pincode.name} value={pincode.name}>
                  {pincode.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="addressLine2" label="Address 2">
            <Input.TextArea rows={4} placeholder="Address 2" />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="lat" label="Lattitude">
            <InputNumber placeholder="Lattitude" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="long" label="Longitude">
            <InputNumber placeholder="Longitude" />
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="vendorId" label="Vendor">
            <Select
              //  disabled={mode === 'EDIT' ? true : false}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Vendor"
            >
              {vendors.map((vendor) => (
                <Option value={vendor.id}>{vendor.fullName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default GeneralField
