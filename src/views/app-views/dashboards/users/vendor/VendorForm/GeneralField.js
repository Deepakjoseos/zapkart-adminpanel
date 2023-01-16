import React from 'react'
import { Input, Row, Col, Card, Form, Upload, Select, Button} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

/* *********************************EDIT****************************************** */

import { useState } from 'react';                         //edit
import { message } from 'antd';                           //edit
import vendorService from 'services/vendor';              //edit
import Flex from 'components/shared-components/Flex';     //edit
import Loading from 'components/shared-components/Loading';



/* *********************************EDIT****************************************** */


// const { Dragger } = Upload
const { Option } = Select

const rules = {
  // firstName: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // lastName: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // drugLicense: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  gst: [
    {
      required: true,
      message: 'Required',
    },
  ],
  email: [
    {
      required: true,
      message: 'Required',
    },
  ],
  emailVerified: [
    {
      required: true,
      message: 'Required',
    },
  ],
  password: [
    {
      required: true,
      message: 'Required',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Required',
    },
  ],
  pan: [
    {
      required: true,
      message: 'Required',
    },
  ],
  tanNumber: [
    {
      required: true,
      message: 'Required',
    },
  ],
  tdsEnabled: [
    {
      required: true,
    message: 'Required',
    }
  ]
}

const SITE_NAME = process.env.REACT_APP_SITE_NAME

const GeneralField = ({
  propsDisplayImages,
  form,
  mode,
  emailVerified,
  phoneVerified,
  pickupLocations,
  form_statuses,
  propsLogo,
  userGroups,
  id,                                       // edit
  setPhoneVerified                          // edit
}) => {
  
/* *********************************EDIT****************************************** */

const [updatePhone, setUpdatePhone] = useState(false);
const [isLoading, setIsLoading] =useState(false);
const [data, setData] = useState({
  phone: ''
})

const handleClick = async () => {
  setIsLoading(true)
  const promise = await vendorService.updatePhoneNumber(data, id)
  if(promise){
    setIsLoading(false)
    message.success(`Updated Phone Number to ${data.phone}`)
    form.setFieldsValue({
      phone: data.phone,
    })
    setPhoneVerified(true)
    setData({
      phone: ''
    })
  } else {
    setIsLoading(false)

  }
  setUpdatePhone(false);
}

/* *********************************EDIT****************************************** */

  return (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        {mode === 'ADD' ? (
          <>
          {process.env.REACT_APP_SITE_NAME === 'athathy' && (
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="First Name" />
            </Form.Item>)}
            {process.env.REACT_APP_SITE_NAME === 'athathy' && (
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Last Name" />
            </Form.Item>
          )}
           {process.env.REACT_APP_SITE_NAME === 'awen' && (
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="First Name" />
            </Form.Item>)}
            {process.env.REACT_APP_SITE_NAME === 'awen' && (
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Last Name" />
            </Form.Item>
          )}
            {SITE_NAME === 'zapkart' && (
 <Form.Item name="firstName" label="Display Name">
 <Input placeholder="First Name" />
</Form.Item>


                )}

           
              <>
                <Form.Item name="email" label="Email" rules={rules.email}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="emailVerified"
                  label="Email Verified"
                  rules={rules.emailVerified}
                >
                  <Select placeholder="Email Verified">
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={rules.password}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={rules.pone}>
                  <Input placeholder="Phone" />
                </Form.Item>
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                  <Form.Item name="gst" label="GST" rules={rules.gst}>
                    <Input placeholder="Gst" />
                  </Form.Item>
                )}
           {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="pan" label="Pan" rules={rules.pan}>
                  <Input placeholder="Pan" />
                </Form.Item>
                     )}
 {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="drugLicense" label="Drug License">
                  <Input placeholder="drugLicense" />
                </Form.Item>
                     )}
               {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="tanNumber" label="Tan Number">
                  <Input placeholder="tanNumber" />
                </Form.Item>
                  )}
              </>
           

            {/* <Form.Item name="drugLicense" label="Drug License Number" rules={rules.drugLicense}>
          <Input placeholder="Drug License Number" />
        </Form.Item> */}
            <Form.Item
              name="groups"
              label="User Groups"
              rules={rules.userGroups}
            >
              <Select
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
            <Form.Item name="status" label="Status" rules={rules.status}>
              <Select placeholder="Status">
                {form_statuses.map((item) => (
                  <Option key={item.id} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.name" label="Bussiness Name">
                  <Input placeholder="Bussiness Name" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Card title="Business logo">
                  <Upload
                    className="flex-column"
                    listType="picture-card"
                    name="business.logo"
                    {...propsLogo}
                    accept="image/*"
                  >
                    <CustomIcon className="display-3 " svg={ImageSvg} />
                  </Upload>
                </Card>
              )}
              <br />
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <h4>Bussiness Address</h4>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.line1" label="Line1">
                  <Input placeholder="Line1" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.city" label="City">
                  <Input placeholder="City" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.state" label="State">
                  <Input placeholder="State" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.country" label="Country">
                  <Input placeholder="Country" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.phone" label="Phone">
                  <Input placeholder="Phone" />
                </Form.Item>
              )}
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="business.address.zipcode" label="Zipcode">
                  <Input placeholder="Zipcode" />
                </Form.Item>
              )}
         
          </>
        ) : (
          ''
        )}

        {mode === 'EDIT' ? (
          <>
            <Form.Item name="firstName" label="First Name">
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input placeholder="Last Name" />
            </Form.Item>

            <>
              <Form.Item
                hasFeedback
                validateStatus={phoneVerified ? 'success' : 'error'}
                name="phone"
                label="Phone"
              >
                <Input disabled id="success" />
              </Form.Item>

{/* *********************************EDIT****************************************** */}
              
<div>
                {!updatePhone ? 
                  <Button
                    type='primary'  
                    onClick={() => setUpdatePhone(prev => !prev)}
                  >Update Phone Number</Button> : 
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
                        </Flex>
                      </Card>
                  </div>
                }
              </div>
              <br />

               
{/* *********************************EDIT****************************************** */}


              <Form.Item
                hasFeedback
                validateStatus={emailVerified ? 'success' : 'error'}
                name="email"
                label="Email"
              >
                <Input disabled id="success" />
              </Form.Item>
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="pan" label="Pan" rules={rules.pan}>
                  <Input placeholder="Pan" />
                </Form.Item>
              )}
           {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="drugLicense" label="Drug License">
                  <Input placeholder="drugLicense" />
                </Form.Item>
            )}
           {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="tanNumber" label="Tan Number">
                  <Input placeholder="tanNumber" />
                </Form.Item>
         )}
         {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="tdsEnabled" label="TDS Enabled">
                  <Select placeholder="TDS Enabled">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                </Form.Item>
         )}
         {/* {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="tdsEnabled" label="TDS Enabled">
                  <Select placeholder="TDS Enabled">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                </Form.Item>
         )} */}
         {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="smsSubscription" label="SMS Subscription">
                  <Select placeholder="SMS Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                </Form.Item>
         )}
         {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Form.Item name="emailSubscription" label="Email Subscription">
                  <Select placeholder="Email Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
                </Form.Item>
         )}

            </>

            {/* <Form.Item name="drugLicense" label="Drug License Number" rules={rules.drugLicense}>
          <Input placeholder="Drug License Number" />
        </Form.Item> */}
            <Form.Item
              name="groups"
              label="User Groups"
              rules={rules.userGroups}
            >
              <Select
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          </>
        ) : (
          ''
        )}

        {/* <Form.Item >
          <Input disabled />
        </Form.Item> */}
        {/* <Form.Item name="pan" label="PAN" rules={rules.pan}>
          <Input placeholder="Pan Number" />
        </Form.Item> */}
      </Card>

      <Card title="Address">
        <Form.Item name="address.line1" label="Line1">
          <Input placeholder="Line 1" />
        </Form.Item>

        <Form.Item name="address.city" label="City">
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item name="address.state" label="State">
          <Input placeholder="State" />
        </Form.Item>

        <Form.Item name="address.country" label="Country">
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item name="address.phone" label="Phone">
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item name="address.zipcode" label="Zipcode">
          <Input placeholder="Zipcode" />
        </Form.Item>
      </Card> 
      {/* 'business.name': data?.business?.name,
        'business.address.line1': data?.business?.address?.line1,
        'business.address.city': data?.business?.address?.city,
        'business.address.state': data?.business?.address?.state,
        'business.address.country': data?.business?.address?.country,
        'business.address.phone': data?.business?.address?.phone,
        'business.address.zipcode': data?.business?.address?.zipcode, */}

      {mode === 'EDIT' ? (
        <Card title="Business">
          <Form.Item name="business.name" label="Bussiness Name">
            <Input placeholder="Bussiness Name" />
          </Form.Item>

          <Card title="Business logo">
            <Upload
              className="flex-column"
              listType="picture-card"
              name="business.address.logo"
              {...propsLogo}
              accept="image/*"
            >
              <CustomIcon className="display-3 " svg={ImageSvg} />
            </Upload>
          </Card>

        
            <h4>Bussiness Address</h4>
         
       
            <Form.Item name="business.address.line1" label="Line1">
              <Input placeholder="Line1" />
            </Form.Item>
       

            <Form.Item name="business.address.city" label="City">
              <Input placeholder="City" />
            </Form.Item>
        
      
            <Form.Item name="business.address.state" label="State">
              <Input placeholder="State" />
            </Form.Item>
        
            <Form.Item name="business.address.country" label="Country" >
              
              <Input placeholder="Country" />
            </Form.Item>
       
        
            <Form.Item name="business.address.phone" label="Phone">
              <Input placeholder="Phone" />
            </Form.Item>
         
            <Form.Item name="business.address.zipcode" label="Zipcode">
              <Input placeholder="Zipcode" />
            </Form.Item>
      
        </Card>
      ) : (
        ' '
      )}
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
        size: 150px * 150px
      </Card>
    </Col>
  </Row>
)}

export default GeneralField
