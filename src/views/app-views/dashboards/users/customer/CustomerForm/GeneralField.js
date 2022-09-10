import React from 'react'
import { Input, Row, Col, Card, Form, Upload, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  firstName: [
    {
      required: true,
      message: 'Required',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ propsDisplayImages, mode, userGroups,form, phoneVerified, emailVerified,statuses}) => {
  return (
    <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="firstName" label="First Name" rules={rules.firstName}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={rules.lastName}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
              {statuses.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}
              </Select>
            </Form.Item>
            {mode === 'EDIT' ?
          <>
       

            <Form.Item
              hasFeedback
              validateStatus={phoneVerified ? 'success': 'error'}
              name="phone"
              label="Phone"
            >
              <Input disabled id="success" />
            </Form.Item>
           
            <Form.Item
              hasFeedback
              validateStatus={emailVerified ? 'success': 'error'}
              name="email"
              label="Email"
            >
              <Input disabled id="success" />
            </Form.Item>
           
       
           
          </>
          : ""}

        {mode === 'ADD' ? (
          <>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              validateStatus="success"
            >
              <Input id="success" placeholder="Email" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" placeholder="Phone">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules.password}>
              <Input.Password  placeholder='Password'/>
            </Form.Item>
         
            <Form.Item name="emailVerified" label="Email Verified" rules={rules.emailVerified}>
              <Select placeholder="Email Verified">
                <Option value={true}>Yes</Option>
                <Option value={false}>NO</Option>
              </Select>
            </Form.Item>
          </>
        ) : (
          ''
        )}

        {/* <Form.Item >
          <Input disabled />
        </Form.Item> */}
        {mode == 'EDIT' ?  <Form.Item
            name="groups"
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
              {userGroups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))}
            </Select>
            </Form.Item>:"" }
       

      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
      <Card title="Display Image">
        <Upload
          listType="picture-card"
          name="image"
          {...propsDisplayImages}
          accept="image/*"
        >
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
    </Col>
  </Row>
  )
}
 

export default GeneralField
