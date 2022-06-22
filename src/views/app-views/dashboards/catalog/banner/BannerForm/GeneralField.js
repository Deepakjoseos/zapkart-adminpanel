import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  forwardUrl: [
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
  mobileImage: [
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

const GeneralField = ({ propsImages, propsMobileImages }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="forwardUrl"
          label="Forward Url"
          rules={rules.forwardUrl}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber placeholder="Priority" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Image">
        <Upload listType="picture-card" name="image" {...propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
      <Card title="Mobile Image">
        <Upload listType="picture-card" name="image" {...propsMobileImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
)

export default GeneralField
