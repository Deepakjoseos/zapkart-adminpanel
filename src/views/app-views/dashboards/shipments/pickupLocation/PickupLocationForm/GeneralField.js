import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form,Select, InputNumber ,TreeSelect} from 'antd'
const {Option} = Select

const GeneralField = ({ form ,vendors,state,pincode,city}) => {
  console.log("hiiii")
  console.log(pincode)
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



       

 <Form.Item name="state" label="Country" >
      <TreeSelect placeholder="Country" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={state} treeDefaultExpandAll>
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
    </Form.Item>
    </Col>
    </Row>
    
    <Row gutter={16}>
        <Col span={12}>
 <Form.Item name="city" label="Emirates" >
      <TreeSelect placeholder="Emirates" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={city} treeDefaultExpandAll>
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
    </Form.Item>
    </Col>
   
    
        <Col span={12}>
    <Form.Item name="pincode" label="City" >
      <TreeSelect placeholder="City" showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        } treeData={pincode} treeDefaultExpandAll>
          
        {/* {deliveryLocations.map((cur) => (
          <Option value={cur.id} key={cur.id}>
            {cur.name}
          </Option>
        ))}  */}
      </TreeSelect>
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

export default GeneralField
