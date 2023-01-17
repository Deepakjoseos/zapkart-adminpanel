import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import productService from 'services/product'
import productTemplateService from 'services/productTemplate'
import deliveryZoneService from 'services/deliveryZone'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import constantsService from 'services/constants'
import paymentService from 'services/payment'


const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const BankAccountForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [accountTypes,setAccountTypes] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  

  // // For selecting DELIVERY LOCATION PARENT
  // const getDeliveryLocations = async () => {
  //   const data = await productService.getDeliveryLocations()
  //   console.log(data, 'myyy-data')

  //   if (data) {
  //     if (mode === EDIT) {
  //       const deliveryLocs = data.filter(
  //         (cur) => cur.isFinal !== true && cur.id !== param.id
  //       )
  //       setDeliveryLocations(deliveryLocs)
  //     } else {
  //       const deliveryLocs = data.filter((cur) => cur.isFinal !== true)
  //       setDeliveryLocations(deliveryLocs)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getDeliveryLocations()
  // }, [])

  
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

     

      

      setAccountTypes(data.WALLET['FUND_ACCOUNT_TYPE'])

      

      console.log('wallet',data.WALLET)
   

    }
  }
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
            
            sendingValues
          )
        if (created) {
          message.success(`Created BankAccount Success`)
          // setSelectedBankAccount(null)
          // refreshData()
          history.goBack()
      
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
 

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          isFinal: false,
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              {/* <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Product' : `Edit Product`}{' '}
              </h2> */}
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/wallet/bank-account/bank-account-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                    ADD
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                form={form}
                accountTypes={accountTypes}
          
                // subscriptionPrice={subscriptionPrice}
                // bulkPrice={bulkPrice}
                // isFinalTrue={isFinalTrue}
                // setIsFinalTrue={setIsFinalTrue}
                // deliveryLocations={deliveryLocations}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default BankAccountForm
