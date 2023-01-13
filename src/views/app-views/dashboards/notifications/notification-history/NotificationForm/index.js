import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import notificationService from 'services/notification'
import { useHistory } from 'react-router-dom'
import constantsService from 'services/constants'
import { PresetStatusColorTypes } from 'antd/lib/_util/colors'
import customerService from 'services/customer'
import useUpload from 'hooks/useUpload'
import {
  multipleImageUpload,
  singleImageUploader,
} from 'utils/s3/s3ImageUploader'
import { useSelector } from 'react-redux'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const NotificationForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }
  const [form] = Form.useForm()
  const [uploadedImg, setImages] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [tempConstants, setTempConstants] = useState({})
  const [editorRender, setEditorRender] = useState(false)
  const[form_statuses,setStatuses] = useState([])
  const[customer,setCustomers] = useState([])
  const [form_users, setUsers] = useState([])

  const { imageCategories } = useSelector((state) => state.auth)

useEffect(() => {
    // console.log(fileListImages, 'filesimages')
    setImages(fileListImages)
    // console.log(uploadedImg,'uploadimages');
  }, [fileListImages])

  const getUsers = async () => {
    const data = await customerService.getCustomers()
    if (data) {
      const availableUsers = data.filter((user) => user.status === 'Active')
      setUsers(availableUsers)
    }
  }
  useEffect(() => {
    const fetchConstants = async () => {
      const data = await constantsService.getConstants()
      if (data) {
        setTempConstants(data.TEMPLATE)
        setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
      }
    }
    getUsers()
    fetchConstants()
  }, [])
  if (tempConstants?.KEYS) {
    // console.log(Object.values(tempConstants['KEYS']), 'constanttyys')
  }


  
  // useEffect(()=>{
  //   if (mode === EDIT) {
  //   const getCustomers = async () => {
  //     const data = await customerService.getCustomers()
  //     if (data) {
  //       const customerList = data.map((cur) => {
  //         return {
  //           ...cur,
  //           fullName: `${cur.firstName} ${cur.lastName}`,
  //         }
  //       })
  //       setCustomers(customerList)
  //     }
  //   }
  
  // getCustomers()
  //   }
  // }, [])
  // useEffect(() => {
  //   if (mode === EDIT) {
  //     const fetchNotificationById = async () => {
  //       const { id } = param
  //       const data = await notificationService.getNotificationsById(id);
  //       if (data) {
  //         console.log(data.data.userName,'idnot')
  //         // form.setFieldsValue({
  //         //   name: data?.data?.userName,
  //         //   email: data?.data?.userEmail,
  //         //   notificationCategoryType: data?.data?.notificationCategoryType,
  //         //   sendTime: data?.data?.createdAt, 
  //         //   listingType: data?.data?.listingType,

  //         //   emailSubject: data?.data?.email.subject,
  //         //   emailContent: data?.data?.email.content,
  //         //   emailStatus:data?.data?.email.status,

  //         //   smsTemplateId: data?.data?.sms.templateId,
  //         //   smsContent: data?.data?.sms.content,
  //         //   smsStatus:data?.data?.sms.status,

  //         //   fcmTitle: data?.data?.fcm.title,
  //         //   fcmDescription: data?.data?.fcm.description,
  //         //   fcmStatus:data?.data?.fcm.status
  //         // })
  //         setEditorRender(true)
  //       } else {
  //         history.replace('/app/dashboards/notifications/notification-history/notification-list')
  //       }
  //     }
  //     fetchNotificationById()
  //   }
  // }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // console.log(values,'notification')
        
        const sendingValues = {
          name: values.name,
          users: values.users,
          publicNotification: values.publicNotification,
          email: {
            subject: values.emailSubject,
            content: values.emailContent,
            status:values.emailStatus
          },
          sms: {
            templateId: values.smsTemplateId,
            content: values.smsContent,
            status:values.smsStatus
          },
          fcm: {
            title: values.fcmTitle,
            description: values.fcmDescription,
            image: values.image,
            status:values.fcmStatus
          },
        }
          
        if (mode === ADD) {
          if (uploadedImg.length !== 0 && uploadedImg !== null) {
            // We will upload image to our backend and get the image url
            const imageCategory = imageCategories.find(
              (imgCat) => imgCat.imageFor === 'Notifications'
            )
            // console.log('uploadedImg', uploadedImg)
  
  
            const imgValue = await singleImageUploader(
              uploadedImg[0].originFileObj,
              uploadedImg,
              uploadedImg[0].url,
              imageCategory.id
            )
            sendingValues.fcm.image = imgValue
            // console.log(imgValue,'images')
          } else {
            sendingValues.fcm.image = null
          }

          const created = await notificationService.createNotifications(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Notification list`)
            history.goBack()
          }
        }
        // if (mode === EDIT) {
        //   const edited = await notificationService.getNotificationsById(
        //     param.id,
        //     sendingValues
        //   )
        //   if (edited) {
        //     message.success(`Edited ${values.name} to Notification list`)
        //     history.goBack()
        //   }
        // }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        // console.log('info', info)
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
                {mode === 'ADD' ? 'Add New Notification' : `View Notification`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/notifications/notification-history/notification-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  // disabled={submitLoading}
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
              <GeneralField propsImages={propsImages} form_users={form_users} tempConstants={tempConstants} form={form}  form_statuses={form_statuses} customer={customer} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default NotificationForm
