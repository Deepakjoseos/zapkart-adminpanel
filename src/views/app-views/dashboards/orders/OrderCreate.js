import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
  Space,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import productService from 'services/product'
import customerService from 'services/customer'
import PrescriptionSelector from './PrescriptionSelector'
import orderService from 'services/orders'
import { EventSourcePolyfill } from 'event-source-polyfill'
import OrderComplete from './OrderComplete'
import qs from 'qs'
import productTemplate from 'services/productTemplate'

const OrderCreate = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const history = useHistory()

  const [submitLoading, setSubmitLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isShippingAndBillingAddressSame, setIsShippingAndBillingAddressSame] =
    useState(true)
  const [customerPrescriptions, setCustomerPrescriptions] = useState([])
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([])
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false)

  const [currentViewMode, setCurrentViewMode] = useState('order-create')
  const [isCheckoutEvenStarted, setIsCheckoutEventStarted] = useState(false)
  const [requestId, setRequestId] = useState(null)
  const [paymentId, setPaymentId] = useState(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [razorpayItems, setRazorpayItems] = useState(null)
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([])
  const [loading, setLoading] = useState([])

  const [productSelectChangeTracker, setProductChangeTracker] = useState(false)
  const [productsTemplate, setProductsTemplate] = useState([])

  const rules = {
    name: [
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
    image: [
      {
        required: true,
        message: 'required',
      },
    ],
    status: [
      {
        required: true,
        message: 'Required',
      },
    ],
    priority: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }

  const getProductsTemplate = async () => {
    const data = await productTemplate.getProductTemplatesPublic(
      '',
      'status=Active&productsExists=true'
    )
    if (data.data) {
      setProductsTemplate(data.data)
    }
  }

  const resetProductItem = (fieldIndex, productTemplateId, variantId) => {
    const resetCur = form.getFieldValue('items')?.map((cur, i) => {
      if (i === fieldIndex) {
        console.log('plsseswewe', fieldIndex)
        return {
          productTemplateId: productTemplateId,
          variantId: variantId ? variantId : '',
          id: '',
          quantity: '',
        }
      } else {
        return { ...cur }
      }
    })

    return resetCur
  }

  const getProductVariants = (fieldIndex) => {
    const allProductTempVariants = productsTemplate?.find(
      (cur) =>
        cur.id === form.getFieldValue('items')[fieldIndex]?.productTemplateId
    )
    console.log(allProductTempVariants?.variants, 'plssswe23')

    return allProductTempVariants?.variants
  }

  const getProducts = (fieldIndex) => {
    const allProductTempVariants = productsTemplate?.find(
      (cur) =>
        cur.id === form.getFieldValue('items')[fieldIndex]?.productTemplateId
    )

    if (form.getFieldValue('items')[fieldIndex]?.variantId) {
      const filterByVendorId = allProductTempVariants?.products?.filter(
        (cur) =>
          cur?.variant?.id ===
          form.getFieldValue('items')[fieldIndex]?.variantId
      )
      return filterByVendorId
    } else {
      return allProductTempVariants?.products
    }
  }

  // const updateProductsByVariantId = (fieldIndex) => {
  //   const allProductTempVariants = productsTemplate?.find(
  //     (cur) =>
  //       cur.id === form.getFieldValue('items')[fieldIndex]?.productTemplateId
  //   )

  //   const filterByVariantId = ()

  //   return allProductTempVariants?.products
  // }

  // const getOrderItems = (fieldIndex) => {
  //   const allOrderItems = orders?.find(
  //     (cur) => cur.id === form.getFieldValue('items')[fieldIndex]?.orderId
  //   )

  //   const filterOrderItemsByVendor = allOrderItems?.items?.filter(
  //     (cur) => cur.vendorId === selectedVendorId
  //   )

  //   return filterOrderItemsByVendor
  // }

  // const getPaginationParams = (params) => ({
  //   limit: params.pagination?.pageSize,
  //   page: params.pagination?.current,
  //   // ...params,
  // })
  // const getProducts = async (
  //   paginationParams = {},
  //   filterParams = { status: 'Active', approval: 'Approved' }
  // ) => {
  //   setLoading(true)
  //   const data = await productService.getProducts(
  //     qs.stringify(getPaginationParams(paginationParams)),
  //     qs.stringify(filterParams)
  //   )

  //   if (data) {
  //     const productList = data.data.map((product) => {
  //       return {
  //         ...product,
  //         productname: product?.variant?.name
  //           ? product?.variant?.name
  //           : product?.name,
  //       }
  //     })
  //     setProducts(productList)
  //   }
  // }

  const getCustomers = async () => {
    const data = await customerService.getCustomers()
    if (data) {
      const customerList = data.map((customer) => {
        return {
          ...customer,
          fullName: `${customer?.firstName} ${customer?.lastName}`,
        }
      })
      setCustomers(customerList)
    }
  }

  const getCustomerPrescriptions = async (customerId) => {
    const data = await customerService.getCustomerPrescription(customerId)
    if (data) {
      setCustomerPrescriptions(data.prescriptions)
    }
  }

  const getCustomerById = async (id) => {
    const customer = customers.find((cur) => cur.id === id)
    setSelectedCustomer(customer)

    await getCustomerPrescriptions(id)
  }

  const onSetSameAddressCheckChange = (e) => {
    if (e.target.checked) {
      form.setFieldsValue({
        billingAddressId: form.getFieldValue('shippingAddressId'),
      })
      setIsShippingAndBillingAddressSame(true)
    } else {
      setIsShippingAndBillingAddressSame(false)
    }
  }

  useEffect(() => {
    // getProducts()
    getProductsTemplate()
    getCustomers()
  }, [])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (isPrescriptionRequired && selectedPrescriptions.length === 0) {
          message.error('Please select atleast one prescription')
          setSubmitLoading(false)
          return
        }

        const sendingData = {
          items: values.items?.map((item) => {
            return { id: item.id, quantity: item.quantity }
          }),
          fromCart: false,
          shippingAddressId: values.shippingAddressId,
          billingAddressId: isShippingAndBillingAddressSame
            ? values.shippingAddressId
            : values.billingAddressId,
          prescriptions: selectedPrescriptions ? selectedPrescriptions : [],
        }
        if (values.couponCode !== '') {
          sendingData.couponCode = values.couponCode
        }

        const createOrder = await orderService.createOrder(
          values.customerId,
          sendingData
        )

        if (createOrder) {
          setPaymentLoading(true)
          // notification.success({
          //   message: 'Success',
          //   description: 'Order created successfully',
          // })

          console.log(createOrder, 'showww')

          setIsCheckoutEventStarted(true)
          setRequestId(createOrder.requestId)

          notification.success({
            message: 'Success',
            description: 'Please Wait Order Is Being Proccessing...',
          })
          // history.push('/app/dashboards/orders/orders-list')
        } else {
          setPaymentLoading(false)
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        // message.error('Please enter all required field ')
      })
    setSubmitLoading(false)
  }

  const checkPrescriptionRequired = () => {
    const productsval = form.getFieldValue('items')

    if (productsTemplate) {
      const ids = productsval?.map((cur) => cur?.productTemplateId)
      console.log(ids, 'plkss')

      if (ids) {
        const prescriptionRequired = productsTemplate.some(
          (cur) => ids.includes(cur.id) && cur.prescriptionRequired
        )

        setIsPrescriptionRequired(prescriptionRequired)
      }
    }
  }

  // Checkout Events
  useEffect(() => {
    if (isCheckoutEvenStarted && requestId) {
      let baseurl

      if (process.env.REACT_APP_SITE_NAME === 'athathy') {
        baseurl = 'https://www.ecommercetest2.riolabz.com'
      } else {
        if (process.env.NODE_ENV === 'development') {
          baseurl = 'https://www.ecommerce.riolabz.com'
        } else if (process.env.NODE_ENV === 'production') {
          baseurl = 'https://ecommercelive.riolabz.com'
        }
      }

      const customerId = selectedCustomer.id

      console.log(customerId, 'sgvcdgjh')

      let eventSourcePaymentRequired = new EventSourcePolyfill(
        `${baseurl}/api/v1/events/order/${customerId}/Payment_Required`,
        {
          headers: {
            Authorization:
              'Bearer ' + window.localStorage.getItem('auth_token'),
            Connection: 'Keep-Alive',
            'Keep-Alive': { timeout: 6000, max: 1000 },
          },
          heartbeatTimeout: 600 * 1000,
        }
      )

      eventSourcePaymentRequired.onmessage = (e) => {
        console.log(JSON.parse(e.data), 'Payment_Required => SUCCESS')

        const data = JSON.parse(e.data)

        console.log(data.requestId, requestId, 'reqqqqq')

        if (requestId === data.requestId) {
          setPaymentId(data.paymentId)

          setCurrentViewMode('payment')

          const formattedAvailablePaymentMethods =
            data.availablePaymentMethods?.map((curMethod, i) => {
              return {
                label: curMethod === 'Cod' ? 'Cash On Delivery' : curMethod,
                value: curMethod,
                // name: 'payment',
                defaultChecked: curMethod === 'PaymentLink',
              }
            })

          setAvailablePaymentMethods(formattedAvailablePaymentMethods)
          setPaymentLoading(false)
        } else {
          notification.error({
            message: 'Request Id is not valid',
            description: 'Cannot Order Because Request Id is not matched',
          })

          setPaymentLoading(false)
        }

        // setdata(JSON.parse(e.data))
        // seteventype('payment')
        eventSourcePaymentRequired.close()
      }
      eventSourcePaymentRequired.onerror = (e) => {
        eventSourcePaymentRequired.close()
        console.log('PAYMENT_REQUIRED', e)
      }

      // ORDER_FALIED
      let eventSourceOrderFailed = new EventSourcePolyfill(
        `${baseurl}/api/v1/events/order/${customerId}/Order_Failed`,
        {
          headers: {
            Authorization:
              'Bearer ' + window.localStorage.getItem('auth_token'),
            Connection: 'Keep-Alive',
            'Keep-Alive': { timeout: 6000, max: 1000 },
          },
          heartbeatTimeout: 600 * 1000,
        }
      )

      eventSourceOrderFailed.onmessage = (e) => {
        console.log(JSON.parse(e.data), 'Order_Failed => SUCCESS')

        notification.error({
          message: 'Order Failed',
        })
        setPaymentLoading(false)

        // setdata(JSON.parse(e.data))
        // seteventype('payment')
        eventSourceOrderFailed.close()
      }
      eventSourceOrderFailed.onerror = (e) => {
        eventSourceOrderFailed.close()
        console.log('ORDER_FAILED', e)
        setPaymentLoading(false)
      }

      // ORDER_CONFIRMED
      let eventSourceOrderConfirmed = new EventSourcePolyfill(
        `${baseurl}/api/v1/events/order/${customerId}/Order_Confirmed`,
        {
          headers: {
            Authorization:
              'Bearer ' + window.localStorage.getItem('auth_token'),
            Connection: 'Keep-Alive',
            'Keep-Alive': { timeout: 6000, max: 1000 },
          },
          heartbeatTimeout: 600 * 1000,
        }
      )

      eventSourceOrderConfirmed.onmessage = (e) => {
        console.log(JSON.parse(e.data), 'Order_Confirmed => SUCCESS')

        setPaymentLoading(false)

        notification.success({
          message: 'Order Placed Successfully',
        })

        history.push('/app/dashboards/orders/orders-list')
        // setdata(JSON.parse(e.data))
        // seteventype('payment')
        eventSourceOrderConfirmed.close()
      }
      eventSourceOrderConfirmed.onerror = (e) => {
        eventSourceOrderConfirmed.close()
        console.log('ORDER_Confirmed => FAILURE', e)
        setPaymentLoading(false)
      }

      // Razorpay_Payment_Created
      let eventSourceRazorpayPaymentCreated = new EventSourcePolyfill(
        `${baseurl}/api/v1/events/order/${customerId}/Razorpay_Payment_Created`,
        {
          headers: {
            Authorization:
              'Bearer ' + window.localStorage.getItem('auth_token'),
            Connection: 'Keep-Alive',
            'Keep-Alive': { timeout: 6000, max: 1000 },
          },
          heartbeatTimeout: 600 * 1000,
        }
      )

      eventSourceRazorpayPaymentCreated.onmessage = (e) => {
        console.log(JSON.parse(e.data), 'Razorpay_Payment_Created => SUCCESS')

        setRazorpayItems(JSON.parse(e.data))

        // setdata(JSON.parse(e.data))
        // seteventype('payment')
        eventSourceRazorpayPaymentCreated.close()
      }
      eventSourceRazorpayPaymentCreated.onerror = (e) => {
        eventSourceRazorpayPaymentCreated.close()
        setPaymentLoading(false)

        console.log('Razorpay_Payment_Created => FAILURE', e)
      }
    }

    // return () => {
    //   eventSourcePaymentRequired.close()
    //   eventSourceOrderConfirmed.close()
    //   eventSourceRazorpayPaymentCreated.close()
    // }
  }, [isCheckoutEvenStarted, requestId])

  return (
    <>
      {currentViewMode === 'order-create' ? (
        <Form
          layout="vertical"
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          initialValues={{
            items: [
              {
                productTemplateId: '',
                variantId: '',
                id: '',
                quantity: '',
              },
            ],
            fromCart: false,
          }}
        >
          <PageHeaderAlt className="border-bottom" overlap>
            <div className="container">
              <Flex
                className="py-2 mb-5"
                mobileFlex={false}
                justifyContent="between"
                alignItems="center"
              >
                <h2 className="mb-3">Create Order</h2>
                <div className="mb-3">
                  <Button
                    className="mr-2"
                    onClick={() =>
                      history.push('/app/dashboards/orders/orders-list')
                    }
                  >
                    Discard
                  </Button>
                  <Button
                    type="primary"
                    onClick={onFinish}
                    htmlType="submit"
                    loading={submitLoading || paymentLoading}
                  >
                    Create
                  </Button>
                </div>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Row gutter={16} align="middle">
              <Col xs={24} sm={24} md={24}>
                <Card title="Order Form">
                  <Form.Item
                    label="Customer"
                    name="customerId"
                    rules={[{ required: true, message: 'required' }]}
                  >
                    <Select
                      placeholder="Select Customer"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        console.log(input, option, 'gyhighi')
                        return (
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        )
                      }}
                      onChange={(e) => {
                        getCustomerById(e)
                      }}
                    >
                      {customers?.map((customer) => (
                        <Option key={customer.id} value={customer.id}>
                          {customer?.fullName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {selectedCustomer && (
                    <>
                      {/* <label style={{ fontWeight: 500, marginBottom: '10px' }}>
                        Products
                      </label> */}
                      <Form.List name="items">
                        {(fields, { add, remove }) => {
                          console.log(fields, 'show-filelds')
                          return (
                            <>
                              {fields.map((field) => (
                                <Row
                                  gutter={16}
                                  key={field.key}
                                  style={{ display: 'flex', width: '100%' }}
                                  align="baseline"
                                >
                                  <Col lg={6} md={6} sm={12}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        { required: true, message: 'required' },
                                      ]}
                                      label="Product Template"
                                      name={[field.name, 'productTemplateId']}
                                      fieldKey={[
                                        field.fieldKey,
                                        'productTemplateId',
                                      ]}
                                    >
                                      <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Product Template"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                          option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(e) => {
                                          checkPrescriptionRequired()
                                          setProductChangeTracker(
                                            !productSelectChangeTracker
                                          )
                                          form.setFieldsValue({
                                            items: resetProductItem(
                                              field.name,
                                              e
                                            ),
                                          })
                                        }}
                                      >
                                        {productsTemplate?.map((product) => (
                                          <Option
                                            key={product.id}
                                            value={product.id}
                                          >
                                            {product.name}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>

                                  <Col lg={6} md={6} sm={12}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        {
                                          required:
                                            getProductVariants(field.name)
                                              ?.length > 0
                                              ? true
                                              : false,
                                          message: 'required',
                                        },
                                      ]}
                                      name={[field.name, 'variantId']}
                                      fieldKey={[field.fieldKey, 'variantId']}
                                      label="Variant"
                                    >
                                      <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Variant"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                          option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(e) => {
                                          // checkPrescriptionRequired()
                                          form.setFieldsValue({
                                            items: resetProductItem(
                                              field?.name,
                                              form.getFieldValue('items')[
                                                field?.name
                                              ]?.productTemplateId,
                                              e
                                            ),
                                          })

                                          setProductChangeTracker(
                                            !productSelectChangeTracker
                                          )
                                        }}
                                      >
                                        {form.getFieldValue('items')[field.name]
                                          ?.productTemplateId &&
                                          getProductVariants(field.name)?.map(
                                            (item) => (
                                              <Option
                                                key={item.id}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </Option>
                                            )
                                          )}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col lg={6} md={6} sm={12}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        { required: true, message: 'required' },
                                      ]}
                                      name={[field.name, 'id']}
                                      fieldKey={[field.fieldKey, 'id']}
                                      label="Product"
                                    >
                                      <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Product"
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                          option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(e) => {
                                          // checkPrescriptionRequired()
                                          setProductChangeTracker(
                                            !productSelectChangeTracker
                                          )
                                        }}
                                      >
                                        {form.getFieldValue('items')[field.name]
                                          ?.productTemplateId &&
                                          getProducts(field.name)?.map(
                                            (item) => (
                                              <Option
                                                key={item.id}
                                                value={item.id}
                                              >
                                                {item.name}
                                              </Option>
                                            )
                                          )}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  {/* <Form.Item
                                    {...field}
                                    rules={[
                                      { required: true, message: 'required' },
                                    ]}
                                    name={[field.name, 'id']}
                                    fieldKey={[field.fieldKey, 'id']}
                                  >
                                    <Select
                                      placeholder="Select Product"
                                      
                                      showSearch
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                                      }
                                      onChange={(e) => {
                                        checkPrescriptionRequired()
                                      }}
                                    >
                                      {products?.map((product) => (
                                        <Option
                                          key={product.id}
                                          value={product.id}
                                        >
                                          {product.productname}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item> */}
                                  <Col lg={3} md={3} sm={8}>
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
                                          checkPrescriptionRequired()
                                        }}
                                      />
                                    </Col>
                                  )}
                                </Row>
                              ))}
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
                            </>
                          )
                        }}
                      </Form.List>

                      <Form.Item
                        name="shippingAddressId"
                        label="Shipping Address"
                        // rules={rules.shippingAddressId}
                        rules={[{ required: true, message: 'required' }]}
                      >
                        <Select
                          allowClear
                          style={{ width: '100%' }}
                          placeholder="Address"
                          onSelect={() => {
                            if (isShippingAndBillingAddressSame) {
                              form.setFieldsValue({
                                billingAddressId:
                                  form.getFieldValue('shippingAddressId'),
                              })
                            }
                          }}
                        >
                          {selectedCustomer?.address?.map((address) => (
                            <Option key={address.id} value={address.id}>
                              {address?.line1} {address?.city} {address?.state}
                              {', '}
                              {address?.zipcode}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Checkbox
                        className="mb-4"
                        onChange={onSetSameAddressCheckChange}
                        defaultChecked
                      >
                        Set Shipping & Billing Address Same
                      </Checkbox>

                      {!isShippingAndBillingAddressSame && (
                        <Form.Item
                          name="billingAddressId"
                          label="Billing Address"
                          // rules={rules.billingAddressId}
                          rules={[{ required: true, message: 'required' }]}
                        >
                          <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Address"
                          >
                            {selectedCustomer?.address?.map((address) => (
                              <Option key={address.id} value={address.id}>
                                {address?.line1} {address?.city}{' '}
                                {address?.state}
                                {', '}
                                {address?.zipcode}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                      {isPrescriptionRequired && (
                        <>
                          <div
                            style={{ fontWeight: 500, marginBottom: '10px' }}
                          >
                            Prescription
                          </div>
                          {customerPrescriptions?.length === 0 && (
                            <h4>No Prescription Found</h4>
                          )}
                          <Flex>
                            {customerPrescriptions &&
                              customerPrescriptions.map((prescription) => (
                                <PrescriptionSelector
                                  selectedPrescriptions={selectedPrescriptions}
                                  setSelectedPrescriptions={
                                    setSelectedPrescriptions
                                  }
                                  cur={prescription}
                                />
                              ))}
                          </Flex>
                        </>
                      )}
                      <Form.Item name="couponCode" label="CouponCode">
                        <Input placeholder="CouponCode" />
                      </Form.Item>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Form>
      ) : (
        <OrderComplete
          availablePaymentMethods={availablePaymentMethods}
          paymentId={paymentId}
          paymentLoading={paymentLoading}
          razorpayItems={razorpayItems}
          setPaymentLoading={setPaymentLoading}
        />
      )}
    </>
  )
}

export default OrderCreate
