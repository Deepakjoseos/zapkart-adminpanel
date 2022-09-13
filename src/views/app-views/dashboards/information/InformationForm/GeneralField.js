import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Editor from 'components/shared-components/Editor'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  description: [
    {
      required: true,
      message: 'Required',
    },
  ],
  image: [
    {
      required: true,
      message: 'required',
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

const GeneralField = ({form,propsImages,statuses}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={rules.description}
        >
          <Editor
            placeholder="Write something..."
            editorHtml={form.getFieldValue('description') || ''}
            onChange={(e) => form.setFieldsValue({ description: e })}
            name="description"
          />
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
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
      </Card>
      <Card title="SEO">
          <Form.Item name="metaTitle" label="Meta Title">
            <Input placeholder="Meta Title" />
          </Form.Item>
          <Form.Item name="metaDescription" label="Meta Description">
            <Input placeholder="Meta Description" />
          </Form.Item>
          {/* <Form.Item name="keywords" label="Keywords">
            <Input placeholder="Keywords" />
          </Form.Item> */}
          <Form.Item name="keywords" label="Keywords">
            <Select
              dropdownStyle={{ display: 'none' }}
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Keywords"
            ></Select>
          </Form.Item>
          {/* <Form.Item name="slug" label="Slug" rules={rules.slug}>
            <Input placeholder="Slug" />
          </Form.Item> */}
         
          <Form.Item name="tags" label="Tags">
            <Select
              dropdownStyle={{ display: 'none' }}
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Tags"
            ></Select>
          </Form.Item>
        </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Upload listType="picture-card" name="image" {...propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 1495px * 420px
      </Card>
    </Col>
  </Row>
)

export default GeneralField
