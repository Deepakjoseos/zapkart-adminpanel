import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select, TreeSelect } from 'antd'

import slugify from 'slugify'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  imageFor: [
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
  
  
 
  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({ form_statuses,image_for }) => (
  

 

    <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
      <Form.Item name="imageFor" label="imageFor" rules={rules.status}>
          <Select placeholder="Image For">
            {image_for.map((item) => (
              <Option key={item.id} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item name="width" label="Width" >
          <InputNumber placeholder="Width"  />
        </Form.Item>
        <Form.Item name="height" label="Height" >
          <InputNumber placeholder="Height"  />
        </Form.Item>

        
      
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
    
     
    </Col>
  </Row>
   )


 




export default GeneralField
