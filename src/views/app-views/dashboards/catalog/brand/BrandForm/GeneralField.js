import React from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  Tag,
  Button,
  Tooltip,
  notification,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import { TweenOneGroup } from 'rc-tween-one'
import { SwapOutlined } from '@ant-design/icons'
import slugify from 'slugify'
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

  slug: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ form, propsImages, form_statuses, propsBannerImage }) => {
  const generateSlugFromName = (value) => {
    const slug = slugify(value)
    form.setFieldsValue({ slug })
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input
              placeholder="Name"
              onChange={(e) => generateSlugFromName(e.target.value)}
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
        <Card title="SEO">
          <Form.Item name="metaTitle" label="Meta Title">
            <Input placeholder="Meta Title" />
          </Form.Item>
          <Form.Item name="metaDescription" label="Meta Description">
            <Input placeholder="metaDescription" />
          </Form.Item>
          {/* <Form.Item name="keywords" label="Keywords">
            <Input placeholder="keywords" />
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

          <Form.Item name="slug" label="slug" rules={rules.slug}>
            <Input placeholder="slug" />
          </Form.Item>

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
          <Upload listType="picture-card" name="image" {...propsImages} accept="image/*">
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 242px * 88px

        </Card>
        <Card title="Banner Image">
          <Upload listType="picture-card" name="image" {...propsBannerImage}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 1586px * 205px
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
