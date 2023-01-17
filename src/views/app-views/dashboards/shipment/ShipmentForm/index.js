import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import shipmentService from 'services/shipment'
import { useHistory } from 'react-router-dom'
import Shipment from '..'
import moment from 'moment'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ShipmentForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()

  const [submitLoading, setSubmitLoading] = useState(false)

  // useEffect(() => {
  //   if (mode === EDIT) {
  //     const fetchBrandById = async () => {
  //       const { id } = param
  //       const data = await shipmentService.getBrandById(id)
  //       if (data) {
  //         // For Image upload
  //         let himg = []
  //         if (data.image) {
  //           himg = [
  //             {
  //               uid: Math.random() * 1000,
  //               name: Utils.getBaseName(data.image),
  //               url: data.image,
  //               thumbUrl: data.image,
  //             },
  //           ]

  //           setImage(himg)
  //           setFileListImages(himg)
  //         }
  //         // For setting form values when Load if it is in EDIT mode
  //         form.setFieldsValue({
  //           name: data.name,
  //           status: data.status,
  //           priority: data.priority,
  //         })
  //       } else {
  //         history.replace('/app/dashboards/catalog/brand/brands-list')
  //       }
  //     }

  //     fetchBrandById()
  //   }
  // }, [form, mode, param, props])

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true)

    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          shippedBy: values.shippedByVendor,
          items: values.items,
          expectedDeliveryDate: moment(values.expectedDeliveryDate).format(
            'YYYY-MM-DD'
          ),
          shipRocket: {
            pickup_location: values.pickup_location,
            length: values.length,
            breadth: values.breadth,
            height: values.height,
            weight: values.weight,
          },
        }

        if (mode === ADD) {
          const created = await shipmentService.createShipment(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Shipment list`)
            history.goBack()
          }
        }
        // if (mode === EDIT) {
        //   // Checking if image exists
        //   if (uploadedImg.length !== 0 && uploadedImg !== null) {
        //     console.log('uploadedImg', uploadedImg)
        //     // We will upload image to S3 and get the image url
        //     const imgValue = await singleImageUploader(
        //       uploadedImg[0].originFileObj,
        //       uploadedImg,
        //       uploadedImg[0].url,
        //       'brand'
        //     )

        //     //  append image url to values object
        //     values.image = imgValue

        //     const edited = await brandService.editBrand(param.id, values)
        //     if (edited) {
        //       message.success(`Edited ${values.name} to Brand list`)
        //       history.goBack()
        //     }
        //   } else {
        //     message.error('Please upload image')
        //   }
        // }
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
          items: [
            {
              orderId: '',
              itemIds: [],
            },
          ],
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
                {mode === 'ADD' ? 'Add New Shipment' : `Edit Shipment`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/shipment/shipment-list')
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
              <GeneralField form={form} />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ShipmentForm
