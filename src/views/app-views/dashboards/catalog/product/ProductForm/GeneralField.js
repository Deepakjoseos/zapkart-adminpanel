import React, { useEffect, useState } from "react";
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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import cityService from "services/city";
import Editor from "components/shared-components/Editor";
import TextArea from "antd/lib/input/TextArea";
import constantsService from "services/constants";
// const { Dragger } = Upload
const { Option } = Select;

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
      message: "Required",
    },
  ],
  commission: [
    {
      required: true,
      message: "Required",
    },
  ],
  productTemplateId: [
    {
      required: true,
      message: "Required",
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
      message: "Required",
    },
  ],
  mrpPrice: [
    {
      required: true,
      message: "Required",
    },
  ],
  productCode: [
    {
      required: true,
      message: "Required",
    },
  ],

  price: [
    {
      required: true,
      message: "Required",
    },
  ],
  deliveryZoneId: [
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
  qty: [
    {
      required: true,
      message: "Required",
    },
  ],
  isUnlimited: [
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
};

const GeneralField = ({
  form,
  productTemplates,
  deliveryZones,
  productTemplateId,
  productBuyType,
  setProductBuyType,
  vendors,
  getDeliveryZones,
mode
  


  // subscriptionPrice,
  // bulkPrice,
}) => {
  console.log(productTemplates, "plss");
  const [variants, setVariants] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cities, setCities] = useState([]);
  const [statuses, setStatuses] = useState([])
  const [condition, setCondition] = useState()

  const getVariants = (id) => {
    const curTemp = productTemplates.find((cur) => cur.id === id);
    console.log(curTemp, "hoooooo");
    setVariants(curTemp?.variants);
    form.setFieldsValue({
      productVariantId: "",
    });
  };
  const getCities = async () => {
    const data = await cityService.getCity();
    if (data) {
      setCities(data.data);
    }
  };

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }

  useEffect(() => {
    getCities();
    fetchConstants();
  }, []);

  useEffect(() => {
    if (productTemplateId) {
      // console.log(form.getFieldValue('templateId'), 'wedfefffe')
      // getVariants(productTemplateId)
      if (productTemplates?.length > 0) {
        const curTemp = productTemplates.find(
          (cur) => cur.id === productTemplateId
        );

        setVariants(curTemp?.variants);
      }
    }
  }, [productTemplateId, productTemplates]);

  return (
    <>
      <Card title="Basic Info">
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
        <Form.Item name="vendorId" label="Vendor" rules={rules.vendor}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Vendor"
            onChange={(e) => {
              getDeliveryZones("", { vendorId: e });
              form.setFieldsValue({
                deliveryZoneId: "",
              });
            }}
          >
            {vendors.map((vendor) => (
              <Option value={vendor.id}>{vendor.fullName}</Option>
            ))}
          </Select>
        </Form.Item>
       
        <Form.Item
          name="status"
          label="Status"
          rules={rules.status}
        >
          <Select
            placeholder="status"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {statuses.map((status) => (
              <Option value={status}>{status}</Option>
            ))}
          </Select>
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
          label="Select The Product Template"
          rules={rules.productTemplateId}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Select The Product Template"
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
                message: "Product Template Have Variants. Please Select One",
              },
            ]}
            // rules={rules.productVariantId}
          >
            <Select
              placeholder="Product Variant"
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
        {mode === 'EDIT'  && (
        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            <Option value="Active">Active</Option>
            <Option value="Hold">Hold</Option>
          </Select>
        </Form.Item>
        )}
        <Form.Item
          name="qty"
          label="Please Enter The Quantity
"
          rules={rules.qty}
        >
          <InputNumber
            placeholder="Please Enter The Quantity
            "
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
          label="What Is The Condition Of Your Product
          "
          
      
        >
          <Select placeholder="What Is The Condition Of Your Product"   onChange={(value) => {
          setCondition(value)
       
        }}
          >
            <Option value={'New'}>New</Option>
            <Option value={'Used'}>Used</Option>
          </Select>
        </Form.Item>

           {condition === 'Used' &&  (
      
        <Form.Item
        name="usage"
        label="Usage"
       
    
      >
        <Select placeholder="Usage">
          <Option value={'Used-Like New'}>Used-Like New</Option>
          <Option value={'Used-Very Good'}>Used-Very Good</Option>
          <Option value={'Used-Good'}>Used-Good</Option>
          <Option value={'Used-Acceptable'}>Used-Acceptable</Option>
          <Option value={'Used-Poor'}>Used-Poor</Option>
          <Option value={'Used-Not Working'}>Used-Not Working</Option>
        </Select>
      </Form.Item>
    
           )}

{condition === 'Used' &&  (

        <Form.Item
        name="age"
        label="How Old Is Your Product
        "
       
       
      >
        <Select placeholder="How Old Is Your Product
">
        <Option value={'0'}> &lt; 1 Month </Option>
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
      
        )}
        <Form.Item
          name="description"
          label="Describe Your Product
          "
          rules={rules.description}
        >
          <TextArea
           
            name="Describe Your Product
            "
          />
        </Form.Item>



        <Form.Item name="duration" label="Duration" >
          <Input placeholder="Duration" />
        </Form.Item>
           

                
      
              
<Form.Item
        name="location"
        label="Enter The Location Of Your Product
        "
       
    
      >
        <Select placeholder="Enter The Location Of Your Product
">
        <Option>Select</Option>
                  {cities?.map((city) => (
                    <Option key={city.name} value={city.name}>
                      {city?.name}
                    </Option>
                  ))}
                </Select>
      </Form.Item>
                

      {/* {productBuyType === 'Purchase'  && (
           <Form.Item
          name="isWarrantyProvided"
          label="Do you provide warranty for your product"
       
        >
        <Select placeholder="Do you provide warranty for your product"
         onChange={(value) => {
          setWarrantyprovided(value)
          
        }}>
          
          <Option value={'true'}>Yes</Option>
          <Option value={'false'}>No</Option>
          
        </Select>
        </Form.Item>
              
      )}
       
        {(isWarrantyProvided === 'true') && (  productBuyType === 'Purchase' ) &&  (



<Form.Item name="warranty" label="warranty" >
<Input placeholder="warranty" />
</Form.Item>

    
        
      )} */}
           



      <Form.Item
        name="deliveryMethod"
        label="Delivery Method"
        
      >
        
        <Select placeholder="Delivery Method">
          <Option value={'Self'}>Self</Option>
          <Option value={'Courier'}>Courier</Option>
          
        </Select>
      </Form.Item>
            
          
     
      </Card>

      <Card title="Price Info">
       
      {productBuyType === 'Purchase'  && (
        <Form.Item name="mrpPrice" label="Please Enter The Actual Price Of Your Product
" rules={rules.mrpPrice}>
          <InputNumber
            placeholder="Please Enter The Actual Price Of Your Product
            "
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>
      )}





        {productBuyType === 'Purchase'  && (
        <Form.Item name="price" label="Please Enter The Selling Price Of Your Product
" rules={rules.price}>
          <InputNumber
            placeholder="Please Enter The Selling Price Of Your Product
            "
            type="number"
            min={0}
            max={100000}
          />
        </Form.Item>
        )}




{(productBuyType !== "Giveaway") && (productBuyType !== "Purchase") && (
          <Form.Item
            name="price"
            label={
              productBuyType === "Rent" || productBuyType === "Lend" 
                ? "Please Enter The Security Deposit For Your Product"
                : "Please Enter The Selling Price Of Your Product"
            }
            rules={rules.price}
          >
            <InputNumber
              placeholder={
                productBuyType === "Rent" || productBuyType === "Lend"  
                  ? "Please Enter The Security Deposit For Your Product"
                  : "Please Enter The Selling Price Of Your Product"
              }
              type="number"
              min={0}
              max={100000}
            />
          </Form.Item>
        )}


        {productBuyType === 'Rent' && (
          <>
            <label style={{ fontWeight: 500 }}>Subscription Price</label>
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

        {productBuyType === "Purchase" && (
          <>
            <label style={{ fontWeight: 500 }}>Bulk Price</label>
            <Form.List name="bulkPrice">
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
                          name={[field.name, "price"]}
                          fieldKey={[field.fieldKey, "price"]}
                        >
                          <Input placeholder="price" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          rules={[{ required: true, message: "required" }]}
                          name={[field.name, "qty"]}
                          fieldKey={[field.fieldKey, "qty"]}
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
                );
              }}
            </Form.List>
          </>
        )}
      </Card>
    </>
  );
};

export default GeneralField;
