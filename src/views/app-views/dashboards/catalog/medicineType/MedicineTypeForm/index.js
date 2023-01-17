import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import medicineTypeService from 'services/medicineType'
import { useHistory } from 'react-router-dom'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
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
   const { imageCategories } = useSelector((state) => state.auth)


   const [form_statuses,setStatuses] = useState([])
   const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
// For Image upload
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1) // useUpload(1, 'multiple') or useUpload(1)


  useEffect(() => {
    setImage(fileListImages)
  }, [fileListImages])

  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchMedicineTypeById = async () => {
        const data = await medicineTypeService.getMedicineTypeById(param.id)
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
          form.setFieldsValue({
            name: data.name,
            status: data.status,
          })
        } else {
          history.replace(
            '/app/dashboards/users/medicinetype/medicinetype-list'
          )
        }
      }

      fetchMedicineTypeById()
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
//Image Upload
  useEffect(() => {
    setImage(fileListImages)
  }, [fileListImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          if (uploadedImg.length !== 0 && uploadedImg !== null) {

            console.log('uploadedImg', uploadedImg)
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MedicineTypes'
            )
            // We will upload image to S3 and get the image url
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
               imageCategory.id
            )

            //  append image url to values object
            values.image = imgValue

            const created = await medicineTypeService.createMedicineType(values)
            if (created) {
              message.success(`Created ${values.name} to Medicine type list`)
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
            // We will upload image to S3 and get the image url
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'MedicineTypes'
            )
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )

            //  append image url to values object
            values.image = imgValue

            const edited = await medicineTypeService.editMedicineType(param.id,values)
            if (edited) {
              message.success(`Edited ${values.name} to medicineType list`)
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
                {mode === 'ADD'
                  ? 'Add New Medicine Type'
                  : `Edit Medicine Type`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/medicinetype/medicinetype-list'
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
              <GeneralField  propsImages={propsImages} form_statuses={form_statuses}/>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
