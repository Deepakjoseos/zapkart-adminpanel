import React, { useEffect, useState } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import stateService from 'services/state'
import pincodeService from 'services/pincode'
import cityService from 'services/city'
import vendorService from 'services/vendor'
import countryService from 'services/country'
import shipmentService from 'services/shipment'
import moment from 'moment'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  InputNumber,
  TreeSelect,
  Button,
  message
} from 'antd'
const { Option } = Select
const SITE_NAME = process.env.REACT_APP_SITE_NAME
const ADD = 'ADD'
const PickupLocations = ({
  sendingValues , 
  selectedVendorId

}) => {
  const  mode = ADD
  const [state, setState] = useState([])
  const [form] = Form.useForm()
    const [city, setCity] = useState([])
  const [vendors, setVendors] = useState([])
  const [pincode, setPincode] = useState([])
  const [country, setCountry] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        }
      })
      setVendors(vendorsList)
    }
  }
  useEffect(() => {
    getVendors()
  }, [])

  
  // const getPincode = async (query) => {
  //   const data = await pincodeService.getPincode(query)
  //   if (data) {
  //     setPincode(data.data)
  //   }
  // }
  // const getState = async (query) => {
  //   const data = await stateService.getState(query)
  //   if (data) {
  //     setState(data.data)
  //   }
  // }
  // const getCity = async () => {
  //   const data = await cityService.getCity()
  //   if (data) {
  //     setCity(data.data)
  //   }
  // }

  // useEffect(() => {
  //   getState()
  //   getCity()
  //   getPincode()

  // }, [])

  const getCity = async (query) => {
    const data = await cityService.getCity(query)
    if (data) {
      setCity(data.data)
    }
  }
  const getState = async () => {
    const data = await stateService.getState()
    if (data) {
      setState(data.data)
    }
  }
  const getCountry = async () => {
    const data = await countryService.getCountry()
    if (data) {
      setCountry(data.data)
    }
  }
  const getPincode = async (query) => {
    const data = await pincodeService.getPincode(query)
    if (data) {
      setPincode(data.data)
    }
  }
  // const getDistrict = async () => {
  //   const data = await districtService.getDistrict()
  //   if (data) {
  //     setDistrict(data.data)
  //   }
  // }

  useEffect(() => {
    // getCity()
    if (SITE_NAME !== 'zapkart') {
      getState()
    }

    getCountry()
    // getDistrict()
    // getPincode()
  }, [])

  useEffect(() => {
    if (SITE_NAME === 'zapkart') {
      if (country?.length > 0) {
        getState(`countryName=${country[0].name}`)
      }
    }
  }, [country])

  useEffect(() => {
    if (SITE_NAME !== 'zapkart') {
      if (state?.length > 0) {
        getCity(`stateName=${state[0]?.name}`)
      }
    }
  }, [state])

  const onFinish = async () => {
    setSubmitLoading(true)

    form
      .validateFields()
      .then(async (values) => {
        
        if (mode === ADD) {
          // values.country = 'India'
         

          const created = await shipmentService.createPickupLocation(values,
            selectedVendorId,
            SITE_NAME === 'zapkart'
              ? { ...values, country: country[0].name }
              : { ...values, country: country[0].name, state: state[0].name }
          )
          if (created) {

          
            message.success('Pickup Location Added Successfully')
          
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
    <Card>
       <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          items: [
            {
              orderId: '',
              itemIds: [],
            },
          ],
        }}
      ></Form>
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD'
                  ? 'Add New Pickup Location'
                  : `Edit Pickup Location`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                 
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Phone" type="tel" />
          </Form.Item>
        </Col>

        {/* <Col span={12}>
          <Form.Item
            name="state"
            label={SITE_NAME === 'zapkart' ? 'State' : 'Emirates'}
          >
            <Select
              placeholder={SITE_NAME === 'zapkart' ? 'State' : 'Emirates'}
              onChange={(val) => {
                form.setFieldsValue({ city: null })
                getCity('', `stateName=${val}`)
              }}
            >
              {state.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          {SITE_NAME === 'zapkart' && (
            <Form.Item name="state" label="State">
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="State"
                onChange={(val) => {
                  form.setFieldsValue({ city: null, zipcode: null })
                  getCity(`stateName=${val}`)
                }}
              >
                {state.map((item) => (
                  <Option key={item.name} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
        <Col span={8}>
          <Form.Item
            name="city"
            label={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
          >
            <Select
              placeholder={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(val) => {
                form.setFieldsValue({ zipcode: null })
                getPincode(`cityName=${val}`)
              }}
            >
              {city.map((item) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="pinCode"
            label={SITE_NAME === 'zapkart' ? 'Zipcode' : 'City'}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder={SITE_NAME === 'zapkart' ? 'Zipcode' : 'City'}
            >
              {pincode.map((pincode) => (
                <Option key={pincode.name} value={pincode.name}>
                  {pincode.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* 
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}
          >
            <Select placeholder={SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}>
              <Option value=""></Option>
              {city.map((city) => (
                <Option key={city.name} value={city.name}>
                  {city.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="pin_code"
            label={SITE_NAME === 'zapkart' ? 'Pincode' : 'City'}
          >
            <Select
              //  disabled={mode === 'EDIT' ? true : false}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Pincode"
            >
              {pincode.map((pincode) => (
                <Option key={pincode.name} value={pincode.name}>
                  {pincode.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="addressLine2" label="Address 2">
            <Input.TextArea rows={4} placeholder="Address 2" />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="lat" label="Lattitude">
            <InputNumber placeholder="Lattitude" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="long" label="Longitude">
            <InputNumber placeholder="Longitude" />
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="vendorId" label="Vendor">
            <Select
              //  disabled={mode === 'EDIT' ? true : false}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Vendor"
            >
              {vendors.map((vendor) => (
                <Option value={vendor.id}>{vendor.fullName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default PickupLocations
