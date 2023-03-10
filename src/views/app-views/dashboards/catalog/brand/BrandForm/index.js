import React, { useState, useEffect, useRef } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message, Tag } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import brandService from 'services/brand'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import slugify from 'slugify'
import constantsService from 'services/constants'
import { useSelector } from 'react-redux'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  // For Image Upload
  const [uploadedImg, setImage] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form_statuses, setStatuses] = useState([])
  const [uploadedBanner, setBannerImage] = useState(null)
  const { imageCategories } = useSelector((state) => state.auth)

  // For Image upload
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1) // useUpload(1, 'multiple') or useUpload(1)

  // Banner upload
  const {
    fileList: fileListBannerImages,
    beforeUpload: beforeUploadBannerImage,
    onChange: onChangeBannerImage,
    onRemove: onRemoveBannerImage,
    setFileList: setFileListBannerImage,
  } = useUpload(1)

  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
    }
  }
  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchBrandById = async () => {
        const { id } = param
        const data = await brandService.getBrandById(id)
        if (data) {
          // For Image upload
          let himg = []
          if (data.image) {
            himg = [
              {
                uid: Math.random() * 1000,
                name: Utils.getBaseName(data.image),
                url: data.image,
                thumbUrl: data.image,
              },
            ]

            setImage(himg)
            setFileListImages(himg)
          }
          //Banner
          if (data.banner) {
            himg = [
              {
                uid: Math.random() * 1000,
                name: Utils.getBaseName(data.banner),
                url: data.banner,
                thumbUrl: data.banner,
              },
            ]

            setBannerImage(himg)
            setFileListBannerImage(himg)
          }
          // For setting form values when Load if it is in EDIT mode
          form.setFieldsValue({
            name: data.name,
            description: data.description,
            status: data.status,
            priority: data.priority,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            keywords: data.keywords,
            slug: data.slug,
            tags: data.tags,
          })
        } else {
          history.replace('/app/dashboards/catalog/brand/brands-list')
        }
      }

      fetchBrandById()
    }
  }, [form, mode, param, props])

  // Image Upload
  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  // Image Upload
  useEffect(() => {
    setImage(fileListImages)
  }, [fileListImages])
  //Banner
  const propsBannerImage = {
    multiple: false,
    beforeUpload: beforeUploadBannerImage,
    onRemove: onRemoveBannerImage,
    onChange: onChangeBannerImage,
    fileList: fileListBannerImages,
  }
  useEffect(() => {
    setBannerImage(fileListBannerImages)
  }, [fileListBannerImages])
  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            console.log('uploadedImg', uploadedImg)
            // We will upload image to our backend and get the image url
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'Brands'
            )

            console.log(imageCategory, 'shsiy')

            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )

            //  append image url to values object
            values.image = imgValue
            //checking if banner exists
            if (uploadedBanner.length !== 0 && uploadedBanner !== null) {
              console.log('uploadedBanner', uploadedBanner)
              const imageCategory = imageCategories.find(
                (imgCat) => imgCat.imageFor === 'BrandBanners'
              )
              const bannerValue = await singleImageUploader(
                uploadedBanner[0].originFileObj,
                uploadedBanner,
                uploadedBanner[0].url,
                imageCategory.id
              )
              values.banner = bannerValue
            } else {
              values.banner = null
            }

            const created = await brandService.createBrand(values)
            if (created) {
              message.success(`Created ${values.name} to Brand list`)
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
            // We will upload image to our backend and get the image url
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'Brands'
            )

            console.log(imageCategory, 'shsiy')

            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )

            //  append image url to values object
            values.image = imgValue
            //checking banner exists
            if (uploadedBanner.length !== 0 && uploadedBanner !== null) {
              const imageCategory = imageCategories.find(
                (imgCat) => imgCat.imageFor === 'BrandBanners'
              )
              const bannerValue = await singleImageUploader(
                uploadedBanner[0].originFileObj,
                uploadedBanner,
                uploadedBanner[0].url,
                imageCategory.id
              )
              values.banner = bannerValue
            } else {
              values.banner = null
            }

            const edited = await brandService.editBrand(param.id, values)
            if (edited) {
              message.success(`Edited ${values.name} to Brand list`)
              history.goBack()
            }
          } else {
            message.error('Please upload image')
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
                    history.push('/app/dashboards/catalog/brand/brands-list')
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
                uploadedImg={uploadedImg}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                propsImages={propsImages}
                form_statuses={form_statuses}
                form={form}
                propsBannerImage={propsBannerImage}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
