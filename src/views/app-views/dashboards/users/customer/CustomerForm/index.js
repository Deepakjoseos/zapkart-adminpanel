import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import Cart from '../customer-list/cart'
import Reviews from '../customer-list/Reviews'
import {
  multipleImageUpload,
  singleImageUploader,
} from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import customerService from 'services/customer'
import ViewAddresses from '../customer-list/ViewAddresses'
import ViewPrescriptions from '../customer-list/ViewPrescriptions'
import userGroupService from 'services/userGroup'
import ViewOrders from '../customer-list/ViewOrders'
import constantsService from 'services/constants'
import { useSelector } from 'react-redux'

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
  const [addressList, setAddressList] = useState(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [customers, setCustomers] = useState([])
  const [selectedPrescriptionCustomerId, setSelectedPrescriptionCustomerId] =
    useState(null)
  const [userGroups, setUserGroups] = useState([])
  const [groupList, setGroupList] = useState([])
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [form_statuses, setStatuses] = useState([])
  const { imageCategories } = useSelector((state) => state.auth)

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
        (userGroups) => userGroups.type === 'Customer'
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
  useEffect(() => {
    getUserGroups()
    fetchConstants()
  }, [])

  const fetchCustomerById = async () => {
    const { id } = param

    const data = await customerService.getCustomerById(id)
    if (data) {
      setAddressList(data.address)
      setSelectedCustomerId(data?.id || id)
      setSelectedPrescriptionCustomerId(data?.id || id)
      // setGroupList(data.groups)
      let himg = []
      if (data.displayImage) {
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
        status: data?.status,
        password: data?.password,
        emailVerified: data?.emailVerified,
        groups: data?.groups.map((cur) => cur.id),
      })

      setEmailVerified(data?.emailVerified)
      setPhoneVerified(data?.phone ? true : false)
    } else {
      // history.replace('/app/dashboards/users/customer/customer-list')
    }
  }

  useEffect(() => {
    if (mode === EDIT) {
      fetchCustomerById()
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
          groups: values.groups,

          email: values.email,
          phone: values.phone,
          status: values.status,
          password: values.password,
          emailVerified: values.emailVerified,
        }

        if (mode === ADD) {
          const created = await customerService.addCustomer(sendingValues)
          if (created) {
            message.success(`Created Customer Success`)
            history.goBack()
          }
        }
        // console.log('mode', mode)
        if (mode === EDIT) {
          // Checking if image exists
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
          } else {
            sendingValues.displayImage = null
          }

          const edited = await customerService.editCustomer(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.firstName} to Customers list`)
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
                {mode === 'ADD' ? 'Add Customer' : `Edit Customer`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/users/customer/customer-list')
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
                mode={mode}
                userGroups={groupList}
                form={form}
                emailVerified={emailVerified}
                phoneVerified={phoneVerified}
                form_statuses={form_statuses}

// *************************************Edited***************************************************

                id = {id}                                       //Edit
                setPhoneVerified={setPhoneVerified}             //Edit

// *************************************Edited***************************************************

              />
            </TabPane>
            {id && (
              <>
                <TabPane tab="Address" key="2">
                  <ViewAddresses
                    addressList={addressList}
                    selectedCustomerId={selectedCustomerId}
                    refetchData={fetchCustomerById}
                  />
                </TabPane>
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <TabPane tab="Prescriptions" key="3">
                  <ViewPrescriptions
                    selectedPrescriptionCustomerId={
                      selectedPrescriptionCustomerId
                    }
                    setSelectedPrescriptionCustomerId={
                      setSelectedPrescriptionCustomerId
                    }
                  />
                </TabPane>
                )}
                <TabPane tab="Orders" key="4">
                  {/* <Orders
                    selectedPrescriptionCustomerId={selectedPrescriptionCustomerId}
                    setSelectedPrescriptionCustomerId={setSelectedPrescriptionCustomerId}
                  /> */}
                  <ViewOrders selectedCustomerId={selectedCustomerId} />
                </TabPane>
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <TabPane tab="Cart" key="5">
                  {/* <Orders
                    selectedPrescriptionCustomerId={selectedPrescriptionCustomerId}
                    setSelectedPrescriptionCustomerId={setSelectedPrescriptionCustomerId}
                  /> */}
                  <Cart selectedCustomerId={selectedCustomerId} />
                </TabPane>
                )}
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <TabPane tab="Reviews" key="6">
                  {/* <Orders
                    selectedPrescriptionCustomerId={selectedPrescriptionCustomerId}
                    setSelectedPrescriptionCustomerId={setSelectedPrescriptionCustomerId}
                  /> */}
                  <Reviews selectedCustomerId={selectedCustomerId} />
                </TabPane>
                )}
              </>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
