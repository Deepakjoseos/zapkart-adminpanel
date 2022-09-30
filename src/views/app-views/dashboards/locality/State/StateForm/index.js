import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import stateService from 'services/state'
import { useHistory } from 'react-router-dom'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import Utils from 'utils'
import countryService from 'services/country'
import constantsService from 'services/constants'




const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const StateForm = (props) => {
  const { mode = ADD, param } = props
  

  const history = useHistory()

  const [form] = Form.useForm()
   // For Image Upload
   
   const [submitLoading, setSubmitLoading] = useState(false)
   const [state ,setState]=useState([])

   const [form_statuses,setStatuses] = useState([])
   const [countries,setCountries] =useState([])
   
   
   
   
   const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
 
const getCountry = async () => {
  const data = await countryService.getCountry()
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
  getCountry()
  fetchConstants()
}, [])


  
  useEffect(() => {
    
    if (mode === EDIT) {
      const fetchStateById = async () => {
        const data = await stateService.getStateById(param.id)
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
            priority:data.priority,
            status: data.status,
            countryId:data.countryId

          })
        } else {
          history.replace(
            '/app/dashboards/locality/state/statelist'
          )
        }
      }

      fetchStateById()
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
      
            const created = await stateService.createState(values)
            if (created) {
              message.success(`Created ${values.name} to Statelist`)
              history.goBack()
            }
          }
        
        
        if (mode === EDIT) {
          // Checking if image exists
          
            // We will upload image to S3 and get the image url
            

            //  append image url to values object
            

            const edited = await stateService.editState(param.id,values)
            if (edited) {
              message.success(`Edited ${values.name} to State list`)
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
                  ? 'Add New State'
                  : `Edit State`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/locality/state/statelist'
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
              
              state={state} countries={countries}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default StateForm
