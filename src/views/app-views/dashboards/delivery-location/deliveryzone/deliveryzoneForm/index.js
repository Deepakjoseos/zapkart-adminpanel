import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import deliveryLocationService from 'services/deliveryLocation'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import deliveryLocation from 'services/deliveryZone'
import deliveryzoneService from 'services/deliveryZone'
import vendorService from 'services/vendor'
import userGroupService from 'services/userGroup'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const DeliveryZoneForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  const [deliveryLocations, setDeliveryLocations] = useState([])
  const [isFinalTrue, setIsFinalTrue] = useState(false)
  const [vendors,setVendors] = useState([])
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userGroups,setUserGroups]=useState([])
  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map(cur => {
        return {
          ...cur, fullName: `${cur.firstName} ${cur.lastName}`
        }
      })
      setVendors(vendorsList)
    }
  }

  // For selecting DELIVERY LOCATION PARENT
//   const getDeliveryZones = async () => {
//     const data = await deliveryzoneService.getDeliveryZones()
//     console.log(data, 'myyy-data')

//     if (data) {
//       if (mode === EDIT) {
//         const deliveryLocs = data.filter(
//           (cur) => cur.isFinal !== true && cur.id !== param.id
//         )
//         setDeliveryLocations(deliveryLocs)
//       } else {
//         const deliveryLocs = data.filter((cur) => cur.isFinal !== true)
//         setDeliveryLocations(deliveryLocs)
//       }
//     }
//   }



   useEffect(() => {
    getVendors()
   }, [])

  useEffect(() => {
    if (mode === EDIT) {
      const fetchDeliveryZOneById = async () => {
        const { id } = param
        const data = await deliveryzoneService.getDeliveryZoneById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            // vendorId:data.vendorId
            
          })
          setIsFinalTrue(data.isFinal)
        } else {
          history.replace(
            '/app/dashboards/deliverylocation/deliverylocation-list'
          )
        }
      }

      fetchDeliveryZOneById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          const created = await deliveryzoneService.createDeliveryZone(
            values,
            
          )
          if (created) {
            message.success(`Created ${values.name} to Delivery zones List`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await deliveryzoneService.editDeliveryZone(
            param.id,
            values
          )
          if (edited) {
            message.success(`Edited ${values.name} to Delivery zone list`)
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
          isFinal: false,
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
                  ? 'Add New Delivery Zone'
                  : `Edit Delivery Zone`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/deliverylocation/deliveryzone-list'
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
                form={form}
                vendors={vendors} 
                // isFinalTrue={isFinalTrue}
                // setIsFinalTrue={setIsFinalTrue}
                // deliveryLocations={deliveryLocations}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default DeliveryZoneForm
