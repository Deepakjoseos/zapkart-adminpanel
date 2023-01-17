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

const GeneralField = ({propsImages,form_statuses}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Manufacturer name" rules={rules.name}>
          <Input placeholder="Manufacturer Name" />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber
            placeholder="Priority"
            size="large"
            min={0}
            max={100000}
          />
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
      <Card title="Media">
        <Upload listType="picture-card" name="image" {...propsImages} accept="image/*">
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 80px * 80px
      </Card>
    </Col>
  </Row>
)

export default GeneralField
