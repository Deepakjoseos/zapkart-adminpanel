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
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
  type: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({form_statuses}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="type" label="User Type" rules={rules.type}>
          <Select placeholder="User Type">
            <Option value="Vendor">Vendor</Option>
            <Option value="Customer">Customer</Option>
          </Select>
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
  </Row>
)

export default GeneralField
