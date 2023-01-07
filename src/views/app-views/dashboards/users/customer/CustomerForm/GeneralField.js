import React from 'react'
import { Input, Row, Col, Card, Form, Upload, Select, Button } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// *************************************Edited***************************************************
import { useState } from 'react';                         //edit
import { message } from 'antd';                           //edit
import customerService from 'services/customer';          //edit
import Flex from 'components/shared-components/Flex';     //edit
import Loading from 'components/shared-components/Loading';

// *************************************Edited***************************************************

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

const GeneralField = ({
  propsDisplayImages,
  mode,
  userGroups,
  form,
  phoneVerified,
  emailVerified,
  form_statuses,

// *************************************Edited***************************************************

  id,                                   //edit
  setPhoneVerified                      //edit

// *************************************Edited***************************************************


}) => {

 // *************************************Edited***************************************************

const [updatePhone, setUpdatePhone] = useState(false);
const [isLoading, setIsLoading] =useState(false);
const [data, setData] = useState({
  phone: ''
})

const handleClick = async () => {
  setIsLoading(true)
  const promise = await customerService.updatePhoneNumber(data, id)
  if(promise){
    setIsLoading(false)
    message.success(`Updated Phone Number to ${data.phone}`)
    setData({
      phone: ''
    })
    form.setFieldsValue({
      phone: data.phone,
    })
    setPhoneVerified(true)
  } else {
    setIsLoading(false)

  }
  setUpdatePhone(false);
}

// *************************************Edited***************************************************



  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={rules.firstName}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" rules={rules.lastName}>
            <Input placeholder="Last Name" />
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
          {mode === 'EDIT' ? (
            <>
              <Form.Item
                hasFeedback
                validateStatus={phoneVerified ? 'success' : 'error'}
                name="phone"
                label="Phone"
              >
                <Input disabled id="success" />
              </Form.Item>

{/* *************************************Edited*************************************************** */}

<div>
  {
    !updatePhone ? 
    <Button 
    type = 'primary' 
    onClick = {() => {
      setUpdatePhone(
        prev => !prev
      )
  }}> Update Phone Number
  </Button>
    :
    <div>
      <br/>
        <Card >
          <h2 className="mb-3">Update Phone Number</h2>
          <Input 
            value = {data.phone} 
            placeholder="phone number" 
            onChange = {(e) => setData({
              phone: e.target.value
            })} 
          />
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="end"
            alignItems="center"

          >

            {!isLoading ? 
              <>
                 <div>
                    <Button 
                    className="mr-2"
                    onClick={() => {
                      setUpdatePhone(false)
                    }}
                    >Cancel</Button>
                    </div>
                    <div >
                    <Button 
                    type= 'primary'
                    onClick={() => {
                      handleClick()
                    }}
                    >Update</Button>
                  </div>
              </> :
              <Loading />
            }

            {/* <div>
          <Button 
          className="mr-2"
          onClick={() => {
            setUpdatePhone(false)
          }}
          >Cancel</Button>
          </div>
          <div >
          <Button 
          type= 'primary'
          onClick={() => {
            handleClick()
          }}
          >Update</Button>
          </div> */}
          </Flex>
        </Card>
    </div>
  } 
  
</div>
<br/>
{/* *************************************Edited*************************************************** */}

              <Form.Item
                name="smsSubscription"
                label="SMS Subscription"
                rules={rules.emailVerified}
              >
                <Select placeholder="SMS Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>

              <Form.Item
                hasFeedback
                validateStatus={emailVerified ? 'success' : 'error'}
                name="email"
                label="Email"
              >
                <Input disabled id="success" />
              </Form.Item>

              <Form.Item
                name="emailSubscription"
                label="Email Subscription"
                rules={rules.emailVerified}
              >
                <Select placeholder="Email Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </>
          ) : (
            ''
          )}

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
              <Form.Item
                label="Password"
                name="password"
                rules={rules.password}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="emailVerified"
                label="Email Verified"
                rules={rules.emailVerified}
              >
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
          <Form.Item name="groups" label="User Groups" rules={rules.userGroups}>
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
          </Form.Item>
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
