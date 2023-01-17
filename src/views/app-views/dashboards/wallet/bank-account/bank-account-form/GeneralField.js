import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  Space,
  Button,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  // name: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // isFinal: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // uniqueId: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // status: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  productTemplateId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  // productVariantId: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  acquirementMethod: [
    {
      required: true,
      message: 'Required',
    },
  ],
  mrpPrice: [
    {
      required: true,
      message: 'Required',
    },
  ],
  productCode: [
    {
      required: true,
      message: 'Required',
    },
  ],

  price: [
    {
      required: true,
      message: 'Required',
    },
  ],
  deliveryZoneId: [
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
  qty: [
    {
      required: true,
      message: 'Required',
    },
  ],
  isUnlimited: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({

  accountTypes
  // subscriptionPrice,
  // bulkPrice,
}) => {

  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)
  // const [accountTypes, setAccountTypes] = useState([])
  const [selectedAccountType, setSelectedAccountType] = useState('')

  return (
    <>
      <Card title="Bank Account">
          <Form.Item name="nickName" label="Name of the Account" >
            <Input placeholder="Name of the Account" />
          </Form.Item>


          <Form.Item
            name="accountType"
            label="Account Type"
            rules={rules.displayName}
          >
            {/* <Input placeholder="Account Type" /> */}
            <Select placeholder="Account Type" onChange={(value) => { setSelectedAccountType(value) }}>
              
              {/* {accountTypes.map((item) => (
                <Option key={item.id} value={item.key}>
                  {item}
                </Option>
              ))} */}
              {
                Object.keys(accountTypes).map(function(key) {
                  return (
                    <Option key={key} value={key}>
                      {accountTypes[key]}
                    </Option>
                  )
            // console.log(key, data.WALLET['FUND_ACCOUNT_TYPE'][key],'constants-wallent');
               })
              }

            </Select>
          </Form.Item>
          {selectedAccountType === "bank_account" && (
            <>
              <Form.Item name="name" label="Account Holder Name" >
                <Input placeholder="Account Holder Name" />
              </Form.Item>
              <Form.Item
                name="accountNumber"
                label="Account Number"

              >
                <Input placeholder="Account Number" />
              </Form.Item>
              <Form.Item
                name="ifsc"
                label="IFSC Number"

              >
                <Input placeholder="IFSC Number" />
              </Form.Item>
            </>
          )}
          {selectedAccountType === 'card' && (
            <>
              <Form.Item name="name" label="Account Holder Name" >
                <Input placeholder="Account Holder Name" />
              </Form.Item>
              <Form.Item
                name="cardNumber"
                label="Card Number"

              >
                <Input placeholder="Card Number" />
              </Form.Item>
            </>
          )}


          {selectedAccountType === "vpa" && (
            <Form.Item
              name="upiId"
              label="UPI ID"

            >
              <Input placeholder="UPI Id" />
            </Form.Item>
          )}




        </Card>
    </>
  )
}

export default GeneralField
