import React, { useState } from 'react'
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
  valueTypes,
  availableTypes,
  form_statuses,
}) => {
  const [availableType, setAvailableType] = useState(null)
  console.log('availableType', availableType)
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item name="code" label="Code" rules={rules.code}>
            <Input placeholder="Code" />
          </Form.Item>

          <Form.Item
            name="valueType"
            label="Value Type"
            rules={rules.valueType}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 150 }}
            >
              {valueTypes?.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="value" label="Value" rules={rules.priority}>
            <InputNumber
              placeholder="Value"
              size="large"
              min={0}
              max={1000000}
            />
          </Form.Item>

          <Form.Item name="maxAmount" label="Maximum Amount" rules={rules.maxAmount}>
            <InputNumber placeholder="Maximum Amount" min={0} max={100000} />
          </Form.Item>

          <Form.Item
            name="minOrderAmount"
            label="Minimum Order Amount"
            rules={rules.minOrderAmount}
          >
            <InputNumber placeholder="Minimum Order Amount" min={0} max={100000} />
          </Form.Item>
          <Row>
            <Col span={8}>
              <Form.Item
                name="availableType"
                label="Available Type"
                rules={rules.availableType}
              >
                <Select
                  placeholder="Available Type"
                  onChange={(value) => {
                    setAvailableType(value)
                  }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {availableTypes?.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {availableType === 'Limited' ? (
              <span className="ml-3">
                <Col span={16}>
                  <Form.Item
                    name="available"
                    label="Available"
                    rules={rules.available}
                  >
                    <InputNumber placeholder="Available" min={0} max={100000} />
                  </Form.Item>
                </Col>
              </span>
            ) : (
              ''
            )}
          </Row>

          <Form.Item name="products" label="Products" rules={rules.products}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Products"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
            label="Start End Date"
            rules={rules.startEndDate}
          >
            <DatePicker.RangePicker />
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
}

export default GeneralField
