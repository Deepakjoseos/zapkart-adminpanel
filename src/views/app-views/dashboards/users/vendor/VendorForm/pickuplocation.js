import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form,Select, InputNumber ,TreeSelect} from 'antd'
import Utils from 'utils'
import stateService from 'services/state'
import pincodeService from 'services/pincode'
import cityService from 'services/city'
import vendorService from 'services/vendor'

const {Option} = Select
const SITE_NAME = process.env.REACT_APP_SITE_NAME

const PickupLocations = (props) => {
 
  const [state ,setState]=useState([])
  const {  param } = props
  const [form] = Form.useForm()
  const [city ,setCity]=useState([])

  const [submitLoading, setSubmitLoading] = useState(false)
  const [vendors,setVendors]= useState([])
  const [pincode ,setPincode]=useState([])
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map(cur => {
        return {
          ...cur, fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setVendors(vendorsList)
    }
  }
  useEffect(()=>{
    getVendors()
  },[])

  
  const getPincode = async (query) => {
    const data = await pincodeService.getPincode(query)
    if (data) {
      setPincode(data.data)
    }
  }
  const getCity = async (query) => {
    const data = await cityService.getCity(query)
    if (data) {
      setCity(data.data)
    }
  }
  
  const getState = async (query) => {
    const data = await stateService.getState(query)
    if (data) {
      setState(data.data)
    }
  }

 
  useEffect(() => {
    getState()
    getCity()
    getPincode()
    
  }, [])
  




  return (
    <Card>
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
       
      
      
        <Col span={12}>
    <Form.Item name="state" label="state">
    <Select
          //  disabled={mode === 'EDIT' ? true : false}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="state"
        
          >
            {state.map((state) => (
              <Option value={state.name}>
                {state.name}
              </Option>
            ))}
          </Select>
    </Form.Item>

        </Col>
    </Row>
    
    <Row gutter={16}>
    <Col span={12}>
    <Form.Item name="city" label="City">
    <Select
          //  disabled={mode === 'EDIT' ? true : false}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="City"
        
          >
            {city.map((city) => (
              <Option value={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
    </Form.Item>

        </Col>
   
    
        <Col span={12}>
    <Form.Item name="pin_code" label="Pincode">
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
              <Option value={pincode.name}>
                {pincode.name}
              </Option>
            ))}
          </Select>
    </Form.Item>

        </Col>
        
        </Row>
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
          <Form.Item name="address_2" label="Address 2">
            <Input.TextArea rows={4} placeholder="Address 2" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="lat" label="Lattitude">
            <InputNumber  placeholder="Lattitude" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="long" label="Longitude">
            <InputNumber  placeholder="Longitude" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
        <Form.Item name="vendorId" label="Vendor"  >
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
              <Option value={vendor.id}>
                {vendor.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default PickupLocations
