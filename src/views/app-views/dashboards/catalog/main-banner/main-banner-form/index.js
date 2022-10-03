import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import BannerService from 'services/banner'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import constantsService from 'services/constants'
import mainBannerService from 'services/MainBanner'
import { useSelector } from 'react-redux'
const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const MainBannerForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  const [uploadedMobileImg, setMobileImg] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form_statuses,setStatuses]= useState([])

  const { imageCategories } = useSelector((state) => state.auth)


  // Normal Image
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  // Mobile Image
  const {
    fileList: fileListMobileImages,
    beforeUpload: beforeUploadMobileImages,
    onChange: onChangeMobileImages,
    onRemove: onRemoveMobileImages,
    setFileList: setFileListMobileImages,
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
      const fetchBannerById = async () => {
        const { id } = param
        const data = await mainBannerService.getMainBannerById(id)
        if (data) {
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

          if (data.mobileImage) {
            himg = [
              {
                uid: Math.random() * 1000,
                name: Utils.getBaseName(data.mobileImage),
                url: data.mobileImage,
                thumbUrl: data.mobileImage,
              },
            ]

            setMobileImg(himg)
            setFileListMobileImages(himg)
          }

          form.setFieldsValue({
            name: data.name,
            status: data.status,
            priority: data.priority,
            forwardUrl: data.forwardUrl,
          })
        } else {
          history.replace('/app/dashboards/catalog/main-banner/main-banner-list')
        }
      }

      fetchBannerById()
    }
  }, [form, mode, param, props])

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  const propsMobileImages = {
    multiple: false,
    beforeUpload: beforeUploadMobileImages,
    onRemove: onRemoveMobileImages,
    onChange: onChangeMobileImages,
    fileList: fileListMobileImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setImage(fileListImages)
  }, [fileListImages])

  useEffect(() => {
    setMobileImg(fileListMobileImages)
  }, [fileListMobileImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          // Checking if image exists
          if (
            uploadedImg.length !== 0 &&
            uploadedImg !== null &&
            uploadedMobileImg.length !== 0 &&
            uploadedMobileImg !== null
          ) {
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MainBanners'
            )
            console.log('uploadedImg', uploadedImg)
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )
            const imageCategoryMobile = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MainBannersMobile'
            )
            const mobileImgValue = await singleImageUploader(
              uploadedMobileImg[0].originFileObj,
              uploadedMobileImg,
              uploadedMobileImg[0].url,
              imageCategoryMobile.id
            )

            values.image = imgValue
            values.mobileImage = mobileImgValue

            const created = await mainBannerService.createMainBanner(values)
            if (created) {
              message.success(`Created ${values.name} to Main Banner list`)
              history.goBack()
            }
          } else {
            message.error('Please upload image')
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (
            uploadedImg.length !== 0 &&
            uploadedImg !== null &&
            uploadedMobileImg.length !== 0 &&
            uploadedMobileImg !== null
          ) {
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MainBanners'
            )
            console.log('uploadedImg', uploadedImg)
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )
            const imageCategoryMobile = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MainBannersMobile'
            )
            const mobileImgValue = await singleImageUploader(
              uploadedMobileImg[0].originFileObj,
              uploadedMobileImg,
              uploadedMobileImg[0].url,
              imageCategoryMobile.id
            )

            values.image = imgValue
            values.mobileImage = mobileImgValue

            const edited = await mainBannerService.editMainBanner(param.id, values)
            if (edited) {
              message.success(`Edited ${values.name} to Main Banner list`)
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
                {mode === 'ADD' ? 'Add New Main Banner' : `Edit Main Banner`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/catalog/main-banner/main-banner-list')
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
                propsMobileImages={propsMobileImages} form_statuses={form_statuses}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default MainBannerForm
