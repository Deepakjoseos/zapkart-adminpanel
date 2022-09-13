import React from 'react'
import { Input, Row, Col, Card, Form, Upload, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  firstName: [
    {
      required: true,
      message: 'Required',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Required',
    },
  ],
  drugLicense: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ propsDisplayImages, form, mode, emailVerified, phoneVerified, pickupLocations, statuses, userGroups }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="firstName" label="First Name" rules={rules.firstName}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={rules.lastName}>
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item name="gst" label="GST" rules={rules.gst}>
          <Input placeholder="GST" />
        </Form.Item>
        <Form.Item name="drugLicense" label="Drug License Number" rules={rules.drugLicense}>
          <Input placeholder="Drug License Number" />
        </Form.Item>
        <Form.Item
          name="groups"
          label="User Groups"
          rules={rules.userGroups}
        >
          <Select
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="User Groups"
          >
            {userGroups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.name}
              </Option>
            ))}
          </Select>
        </Form.Item>



        {mode === 'ADD' ?
          <>
            <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
                <Option value="Active">Active</Option>
                <Option value="Hold">Hold</Option>
              </Select>
            </Form.Item>
            <Form.Item name="emailVerified" label="Emal Verified" rules={rules.status}>
              <Select placeholder="Email Verified">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={rules.pan}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={rules.password}
            >
              <Input.Password />
            </Form.Item>


            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="tanNumber" label="Tan Number" rules={rules.tanNumber}>
              <Input placeholder="Tan Number" />
            </Form.Item>
          </>
          : ""}

        {mode === 'EDIT' ?
          <>

            <Form.Item
              hasFeedback
              validateStatus={phoneVerified ? 'success' : 'error'}
              name="phone"
              label="Phone"
            >
              <Input disabled id="success" />
            </Form.Item>

            <Form.Item
              hasFeedback
              validateStatus={emailVerified ? 'success' : 'error'}
              name="email"
              label="Email"
            >
              <Input disabled id="success" />
            </Form.Item>

          </>
          : ""}



        {/* <Form.Item >
          <Input disabled />
        </Form.Item> */}
        <Form.Item name="pan" label="PAN" rules={rules.pan}>
          <Input placeholder="Pan Number" />
        </Form.Item>

      </Card>

      {/* <Card title="Address">
        <Form.Item name="address.line1" label="Line1">
          <Input placeholder="Line 1" />
        </Form.Item>

        <Form.Item name="address.city" label="City">
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item name="address.state" label="State">
          <Input placeholder="State" />
        </Form.Item>

        <Form.Item name="address.country" label="Country">
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item name="address.phone" label="Phone">
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item name="address.zipcode" label="Zipcode">
          <Input placeholder="Zipcode" />
        </Form.Item>
      </Card> */}

      {/* 'business.name': data?.business?.name,
        'business.address.line1': data?.business?.address?.line1,
        'business.address.city': data?.business?.address?.city,
        'business.address.state': data?.business?.address?.state,
        'business.address.country': data?.business?.address?.country,
        'business.address.phone': data?.business?.address?.phone,
        'business.address.zipcode': data?.business?.address?.zipcode, */}

      {mode === 'EDIT' ?
        <Card title="Business">
          <Form.Item name="business.name" label="Bussiness Name">
            <Input placeholder="Bussiness Name" />
          </Form.Item>
          <br />
          <h4>Bussiness Address</h4>
          <Form.Item name="business.address.line1" label="Line1">
            <Input placeholder="Line1" />
          </Form.Item>

          <Form.Item name="business.address.city" label="City">
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item name="business.address.state" label="State">
            <Input placeholder="State" />
          </Form.Item>

          <Form.Item name="business.address.country" label="Country">
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item name="business.address.phone" label="Phone">
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item name="business.address.zipcode" label="Zipcode">
            <Input placeholder="Zipcode" />
          </Form.Item>


        </Card> : " "}


    </Col>


    <Col xs={24} sm={24} md={7}>
      <Card title="Display Image">
        <Upload listType="picture-card" name="image" {...propsDisplayImages} accept="image/*">
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
)

export default GeneralField
