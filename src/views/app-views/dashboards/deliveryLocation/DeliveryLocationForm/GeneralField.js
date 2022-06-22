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
  isFinal: [
    {
      required: true,
      message: 'Required',
    },
  ],
  uniqueId: [
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
}

const GeneralField = ({
  form,
  deliveryLocations,
  setIsFinalTrue,
  isFinalTrue,
}) => (
  <Card title="Basic Info">
    <Form.Item name="name" label="Name" rules={rules.name}>
      <Input placeholder="Name" />
    </Form.Item>
    <Form.Item name="isFinal" label="Is Final" rules={rules.isFinal}>
      <Select placeholder="is Final" onChange={(e) => setIsFinalTrue(e)}>
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
    {isFinalTrue && (
      <Form.Item name="uniqueId" label="UniqueId" rules={rules.uniqueId}>
        <Input placeholder="Unique Id" />
      </Form.Item>
    )}

    <Form.Item name="status" label="Status" rules={rules.status}>
      <Select placeholder="Status">
        <Option value="Active">Active</Option>
        <Option value="Hold">Hold</Option>
      </Select>
    </Form.Item>

    <Form.Item name="parentId" label="Parent">
      <Select placeholder="Parent">
        {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Card>
)

export default GeneralField
