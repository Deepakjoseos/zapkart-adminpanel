import { Button, Card, Col, Form, Input, message, Modal, Row, Select } from 'antd'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import constantsService from 'services/constants'
const { Option } = Select

const AddressForm = ({
  formMode,
  setFormMode,
  selectedFormAddress,
  setSelectedFormAddress,
  viewFormModal,
  setViewFormModal,
  selectedCustomerId,
  refetchData,
  city,state,country
}) => {
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  
  const rules = {}
//   const fetchConstants = async () => {
//     const data = await constantsService.getConstants()
//     if (data) {
//       // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
//         console.log( Object.values(data.GENERAL.STATES['INDIA']), 'constanttyys')
//           console.log('data',data)

//        setStates(Object.values(data.GENERAL.STATES['INDIA']))
//        setCountries(Object.values(data.GENERAL.COUNTRIES))
//       // setPaymentStatuses(Object.values(data.PAYMENT['PAYMENT_STATUS']))
//     }
//   }
// useEffect(()=>{
// fetchConstants()
// },[])
  useEffect(() => {
    if (formMode === 'edit') {
      selectedFormAddress && form.setFieldsValue(selectedFormAddress)
    } else {
      form.resetFields()
    }
  }, [formMode, selectedFormAddress])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')

        if (formMode === 'add') {
          const addAddress = await customerService.addAddress(
            selectedCustomerId,
            values
          )
          if (addAddress) {
            refetchData()
            setFormMode('add')
            setViewFormModal(false)
            form.resetFields()
          }
        } else {
          const editAddress = await customerService.editAddress(
            selectedCustomerId,
            selectedFormAddress.id,
            values
          )
          if (editAddress) {
            refetchData()
            setFormMode('add')
            setSelectedFormAddress({})
            setViewFormModal(false)
            form.resetFields()
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

  return (
    <Modal
      title={formMode === 'add' ? 'Add Address' : 'Edit Address'}
      visible={viewFormModal}
      onCancel={() => {
        setViewFormModal(false)
        setSelectedFormAddress({})
      }}
      footer={false}
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
        }}
      >
       

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            <Card>
              <Form.Item name="line1" label="Address" rules={rules.line1}>
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>
              <Form.Item name="stateId" label="state" >
          <Select placeholder="state">
              {state.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
   
    
  
    <Form.Item name="cityId" label="City" >
          <Select placeholder="City">
              {city.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
    
   
    
        <Form.Item name="countryId" label="Country" >
          <Select placeholder="pincode">
              {country.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

              <Form.Item name="phone" label="Phone" rules={rules.phone}>
                <Input type="tel" placeholder="Phone" />
              </Form.Item>
              <Form.Item name="zipcode" label="Zipcode" rules={rules.zipcode}>
                <Input placeholder="Zipcode" />
              </Form.Item>

              <Flex justifyContent="end">
                <Button
                  type="primary"
                  disabled={submitLoading}
                  onClick={onFinish}
                >
                  Submit
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddressForm
