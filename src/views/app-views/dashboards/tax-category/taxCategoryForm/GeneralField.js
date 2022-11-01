import React, { useState } from 'react'
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
    Space,
    Button,
    Image,
    Tag,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Editor from 'components/shared-components/Editor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TweenOneGroup } from 'rc-tween-one'

// const { Dragger } = Upload
const { Option } = Select

const SITE_NAME = process.env.REACT_APP_SITE_NAME

const rules = {
    type: [
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
    percent: [
        {
            required: true,
            message: 'Required',
        },
    ]

}

const GeneralField = ({
    mode, statuses, sameStateValues
}) => {
    const [image, setImage] = useState(false)

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={17}>
                <Card title="">
                    <Form.Item label="Name" name="name">
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Select placeholder="Status">
                            <Option value="Active">Active</Option>
                            <Option value="Hold">Hold</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={rules.priority}>
            <InputNumber
              placeholder="Priority"
              size="large"
              min={0}
              max={100000}
            />
          </Form.Item>
                    <p>Taxes</p>
                    <Form.List name="taxes">
                        {(fields, { add, remove }) => {
                            console.log(fields, 'show-filelds')
                            return (
                                <>
                                    {fields.map((field) => (
                                        <Space
                                            key={field.key}
                                            style={{ display: 'flex', width: '100%' }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...field} label="Type"
                                                rules={[
                                                    { required: true, message: 'required' },
                                                ]}
                                                name={[field.name, 'type']}
                                                fieldKey={[field.fieldKey, 'type']}
                                            >
                                                <Input
                                                    placeholder="Type"
                                                    style={{ width: '100%' }}

                                                />

                                            </Form.Item>
                                  
                                            <Form.Item label="Percent"
                                                {...field}
                                                rules={[
                                                    { required: true, message: 'required' },
                                                ]}
                                                name={[field.name, 'percent']}
                                                fieldKey={[field.fieldKey, 'percent']}
                                            >
                                                <InputNumber
                                                    placeholder="Percent"
                                                    style={{ width: '100%' }}


                                                />
                                            </Form.Item>
                                            <Form.Item label="Same State"
                                                {...field}
                                                rules={[
                                                    { required: true, message: 'required' },
                                                ]}
                                                name={[field.name, 'sameState']}
                                                fieldKey={[field.fieldKey, 'sameState']}
                                            >
                                                <Select>

                                                    {sameStateValues?.map((item) => (
                                                        <Option key={item} value={item}>
                                                            {item}
                                                        </Option>
                                                    ))}

                                                </Select>
                                            </Form.Item>

                                            {fields.length > 1 && (
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        // onAttributeChange()
                                                        remove(field.name)
                                                        // checkPrescriptionRequired()
                                                    }}
                                                />
                                            )}
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                add()
                                                // checkPrescriptionRequired()
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Tax Values
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.List>

                </Card>


            </Col>

        </Row>
    )
}

export default GeneralField
