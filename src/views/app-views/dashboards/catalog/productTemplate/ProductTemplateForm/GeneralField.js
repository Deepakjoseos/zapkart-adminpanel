import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  TreeSelect,
  Space,
  Button,
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import Editor from "components/shared-components/Editor";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import slugify from "slugify";

// const { Dragger } = Upload
const { Option } = Select;

const SITE_NAME = process.env.REACT_APP_SITE_NAME;

const rules = {
  name: [
    {
      required: true,
      message: "Required",
    },
  ],
  images: [
    {
      required: true,
      message: "Required",
    },
  ],
  status: [
    {
      required: true,
      message: "Required",
    },
  ],
  // description: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  categoryId: [
    {
      required: true,
      message: "Required",
    },
  ],
  allowedPaymentTypes: [
    {
      required: true,
      message: "Required",
    },
  ],
  returnable: [
    {
      required: true,
      message: "Required",
    },
  ],
  // returnPeriod: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  allowedQuantityPerOrder: [
    {
      required: true,
      message: "Required",
    },
  ],
  minQty: [
    {
      required: true,
      message: "Required",
    },
  ],

  prescriptionRequired: [
    {
      required: true,
      message: "Required",
    },
  ],
  medicineTypeId: [
    {
      required: true,
      message: "Required",
    },
  ],
  manufacturer: [
    {
      required: true,
      message: "Required",
    },
  ],
  medicinePackaging: [
    {
      required: true,
      message: "Required",
    },
  ],

  lengthClass: [
    {
      required: true,
      message: "Required",
    },
  ],
  weightClass: [
    {
      required: true,
      message: "Required",
    },
  ],
  height: [
    {
      required: true,
      message: "Required",
    },
  ],
  length: [
    {
      required: true,
      message: "Required",
    },
  ],
  width: [
    {
      required: true,
      message: "Required",
    },
  ],
  weight: [
    {
      required: true,
      message: "Required",
    },
  ],

  slug: [
    {
      required: true,
      message: "Required",
    },
  ],
};

const GeneralField = ({
  propsImages,
  brands,
  medicineTypes,
  categories,
  compositions,
  manufacturers,
  form,
  productType,
  setProductType,
  setReturnable,
  returnable,
  onCompositionChange,
  setMaxQty,
  maxQty,
  setMinQty,
  minQty,
  weightClass,
  lengthClass,
  taxCategories,
  paymentTypes,
  statuses,
  // setSelectPage,
}) => {
  const [image, setImage] = useState(false);

  const generateSlugFromName = (value) => {
    const slug = slugify(value);
    form.setFieldsValue({ slug });
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input
              placeholder="Name"
              onChange={(e) => generateSlugFromName(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item
          name="description"
          label="Description"
          rules={rules.description}
        >
          <Input placeholder="Description" />
        </Form.Item> */}
          <Form.Item
            name="description"
            label="Description"
            // rules={rules.description}
          >
            <Editor
              placeholder="Write something..."
              editorHtml={form.getFieldValue("description") || ""}
              onChange={(e) => form.setFieldsValue({ description: e })}
              name="description"
            />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold"></Option>Hold
            </Select>
          </Form.Item>
          <Form.Item name="brandId" label="Brand">
            <Select
              placeholder="Brand"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // onPopupScroll={(e) => {
              //   const { target } = e;

              //   if (
              //     Math.round(target.scrollTop + target.offsetHeight) ===
              //     Math.round(target.scrollHeight)
              //   ) {
              //     setSelectPage((prev) => prev + 1);
              //   }
              // }}
            >
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="taxCategoryId" label="Tax Category">
            <Select
              placeholder="Tax Category"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {taxCategories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={rules.categoryId}
          >
            <TreeSelect
              showSearch
              filterOption={(inputValue, option) =>
                option.title.toLowerCase().includes(inputValue.toLowerCase())
              }
              treeData={categories}
              placeholder="Please select Category"
              treeDefaultExpandAll
            />
          </Form.Item>
          {process.env.REACT_APP_SITE_NAME === "zapkart" && (
            <Form.Item
              name="manufacturerId"
              label="Manufacturer"
              rules={rules.manufacturer}
            >
              <Select
                placeholder="Manufacturer"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {manufacturers.map((manufacturer) => (
                  <Option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="commission"
            label="Vendor Commission"
            rules={rules.commission}
          >
            <Input placeholder="Vendor Commission" />
          </Form.Item>
          {/* <Form.Item
          name="productType"
          label="Product Type"
          rules={rules.productType}
        >
          <Input placeholder="Product Type" />
        </Form.Item> */}
          {SITE_NAME === "zapkart" && (
            <Form.Item
              name="medicineTypeId"
              label="Medicine Type"
              rules={rules.medicineTypeId}
            >
              <Select
                placeholder="Medicine Type"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {medicineTypes.map((medicineType) => (
                  <Option key={medicineType.id} value={medicineType.id}>
                    {medicineType.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {SITE_NAME === "zapkart" && (
            <Form.Item
              name="medicinePackaging"
              label="Medicine Packaging"
              rules={rules.medicinePackaging}
            >
              <Input placeholder="Medicine Packaging" />
            </Form.Item>
          )}

          {/* <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item> */}
          <Form.Item
            name="allowedPaymentTypes"
            label="Allowed Payment Types"
            rules={rules.allowedPaymentTypes}
          >
            <Select
              mode="multiple"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
              style={{ width: "100%" }}
              placeholder="Allowed Payment Types"
            >
              {paymentTypes.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="returnable"
            label="Returnable"
            rules={rules.returnable}
          >
            <Select
              placeholder="Returnable"
              onChange={(val) => setReturnable(val)}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          {returnable && (
            <Form.Item
              name="returnPeriod"
              label="ReturnPeriod"
              // rules={rules.returnPeriod}
            >
              <InputNumber type="number" min={0} max={100000} />
            </Form.Item>
          )}

          <Form.Item
            name="allowedQuantityPerOrder"
            label="AllowedQuantityPerOrder"
            rules={[
              {
                required: true,
                message: "Required",
              },
              // {
              //   min: minQty,
              //   message: 'Must be greater than Min Qty ' + minQty,
              // },
            ]}
          >
            <InputNumber
              type="number"
              min={minQty && minQty}
              max={100000}
              onChange={(val) => setMaxQty(val)}
            />
          </Form.Item>
          {maxQty !== 0 && (
            <Form.Item
              name="minQty"
              label="minQty"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
                // {
                //   max: maxQty,
                //   message: 'Must be less than AllowedQuantityPerOrder ' + maxQty,
                // },
              ]}
            >
              <InputNumber
                type="number"
                min={1}
                max={maxQty && maxQty}
                onChange={(val) => setMinQty(val)}
              />
            </Form.Item>
          )}

          {SITE_NAME === "zapkart" && (
            <Form.Item
              name="prescriptionRequired"
              label="PrescriptionRequired"
              rules={rules.prescriptionRequired}
            >
              <Select placeholder="PrescriptionRequired">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
          )}

          {/* Compostion */}
          {SITE_NAME === "zapkart" && (
            <>
              <label style={{ fontWeight: 500, marginBottom: "10px" }}>
                Composition
              </label>
              <Form.List name="composition">
                {(fields, { add, remove }) => {
                  console.log(fields, "show-filelds");
                  return (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            rules={[{ required: true, message: "required" }]}
                            name={[field.name, "id"]}
                            fieldKey={[field.fieldKey, "id"]}
                          >
                            <Select
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              placeholder="Composition"
                              onChange={() => onCompositionChange()}
                            >
                              {compositions?.map((composition) => (
                                <Option
                                  key={composition.id}
                                  value={composition.id}
                                >
                                  {composition.name}
                                </Option>
                              ))}
                            </Select>
                            {/* <Input placeholder="name" /> */}
                          </Form.Item>
                          <Form.Item
                            {...field}
                            rules={[{ required: true, message: "required" }]}
                            name={[field.name, "qty"]}
                            fieldKey={[field.fieldKey, "qty"]}
                          >
                            <Input placeholder="Quantity" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                              onCompositionChange();
                            }}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add item
                        </Button>
                      </Form.Item>
                    </>
                  );
                }}
              </Form.List>
            </>
          )}

          {SITE_NAME === "zapkart" && (
            <Form.Item
              name="productType"
              label="ProductType"
              rules={rules.productType}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="Product Type"
                onChange={(e) => setProductType(e)}
              >
                <Option value="Medicine">Medicine</Option>
                <Option value="NonMedicine">Non Medicine</Option>
              </Select>
            </Form.Item>
          )}
        </Card>

        {/* Medicine Informations */}
        {productType === "Medicine" && SITE_NAME === "zapkart" && (
          <Card title="Medicine Informations">
            <Form.Item
              name="pregnancyInteraction"
              label="Pregnancy Interaction"
              rules={rules.pregnancyInteraction}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("pregnancyInteraction")}
                onChange={(e) =>
                  form.setFieldsValue({ pregnancyInteraction: e })
                }
                name="pregnancyInteraction"
              />
            </Form.Item>

            <Form.Item
              name="expertAdvice"
              label="Expert Advice"
              rules={rules.expertAdvice}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("expertAdvice") || ""}
                onChange={(e) => form.setFieldsValue({ expertAdvice: e })}
                name="expertAdvice"
              />
            </Form.Item>

            <Form.Item
              name="sideEffects"
              label="Side Effects"
              rules={rules.sideEffects}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("sideEffects") || ""}
                onChange={(e) => form.setFieldsValue({ sideEffects: e })}
                name="sideEffects"
              />
            </Form.Item>

            <Form.Item
              name="howToUse"
              label="How To Use"
              rules={rules.howToUse}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("howToUse") || ""}
                onChange={(e) => form.setFieldsValue({ howToUse: e })}
                name="howToUse"
              />
            </Form.Item>

            <Form.Item name="faq" label="FAQ" rules={rules.faq}>
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("faq") || ""}
                onChange={(e) => form.setFieldsValue({ faq: e })}
                name="faq"
              />
            </Form.Item>

            <Form.Item name="uses" label="Uses" rules={rules.uses}>
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue("uses") || ""}
                onChange={(e) => form.setFieldsValue({ uses: e })}
                name="uses"
              />
            </Form.Item>

            <Form.Item
              name="storageTemperature"
              label="Storage Temperature"
              rules={rules.storageTemperature}
            >
              <Input placeholder="Storage Temperature" />
            </Form.Item>

            <Form.Item
              name="saltComposition"
              label="Salt Composition"
              rules={rules.saltComposition}
            >
              <Input placeholder="Salt Composition" />
            </Form.Item>
          </Card>
        )}

        {/* Shipping Details */}
        <Card title="Shipping Details">
          <Form.Item
            name="lengthClass"
            label="Length Class"
            // rules={rules.lengthClass}
          >
            <Select style={{ width: 150 }}>
              {lengthClass?.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="weightClass"
            label="Weight Class"
            // rules={rules.weightClass}
          >
            <Select style={{ width: 150 }}>
              {weightClass?.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="height" label="Height" >
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="length" label="Length" >
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="width" label="Width">
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="weight" label="Weight" >
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>
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
          <Form.Item name="keywords" label="Keywords">
            <Select
              dropdownStyle={{ display: "none" }}
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Keywords"
            ></Select>
          </Form.Item>
          <Form.Item name="slug" label="Slug" rules={rules.slug}>
            <Input placeholder="Slug" />
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select
              dropdownStyle={{ display: "none" }}
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Tags"
            ></Select>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Upload
            listType="picture-card"
            name="image"
            {...propsImages}
            accept="image/*"
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 600px * 405px
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
