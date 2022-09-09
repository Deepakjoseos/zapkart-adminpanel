import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import vendorService from 'services/vendor'
import ViewPickupLocations from '../vendor-list/ViewPickUpLocations'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props

  const history = useHistory()

  const [form] = Form.useForm()
  const [displayImage, setDisplayImage] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const[pickupLocations,setPickUpLocations] = useState(null)
  const [selectedVendorId, setSelectedCustomerId] = useState(null)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)


   const {
     fileList: fileListDisplayImages,
     beforeUpload: beforeUploadDisplayImages,
     onChange: onChangeDisplayImages,
     onRemove: onRemoveDisplayImages,
     setFileList: setFileListDisplayImages,
   } = useUpload(1)

  const fetchVendorById = async () => {
    const { id } = param
    const data = await vendorService.getVendorById(id)
    if (data) {

      setPickUpLocations(data.pickupLocations)
      let himg = []
      if (data.image) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(data.image),
            url: data.displayImage,
            thumbUrl: data.displayImage,
          },
        ]

        setDisplayImage(himg)
        setFileListDisplayImages(himg)
      }

      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data?.email,
        phone: data?.phone,
        gst: data?.gst,
        tanNumber: data?.tanNumber,
        pan:data?.pan,
        drugLicense:data?.drugLicense,

        // address:
        'address.line1': data?.address?.line1,
        'address.city': data?.address?.city,
        'address.state': data?.address?.state,
        'address.country': data?.address?.country,
        'address.phone': data?.address?.phone,
        'address.zipcode': data?.address?.zipcode,

        // Bussiness
        'business.name': data?.business?.name,
        'business.address.line1': data?.business?.address?.line1,
        'business.address.city': data?.business?.address?.city,
        'business.address.state': data?.business?.address?.state,
        'business.address.country': data?.business?.address?.country,
        'business.address.phone': data?.business?.address?.phone,
        'business.address.zipcode': data?.business?.address?.zipcode,
      })
      setEmailVerified(data?.emailVerified ? true :false)
      setPhoneVerified(data?.phone ? true: false)
    } else {
      history.replace('/app/dashboards/users/vendor/vendor-list')
    }
  }

  useEffect(() => {
    if (mode === EDIT) {
      fetchVendorById()
    }
  }, [form, mode, param, props])

  const propsDisplayImages = {
    multiple: false,
    beforeUpload: beforeUploadDisplayImages,
    onRemove: onRemoveDisplayImages,
    onChange: onChangeDisplayImages,
    fileList: fileListDisplayImages,
  }

  useEffect(() => {
    setDisplayImage(fileListDisplayImages)
  }, [fileListDisplayImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')

        const sendingValues = {
          firstName: values.firstName,
          lastName: values.lastName,
          tanNumber: values.tanNumber,
          pan: values.pan,
          gst: values.gst,
          drugLicense:values.drugLicense,
          address: {
            line1: values['address.line1'],
            city: values['address.city'],
            state: values['address.state'],
            country: values['address.country'],
            phone: values['address.phone'],
            zipcode: values['address.zipcode'],
          },
          business: {
            name: values['business.name'],
            address: {
              line1: values['business.address.line1'],
              city: values['business.address.city'],
              state: values['business.address.state'],
              country: values['business.address.country'],
              phone: values['business.address.phone'],
              zipcode: values['business.address.zipcode'],
            },
          },
        }

        if (JSON.stringify(sendingValues.address) === '{}') {
          delete sendingValues.address
        }

        if (JSON.stringify(sendingValues.business) === '{}') {
          delete sendingValues.business
        } else if (JSON.stringify(sendingValues.business.address) === '{}') {
          if (sendingValues.business.name) {
            delete sendingValues.business.address
          } else {
            delete sendingValues.business
          }
        }
        if (displayImage.length !== 0 && displayImage !== null) {
          const displayImageValue = await singleImageUploader(
            displayImage[0].originFileObj,
            displayImage,
            displayImage[0].url,
            'profile'
          )
          sendingValues.displayImage = displayImageValue
          console.log('upload',sendingValues.displayImage)
        } else {
          sendingValues.displayImage = null
        }
        if (mode === ADD) {
          
            sendingValues.phone = values.phone
            sendingValues.password= values.password
            sendingValues.email=values.email
            sendingValues.emailVerified=values.emailVerified
            sendingValues.status=values.status
          
        
          const created = await vendorService.addVendor(sendingValues)
          if (created) {
            message.success(`Created Vendor Success`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          console.log(sendingValues, 'heyyyy', values)
          // if (displayImage.length !== 0 && displayImage !== null) {
          //   const displayImageValue = await singleImageUploader(
          //     displayImage[0].originFileObj,
          //     displayImage,
          //     displayImage[0].url,
          //     'profile'
          //   )
          //   sendingValues.displayImage = displayImageValue
          // } else {
          //   sendingValues.displayImage = null
          // }

          const edited = await vendorService.editVendor(param.id, sendingValues)
          if (edited) {
            message.success(`Edited ${values.firstName} to Vendor list`)
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
                {mode === 'ADD' ? 'Add Vendor' : `Edit Vendor`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/users/vendor/vendor-list')
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
                propsDisplayImages={propsDisplayImages}
                form={form} mode={mode} emailVerified={emailVerified} phoneVerified={phoneVerified}
              />
            </TabPane>
            {/* <TabPane tab="PickUpLocations" key="2">
              <ViewPickupLocations pickupLocations={pickupLocations} selectedVendorId={selectedVendorId} refetchData={fetchVendorById}/>
            </TabPane> */}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
