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
  Popconfirm,
  Button,
} from 'antd'
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Icon from 'components/util-components/Icon'

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

const GeneralField = ({
  attributeOptions,
  handleDeleteAttributeOption,
  handleAddAttributeOption,
  handleAttributeOptionValueChange,
}) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Attribute group options">
          {/* {form.getFieldDecorator('parentCategory')( */}
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {attributeOptions.map((item, index) => {
              const key = item.id
              return (
                <div style={{ margin: '5px' }}>
                  <Input
                    onChange={(e) =>
                      handleAttributeOptionValueChange(e, item.id, key, index)
                    }
                    key={key}
                    addonAfter={
                      <Popconfirm
                        key={key}
                        title="Sure to delete?"
                        onConfirm={() => handleDeleteAttributeOption(item.id)}
                      >
                        <Button
                          icon={<CloseCircleOutlined color="df071a" />}
                          key={key}
                        />
                      </Popconfirm>
                    }
                    defaultValue={item.value}
                  />
                </div>
              )
            })}
          </div>
          <div>
            <Button
              onClick={handleAddAttributeOption}
              icon={<PlusCircleOutlined />}
            />
          </div>
        </Form.Item>
      </Card>
    </Col>
  </Row>
)

export default GeneralField
