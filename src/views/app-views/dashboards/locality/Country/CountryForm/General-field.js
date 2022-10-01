import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select, TreeSelect } from 'antd'

import slugify from 'slugify'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
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

const GeneralField = ({ form_statuses,form, }) => {
  const generateSlugFromName = (value) => {
    const slug = slugify(value)
    form.setFieldsValue({ slug })
  }

  return(

    <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" 
          />
        </Form.Item>
        
        <Form.Item name="priority" label="Priority" rules={rules.priority}>
          <InputNumber placeholder="Priority" min={0} max={100000} />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            {form_statuses.map((item) => (
              <Option key={item.id} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      
      </Card>
    </Col>
    <Col xs={24} sm={24} md={7}>
    
     
    </Col>
  </Row>
   )
}

 




export default GeneralField
