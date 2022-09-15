import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import productService from 'services/product'
import productTemplateService from 'services/productTemplate'
import deliveryZoneService from 'services/deliveryZone'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import vendorService from 'services/vendor'
import constantsService from 'services/constants'
import shipmentService from 'services/shipment'
import qs from 'qs'
import utils from 'utils'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  const [vendors, setVendors] = useState([])
  const [productTemplates, setTemplates] = useState([])
  const [deliveryZones, setDeliveryZones] = useState([])
  const [subscriptionPrice, setSubscriptionPrice] = useState([])
  const [productTemplateId, setProductTemplateId] = useState(null)
  const [bulkPrice, setBulkPrice] = useState([])
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [productBuyType, setProductBuyType] = useState(null)
  const [statuses,setStatuses] = useState([])
  const[pickupLocations,setPickupLocations] = useState([])
  const [selectedVendorId,setSelectedVendorId]=useState(null)
  
  // const [deliveryZones,setDeliveryZones] = useState([])

  // // For selecting DELIVERY LOCATION PARENT
  // const getDeliveryLocations = async () => {
  //   const data = await productService.getDeliveryLocations()
  //   console.log(data, 'myyy-data')

  //   if (data) {
  //     if (mode === EDIT) {
  //       const deliveryLocs = data.filter(
  //         (cur) => cur.isFinal !== true && cur.id !== param.id
  //       )
  //       setDeliveryLocations(deliveryLocs)
  //     } else {
  //       const deliveryLocs = data.filter((cur) => cur.isFinal !== true)
  //       setDeliveryLocations(deliveryLocs)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getDeliveryLocations()
  // }, [])

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  const getPickupLocations = async ()=>{
    const data= await shipmentService.getPickupLocations()
    if(data){
      setPickupLocations(data)
    }
  }
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map(cur => {
        return {
          ...cur, fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setVendors(vendorsList)
    }
  }

  const getProductTemplates = async () => {
    const data = await productTemplateService.getProductTemplates()
    const activeProductTemplates = data.data.filter((cur) => cur.status === 'Active')
    if (activeProductTemplates) {
      setTemplates(activeProductTemplates)
    }
  }

 

  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchProductById = async () => {
        const { id } = param
        const data = await productService.getProductById(id)

        if (data) {
          form.setFieldsValue({
            productTemplateId: data.productTemplateId,
            productVariantId: data?.variant?.id,
            acquirementMethod: data.acquirementMethod,
            mrpPrice: data?.mrpPrice,
            price: data?.price,
            deliveryZoneId: data?.deliveryZone?.id,
            status: data.status,
            qty: data.qty,
            isUnlimited: data.isUnlimited,
            subscriptionPrice: data?.subscriptionPrice,
            bulkPrice: data?.bulkPrice,
            productCode: data?.productCode,
            vendorId: data?.userId,
            commission:data?.commission,
            hsn:data?.hsn,

          })
          setSelectedVendorId(data?.userId)
          setProductTemplateId(data.productTemplateId)
          setProductBuyType(data.acquirementMethod)
          getDeliveryZones({}, {vendorId: data?.userId})

          // const subscriptionPrice = data.subscriptionPrice.map((item) => {
          //   return {
          //     price: item.price,
          //     month: item.month,
          //   }
          // })
          // setSubscriptionPrice(data.subscriptionPrice)

          // setBulkPrice(data.bulkPrice)
        } else {
          history.replace('/app/dashboards/product/product-list')
        }
      }

      fetchProductById()
    }
    getProductTemplates()
    getVendors()

    // getDeliveryZones()
  }, [form, mode, param, props])

  // const getDeliveryZones = async () => {
  //   const data = await deliveryZoneService.getDeliveryZones({vendorId:selectedVendorId})
  //   if (data) {
  //     setDeliveryZones(data.data)
  //   }
  // }  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  const getDeliveryZones = async (paginationParams = {}, filterParams={vendorId:selectedVendorId}) => {
    // setLoading(true)
    console.log('selectedVendorId',selectedVendorId)
    const data = await deliveryZoneService.getDeliveryZones(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )
  
    if (data) {
      setDeliveryZones(data.data)
  
      // // Pagination
      // setPagination({
      //   ...paginationParams.pagination,
      //   total: data.total,
      // })
      // setLoading(false)
    }
  }
  console.log(productBuyType, 'productBuyType')

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // values.productBuyType = values.acquirementMethod
        if (
          process.env.REACT_APP_SITE_NAME === 'zapkart' ||
          process.env.REACT_APP_SITE_NAME === 'athathy'
        ) {
          values.acquirementMethod = 'Purchase'
          values.productBuyType = 'Purchase'
        } else if (process.env.REACT_APP_SITE_NAME === 'awen') {
          values.productBuyType = values.acquirementMethod
        }

        if (values.productVariantId === '') {
          delete values.productVariantId
        }

        if (mode === ADD) {
          const created = await productService.createProduct(values)
          if (created) {
            message.success(`Created Product Success`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await productService.editProduct(param.id, values)
          if (edited) {
            message.success(`Edited Product Success`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          isFinal: false,
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Product' : `Edit Product`}{' '}
              </h2>
              <div className="mb-3">
                <Button className="mr-2" onClick={() => history.goBack()}>
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                form={form}
                productTemplates={productTemplates}
                deliveryZones={deliveryZones}
                productTemplateId={productTemplateId}
                productBuyType={productBuyType}
                setProductBuyType={setProductBuyType}
                vendors={vendors}
                getDeliveryZones={getDeliveryZones}
                statuses={statuses}
                // subscriptionPrice={subscriptionPrice}
                // bulkPrice={bulkPrice}
                // isFinalTrue={isFinalTrue}
                // setIsFinalTrue={setIsFinalTrue}
                // deliveryLocations={deliveryLocations}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
