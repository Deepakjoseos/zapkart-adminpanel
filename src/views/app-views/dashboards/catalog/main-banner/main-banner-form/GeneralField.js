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
  // forwardUrl: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
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

const GeneralField = ({ propsImages, propsMobileImages,form_statuses }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="forwardUrl"
          label="Forward Url"
          // rules={rules.forwardUrl}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber placeholder="Priority" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
        <Select placeholder="Status">
        {form_statuses.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Image">
        <Upload listType="picture-card" name="image" {...propsImages} accept="image/*">
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 2122px * 538px
      </Card>
      <Card title="Main Banner">
        <Upload listType="picture-card" name="image" {...propsMobileImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 400px * 180px
      </Card>
    </Col>
  </Row>
)

export default GeneralField
