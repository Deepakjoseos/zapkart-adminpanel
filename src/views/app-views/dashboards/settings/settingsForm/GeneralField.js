import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  Button,
  Space,
  InputNumber,
} from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import Editor from "components/shared-components/Editor";

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
  tdsPercentage: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({ setmode, form }) => {
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  return (
    // <Row gutter={16}>
    //   <Col xs={24} sm={24} md={24}>
    <>
      <Card title="User Info">
        <>
          <Form.Item name="name" label="Website Name" rules={rules.name}>
            <Input placeholder="Name" type="text" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={rules.address}>
            <Input placeholder="Address" type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input placeholder="Email" type="text" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={rules.phone}>
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
          <Form.Item name="twitterUrl" label="Twitter" rules={rules.twitterUrl}>
            <Input placeholder="Twitter" type="text" />
          </Form.Item>
          <Form.Item
            name="whatsappNo"
            label="WhatsApp Number"
            rules={rules.whatsappNo}
          >
            <Input placeholder="Whatsapp Number" type="text" />
          </Form.Item>
          <Form.Item
            name="razorPayPayoutAccountNumber"
            label="Razor Pay Account"
            rules={rules.whatsappNo}
          >
            <Input placeholder="Razor Pay Account" type="text" />
          </Form.Item>
          {process.env.REACT_APP_SITE_NAME === "zapkart" && (
            <Form.Item name="agreement" label="Agreement">
              <Input placeholder="Agreement" type="text" />
            </Form.Item>
          )}
          {process.env.REACT_APP_SITE_NAME === "zapkart" && (
            <Form.Item name="footer" label="Footer">
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("footer") || ""}
                onChange={(e) => form.setFieldsValue({ footer: e })}
                name="fcmDescription"
              />
            </Form.Item>
          )}

          <Form.Item
            name="tdsPercentage"
            label="TDS Percentage"
            rules={rules.tdsPercentage}
          >
            <Input placeholder="TDS Percentage" type="number" />
          </Form.Item>
          {/* </div> */}
        </>
        <div>
          <p>Delivery Charges</p>
          <Form.List name="deliveryCharges">
            {(fields, { add, remove }) => {
              console.log(fields, "show-filelds");
              return (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", width: "100%" }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        label="Start Amount"
                        rules={[{ required: true, message: "required" }]}
                        name={[field.name, "startAmount"]}
                        fieldKey={[field.fieldKey, "startAmount"]}
                      >
                        <InputNumber
                          placeholder="Start Amount"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="end Amount"
                        {...field}
                        rules={[{ required: true, message: "required" }]}
                        name={[field.name, "endAmount"]}
                        fieldKey={[field.fieldKey, "quantity"]}
                      >
                        <InputNumber
                          placeholder="End Amount"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Charge"
                        {...field}
                        rules={[{ required: true, message: "required" }]}
                        name={[field.name, "charge"]}
                        fieldKey={[field.fieldKey, "charge"]}
                      >
                        <InputNumber
                          placeholder="Charge"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          onClick={() => {
                            // onAttributeChange()
                            remove(field.name);
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
                        add();
                        // checkPrescriptionRequired()
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Delivery charges
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </div>
      </Card>
      <Card title="SEO">
        <Form.Item name="metaTitle" label="Meta Title">
          <Input placeholder="Meta Title" />
        </Form.Item>
        <Form.Item name="metaDescription" label="Meta Description">
          <Input placeholder="Meta Description" />
        </Form.Item>
        {/* <Form.Item name="keywords" label="Keywords">
            <Input placeholder="Keywords" />
          </Form.Item> */}
        <Form.Item name="keywords" label="Maeta Keywords">
          <Select
            dropdownStyle={{ display: "none" }}
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Keywords"
          ></Select>
        </Form.Item>
        {/* <Form.Item name="slug" label="Slug" rules={rules.slug}>
            <Input placeholder="Slug" />
          </Form.Item> */}
      </Card>
    </>
    //   </Col>
    // </Row>
  );
};

export default GeneralField;
