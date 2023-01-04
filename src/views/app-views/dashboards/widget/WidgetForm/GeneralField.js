import React from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Select,

  TimePicker,
} from 'antd'
import slugify from 'slugify'
import moment from 'moment';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select

const rules = {
  tabTitle: [
    {
      required: true,
      message: 'Required',
    },
  ],
  isTitleShow: [
    {
      required: true,
      message: 'Required',
    },
  ],

  startEndDate: [
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
  
  priority: [
    {
      required: true,
      message: 'Required',
    },
  ],
  slug: [
    {
      required: true,
      message: 'Required',
    },
  ],
}


const GeneralField = ({ form_statuses,form }) => {
  const generateSlugFromName = (value) => {
    const slug = slugify(value)
    form.setFieldsValue({ slug })
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  
  function disabledRangeTime(_, type) {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="tabTitle" label="tab Title" rules={rules.tabTitle}>
            <Input placeholder="tabTitle" 
             onChange={(e) => generateSlugFromName(e.target.value)}/>
           
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={rules.slug}>
            <Input placeholder="Slug" />
          </Form.Item>
          <Form.Item
            name="isTitleShow"
            label="Show Title"
            rules={rules.isTitleShow}
          >
            <Select placeholder="Show Title">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
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

          <Form.Item
            name="startEndDate"
            label="Start-End Date"
            // rules={[{ required: true, message: 'Please select date' }]}
          >
       
    <RangePicker
     
      showTime={{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'h:mm:ss a'), moment('11:59:59', 'h:mm:ss a')],
      }}
      use12Hours format="YYYY-MM-DD h:mm:ss a"
    />
            
          </Form.Item>
       
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
