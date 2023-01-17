import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  TreeSelect,
} from "antd";
import React, { useState, useEffect } from "react";
import authVendorService from "services/auth/vendor";
const SITE_NAME = process.env.REACT_APP_SITE_NAME
const { Option } = Select;

const PickupLocationForm = ({
  isFormOpen,
  setIsFormOpen,
  getProfile,
  city,
  pincode,
  country,
  state,
  getPincode,
  getCity,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setIsFormOpen(true);
  };

  const onClose = () => {
    setIsFormOpen(false);
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        values.country = "India";
        const data = await authVendorService.addPickupLocation(  SITE_NAME === 'zapkart'
        ? { ...values, country: country[0].name }
        : { ...values, country: country[0].name, state: state[0].name }
    )

        if (data) {
          message.success("Pickup Location Added Successfully");
          onClose();
          form.resetFields();
          getProfile();
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required field ");
      });
    setSubmitLoading(false);
  };

  return (
    <>
      <Drawer
        title="PickLocation Form"
        width={720}
        onClose={onClose}
        visible={isFormOpen}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Required",
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
                    message: "Required",
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
                    message: "Required",
                  },
                ]}
              >
                <Input placeholder="Phone" type="tel" />
              </Form.Item>
            </Col>
           
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Required",
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
        </Form>
      </Drawer>
    </>
  );
};

export default PickupLocationForm;
