import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import countryService from 'services/country'
import { useHistory } from 'react-router-dom'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import constantsService from 'services/constants'
import imageCategoriesService from 'services/imageCategories'




const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ImageForm = (props) => {
  const { mode = ADD, param } = props
  

  const history = useHistory()

  const [form] = Form.useForm()
   // For Image Upload
   
   const [submitLoading, setSubmitLoading] = useState(false)

   const [form_statuses,setStatuses] = useState([])
   const [image_for,setImageFor] = useState([])
   const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
      setImageFor(Object.values(data.GENERAL['IMAGE_FOR']))

    }
  }
  
// For Image upload
 


  
  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchImageCategoriesById = async () => {
        const data = await imageCategoriesService.getImageCategoriesById(param.id)
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

          
           
          }
          form.setFieldsValue({
            imageFor: data.imageFor,
            width:data.width,
            height:data.height,
           
            
           
           
          })
        } else {
          history.replace(
            '/app/dashboards/image-categories/image-list'
          )
        }
      }

      fetchImageCategoriesById()
    }
  }, [form, mode, param, props])

    // Image Upload

//Image Upload
 

  const onFinish = async () => {
    setSubmitLoading(false)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
      
            const created = await imageCategoriesService.createImageCategories(values)
            if (created) {
              message.success(`Created ${values.name} to Image list`)
              history.goBack()
            }
          }
         
        
        if (mode === EDIT) {
          // Checking if image exists
          
            // We will upload image to S3 and get the image url
            

            //  append image url to values object
            

            const edited = await imageCategoriesService.editImageCategories(param.id,values)
            if (edited) {
              message.success(`Edited ${values.name} to Image list`)
              history.goBack()
            }
          }
        }
        
      )
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
                  ? 'Add New Image'
                  : `Edit Image`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/image-categories/image-list'
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
              <GeneralField form_statuses={form_statuses}
              image_for={image_for}/>
             
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ImageForm
