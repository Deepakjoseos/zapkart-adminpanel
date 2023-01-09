import React from 'react'
import { Input, Row, Col, Card, Form, Select, Upload } from 'antd'
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon'


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
}

const GeneralField = ({ props, propsImages, form_statuses }) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
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
      <Card title="Display Image">
        <Upload listType="picture-card" name="image" {...propsImages} accept="image/*">
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 550px * 440px

      </Card>
    </Col>
  </Row>
)

export default GeneralField
