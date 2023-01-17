import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  Space,
  Button,
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  // name: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // isFinal: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // uniqueId: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  // status: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  productTemplateId: [
    {
      required: true,
      message: 'Required',
    },
  ],
  // productVariantId: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],
  acquirementMethod: [
    {
      required: true,
      message: 'Required',
    },
  ],
  
  // mrpPrice: [
  //   {
  //     required: true,
  //     message: 'Required',
  //   },
  // ],

  productCode: [
    {
      required: true,
      message: 'Required',
    },
  ],

  price: [
    {
      required: true,
      message: 'Required',
    },
  ],
  deliveryZoneId: [
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
  qty: [
    {
      required: true,
      message: 'Required',
    },
  ],
  isUnlimited: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const GeneralField = ({
  form,
  productTemplates,
  deliveryZones,
  productTemplateId,
  productBuyType,
  setProductBuyType,
  // subscriptionPrice,
  // bulkPrice,
}) => {
  console.log(productTemplates, 'plss')
  const [variants, setVariants] = useState([])

  const getVariants = (id) => {
    const curTemp = productTemplates.find((cur) => cur.id === id)
    console.log(curTemp, 'hoooooo')
    setVariants(curTemp.variants)
    form.setFieldsValue({
      productVariantId: '',
    })
  }

  useEffect(() => {
    if (productTemplateId) {
      // console.log(form.getFieldValue('templateId'), 'wedfefffe')
      // getVariants(productTemplateId)
      if (productTemplates?.length > 0) {
        const curTemp = productTemplates.find(
          (cur) => cur.id === productTemplateId
        )

        setVariants(curTemp.variants)
      }
    }
  }, [productTemplateId, productTemplates])

  return (
    <>
      <Card title="Basic Info">
        
      {process.env.REACT_APP_SITE_NAME === 'athathy' && (
           <Form.Item
          name="SKU"
          label="SKU"
          rules={rules.SKU}
        >
          <Input placeholder="SKU" />
        </Form.Item>
)}
{process.env.REACT_APP_SITE_NAME === 'zapkart' && (
  <Form.Item
          name="hsn"
          label="HSN"
          rules={rules.HSN}
        >
          <Input placeholder="HSN" />
        </Form.Item>

)}
        <Form.Item
          name="productTemplateId"
          label="Product"
          rules={rules.productTemplateId}
        >

          <Select
            placeholder="Product "
            onChange={(e) => getVariants(e)}
          >
            {productTemplates.map((temp) => (
              <Option value={temp.id}>{temp.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item rules={[
              {
                required: variants?.length > 0 ? true : false,
                message: 'Product Template Have Variants. Please Select One',
              
              },
              
            ]}
          
          name="productVariantId"
          label= " Product Variant"
          // rules={rules.productVariantId}
        >
          <Select placeholder="Product Variant">
            {variants?.map((variant) => (
              <Option value={variant.id}>{variant.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="productCode"
          label="Product Code"
          rules={rules.productCode}
        >
          <Input placeholder="Product Code" />
        </Form.Item>

        

        <Form.Item
          name="deliveryZoneId"
          label="Delivery Zone"
          rules={rules.deliveryZoneId}
        >
          <Select placeholder="Delivery Zone">
            {deliveryZones.map((deliveryZone) => (
              <Option value={deliveryZone.id}>{deliveryZone.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
        <Form.Item name="qty" label="Quantity" rules={rules.qty}>
          <InputNumber placeholder="QTY" type="number" min={0} max={100000} />
        </Form.Item>
        <Form.Item
          name="isUnlimited"
          label="Is Unlimited"
          rules={rules.isUnlimited}
        >
          <Select placeholder="Is Unlimited">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title="Price Info">
        {process.env.REACT_APP_SITE_NAME === 'awen' && (
          <Form.Item
            name="acquirementMethod"
            label="Product Buy Type"
            rules={rules.acquirementMethod}
          >
            <Select
              placeholder="Acquirement Method"
              onChange={(e) => setProductBuyType(e)}
            >
              <Option value="Purchase">Buy</Option>
              <Option value="Lend">Lend</Option>
              <Option value="Rent">Rent</Option>
              <Option value="Giveaway">Giveaway</Option>
            </Select>
          </Form.Item>
        )}
{process.env.REACT_APP_SITE_NAME === 'athathy' && (
        <Form.Item name="mrpPrice" label="AED Price" >
          <InputNumber
            placeholder="AED Price"
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>
)}
{process.env.REACT_APP_SITE_NAME === 'zapkart' && (
<Form.Item name="mrpPrice" label="MRP Price" rules={rules.mrpPrice}>
          <InputNumber
            placeholder="MRP Price"
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>
        )}
        <Form.Item name="price" label="Sale Price" rules={rules.price}>
          <InputNumber
            placeholder="Sale Price"
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>

        {(productBuyType === 'Rent' || productBuyType === 'Lend') && (
          <>
            <label style={{ fontWeight: 500 }}>subscriptionPrice</label>
            <Form.List name="subscriptionPrice">
              {(fields, { add, remove }) => (
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
                        name={[field.name, 'price']}
                        fieldKey={[field.fieldKey, 'price']}
                      >
                        <Input placeholder="price" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'required' }]}
                        name={[field.name, 'month']}
                        fieldKey={[field.fieldKey, 'month']}
                      >
                        <Input placeholder="Month" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
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
              )}
            </Form.List>
          </>
        )}

        <label style={{ fontWeight: 500 }}>Bulk Price</label>
        <Form.List name="bulkPrice">
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
                      name={[field.name, 'price']}
                      fieldKey={[field.fieldKey, 'price']}
                    >
                      <Input placeholder="price" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      rules={[{ required: true, message: 'required' }]}
                      name={[field.name, 'qty']}
                      fieldKey={[field.fieldKey, 'qty']}
                    >
                      <Input placeholder="Qty" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
      </Card>
    </>
  )
}

export default GeneralField
