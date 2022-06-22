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
} from 'antd'
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
  images: [
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
  description: [
    {
      required: true,
      message: 'Required',
    },
  ],
  brandId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  categoryId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  allowedPaymentTypes: [
    {
      required: true,
      message: 'Required',
    },
  ],
  returnable: [
    {
      required: true,
      message: 'Required',
    },
  ],
  returnPeriod: [
    {
      required: true,
      message: 'Required',
    },
  ],
  allowedQuantityPerOrder: [
    {
      required: true,
      message: 'Required',
    },
  ],
  prescriptionRequired: [
    {
      required: true,
      message: 'Required',
    },
  ],

  lengthClass: [
    {
      required: true,
      message: 'Required',
    },
  ],
  weightClass: [
    {
      required: true,
      message: 'Required',
    },
  ],
  height: [
    {
      required: true,
      message: 'Required',
    },
  ],
  length: [
    {
      required: true,
      message: 'Required',
    },
  ],
  width: [
    {
      required: true,
      message: 'Required',
    },
  ],
  weight: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ propsImages, brands, categories }) => (
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
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item name="brandId" label="Brand" rules={rules.brandId}>
          <Select placeholder="Brand">
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="categoryId" label="Category" rules={rules.categoryId}>
          <TreeSelect
            treeData={categories}
            placeholder="Please select Category"
            treeDefaultExpandAll
          />
        </Form.Item>

        {/* <Form.Item
          name="productType"
          label="Product Type"
          rules={rules.productType}
        >
          <Input placeholder="Product Type" />
        </Form.Item> */}

        <Form.Item
          name="productType"
          label="ProductType"
          rules={rules.productType}
        >
          <Select placeholder="Product Type">
            <Option value="Medicine">Medicine</Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="allowedPaymentTypes"
          label="Allowed Payment Types"
          rules={rules.allowedPaymentTypes}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Allowed Payment Types"
          >
            <Option key="Cod" value="Cod">
              Cod
            </Option>
            <Option key="Online" value="Online">
              Online
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="returnable"
          label="Returnable"
          rules={rules.returnable}
        >
          <Select placeholder="Returnable">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="returnPeriod"
          label="ReturnPeriod"
          rules={rules.returnPeriod}
        >
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>

        <Form.Item
          name="allowedQuantityPerOrder"
          label="AllowedQuantityPerOrder"
          rules={rules.allowedQuantityPerOrder}
        >
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>

        <Form.Item
          name="prescriptionRequired"
          label="PrescriptionRequired"
          rules={rules.prescriptionRequired}
        >
          <Select placeholder="PrescriptionRequired">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
      </Card>
      {/* Shipping Details */}
      <Card title="Shipping Details">
        <Form.Item
          name="lengthClass"
          label="Length Class"
          rules={rules.lengthClass}
        >
          <Select placeholder="Length Class">
            <Option value="centimeter">centimeter</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="weightClass"
          label="Weight Class"
          rules={rules.weightClass}
        >
          <Select placeholder="Length Class">
            <Option value="kilograms">Kilograms</Option>
          </Select>
        </Form.Item>

        <Form.Item name="height" label="Height" rules={rules.height}>
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="length" label="Length" rules={rules.length}>
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="width" label="Width" rules={rules.width}>
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="weight" label="Weight" rules={rules.weight}>
          <InputNumber type="number" min={0} max={100000} />
        </Form.Item>
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Media">
        <Upload listType="picture-card" name="image" {...propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
)

export default GeneralField
