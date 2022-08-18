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

  const getProducts = async () => {
    const data = await productService.getProducts()
    if (data) {
      const productList = data.map((product) => {
        return {
          ...product,
          productname: product?.variant?.name
            ? product?.variant?.name
            : product?.name,
        }
      })
      setProducts(productList)
    }
  }

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
    getProducts()
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
          items: values.items,
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

        const data = await orderService.createOrder(
          values.customerId,
          sendingData
        )

        if (data) {
          notification.success({
            message: 'Success',
            description: 'Order created successfully',
          })

          history.push('/app/dashboards/orders/orders-list')
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

    if (products) {
      const ids = productsval?.map((cur) => cur.id)
      console.log(ids, 'plkss')

      if (ids) {
        const prescriptionRequired = products.some(
          (cur) => ids.includes(cur.id) && cur.prescriptionRequired
        )

        setIsPrescriptionRequired(prescriptionRequired)
      }
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={{
        items: [
          {
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
                loading={submitLoading}
              >
                Create
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container">
        <Row gutter={16}>
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
                  <label style={{ fontWeight: 500, marginBottom: '10px' }}>
                    Products
                  </label>
                  <Form.List name="items">
                    {(fields, { add, remove }) => {
                      console.log(fields, 'show-filelds')
                      return (
                        <>
                          {fields.map((field) => (
                            <Space
                              key={field.key}
                              style={{ display: 'flex', width: '100%' }}
                              align="baseline"
                            >
                              <Form.Item
                                {...field}
                                rules={[
                                  { required: true, message: 'required' },
                                ]}
                                name={[field.name, 'id']}
                                fieldKey={[field.fieldKey, 'id']}
                              >
                                <Select
                                  placeholder="Select Product"
                                  style={{ width: 300 }}
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
                                    <Option key={product.id} value={product.id}>
                                      {product.productname}
                                    </Option>
                                  ))}
                                </Select>
                                {/* <Input placeholder="name" /> */}
                              </Form.Item>
                              <Form.Item
                                {...field}
                                rules={[
                                  { required: true, message: 'required' },
                                ]}
                                name={[field.name, 'quantity']}
                                fieldKey={[field.fieldKey, 'quantity']}
                              >
                                <InputNumber
                                  placeholder="Quantity"
                                  size="large"
                                  style={{ width: 300 }}
                                  min={0}
                                  type="number"
                                  max={100000}
                                />
                              </Form.Item>
                              {fields.length > 1 && (
                                <MinusCircleOutlined
                                  onClick={() => {
                                    //   onAttributeChange()
                                    remove(field.name)
                                    checkPrescriptionRequired()
                                  }}
                                />
                              )}
                            </Space>
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
                            {address?.line1} {address?.city} {address?.state}
                            {', '}
                            {address?.zipcode}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                  {isPrescriptionRequired && (
                    <>
                      <div style={{ fontWeight: 500, marginBottom: '10px' }}>
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

              {/* {
                selectedCustomerId && (

                )
             } */}

              {/* <Form.Item name="name" label="Name" rules={rules.name}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={rules.description}
              >
                <Input placeholder="Description" />
              </Form.Item>
              <Form.Item
                name="priority"
                label="Priority"
                rules={rules.priority}
              >
                <InputNumber
                  placeholder="Priority"
                  size="large"
                  min={0}
                  max={100000}
                />
              </Form.Item>

              <Form.Item name="status" label="Status" rules={rules.status}>
                <Select placeholder="Status">
                  <Option value="Active">Active</Option>
                  <Option value="Hold">Hold</Option>
                </Select>
              </Form.Item> */}
            </Card>
          </Col>
        </Row>
      </div>
    </Form>
  )
}

export default OrderCreate
