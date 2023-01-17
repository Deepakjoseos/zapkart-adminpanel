import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
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
  const [variantsList, setVariantsList] = useState([])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

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
  useEffect(() => {
    getCategories()
    getBrands()
  }, [])

  const fetchProductTemplateById = async () => {
    const { id } = param
    const data = await productTemplateService.getProductTemplateById(id)
    if (data) {
      const images = data.images.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
        }
      })

      setImages(images)

      setFileListImages(images)

      form.setFieldsValue({
        name: data.name,
        status: data.status,
        categoryId: data.category.id,
        productType: data.productType,
        allowedPaymentTypes: data.allowedPaymentTypes,
        returnable: data.returnable,
        brandId: data.brand.id,
        description: data.description,
        returnPeriod: data.returnPeriod,
        allowedQuantityPerOrder: data.allowedQuantityPerOrder,
        prescriptionRequired: data.prescriptionRequired,

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

      setVariantsList(data.variants)
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
        setSubmitLoading(false)
        const sendingValues = {
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

        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            const imgValues = await multipleImageUpload(
              uploadedImg,
              'productTemplate'
            )

            sendingValues.images = imgValues

            const created = await productTemplateService.createProductTemplate(
              sendingValues
            )
            if (created) {
              message.success(`Created ${values.name} to Product Template List`)
              history.goBack()
            }
          } else {
            message.error('Please upload image')
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

            const edited = await productTemplateService.editProductTemplate(
              param.id,
              sendingValues
            )
            if (edited) {
              message.success(`Edited ${values.name} to Product Template list`)
              history.goBack()
            }
          } else {
            message.error('Please upload image')
          }
        }
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
                {mode === 'ADD' ? 'Add New Brand' : `Edit Brand`}{' '}
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
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                propsImages={propsImages}
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
