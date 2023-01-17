import {
    Button,
    Card,
    Col,
    Form,
    InputNumber,
    Input,
    message,
    Modal,
    Row,
    Select,
  } from 'antd'
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
  import Flex from 'components/shared-components/Flex'
  import React, { useEffect, useState } from 'react'
  import cartService from 'services/cart'
  
  const { Option } = Select
  
  const rules = {}

  const  ItemForm = ({
    formMode,
    setFormMode,
    selectedFormAddress,
    setSelectedFormAddress,
    viewFormModal,
    setViewFormModal,
    selectedCustomerId,
    refetchData,
    productsTemplate,
    state,
    country,
    pincode,
    district,
    getPincode,
    getCity,
  }) => {
    const SITE_NAME = process.env.REACT_APP_SITE_NAME
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
    


    // console.log(productsTemplate,'products')

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
          // console.log(values, 'values')
  
          if (formMode === 'add') {
            const addAddress = await cartService.addCart(
              selectedCustomerId,values
              // SITE_NAME === 'zapkart'
              //   ? { ...values, country: country[0].name }
              //   : { ...values, country: country[0].name, state: state[0].name }
            )
            if (addAddress) {
              // refetchData()
              // setFormMode('add')
              setViewFormModal(false)
              form.resetFields()
            }
          } 
          // else {
          //   const editAddress = await customerService.editAddress(
          //     selectedCustomerId,
          //     selectedFormAddress.id,
          //     SITE_NAME === 'zapkart'
          //       ? { ...values, country: country[0].name }
          //       : { ...values, country: country[0].name, state: state[0].name }
          //   )
          //   if (editAddress) {
          //     refetchData()
          //     setFormMode('add')
          //     setSelectedFormAddress({})
          //     setViewFormModal(false)
          //     form.resetFields()
          //   }
          // }
  
          setSubmitLoading(false)
        })
        .catch((info) => {
          setSubmitLoading(false)
          // console.log('info', info)
          message.error('Please enter all required field ')
        })
    }
  

    // const resetProductItem = (fieldIndex, productId) => {
    //   const resetCur = form.getFieldValue('add items')?.map((cur, i) => {
    //     if (i === fieldIndex) {
    //       console.log('plsseswewe', fieldIndex)
    //       return {
    //         productId: productId,
    //         quantity: '',
    //       }
    //     } else {
    //       return { ...cur }
    //     }
    //   })
  
    //   return resetCur
    // }
    
    // const getProducts = (fieldIndex) => {
    //   const allProductTempVariants = productsTemplate?.find(
    //     (cur) =>
    //       cur.id === form.getFieldValue('items')[fieldIndex]?.productId
    //   )
  
    //   if (form.getFieldValue('items')[fieldIndex]?.variantId) {
    //     const filterByVendorId = allProductTempVariants?.products?.filter(
    //       (cur) =>
    //         cur?.variant?.id ===
    //         form.getFieldValue('items')[fieldIndex]?.variantId
    //     )
    //     return filterByVendorId
    //   } else {
    //     return allProductTempVariants?.products
    //   }
    // }



    return (
      <Modal
        title= 'Add Items'
        visible={viewFormModal}
        width={800}
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
            items: [
              {
                productId: '',
                quantity: '',
              },
            ]
          }}
        >
<Form.List name="items">
                        {(fields, { add, remove }) => {
                          // console.log(fields, 'show-filelds')
                          return (
                            <>
                              {fields.map((field) => (
                                <Row
                                  gutter={16}
                                  key={field.key}
                                  style={{ display: 'flex', width: '100%' }}
                                  align="baseline"
                                >
                                  <Col lg={12} md={12} sm={12}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        { required: true, message: 'required' },
                                      ]}
                                      label="Product"
                                      name={[field.name, 'productId']}
                                      fieldKey={[
                                        field.fieldKey,
                                        'productId',
                                      ]}
                                    >
                                      <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Product"
                                        // showSearch
                                        // filterOption={(input, option) =>
                                        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        // }
                                        // optionFilterProp="children"
                                      >
                                        {productsTemplate?.map((product) => (
                                          <Option
                                            key={product.id}
                                            value={product.id}
                                          >
                                            {product.name} ({product.username})
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col lg={6} md={6} sm={6}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        { required: true, message: 'required' },
                                      ]}
                                      name={[field.name, 'quantity']}
                                      fieldKey={[field.fieldKey, 'quantity']}
                                      label="Quantity"
                                    >
                                      <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="Quantity"
                                        size="large"
                                        min={1}
                                        type="number"
                                        max={100000}
                                      />
                                    </Form.Item>
                                  </Col>
                                  {fields.length > 1 && (
                                    <Col lg={3} md={3} sm={8}>
                                      <MinusCircleOutlined
                                        onClick={() => {
                                          //   onAttributeChange()
                                          remove(field.name)
                                          // checkPrescriptionRequired()
                                        }}
                                      />
                                    </Col>
                                  )}
                                </Row>
                              ))}
                              <Flex justifyContent="end">
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => {
                                    add()
                                    // checkPrescriptionRequired()
                                  }}
                                  icon={<PlusOutlined />}
                                >
                                  Add Product
                                </Button>
                              </Form.Item>
                              </Flex>
                            </>
                          )
                        }}
                      </Form.List>
                      <Flex justifyContent="center">
                <Button
                  type="primary"
                  disabled={submitLoading}
                  onClick={onFinish}
                >
                  Submit
                </Button>
              </Flex>

        </Form>
      </Modal>
    )
  }
  
  export default ItemForm
  