import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import productTemplateService from 'services/productTemplate'
import { useHistory, useParams } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import paymentService from 'services/payment'
import constantsService from 'services/constants'

const { Option } = Select
const BankAccountForm = ({
  setIsFormOpen,
  isFormOpen,
  // form,
  // openBankAccountForm,
  // setOpenBankAccountForm,
  // selectedBankAccount,
  // setSelectedBankAccount,
  // refreshData,
  selectedVendorId
}) => {
  console.log('vendorId', selectedVendorId)
  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)
  const [accountTypes, setAccountTypes] = useState([])
  const [selectedAccountType, setSelectedAccountType] = useState('')
  const rules = {
    name: [
      {
        required: true,
        message: 'Required',
      },
    ],
    displayName: [
      {
        required: true,
        message: 'Required',
      },
    ],
    description: [
      {
        required: true,
        message: 'Required',
      },
    ],
    images: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

     

      

      setAccountTypes(data.WALLET['FUND_ACCOUNT_TYPE'])

      

      console.log('wallet',data.WALLET)
   

    }
  }

  console.log('accountTypes',Object.keys(accountTypes));
  useEffect(() => {
    fetchConstants()
  }, [])
  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values?.name,
          accountType: values?.accountType,
          accountNumber: values?.accountNumber,
          ifsc: values?.ifsc,
          cardNumber: values?.cardNumber,
          upiId: values?.upiId,
          nickName: values?.nickName

        }
        console.log(values, 'values')

        // if (selectedBankAccount === null) {
        // Checking if image exists



        const created =
          await paymentService.createBankAccount(
            selectedVendorId,
            sendingValues
          )
        if (created) {
          message.success(`Created BankAccount Success`)
          setIsFormOpen(false)
          // setSelectedBankAccount(null)
          // refreshData()
          onFormModalClose()
          window.location.reload(true)
        }

        // }

        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }
  const onFormModalClose = () => {
    setIsFormOpen(false)
    // window.location.reload()

    form.resetFields()

    // setSelectedBankAccount(null)
  }
  return (
    <Drawer
      title="Add Bank Account"
      width={720}
      onClose={() => onFormModalClose()}
      visible={isFormOpen}
      bodyStyle={{ paddingBottom: 80 }}
      // destroyOnClose

      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => onFormModalClose()}
            style={{ marginRight: 8 }}
            htmlType="button" 
          >
            Cancel
          </Button>
          
          <Button
            htmlType="button"
            onClick={onFinish}
            type="primary"
            loading={submitLoading}
          >
            Submit
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        hideRequiredMark
      >
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


      </Form>
    </Drawer>
  )
}
export default BankAccountForm