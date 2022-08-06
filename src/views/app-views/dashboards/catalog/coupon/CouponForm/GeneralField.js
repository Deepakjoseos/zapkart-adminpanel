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
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  code: [
    {
      required: true,
      message: 'Required',
    },
  ],
  valueType: [
    {
      required: true,
      message: 'Required',
    },
  ],
  value: [
    {
      required: true,
      message: 'Required',
    },
  ],
  // maxAmount: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // minOrderAmount: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  availableType: [
    {
      required: true,
      message: 'Required',
    },
  ],
  // available: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // products: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  // categories: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  // brands: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  // userGroups: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  // users: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

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
}

const GeneralField = ({
  categories,
  brands,
  productTemplates,
  users,
  userGroups,
}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="code" label="Code" rules={rules.code}>
          <Input placeholder="Code" />
        </Form.Item>

        <Form.Item name="valueType" label="Value Type" rules={rules.valueType}>
          <Select placeholder="Value Type">
            <Option value="Percentage">Percentage</Option>
            <Option value="Amount">Amount</Option>
          </Select>
        </Form.Item>

        <Form.Item name="value" label="Value" rules={rules.priority}>
          <InputNumber placeholder="Value" size="large" min={0} max={1000000} />
        </Form.Item>

        <Form.Item name="maxAmount" label="MaxAmount" rules={rules.maxAmount}>
          <InputNumber placeholder="MaxAmount" min={0} max={100000} />
        </Form.Item>

        <Form.Item
          name="minOrderAmount"
          label="MinOrderAmount"
          rules={rules.minOrderAmount}
        >
          <InputNumber placeholder="MinOrderAmount" min={0} max={100000} />
        </Form.Item>

        <Form.Item
          name="availableType"
          label="Available Type"
          rules={rules.availableType}
        >
          <Select placeholder="Available Type">
            <Option value="Limited">Limited</Option>
            <Option value="Unlimited">Unlimited</Option>
          </Select>
        </Form.Item>

        <Form.Item name="available" label="Available" rules={rules.available}>
          <InputNumber placeholder="Available" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="products" label="Products" rules={rules.products}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Products"
          >
            {productTemplates.map((productTemplate) => (
              <Option key={productTemplate.id} value={productTemplate.id}>
                {productTemplate.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="categories"
          label="Categories"
          rules={rules.categories}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Categories"
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="brands" label="Brands" rules={rules.brands}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Brands"
          >
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="userGroups"
          label="User Groups"
          rules={rules.userGroups}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="User Groups"
          >
            {userGroups.map((userGroup) => (
              <Option key={userGroup.id} value={userGroup.id}>
                {userGroup.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="users" label="Users" rules={rules.users}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Users"
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {`${user?.firstName} ${user?.lastName}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="startEndDate"
          label="Start-End Date"
          rules={rules.startEndDate}
        >
          <DatePicker.RangePicker />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
      </Card>
    </Col>
  </Row>
)

export default GeneralField