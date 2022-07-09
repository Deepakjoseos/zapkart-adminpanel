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
}

const GeneralField = ({ propsDisplayImages }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="firstName" label="First Name" rules={rules.firstName}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={rules.lastName}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          validateStatus="success"
        >
          <Input disabled id="success" />
        </Form.Item>

        {/* <Form.Item >
          <Input disabled />
        </Form.Item> */}
        <Form.Item name="phone" label="Phone">
          <Input disabled />
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Display Image">
        <Upload listType="picture-card" name="image" {...propsDisplayImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
)

export default GeneralField
