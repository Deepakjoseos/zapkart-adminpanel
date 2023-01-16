import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message, notification } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import vendorService from 'services/vendor'
import ViewPickupLocations from '../vendor-list/ViewPickUpLocations'
import constantsService from 'services/constants'
import userGroupService from 'services/userGroup'
import VendorTransactions from './vendorTransactions'
import walletService from 'services/Wallet'
import BankAccount from './bankAccount'
import { useSelector } from 'react-redux'
import Documents from './documents'
import PickupLocations from '../VendorForm/pickuplocation'
import DocumentField from './DocumentField'

// const getAllPickUpLocations = async ()=>{
//   const data = await shipmentService.getAllPickUpLocations()
//   if(data){
//     setPickUpLocations(data)
//   }
//  }
// useEffect(()=>{
// getAllPickUpLocations()
// })
const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  const { mode = ADD, param } = props
  const id = param?.id

  const history = useHistory()

  const [form] = Form.useForm()
  const [displayImage, setDisplayImage] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [pickupLocation, setPickUpLocation] = useState(null)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [form_statuses, setStatuses] = useState([])
  const [groupList, setGroupList] = useState([])
  const [transactions, setTransactions] = useState([])
  const [logo, setLogo] = useState(null)
  const [documentData, setDocumentData] = useState([])

  const [wallet, setWallet] = useState({})
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const { imageCategories } = useSelector((state) => state.auth)

  const {
    fileList: fileListDisplayImages,
    beforeUpload: beforeUploadDisplayImages,
    onChange: onChangeDisplayImages,
    onRemove: onRemoveDisplayImages,
    setFileList: setFileListDisplayImages,
  } = useUpload(1)

  const {
    fileList: fileListLogo,
    beforeUpload: beforeUploadLogo,
    onChange: onChangeLogo,
    onRemove: onRemoveLogo,
    setFileList: setFileListLogo,
  } = useUpload(1)

  const getUserGroups = async () => {
    const data = await userGroupService.getUserGroups()
    if (data) {
      const availableUserGroups = data.filter(
        (userGroups) => userGroups.type === 'Vendor'
      )
      setGroupList(availableUserGroups)
    }
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {

      setStatuses(Object.values(data.USER['STATUS']))
    }
  }
  const getTransactions = async () => {
    const data = await walletService.getTransactions({ userId: id })
    if (data) {
      setTransactions(data)
    }
    // console.log('trans', data)
  }
  const getWallet = async () => {
    const data = await walletService.getVendorWallet(id)
    if (data) {
      setWallet(data)
    }
    // console.log('trans', data)
  }
  useEffect(() => {
    getTransactions()
    if (id) {
      getWallet()
    }

    fetchConstants()
    getUserGroups()
  }, [id])

  const fetchVendorById = async () => {
    const { id } = param
    // console.log('id_vendor',param.id)
    const data = await vendorService.getVendorById(id)
    if (data) {
      setSelectedVendorId(data.id)
      // console.log('datavendorid', data)
      setPickUpLocation(data.pickupLocations)
      let himg = []
      if (data?.displayImage) {
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

      if (data?.business?.logo) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(data?.business?.logo),
            url: data?.business?.logo,
            thumbUrl: data?.business?.logo,
          },
        ]
        setLogo(himg)
        setFileListLogo(himg)
      }

      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data?.email,
        phone: data?.phone,
        gst: data?.gst,
        tanNumber:data?.tanNumber,
        pan:data?.pan,
        drugLicense: data?.drugLicense,
        groups: data?.groups.map((cur) => cur.id),
        business: data?.business,
        emailSubscription: data?.emailSubscription,
        smsSubscription: data?.smsSubscription,
        status:data?.status,
       

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
        'business.address.logo': data?.business?.logo,
        'business.address.city': data?.business?.address?.city,
        'business.address.state': data?.business?.address?.state,
        'business.address.country': data?.business?.address?.country,
        'business.address.phone': data?.business?.address?.phone,
        'business.address.zipcode': data?.business?.address?.zipcode,
      })
      setEmailVerified(data?.emailVerified ? true : false)
      setPhoneVerified(data?.phone ? true : false)
      setDocumentData(data?.documents)
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

  const propsLogo = {
    multiple: false,
    beforeUpload: beforeUploadLogo,
    onRemove: onRemoveLogo,
    onChange: onChangeLogo,
    fileList: fileListLogo,
  }

  useEffect(() => {
    setLogo(fileListLogo)
  }, [fileListLogo])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        // console.log(values, 'values')

        const sendingValues = {
          firstName: values.firstName,
          lastName: values.lastName,
          tanNumber: values.tanNumber,
          name:values.name,
          pan: values.pan,
          gst: values.gst,
          drugLicense: values.drugLicense,
          groups: values.groups,
          emailSubscription: values.emailSubscription,
          smsSubscription: values.smsSubscription,

          
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
              logo: values['business.logo'],
              city: values['business.address.city'],
              state: values['business.address.state'],
              country: values['business.address.country'],
              phone: values['business.address.phone'],
              zipcode: values['business.address.zipcode'],
            },
          },
        }

        // if (SITE_NAME !== 'zapkart') {
        //   delete sendingValues.drugLicense
        //   delete sendingValues.gst
        //   delete sendingValues.pan
        // }

        // if (JSON.stringify(sendingValues.address) === '{}') {
        //   delete sendingValues.address
        // }

        // if (JSON.stringify(sendingValues.business) === '{}') {
        //   delete sendingValues.business
        // } else if (JSON.stringify(sendingValues.business.address) === '{}') {
        //   if (sendingValues.business.name) {
        //     delete sendingValues.business.address
        //   } else {
        //     delete sendingValues.business
        //   }
        // }

        // This is for vendor profile photo
        if (displayImage.length !== 0 && displayImage !== null) {
          const imageCategory = imageCategories.find(
            (imgCat) => imgCat.imageFor === 'Users'
          )
          const displayImageValue = await singleImageUploader(
            displayImage[0].originFileObj,
            displayImage,
            displayImage[0].url,
            imageCategory.id
          )
          sendingValues.displayImage = displayImageValue
          // console.log('upload', sendingValues.displayImage)
        } else {
          delete sendingValues.displayImage
        }

        // This is for vendor company logo
        if (logo.length !== 0 && logo !== null) {
          const imageCategory = imageCategories.find(
            (imgCat) => imgCat.imageFor === 'Users'
          )
          const logoValue = await singleImageUploader(
            logo[0].originFileObj,
            logo,
            logo[0].url,
            imageCategory.id
          )
          if (sendingValues?.business) {
            sendingValues.business['logo'] = logoValue
          } else {
            notification.warn({
              message: 'Please fill out Bussiness Name to Save Logo',
            })
          }

          // console.log('upload', logoValue)
        } else {
          delete sendingValues.business.logo
        }

        if (mode === ADD) {
          sendingValues.phone = values.phone
          sendingValues.password = values.password
          sendingValues.email = values.email
          sendingValues.emailVerified = values.emailVerified
          sendingValues.business = values.business
          sendingValues.status = values.status

          const created = await vendorService.addVendor(sendingValues)
          if (created) {
            message.success(`Created Vendor Success`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          // console.log(sendingValues, 'heyyyy', values)
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
            message.success(`Edited  to Vendor list`)
            history.goBack()
          }
        }
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
          status: 'Blocked',
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
                propsLogo={propsLogo}
                form={form}
                mode={mode}
                emailVerified={emailVerified}
                phoneVerified={phoneVerified}
                form_statuses={form_statuses}
                userGroups={groupList}
/* *********************************EDIT****************************************** */

                id = {id}
                setPhoneVerified={setPhoneVerified}


/* *********************************EDIT****************************************** */
              />
            </TabPane>
            {id && (
              <>
                <TabPane tab="Transactions" key="2">
                  <VendorTransactions
                    selectedVendorId={selectedVendorId}
                    transactions={transactions}
                    wallet={wallet}
                  />
                </TabPane>
                <TabPane tab="Bank Accounts" key="3">
                  <BankAccount selectedVendorId={selectedVendorId} />
                </TabPane>
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                  <TabPane tab="Pickuplocation" key="4">
                    <PickupLocations selectedVendorId={selectedVendorId} />
                  </TabPane>
                )}
                {process.env.REACT_APP_SITE_NAME === 'athathy' && (
                  <TabPane tab="Document Upload" key="4">
                    <Documents />
                  </TabPane>
                )}
                <TabPane tab="Documents" key="5">
                  <DocumentField 
                    documentData={documentData}
                    refreshData = {fetchVendorById}
                  />
                </TabPane>
              </>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
