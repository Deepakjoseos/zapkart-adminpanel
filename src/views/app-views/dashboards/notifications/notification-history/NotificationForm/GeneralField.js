import React, { useEffect,useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  List,
  Button,
  notification,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import Editor from 'components/shared-components/Editor'
import CopyToClipboard from 'react-copy-to-clipboard'
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
  
  publicNotification: [
    {
      required: true,
      message: 'Required',
    },
  ],
  users: [
    {
      required: true,
      message: 'Required',
    },
  ],

  emailSubject: [
    {
      required: true,
      message: 'Required',
    },
  ],

  emailContent: [
    {
      required: true,
      message: 'Required',
    },
  ],
  emailStatus: [
    {
      required: true,
      message: 'Required',
    },
  ],

  smsTemplateId: [
    {
      required: true,
      message: 'Required',
    },
  ],

  smsContent: [
    {
      required: true,
      message: 'Required',
    },
  ],
  smsStatus: [
    {
      required: true,
      message: 'Required',
    },
  ],
  fcmTitle: [
    {
      required: true,
      message: 'Required',
    },
  ],
  fcmDescription: [
    {
      required: true,
      message: 'Required',
    },
  ],

  fcmStatus: [
    {
      required: true,
      message: 'Required',
    },
  ],
  fcmImage: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ form, tempConstants, form_statuses , form_users , propsImages  }) => {
  
  const [enableNotify, setEnableNotify] = useState();
  
  // console.log('constants', tempConstants) 
  // console.log(propsImages,'fcmimages');
  const [image, setImage] = useState(false)
const onSwitch = (value) => {
  if (value === 'true'){
    setEnableNotify(true)
  }
  else{
    setEnableNotify(false)
  }
}

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          {/* <Form.Item name="email" label="Email" rules={rules.email}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="notificationCategoryType" label="Notification Category Type" rules={rules.notificationCategoryType}>
            <Input placeholder="Notification Category Type" />
          </Form.Item>
          <Form.Item name="sendTime" label="Send Time" rules={rules.sendTime}>
            <Input placeholder="Send Time" />
          </Form.Item>
          <Form.Item
            name="listingType"
            label="Listing Type"
            rules={rules.listingType}
          >
            <Input placeholder="Listing Type" /> */}

            {/* <Select placeholder="Listing Type" showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {tempConstants?.LISTING_TYPES &&
                Object.values(tempConstants['LISTING_TYPES']).map(
                  (listtype) => <Option value={listtype}>{listtype}</Option>
                )}
            </Select> */}
          {/* </Form.Item> */}
        </Card>

        <Card title="Email">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="emailSubject"
                label="Email Subject"
                rules={rules.emailSubject}
              >
                <Input placeholder="Email Subject" />
              </Form.Item>

              <Form.Item
                name="emailContent"
                label="Email Content"
                rules={rules.emailContent}
              >
                <Editor
                  placeholder="Write something..."
                  editorHtml={form.getFieldValue('emailContent') || ''}
                  onChange={(e) => form.setFieldsValue({ emailContent: e })}
                  name="emailContent"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={16}>
              <Form.Item name="emailStatus" label="Status" rules={rules.emailStatus}>
                <Select placeholder="Status">
                  {form_statuses.map((item) => (
                    <Option key={item.id} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* SMS */}

        <Card title="SMS">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="smsTemplateId"
                label="SMS Template Id"
                rules={rules.smsTemplateId}
              >
                <Input placeholder="SMS Template Id" />
              </Form.Item>

              <Form.Item
                name="smsContent"
                label="SMS Content"
                rules={rules.smsContent}
              >
                <Input.TextArea rows={4}
                  placeholder="Write something..."
                  // editorHtml={form.getFieldValue('smsContent') || ''}
                  // onChange={(e) => form.setFieldsValue({ smsContent: e })}
                  name="smsContent"
                />
              </Form.Item>
              <Form.Item name="smsStatus" label="Status" rules={rules.smsStatus}>
                <Select placeholder="Status">
                  {form_statuses.map((item) => (
                    <Option key={item.id} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                            {/* <Input placeholder="sms Status" /> */}

              </Form.Item>
            </Col>
           
            <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
           
          </Row>
        </Card>

        {/* FCM */}

        <Card title="FCM">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="fcmTitle"
                label="FCM Title"
                rules={rules.fcmTitle}
              >
                <Input placeholder="FCM Title" />
              </Form.Item>

              <Form.Item
                name="fcmDescription"
                label="FCM Description"
                rules={rules.fcmDescription}
              >
                <Input.TextArea rows={4}
                  placeholder="Write something..."
                  // editorHtml={form.getFieldValue('fcmDescription') || ''}
                  // onChange={(e) => form.setFieldsValue({ fcmDescription: e })}
                  name="fcmDescription"
                />
              </Form.Item>
              <Form.Item name="fcmStatus" label="Status" rules={rules.fcmStatus}>
                <Select placeholder="Status">
                  {form_statuses.map((item) => (
                    <Option key={item.id} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Col xs={24} sm={24} md={8}>
              <Card 
              style={{
                  height: '260px',
                  overflow: 'hidden',
                  marginLeft:'-17px',
                  border: 'none',
                }} 
                title="Fcm Image">
              <Upload
            listType="picture-card"
            name="image"
            {...propsImages}
            accept="image/*"
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Card>
        </Col>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <h5>Copy Keys</h5>
              <div
                style={{
                  height: '445px',
                  overflow: 'auto',
                  padding: '0 16px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <List
                  dataSource={
                    tempConstants?.KEYS
                      ? Object.values(tempConstants['KEYS'])
                      : []
                  }
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <List.Item.Meta title={item} />

                      <CopyToClipboard
                        text={item}
                        onCopy={() =>
                          notification.success({
                            message: 'Copied To Clipboard',
                          })
                        }
                      >
                        <Button type="primary">Copy</Button>
                      </CopyToClipboard>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
                        
          </Row>
        </Card>
        <Card>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
            <Form.Item name="publicNotification" label="Public Notification" >
                <Select onChange={(value) => onSwitch(value) } placeholder="Public Notification">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </Select>
              </Form.Item>
         {!enableNotify &&   
            <Form.Item name="users" label="Users" >
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
              {form_users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {`${user?.firstName} ${user?.lastName}`}
                </Option>
              ))}
            </Select>
            </Form.Item>
}
              </Col>
              </Row>
              </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
