import React, { useState } from 'react'
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
  Image,Tag
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import Editor from 'components/shared-components/Editor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { TweenOneGroup } from 'rc-tween-one';

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],
  images: [
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
  description: [
    {
      required: true,
      message: 'Required',
    },
  ],

  categoryId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  allowedPaymentTypes: [
    {
      required: true,
      message: 'Required',
    },
  ],
  returnable: [
    {
      required: true,
      message: 'Required',
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
      message: 'Required',
    },
  ],
  minQty: [
    {
      required: true,
      message: 'Required',
    },
  ],

  prescriptionRequired: [
    {
      required: true,
      message: 'Required',
    },
  ],
  medicineTypeId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  manufacturer: [
    {
      required: true,
      message: 'Required',
    },
  ],
  medicinePackaging: [
    {
      required: true,
      message: 'Required',
    },
  ],

  lengthClass: [
    {
      required: true,
      message: 'Required',
    },
  ],
  weightClass: [
    {
      required: true,
      message: 'Required',
    },
  ],
  height: [
    {
      required: true,
      message: 'Required',
    },
  ],
  length: [
    {
      required: true,
      message: 'Required',
    },
  ],
  width: [
    {
      required: true,
      message: 'Required',
    },
  ],
  weight: [
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
  fileListImages,
  tagChild,inputVisible,handleInputChange,handleInputConfirm,inputRef,
inputValue,showInput
}) => {
  const [image, setImage] = useState(false)

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
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
            rules={rules.description}
          >
            <Editor
              placeholder="Write something..."
              editorHtml={form.getFieldValue('description') || ''}
              onChange={(e) => form.setFieldsValue({ description: e })}
              name="description"
            />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item name="brandId" label="Brand">
            <Select placeholder="Brand">
              {brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>
                  {brand.name}
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
              treeData={categories}
              placeholder="Please select Category"
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item
            name="manufacturer"
            label="Manufacturer"
            rules={rules.manufacturer}
          >
            <Select placeholder="Manufacturer">
              {manufacturers.map((manufacturer) => (
                <Option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
          name="productType"
          label="Product Type"
          rules={rules.productType}
        >
          <Input placeholder="Product Type" />
        </Form.Item> */}

          <Form.Item
            name="medicineTypeId"
            label="Medicine Type"
            rules={rules.medicineTypeId}
          >
            <Select placeholder="Medicine Packaging">
              {medicineTypes.map((medicineType) => (
                <Option key={medicineType.id} value={medicineType.id}>
                  {medicineType.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="medicinePackaging"
            label="Medicine Packaging"
            rules={rules.medicinePackaging}
          >
            <Input placeholder="Medicine Packaging" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Status">
              <Option value="Active">Active</Option>
              <Option value="Hold">Hold</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="allowedPaymentTypes"
            label="Allowed Payment Types"
            rules={rules.allowedPaymentTypes}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Allowed Payment Types"
            >
              <Option key="Cod" value="Cod">
                Cod
              </Option>
              <Option key="Online" value="Online">
                Online
              </Option>
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
            rules={rules.allowedQuantityPerOrder}
          >
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>
          <Form.Item name="minQty" label="minQty" rules={rules.minQty}>
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>
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

          {/* Compostion */}

          <label style={{ fontWeight: 500, marginBottom: '10px' }}>
            Composition
          </label>
          <Form.List name="composition">
            {(fields, { add, remove }) => {
              console.log(fields, 'show-filelds')
              return (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex' }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'required' }]}
                        name={[field.name, 'id']}
                        fieldKey={[field.fieldKey, 'id']}
                      >
                        <Select
                          placeholder="Medicine Packaging"
                          onChange={() => onCompositionChange()}
                        >
                          {compositions?.map((composition) => (
                            <Option key={composition.id} value={composition.id}>
                              {composition.name}
                            </Option>
                          ))}
                        </Select>
                        {/* <Input placeholder="name" /> */}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'required' }]}
                        name={[field.name, 'qty']}
                        fieldKey={[field.fieldKey, 'qty']}
                      >
                        <InputNumber
                          type="number"
                          min={0}
                          max={100000}
                          placeholder="Qty"
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name)
                          onCompositionChange()
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
              )
            }}
          </Form.List>

          <Form.Item
            name="productType"
            label="ProductType"
            rules={rules.productType}
          >
            <Select
              placeholder="Product Type"
              onChange={(e) => setProductType(e)}
            >
              <Option value="Medicine">Medicine</Option>
              <Option value="NonMedicine">Non Medicine</Option>
            </Select>
          </Form.Item>
        </Card>

        {/* Medicine Informations */}
        {productType === 'Medicine' && (
          <Card title="Medicine Informations">
            <Form.Item
              name="pregnancyInteraction"
              label="Pregnancy Interaction"
              rules={rules.pregnancyInteraction}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue('pregnancyInteraction')}
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
                editorHtml={form.getFieldValue('expertAdvice') || ''}
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
                editorHtml={form.getFieldValue('sideEffects') || ''}
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
                editorHtml={form.getFieldValue('howToUse') || ''}
                onChange={(e) => form.setFieldsValue({ howToUse: e })}
                name="howToUse"
              />
            </Form.Item>

            <Form.Item name="faq" label="FAQ" rules={rules.faq}>
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue('faq') || ''}
                onChange={(e) => form.setFieldsValue({ faq: e })}
                name="faq"
              />
            </Form.Item>

            <Form.Item name="uses" label="Uses" rules={rules.uses}>
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue('uses') || ''}
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
            rules={rules.lengthClass}
          >
            <Select placeholder="Length Class">
              <Option value="centimeter">Centimeter</Option>
              <Option value="meter">Meter</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="weightClass"
            label="Weight Class"
            rules={rules.weightClass}
          >
            <Select placeholder="Weight Class">
              <Option value="kilograms">Kilograms</Option>
              <Option value="grams">Grams</Option>
              <Option value="pound">Pound</Option>
              <Option value="litre">Litre</Option>
              <Option value="millilitre">Millilitre</Option>
            </Select>
          </Form.Item>

          <Form.Item name="height" label="Height" rules={rules.height}>
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="length" label="Length" rules={rules.length}>
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="width" label="Width" rules={rules.width}>
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>

          <Form.Item name="weight" label="Weight" rules={rules.weight}>
            <InputNumber type="number" min={0} max={100000} />
          </Form.Item>
        </Card>
        <Card title="SEO">
        <Form.Item
              name="metaTitle"
              label="Meta Title"
            >
              <Input placeholder="Meta Title" />
            </Form.Item>
            <Form.Item
              name="metaDescription"
              label="Meta Description"
            >
              <Input placeholder="Meta Description" />
            </Form.Item>
            <Form.Item
              name="keywords"
              label="Keywords"
            >
              <Input placeholder="Keywords" />
            </Form.Item>
            <Form.Item
              name="slug"
              label="Slug"
              rules={rules.slug}
            >
              <Input placeholder="Slug" />
            </Form.Item>
            <Form.Item name="tags" label="Tags" >
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          // onEnd={(e) => {
          //   if (e.type === 'appear' || e.type === 'enter') {
          //     e.target.style = 'display: inline-block';
          //   }
          // }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
        <hr></hr>
        {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
        </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Upload listType="picture-card" name="image" {...propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Card>
      </Col>
    </Row>
  )
}

export default GeneralField
