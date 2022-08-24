import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import useUpload from 'hooks/useUpload'
import {
  multipleImageUpload,
  singleImageUploader,
} from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import customerService from 'services/customer'
import AddressList from '../address'
import ViewAddresses from '../customer-list/ViewAddresses'
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
  const [addressList,setAddressList] = useState(null)

  const {
    fileList: fileListDisplayImages,
    beforeUpload: beforeUploadDisplayImages,
    onChange: onChangeDisplayImages,
    onRemove: onRemoveDisplayImages,
    setFileList: setFileListDisplayImages,
  } = useUpload(1)

  const fetchCustomerById = async () => {
    const { id } = param
    const data = await customerService.getCustomerById(id)
    if (data) {
      setAddressList(data.address)
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
      })
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
        }

        if (mode === ADD) {
          //
        }
        if (mode === EDIT) {
          // Checking if image exists
          if (displayImage.length !== 0 && displayImage !== null) {
            const displayImageValue = await singleImageUploader(
              displayImage[0].originFileObj,
              displayImage,
              displayImage[0].url,
              'profile'
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
              <GeneralField propsDisplayImages={propsDisplayImages} />
            </TabPane>
            {id && (
              <TabPane tab="Address" key="2">
                <ViewAddresses 
                 
                  addressList={addressList}
                />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
