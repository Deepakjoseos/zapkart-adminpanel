import React from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Select,
  DatePicker,
} from 'antd'

const { Option } = Select

const rules = {
  tabTitle: [
    {
      required: true,
      message: 'Required',
    },
  ],
  isTitleShow: [
    {
      required: true,
      message: 'Required',
    },
  ],

  startEndDate: [
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

const GeneralField = ({ form_statuses }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="tabTitle" label="tab Title" rules={rules.tabTitle}>
            <Input placeholder="tabTitle" />
          </Form.Item>
          <Form.Item
            name="isTitleShow"
            label="Show Title"
            rules={rules.isTitleShow}
          >
            <Select placeholder="Show Title">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
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

          <Form.Item
            name="startEndDate"
            label="Start-End Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker.RangePicker />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
