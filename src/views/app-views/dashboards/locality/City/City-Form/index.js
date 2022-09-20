import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './General-Field'
import stateService from 'services/state'
import { useHistory } from 'react-router-dom'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'

import constantsService from 'services/constants'
import cityService from 'services/city'
import districtService from 'services/district'



const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const CityForm = (props) => {
  const { mode = ADD, param } = props
  

  const history = useHistory()

  const [form] = Form.useForm()
   // For Image Upload
   
   const [submitLoading, setSubmitLoading] = useState(false)
   const [state ,setState]=useState([])

   const [form_statuses,setStatuses] = useState([])
   
   
   
   
   const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
//
const getDistrict = async () => {
  const data = await districtService.getDistrict()
  if (data) {
    if (mode === EDIT) {
   //   const deliveryLocs = data.filter(
   //     (cur) => cur.isFinal !== true && cur.id !== param.id
   //   )
   //   setDeliveryLocations(deliveryLocs)
   // } else {
   //   const deliveryLocs = data.filter((cur) => cur.isFinal !== true)
   //   setDeliveryLocations(deliveryLocs)
   // }
   const restCats = data.data.filter((cat) => cat.id !== param.id)
     const list = Utils.createCategoryList(restCats)
     setState(list)
   } else {
     const list = Utils.createCategoryList(data)
     setState(list)
   }
 }
}
  
 
useEffect(() => {
  getDistrict()
  fetchConstants()
}, [])


  
  useEffect(() => {
    
    if (mode === EDIT) {
      const fetchCityById = async () => {
       
        const data = await stateService.getCityById(param.id)
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
            name: data.name,
            status: data.status,
            cityId:data.cityId

          })
        } else {
          history.replace(
            '/app/dashboards/locality/city/city-list'
          )
        }
      }

      fetchCityById()
    }
  }, [form, mode, param, props])

    // Image Upload

//Image Upload
 

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
      
            const created = await cityService.createCity(values)
            if (created) {
              message.success(`Created ${values.name} to citylist`)
              history.goBack()
            }
          }
        
        
        if (mode === EDIT) {
            const edited = await cityService.editCity(param.id,values)
            if (edited) {
              message.success(`Edited ${values.name} to city list`)
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
                  ? 'Add New City'
                  : `Edit City`}
                  {' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/locality/city/city-list'
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
               form={form}
              
              state={state}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default CityForm
