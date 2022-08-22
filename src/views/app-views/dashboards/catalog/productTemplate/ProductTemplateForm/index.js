import React, { useState, useEffect, useRef } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message, Tag } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import VariantsField from './variantsField'
import useUpload from 'hooks/useUpload'
import {
  multipleImageUpload,
  singleImageUploader,
} from 'utils/s3/s3ImageUploader'
import productTemplateService from 'services/productTemplate'
import brandService from 'services/brand'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import categoryService from 'services/category'
import medicineTypeService from 'services/medicineType'
import manufacturerService from 'services/manufacturer'
import compositionService from 'services/composition'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImages] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [medicineTypes, setMedicineTypes] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [compositions, setCompositions] = useState([])
  const [variantsList, setVariantsList] = useState([])

  const [productType, setProductType] = useState('')
  const [returnable, setReturnable] = useState(false)
  const [tags, setTags] = useState([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [])
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    console.log(newTags)
    setTags(newTags)
  }
  const showInput = () => {
    setInputVisible(true)
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }

    setInputVisible(false)
    setInputValue('')
  }
  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault()
          handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    )
  }
  const tagChild = tags.map(forMap)
  const getCategories = async () => {
    const data = await categoryService.getCategories()
    const activeCategories = data.filter((item) => item.status === 'Active')
    const treeCatList = Utils.createCategoryList(activeCategories)
    setCategories(treeCatList)
  }

  const getBrands = async () => {
    const data = await brandService.getBrands()
    const activeBrands = data.filter((item) => item.status === 'Active')
    setBrands(activeBrands)
  }

  const getMedicineTypes = async () => {
    const data = await medicineTypeService.getMedicineTypes()
    const activeMedicineTypes = data.filter((item) => item.status === 'Active')
    setMedicineTypes(activeMedicineTypes)
  }

  const getManufacturers = async () => {
    const data = await manufacturerService.getManufacturer()
    const activeManufacturers = data.filter((item) => item.status === 'Active')
    setManufacturers(activeManufacturers)
  }

  const getCompositions = async () => {
    const data = await compositionService.getCompositions()
    const activeCompositions = data.filter((item) => item.status === 'Active')
    setCompositions(activeCompositions)
    return activeCompositions
  }

  useEffect(() => {
    getCategories()
    getBrands()

    if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
      getMedicineTypes()
      getManufacturers()
      getCompositions()
    }
  }, [])

  const fetchProductTemplateById = async () => {
    const { id } = param
    const data = await productTemplateService.getProductTemplateById(id)
    if (data) {
      const images = data?.images?.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
        }
      })

      setImages(images)

      setFileListImages(images)

      // form.setFieldsValue({
      //   name: data.name,
      //   status: data.status,
      //   categoryId: data?.category?.id,
      //   allowedPaymentTypes: data.allowedPaymentTypes,
      //   returnable: data.returnable,
      //   brandId: data?.brand?.id,
      //   description: data.description,
      //   returnPeriod: data.returnPeriod,
      //   allowedQuantityPerOrder: data.allowedQuantityPerOrder,
      //   minQty: data.minQty,

      //   lengthClass: data.shippingDetail.lengthClass,
      //   weightClass: data.shippingDetail.weightClass,
      //   height: data.shippingDetail.height,
      //   weight: data.shippingDetail.weight,
      //   length: data.shippingDetail.length,
      //   width: data.shippingDetail.width,
      //   // shippingDetail: {
      //   //   lengthClass: data.shippingDetail.lengthClass,
      //   //   weightClass: data.shippingDetail.weightClass,
      //   //   height: data.shippingDetail.height,
      //   //   length: data.shippingDetail.length,
      //   //   width: data.shippingDetail.width,
      //   //   weight: data.shippingDetail.weight,
      //   // },
      //   prescriptionRequired: data.prescriptionRequired,
      //   productType: data.productType,
      //   medicineTypeId: data.medicineTypeId,
      //   medicinePackaging: data.medicinePackaging,
      //   manufacturer: data.manufacturer,
      //   composition: data.composition,

      //   // productType =============> 'Medicine'
      //   pregnancyInteraction: data.pregnancyInteraction,
      //   expertAdvice: data.expertAdvice,
      //   sideEffects: data.sideEffects,
      //   howToUse: data.howToUse,
      //   faq: data.faq,
      //   uses: data.uses,
      //   storageTemperature: data.storageTemperature,
      //   saltComposition: data.saltComposition,
      // })

      if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
        form.setFieldsValue({
          name: data.name,
          status: data.status,
          categoryId: data?.category?.id,
          allowedPaymentTypes: data.allowedPaymentTypes,
          returnable: data.returnable,
          brandId: data?.brand?.id,
          description: data.description,
          returnPeriod: data.returnPeriod,
          allowedQuantityPerOrder: data.allowedQuantityPerOrder,
          minQty: data.minQty,
          slug: data.slug,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          keywords: data.keywords,

          lengthClass: data.shippingDetail.lengthClass,
          weightClass: data.shippingDetail.weightClass,
          height: data.shippingDetail.height,
          weight: data.shippingDetail.weight,
          length: data.shippingDetail.length,
          width: data.shippingDetail.width,
          // shippingDetail: {
          //   lengthClass: data.shippingDetail.lengthClass,
          //   weightClass: data.shippingDetail.weightClass,
          //   height: data.shippingDetail.height,
          //   length: data.shippingDetail.length,
          //   width: data.shippingDetail.width,
          //   weight: data.shippingDetail.weight,
          // },
          prescriptionRequired: data.prescriptionRequired,
          productType: data.productType,
          medicineTypeId: data.medicineTypeId,
          medicinePackaging: data.medicinePackaging,
          manufacturer: data.manufacturer,
          composition: data.composition,

          // productType =============> 'Medicine'
          pregnancyInteraction: data.pregnancyInteraction,
          expertAdvice: data.expertAdvice,
          sideEffects: data.sideEffects,
          howToUse: data.howToUse,
          faq: data.faq,
          uses: data.uses,
          storageTemperature: data.storageTemperature,
          saltComposition: data.saltComposition,
        })
      } else if (
        process.env.REACT_APP_SITE_NAME === 'athathy' ||
        process.env.REACT_APP_SITE_NAME === 'awen'
      ) {
        form.setFieldsValue({
          name: data.name,
          status: data.status,
          categoryId: data?.category?.id,
          allowedPaymentTypes: data.allowedPaymentTypes,
          returnable: data.returnable,
          brandId: data?.brand?.id,
          description: data.description,
          returnPeriod: data.returnPeriod,
          allowedQuantityPerOrder: data.allowedQuantityPerOrder,
          minQty: data.minQty,
          productType: 'nonMedicine',
          // slug: data.slug,
          // tags: tags,
          // metaTitle: data.metaTitle,
          // metaDescription: data.metaDescription,
          // keywords: data.keywords,

          lengthClass: data.shippingDetail.lengthClass,
          weightClass: data.shippingDetail.weightClass,
          height: data.shippingDetail.height,
          weight: data.shippingDetail.weight,
          length: data.shippingDetail.length,
          width: data.shippingDetail.width,
          // shippingDetail: {
          //   lengthClass: data.shippingDetail.lengthClass,
          //   weightClass: data.shippingDetail.weightClass,
          //   height: data.shippingDetail.height,
          //   length: data.shippingDetail.length,
          //   width: data.shippingDetail.width,
          //   weight: data.shippingDetail.weight,
          // },
        })
      }

      onCompositionChange()

      setProductType(data.productType)
      setReturnable(data.returnable)

      setVariantsList(data.variants)
      setTags(data.tags)
    } else {
      history.replace(
        '/app/dashboards/catalog/producttemplate/producttemplate-list'
      )
    }
  }

  useEffect(() => {
    if (mode === EDIT) {
      fetchProductTemplateById()
    }
  }, [form, mode, param, props])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setImages(fileListImages)
  }, [fileListImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()

      .then(async (values) => {
        console.log(values, 'values')
        let sendingValues = {}

        if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
          sendingValues = {
            brandId: values.brandId,
            categoryId: values.categoryId,
            name: values.name,
            description: values.description,
            productType: values.productType,
            allowedPaymentTypes: values.allowedPaymentTypes,
            returnable: values.returnable,
            returnPeriod: values.returnPeriod,
            allowedQuantityPerOrder: values.allowedQuantityPerOrder,
            prescriptionRequired: values.prescriptionRequired,
            priority: values.priority,
            medicineTypeId: values.medicineTypeId,
            medicinePackaging: values.medicinePackaging,
            manufacturer: values.manufacturer,
            minQty: values.minQty,
            slug: values.slug,
            tags: tags,
            metaTitle: values.metaTitle,
            metaDescription: values.metaDescription,
            keywords: values.keywords,

            composition: values?.composition?.map((comp) => {
              return { id: comp.id, qty: comp.qty }
            }),

            // status: values.status,
            shippingDetail: {
              lengthClass: values.lengthClass,
              weightClass: values.weightClass,
              height: values.height,
              length: values.length,
              width: values.width,
              weight: values.weight,
            },
          }

          if (sendingValues.productType === 'Medicine') {
            sendingValues.pregnancyInteraction = values.pregnancyInteraction
            sendingValues.expertAdvice = values.expertAdvice
            sendingValues.sideEffects = values.sideEffects
            sendingValues.howToUse = values.howToUse
            sendingValues.faq = values.faq
            sendingValues.uses = values.uses
            sendingValues.storageTemperature = values.storageTemperature
            sendingValues.saltComposition = values.saltComposition
          }
        } else if (
          process.env.REACT_APP_SITE_NAME === 'athathy' ||
          process.env.REACT_APP_SITE_NAME === 'awen'
        ) {
          sendingValues = {
            brandId: values.brandId,
            categoryId: values.categoryId,
            name: values.name,
            description: values.description,
            // productType: values.productType,
            allowedPaymentTypes: values.allowedPaymentTypes,
            returnable: values.returnable,
            returnPeriod: values.returnPeriod,
            allowedQuantityPerOrder: values.allowedQuantityPerOrder,
            prescriptionRequired: false,
            priority: values.priority,
            productType: 'NonMedicine',
            medicinePackaging: 'no',
            minQty: values.minQty,
            // slug: values.slug,
            // tags: tags,
            // metaTitle: values.metaTitle,
            // metaDescription: values.metaDescription,
            // keywords: values.keywords,

            // status: values.status,
       
          }
        }

        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            const imgValues = await multipleImageUpload(
              uploadedImg,
              'productTemplate'
            )

            sendingValues.images = imgValues
          } else {
            sendingValues.images = []
          }
          const created = await productTemplateService.createProductTemplate(
            sendingValues
          )
          if (created) {
            message.success(`Created ${values.name} to Product Template List`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            const imgValues = await multipleImageUpload(
              uploadedImg,
              'productTemplate'
            )
            sendingValues.images = imgValues
          } else {
            sendingValues.images = []
          }

          const edited = await productTemplateService.editProductTemplate(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Product Template list`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        // message.error('Please enter all required field ')
      })
  }

  // Cut off already selected values from the list of compositions
  const onCompositionChange = async () => {
    const compositions = await getCompositions()

    const restListTypesItems = compositions.filter(
      ({ id: id1 }) =>
        !form.getFieldValue('composition')?.some(({ id: id2 }) => id2 === id1)
    )

    console.log(restListTypesItems, 'sssssd')

    setCompositions(restListTypesItems)
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
                {mode === 'ADD'
                  ? 'Add New Product Template'
                  : `Edit Product Template`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/producttemplate/producttemplate-list'
                    )
                  }
                >
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
                categories={categories}
                brands={brands}
                medicineTypes={medicineTypes}
                propsImages={propsImages}
                form={form}
                setProductType={setProductType}
                productType={productType}
                manufacturers={manufacturers}
                compositions={compositions}
                onCompositionChange={onCompositionChange}
                setReturnable={setReturnable}
                returnable={returnable}
                fileListImages={fileListImages}
                tagChild={tagChild}
                inputVisible={inputVisible}
                handleInputChange={handleInputChange}
                handleInputConfirm={handleInputConfirm}
                inputRef={inputRef}
                showInput={showInput}
                inputValue={inputValue}
              />
            </TabPane>
            {mode === EDIT && (
              <TabPane tab="Variants" key="2">
                <VariantsField
                  variantsList={variantsList}
                  refreshData={fetchProductTemplateById}
                />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
