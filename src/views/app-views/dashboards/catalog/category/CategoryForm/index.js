import React, { useState, useEffect, useRef } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import categoryService from 'services/category'
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import constantsService from 'services/constants'
import { useSelector } from 'react-redux'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [children, setChildren] = useState([])
  const [form_statuses,setStatuses]= useState([])
  const [uploadedBanner, setBannerImage] = useState(null)
  const { imageCategories } = useSelector((state) => state.auth)



  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  // Banner
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
  

  const getCategories = async (mode) => {
    const data = await categoryService.getCategories()
    if (data) {
      if (mode === EDIT) {
        const restCats = data.data.filter((cat) => cat.id !== param.id)
        const list = Utils.createCategoryList(restCats)
        setCategories(list)
      } else {
        const list = Utils.createCategoryList(data)
        setCategories(list)
      }
    }
  }
  // getCategories()
  const handleChange = (value) => {
    setChildren([...value, { value }])
    return { children }

  };
  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {

      getCategories(EDIT)
      const fetchCategoryById = async () => {
        const { id } = param
        const data = await categoryService.getCategoryById(id)
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
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            priority: data.priority,
            description: data.description,

            homePriority:data.homePriority,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            keywords: data.keywords,
            slug: data.slug,
            tags: data.tags

          })

          if (data.parentId) {
            form.setFieldsValue({
              parentId: data.parentId,
            })
          }
         
        } else {
          history.replace('/app/dashboards/catalog/category/category-list')
        }
      }

      fetchCategoryById()
    } else {
      getCategories(ADD)
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
    setImage(fileListImages)
  }, [fileListImages])

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

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // values.tags=tags
        if (mode === ADD) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'Categories'
            )
            console.log('uploadedImg', uploadedImg)
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )
            values.image = imgValue
          } else {
            values.image = null
          }
          //checking if banner exists
          if (uploadedBanner.length !== 0 && uploadedBanner !== null) {
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'CategoryBanners'
            )
            console.log('uploadedBanner', uploadedBanner)
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
          const created = await categoryService.createCategory(values)
          if (created) {
            message.success(`Created ${values.name} to product list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'Categories'
            )
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )
            values.image = imgValue
          } else {
            values.image = null
          }
          //checking banner exists
          if (uploadedBanner.length !== 0 && uploadedBanner !== null) {
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'CategoryBanners'
            )
            console.log('uploadedBanner', uploadedBanner)
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
          const edited = await categoryService.editCategory(param.id, values)
          if (edited) {
            message.success(`Edited ${values.name} to product list`)
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
                {mode === 'ADD' ? 'Add New Category' : `Edit Category`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/category/category-list'
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
                uploadedImg={uploadedImg}
                form={form}
                categories={categories}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
                propsImages={propsImages} propsBannerImage={propsBannerImage} handleChange={handleChange} form_statuses={form_statuses}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
