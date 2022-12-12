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
import cityService from 'services/city'
import Editor from 'components/shared-components/Editor'
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
  vendor: [
    {
      required: true,
      message: 'Required',
    },
  ],
  commission: [
    {
      required: true,
      message: 'Required',
    },
  ],
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
  mrpPrice: [
    {
      required: true,
      message: 'Required',
    },
  ],
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
  vendors,
  getDeliveryZones,


  
  statuses,
  values,
  condition,
  initialValues
  
  // subscriptionPrice,
  // bulkPrice,
}) => {

  
  console.log(productTemplates, 'plss')
  const [variants, setVariants] = useState([])
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cities, setCities] = useState([])
  
  const getVariants = (id) => {
    const curTemp = productTemplates.find((cur) => cur.id === id)
    console.log(curTemp, 'hoooooo')
    setVariants(curTemp?.variants)
    form.setFieldsValue({
      productVariantId: '',
    })
  }
  const getCities = async () => {
    const data = await cityService.getCity()
    if (data) {
      setCities(data.data)
    }
  }
  useEffect(() => {
    getCities()
 
  }, [])

  useEffect(() => {
    if (productTemplateId) {
      // console.log(form.getFieldValue('templateId'), 'wedfefffe')
      // getVariants(productTemplateId)
      if (productTemplates?.length > 0) {
        const curTemp = productTemplates.find(
          (cur) => cur.id === productTemplateId
        )

        setVariants(curTemp?.variants)
      }
    }
  }, [productTemplateId, productTemplates])


 
  return (
    <>
      <Card title="Basic Info">
        <Form.Item name="vendorId" label="Vendor" rules={rules.vendor}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Vendor"
            onChange={(e) => {
              getDeliveryZones('', { vendorId: e })
              form.setFieldsValue({
                deliveryZoneId: '',
              })
            }}
          >
            {vendors.map((vendor) => (
              <Option value={vendor.id}>{vendor.fullName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="hsn" label="HSN" rules={rules.hsn}>
          <Input placeholder="hsn" />
        </Form.Item>

        <Form.Item
          name="deliveryZoneId"
          label="DeliveryZone"
          rules={rules.deliveryZoneId}
        >
          <Select
            placeholder="deliveryZone"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {deliveryZones.map((deliveryZone) => (
              <Option value={deliveryZone.id}>{deliveryZone.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="productTemplateId"
          label="ProductTemplate"
          rules={rules.productTemplateId}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="productTemplate"
            onChange={(e) => getVariants(e)}
          >
            {productTemplates.map((temp) => (
              <Option value={temp.id}>{temp.name}</Option>
            ))}
          </Select>
        </Form.Item>

        {variants?.length > 0 && (
          <Form.Item
            name="productVariantId"
            label="productVariant"
            rules={[
              {
                required: variants?.length > 0 ? true : false,
                message: 'Product Template Have Variants. Please Select One',
              },
            ]}
            // rules={rules.productVariantId}
          >
            <Select
              placeholder="productVariant"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {variants?.map((variant) => (
                <Option value={variant.id}>{variant.name}</Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="productCode"
          label="productCode"
          rules={rules.productCode}
        >
          <Input placeholder="Product Code" />
        </Form.Item>
        <Form.Item
          name="commission"
          label="Vendor Commission"
          rules={rules.commission}
        >
          <Input placeholder="Vendor Commission" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
        <Form.Item name="qty" label="Quantity" rules={rules.qty}>
          <InputNumber
            placeholder="Quantity"
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>
        <Form.Item
          name="isUnlimited"
          label="Unlimited"
          rules={rules.isUnlimited}
        >
          <Select placeholder="is Unlimited">
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>



        <Form.Item
          name="condition"
          label="Condition of your Product"
          
          
        >
          <Select placeholder="Condition of your Product">
            <Option value={'New'}>New</Option>
            <Option value={'Used'}>Used</Option>
          </Select>
        </Form.Item>


        {/* {values.condition === 'Used' && ( */}
        <Form.Item
        name="usage"
        label="usage"
       
    
      >
        <Select placeholder="usage">
          <Option value={'Used'}>Used-Like New</Option>
          <Option value={'Used'}>Used-Very Good</Option>
          <Option value={'Used'}>Used-Good</Option>
          <Option value={'Used'}>Used-Acceptable</Option>
          <Option value={'Used'}>Used-Poor</Option>
          <Option value={'Used'}>Used-Not Working</Option>
        </Select>
      </Form.Item>
        {/* )} */}


        
{/* {values.condition === 'Used' && ( */}
        <Form.Item
        name="age"
        label="age"
       
       
      >
        <Select placeholder="age">
        <Option value={'Used'}> &lt; 1 Month </Option>
                   <Option value={'1'}>1 Month</Option>
                   <Option value={'2'}>2 Month</Option>
                   <Option value={'3'}>3 Month</Option>
                   <Option value={'4'}>4 Month</Option>
                   <Option value={'5'}>5 Month</Option>
                   <Option value={'6'}>6 Month</Option>
                   <Option value={'7'}>7 Month</Option>
                   <Option value={'8'}>8 Month</Option>
                   <Option value={'9'}>9 Month</Option>
                   <Option value={'10'}>10 Month</Option>
                   <Option value={'11'}>11 Month</Option>
                   <Option value={'12'}>1 Year</Option>
                   <Option value={'13'}>2 Year</Option>
                   <Option value={'14'}>3 Year</Option>
                   <Option value={'15'}>4 Year</Option>
                   <Option value={'16'}>5 Year</Option>
                   <Option value={'17'}>6 Year</Option>
                   <Option value={'18'}>7 Year</Option>
                   <Option value={'19'}>8 Year</Option>
                   <Option value={'20'}>9 Year</Option>
                   <Option value={'21'}>10 Year</Option>
                   <Option value={'22'}>11 Year</Option>
                   <Option value={'23'}>12 Year</Option>
                   <Option value={'24'}>13 Year</Option>
                   <Option value={'25'}>14 Year</Option>
                   <Option value={'26'}>15 Year</Option>
        </Select>
      </Form.Item>
        {/* )} */}

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



        <Form.Item name="duration" label="Duration" >
          <Input placeholder="Duration" />
        </Form.Item>
           

                
      
              
<Form.Item
        name="location"
        label="location"
       
    
      >
        <Select placeholder="usage">
        <Option>Select</Option>
                  {cities?.map((city) => (
                    <Option key={city.name} value={city.name}>
                      {city?.name}
                    </Option>
                  ))}
                </Select>
      </Form.Item>
            
              
      <Form.Item name="warranty" label="warranty" >
          <Input placeholder="warranty" />
        </Form.Item>
           



      <Form.Item
        name="deliveryMethod"
        label="deliveryMethod"
        
      >
        
        <Select placeholder="Delivery Method">
          <Option value={'Self'}>Self</Option>
          <Option value={'Courier'}>Courier</Option>
          
        </Select>
      </Form.Item>
            
          
     


     
              

{/* {(values.acquirementMethod === 'Lend' ||
                values.acquirementMethod === 'Rent') && (


                  <Form.Item
                  name="subscriptionPrice"
                  label="subscriptionPrice"
                  rules={rules.subscriptionPrice}
                >
                    
                  <Select placeholder="subscriptionPrice">
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
        

                }} */}

            


      </Card>

      <Card title="Price Info">
        {process.env.REACT_APP_SITE_NAME === 'awen' && (
          <Form.Item
            name="acquirementMethod"
            label="Product Buy Type"
            rules={rules.acquirementMethod}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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

        {productBuyType === 'Purchase' && (
          <Form.Item name="mrpPrice" label="MRP Price" rules={rules.mrpPrice}>
            <InputNumber
              placeholder="mrp Price"
              type="number"
              min={0}
              max={100000}
            />
          </Form.Item>
        )}

        {productBuyType !== 'Giveaway' && (
          <Form.Item
            name="price"
            label={
              productBuyType === 'Rent' || productBuyType === 'Lend'
                ? 'Security Deposit'
                : 'Sale Price'
            }
            rules={rules.price}
          >
            <InputNumber
              placeholder={
                productBuyType === 'Rent' || productBuyType === 'Lend'
                  ? 'Security Deposit'
                  : 'Sale Price'
              }
              type="number"
              min={0}
              max={100000}
            />
          </Form.Item>
        )}

        {productBuyType === 'Rent' && (
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

        {productBuyType === 'Purchase' && (
          <>
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
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
          </>
        )}
      </Card>
    </>
  )
}

export default GeneralField
