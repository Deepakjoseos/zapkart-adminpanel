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
  TreeSelect,
  Tag,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import { TweenOneGroup } from 'rc-tween-one'
import { PlusOutlined } from '@ant-design/icons'
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
  priority: [
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
  slug: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ propsImages, categories, handleChange, form, form_statuses,propsBannerImage }) => {
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

          <Form.Item name="parentId" label="Parent Category">
            <TreeSelect
              // style={{ width: 300 }}
              // value={props.form.getFieldValue('parentId')}
              // dropdownStyle={dropdownStyle}
              // showSearch
              // optionFilterProp="children"
              // filterOption={(input, option) =>
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
              showSearch
              filterOption={(inputValue, option) =>
                option.title.toLowerCase().includes(inputValue.toLowerCase())
              }
              treeData={categories}
              placeholder="Please select parent"
              treeDefaultExpandAll
            // onChange={(e) =>
            //   props.form.setFieldsValue({
            //     parentId: e,
            //   })
            // }
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
          <Form.Item name="homePriority" label="Home Priority" rules={rules.priority}>
            <InputNumber
              placeholder="Home Priority"
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
          <Form.Item name="metaTitle" label="MetaTitle">
            <Input placeholder="Meta Title" />
          </Form.Item>
          <Form.Item name="metaDescription" label="MetaDescription">
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
          <Form.Item name="slug" label="Slug" rules={rules.slug}>
            <Input placeholder="Slug" />
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
          <Upload
            listType="picture-card"
            name="image"
            {...propsImages}
            accept="image/*"
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 200px * 200px
        
        </Card>
        <Card title="Banner">
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
