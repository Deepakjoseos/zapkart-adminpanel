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
    percent: [
        {
            required: true,
            message: 'Required',
        },
    ]

}

const GeneralField = ({
    mode,statuses
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
                            {statuses.map((item) => (
                                <Option key={item.id} value={item}>
                                    {item}
                                </Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <p>Same State</p>
                    <Form.List name="sameState">
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
                                            Add Same State values
                                        </Button>
                                    </Form.Item>
                                </>
                            )
                        }}
                    </Form.List>
                    <p>Non Same State</p>
                    <Form.List name="nonSameState">
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
                                            Add Non Same State values
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
