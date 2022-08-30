import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, Select,TreeSelect} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
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

const GeneralField = ({
  
  vendors,
 mode
}) => {
  console.log('mode',mode)
  return(
  <Card title="Basic Info">
    <Form.Item name="name" label="Name" rules={rules.name}>
      <Input placeholder="Name" />
    </Form.Item>
 
    <Form.Item name="status" label="Status" rules={rules.status}>
      <Select placeholder="Status">
        <Option value="Active">Active</Option>
        <Option value="Hold">Hold</Option>
      </Select>
    </Form.Item>
      <Form.Item name="vendorId" label="Vendor" rules={rules.vendor} >
          <Select disabled={mode === 'EDIT' ? true : false}
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
   


  </Card>

  )
}

export default GeneralField
