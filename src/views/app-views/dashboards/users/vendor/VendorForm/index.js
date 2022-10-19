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
import constantsService from 'services/constants'
import userGroupService from 'services/userGroup'
import VendorTransactions from './vendorTransactions'
import walletService from 'services/Wallet'
import BankAccount from './bankAccount'
import { useSelector } from 'react-redux'
import Documents from './documents'

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
  const { mode = ADD, param } = props
  const id = param?.id

  const history = useHistory()

  const [form] = Form.useForm()
  const [displayImage, setDisplayImage] = useState(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const[pickupLocation,setPickUpLocation] = useState(null)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [form_statuses,setStatuses] = useState([])
  const [groupList,setGroupList] = useState([])
  const [transactions,setTransactions] = useState([])
  const [verifytradelicense,setverifytradelicense] = useState([])
  const [verifyemiratesID,setverifyemiratesID] = useState([])
  const [verifysignedContractCopy,setverifysignedContractCopy] = useState([])
  const [verifypassportOrVisa,setverifypassportOrVisa] = useState([])
  const [verifyvatTrnCertificate,setverifyvatTrnCertificate] = useState([])
  const [uploadDocument,setUploadDocument] = useState([])
  const [tradelicense,setUploadtradelicense] = useState([])
  const [uploademiratesID,setUploademiratesID] = useState([])
  const [signedContractCopy,setUploadsignedContractCopy] = useState([])
  const [DisplaypassportOrVisa,setDisplaypassportOrVisa] = useState([])
  const [DisplayvatTrnCertificate,setDisplayvatTrnCertificate] = useState([])
  
  const [wallet,setWallet] = useState({})
  const[selectedVendorId,setSelectedVendorId] =useState(null)
  const { imageCategories } = useSelector((state) => state.auth)
  
  const {
    fileList: fileListDisplaytradelicense,
    beforeUpload: beforeUploadDisplaytradelicense,
    onChange: onChangeDisplaytradelicense,
    onRemove: onRemoveDisplaytradelicense,
    setFileList: setFileListDisplaytradelicense,
  } = useUpload(1)


  const {
    fileList: fileListDisplaysignedContractCopy,
    beforeUpload: beforeUploadDisplaysignedContractCopy,
    onChange: onChangeDisplaysignedContractCopy,
    onRemove: onRemoveDisplaysignedContractCopy,
    setFileList: setFileListDisplaysignedContractCopy,
  } = useUpload(1)
  const {
    fileList: fileListDisplayemiratesID,
    beforeUpload: beforeUploadDisplayemiratesID,
    onChange: onChangeDisplayemiratesID,
    onRemove: onRemoveDisplayemiratesID,
    setFileList: setFileListDisplayemiratesID,
  } = useUpload(1)
    const {
    fileList: fileListDisplaypassportOrVisa,
    beforeUpload: beforeUploadDisplaypassportOrVisa,
    onChange: onChangeDisplaypassportOrVisa,
    onRemove: onRemoveDisplaypassportOrVisa,
    setFileList: setFileListDisplaypassportOrVisa,
  } = useUpload(1)
  const {
    fileList: fileListDisplayvatTrnCertificate,
    beforeUpload: beforeUploadDisplayvatTrnCertificate,
    onChange: onChangeDisplayvatTrnCertificate,
    onRemove: onRemoveDisplayvatTrnCertificate,
    setFileList: setFileListDisplayvatTrnCertificate,
  } = useUpload(1)


 
  



   const {
     fileList: fileListDisplayImages,
     beforeUpload: beforeUploadDisplayImages,
     onChange: onChangeDisplayImages,
     onRemove: onRemoveDisplayImages,
     setFileList: setFileListDisplayImages,
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
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
  const getTransactions = async() =>{
   const data= await walletService.getTransactions({userId:id})
   if(data){
    setTransactions(data)
   }
   console.log('trans',data)
  }
  const getWallet = async() =>{
    const data= await walletService.getVendorWallet(id)
    if(data){
     setWallet(data)
    }
    console.log('trans',data)
   }
  useEffect(()=>{
    getTransactions()
    if(id){ getWallet()}
   
   fetchConstants()
   getUserGroups()
  },[id])




  const fetchVendorById = async () => {
    const { id } = param
    // console.log('id_vendor',param.id)
    const data = await vendorService.getVendorById(id)
    if (data) {
     setSelectedVendorId(data.id)
     console.log('datavendorid',data)
      setPickUpLocation(data.pickupLocations)
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
        groups: data?.groups.map((cur)=> cur.id),


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




  const verifyDocuments = async() =>{
    const data= await vendorService.verifyDocuments(id)
    if(data){
      setverifytradelicense(data?.tradelicense ? true: false)
    }
    console.log('trans',data)
    if(data){
      setverifyemiratesID(data?.emiratesID? true: false)
    }
    console.log('trans',data)
    if(data){
      setverifysignedContractCopy(data?.signedContractCopy ? true: false)
    }
    console.log('trans',data)
    if(data){
      setverifypassportOrVisa(data?.passportOrVisa ? true: false)
    }
    console.log('trans',data)
    if(data){
      setverifyvatTrnCertificate(data?.vatTrnCertificate ? true: false)
    }
    console.log('trans',data)
   }
   
  useEffect(()=>{
  verifyDocuments()
  },[id])

  // const uploadDocuments = async() =>{
  //   const data= await vendorService.uploadDocuments(id)
  //   if(data){
  //    setUploadDocument(DataTransfer)
  //   }
  //   console.log('trans',data)
  //  }
  // useEffect(()=>{
 
   
  // uploadDocuments()
  // },[id])

  const propsUploadtradelicense = {
    multiple: false,
    beforeUpload: beforeUploadDisplaytradelicense,
    onRemove: onRemoveDisplaytradelicense,
    onChange: onChangeDisplaytradelicense,
    fileList: fileListDisplaytradelicense,
  }

  useEffect(() => {
    setUploadDocument(fileListDisplaytradelicense)
  }, [fileListDisplaytradelicense])


  const propsUploademiratesID = {
    multiple: false,
    beforeUpload: beforeUploadDisplayemiratesID,
    onRemove: onRemoveDisplayemiratesID,
    onChange: onChangeDisplayemiratesID,
    fileList: fileListDisplayemiratesID,
  }

  useEffect(() => {
    setUploademiratesID(fileListDisplayemiratesID)
  }, [fileListDisplayemiratesID])


  const propssignedContractCopy = {
    multiple: false,
    beforeUpload: beforeUploadDisplaysignedContractCopy,
    onRemove: onRemoveDisplaysignedContractCopy,
    onChange: onChangeDisplaysignedContractCopy,
    fileList: fileListDisplaysignedContractCopy,
  }

  useEffect(() => {
    setUploadsignedContractCopy(fileListDisplaysignedContractCopy)
  }, [fileListDisplaysignedContractCopy])
  


  const propsDisplaypassportOrVisa = {
    multiple: false,
    beforeUpload: beforeUploadDisplaypassportOrVisa,
    onRemove: onRemoveDisplaypassportOrVisa,
    onChange: onChangeDisplaypassportOrVisa,
    fileList: fileListDisplaypassportOrVisa,
  }

  useEffect(() => {
    setDisplaypassportOrVisa(fileListDisplaypassportOrVisa)
  }, [fileListDisplaypassportOrVisa])


  const propsDisplayvatTrnCertificate = {
    multiple: false,
    beforeUpload: beforeUploadDisplayvatTrnCertificate,
    onRemove: onRemoveDisplayvatTrnCertificate,
    onChange: onChangeDisplayvatTrnCertificate,
    fileList: fileListDisplayvatTrnCertificate,
  }

  useEffect(() => {
    setDisplayvatTrnCertificate(fileListDisplayvatTrnCertificate)
  }, [fileListDisplayvatTrnCertificate])





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
          groups:values.groups,
          tradelicense:values.tradeliscense,
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
          console.log('upload',sendingValues.displayImage)
        } else {
          sendingValues.displayImage = null
        }
        if (mode === ADD) {
          
            sendingValues.phone = values.phone
            sendingValues.password= values.password
            sendingValues.email=values.email
            sendingValues.emailVerified=values.emailVerified
            sendingValues.tradelicense=values.tradelicense
            sendingValues.emiratesID=values.emiratesID
            sendingValues.signedContractCopy=values.signedContractCopy
            sendingValues.passportOrVisa=values.passportOrVisa
            sendingValues.vatTrnCertificate=values.vatTrnCertificate
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
               form_statuses={form_statuses} userGroups={groupList}
              />
            </TabPane>
            {id && (
              <>
            <TabPane tab="Transactions" key="2">
           <VendorTransactions selectedVendorId={selectedVendorId} transactions={transactions} wallet={wallet} />
            </TabPane>
            <TabPane tab="Bank Accounts" key="3">
               <BankAccount selectedVendorId={selectedVendorId}/>
            </TabPane>
            <TabPane tab="Document Upload" key="4">
               <Documents  verifytradelicense={verifytradelicense} propsUploadtradelicense={propsUploadtradelicense}
               propssignedContractCopy={propssignedContractCopy} propsDisplaypassportOrVisa={propsDisplaypassportOrVisa}
               propsDisplayvatTrnCertificate={propsDisplayvatTrnCertificate}
               verifyemiratesID={verifyemiratesID}  verifysignedContractCopy={verifysignedContractCopy } verifypassportOrVisa={verifypassportOrVisa}
               verifyvatTrnCertificate={verifyvatTrnCertificate}

               mode={mode} propsUploademiratesID={propsUploademiratesID}/>
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
