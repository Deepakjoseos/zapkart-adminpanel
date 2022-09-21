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

const {Option} = Select
const BankAccountForm = ({
    form,
    openBankAccountForm,
    setOpenBankAccountForm,
    selectedBankAccount,
    setSelectedBankAccount,
    refreshData,
    selctedVendorId
})=>{
    console.log('vendorId',selctedVendorId)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [accountTypes,setAccountTypes] = useState([])
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
    
          setAccountTypes(Object.values(data.WALLET['FUND_ACCOUNT_TYPE']))
    
        }
      }
      useEffect(()=>{
        fetchConstants()
      },[])
 const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues ={
            name:values?.name,
            accountType:values?.accountType,
            accountNumber:values?.accountNumber,
            ifsc:values?.ifsc,
            cardNumber:values?.cardNumber,
            upiId:values?.upiId,
            nickName:values?.nickName
            
        }
        console.log(values, 'values')

        if (selectedBankAccount === null) {
          // Checking if image exists
        
           

            const created =
              await paymentService.createBankAccount(
                selctedVendorId,
                sendingValues
              )
            if (created) {
              message.success(`Created Variant Success`)
              setOpenBankAccountForm(false)
              setSelectedBankAccount(null)
              refreshData()
              onFormModalClose()
            }
 
        }
       
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }
    const onFormModalClose = () => {
        setOpenBankAccountForm(false)
        // window.location.reload()
     
        form.resetFields()
 
        setSelectedBankAccount(null)
      }
    return (
        <Drawer
      title="Add Bank Account"
      width={720}
      onClose={() => onFormModalClose()}
      visible={openBankAccountForm}
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
        <Form.Item name="nickName" label="Name of the Account" rules={rules.name}>
            <Input placeholder="Name of the Account" />
          </Form.Item>
          <Form.Item name="name" label="Account Holder Name" rules={rules.name}>
            <Input placeholder="Account Holder Name" />
          </Form.Item>

          <Form.Item
            name="accountType"
            label="Account Type"
            rules={rules.displayName}
          >
            {/* <Input placeholder="Account Type" /> */}
            <Select placeholder="Account Type">
            {accountTypes.map((item) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))}

            </Select>
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={rules.description}
          >
            <Input placeholder="Account Number" />
          </Form.Item>
          <Form.Item
            name="ifsc"
            label="IFSC Number"
            rules={rules.description}
          >
            <Input placeholder="IFSC Number" />
          </Form.Item>
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={rules.description}
          >
            <Input placeholder="Card Number" />
          </Form.Item>
          <Form.Item
            name="upiId"
            label="UPI ID"
            rules={rules.description}
          >
            <Input placeholder="UPI Id" />
          </Form.Item>


          
        </Card>

 
      </Form>
    </Drawer>
    )
}
export default BankAccountForm