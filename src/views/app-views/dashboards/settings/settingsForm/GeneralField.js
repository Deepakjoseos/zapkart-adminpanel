import { Input, Row, Col, Card, Form, Select, Button, Space, InputNumber } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'



const { Option } = Select;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  address: [
    {
      required: false,
      message: "Required",

    },
  ],
  email: [
    {
      required: false,
      message: "Required",

    },
  ],

  phone: [
    {
      required: true,
      message: "Required",
    },
  ],
  facebookUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
  instagramUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
  twitterUrl: [
    {
      required: true,
      message: "Required",
    },
  ],
  vendorCommission: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ setmode }) => {
  const [deliveryCharges, setDeliveryCharges] = useState([])
  return (
    // <Row gutter={16}>
    //   <Col xs={24} sm={24} md={24}>
    <>
      <Card title="User Info">
        <>
         
          <Form.Item
            name="name"
            label="Website Name"
            rules={rules.name}
          >
            <Input placeholder="Name" type="text" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={rules.address}
          >
            <Input placeholder="Address" type="text" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={rules.email}
          >
            <Input placeholder="Email" type="text" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={rules.phone}
          >
            <Input placeholder="Phone" type="text" />
          </Form.Item>
          <Form.Item
            name="facebookUrl"
            label="Facebook"
            rules={rules.facebookUrl}
          >
            <Input placeholder="Facebook" type="text" />
          </Form.Item>
          <Form.Item
            name="instagramUrl"
            label="Instagram"
            rules={rules.instagramUrl}
          >
            <Input placeholder="Instagram" type="text" />
          </Form.Item>
          <Form.Item
            name="twitterUrl"
            label="Twitter"
            rules={rules.twitterUrl}
          >
            <Input placeholder="Twitter" type="text" />
          </Form.Item>
          <Form.Item
            name="vendorCommission"
            label="Vendor Commission"
            rules={rules.vendorCommission}
          >
            <Input placeholder="Vendor Commission" type="text" />
          </Form.Item>
          {/* </div> */}

        </>
        <div>

          <Form.List name="deliveryCharges">
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
                        name={[field.name, 'startAmount']}
                        fieldKey={[field.fieldKey, 'startAmount']}
                      >
                        <InputNumber
                          placeholder="Start Amount"
                          style={{ width: '100%' }}

                        />
                      
                      </Form.Item>
                      <Form.Item
                        {...field}
                        rules={[
                          { required: true, message: 'required' },
                        ]}
                        name={[field.name, 'endAmount']}
                        fieldKey={[field.fieldKey, 'quantity']}
                      >
                        <InputNumber
                          placeholder="End Amount"
                          style={{ width: '100%' }}


                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        rules={[
                          { required: true, message: 'required' },
                        ]}
                        name={[field.name, 'charge']}
                        fieldKey={[field.fieldKey, 'charge']}
                      >
                        <InputNumber
                          placeholder="Charge"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                      <MinusCircleOutlined
                           onClick={() => {
                                // onAttributeChange()
                             remove(field.name)
                              // checkPrescriptionRequired()
                           }}
                         />   
                       )} 
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => {
                        add()
                        // checkPrescriptionRequired()
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Shipment
                    </Button>
                  </Form.Item>
                </>
              )
            }}
          </Form.List>
        </div>

      </Card>

    </>
    //   </Col>
    // </Row>
  )
}

export default GeneralField;
