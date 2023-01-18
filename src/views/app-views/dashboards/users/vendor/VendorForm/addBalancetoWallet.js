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
import walletService from 'services/Wallet'
  
  const { Option } = Select
  const AddBalancetoWallet = ({
    setAddBalanceForm,
    addBalanceForm,
    // form,
    // openWithdrawBalance,
    // setOpenWithdrawBalance,
    // selectedBankAccount,
    // setSelectedBankAccount,
    // refreshData,
    selectedVendorId,
    bank_accounts
  }) => {
    console.log('vendorId', selectedVendorId)
    const [form] = Form.useForm()
    const {history} = useHistory()
  
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
    // const fetchConstants = async () => {
    //   const data = await constantsService.getConstants()
    //   if (data) {
    //     // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
  
    //     setAccountTypes(Object.values(data.WALLET['FUND_ACCOUNT_TYPE']))
  
    //   }
    // }
    // useEffect(() => {
    //   fetchConstants()
    // }, [])
    const onFinish = async () => {
      setSubmitLoading(true)
      form
        .validateFields()
        .then(async (values) => {
          const sendingValues = {
            amount: values?.amount,
            description:values?.description,
            userId:selectedVendorId,
  
          }
          console.log(values, 'values')
  
          // if (selectedBankAccount === null) {
          // Checking if image exists
  
  
  
          const created =
            await walletService.addBalancetoWallet(
                
              sendingValues
            )
          if (created) {
            message.success(`Added ${values.amount} to Wallet `)
            setAddBalanceForm(false)
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
      setAddBalanceForm(false)
      // window.location.reload()
  
      form.resetFields()
  
      // setSelectedBankAccount(null)
    }
    return (
      <Drawer
        title="Add Balance to Wallet"
        width={720}
        onClose={() => onFormModalClose()}
        visible={addBalanceForm}
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
          <Card title="Add Balnce to Wallet">
            <Form.Item name="amount" label="Amount" >
              <Input placeholder="Withdrawing Amount" />
            </Form.Item>
            <Form.Item name="description" label="Description" >
              <Input placeholder="Description" />
            </Form.Item>
            
  
  
            {/* <Form.Item name="bankAccountId" label="Bank Account" >
              <Select placeholder="Select Bank Account">
              {bank_accounts.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.nickName}
                </Option>
              ))}
              </Select>
            </Form.Item> */}
  
          </Card>
  
  
        </Form>
      </Drawer>
    )
  }
  export default AddBalancetoWallet