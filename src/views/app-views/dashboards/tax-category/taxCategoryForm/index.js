/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
// import GeneralField from '../GeneralField'
import GeneralField from '../taxCategoryForm/GeneralField'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import informationService from 'services/information'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'

import { get } from 'lodash'
import { useSelector } from 'react-redux'
import taxCategoryService from 'services/TaxCategory'
import constantsService from 'services/constants'
// import Registrations from '../../registration/list-registration/index'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const TaxCategoryForm = (props) => {
    const { mode = ADD, param } = props
    const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [subAdmins, setSubAdmins] = useState([])
  const [participants, setParticipants] = useState([])
  const [clients, setClients] = useState([])
  const [isEmployee, setIsEmployee] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [currentParticipant,setCurrentParticipant] = useState()
  const [registrations,setRegistrations]= useState([])
  const [statuses,setStatuses]= useState([])
  const[sameStateValues,setSameStateValues] = useState([])
  

  useEffect(() => {
   console.log('mode',mode)
   const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))
      setSameStateValues(Object.values(data.TAX_CATEGORY['SAME_STATE']))

    }
  }
  fetchConstants()
    if (mode === EDIT) {

      const fetchTaxCategoryById = async () => {
        const { id } = param
        const data = await taxCategoryService.getTaxCAtegoryById(id)
        // setCursetrentParticipant(data)
        if (data) {
        
          form.setFieldsValue({
            status: data.status,
            name: data.name,
            taxes: data.taxes,
            priority: data.priority,
       
            

          })

     
        } else {
          history.replace('/app/dashboards/user/user-list')
        }
      }

      fetchTaxCategoryById()
    }
  }, [form, mode, param, props])

  console.log(user, 'sendingValues')

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'valuewewes')

        const sendingValues = {
          status: values?.status,
          name:values?.name,
          taxes:values?.taxes,
          priority:values?.priority,
       
 
    
      
        }

        if (window.localStorage.getItem('auth_type') === 'SubAdmin')
          sendingValues.relationshipManagerId = user._id

        console.log(sendingValues, 'sendingValues', user._id)

        if (mode === ADD) {
          const created = await taxCategoryService.createTaxCategory(
            sendingValues
          )
          if (created) {
            message.success(`Created an item  to Tax category list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await taxCategoryService.editTaxCategory(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited an item tax category list`)
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
            status:'Hold',
            taxes: [
              {
                type: '',
                percent: '',
                sameState:''
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
                {mode === 'ADD' ? 'Add New Tax Category' : `Edit Tax Category`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/tax-category/tax-category-list')
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
              <GeneralField
                
                mode={mode} statuses={statuses} sameStateValues={sameStateValues}
           
              />
            </TabPane>
           
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default TaxCategoryForm
