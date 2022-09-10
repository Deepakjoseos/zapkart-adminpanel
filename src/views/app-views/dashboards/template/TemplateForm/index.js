import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import templateService from 'services/template'
import { useHistory } from 'react-router-dom'
import constantsService from 'services/constants'
import { PresetStatusColorTypes } from 'antd/lib/_util/colors'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const TemplateForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [tempConstants, setTempConstants] = useState({})
  const [editorRender, setEditorRender] = useState(false)
  const[statuses,setStatuses] = useState([])

  useEffect(() => {
    const fetchConstants = async () => {
      const data = await constantsService.getConstants()
      if (data) {
        setTempConstants(data.TEMPLATE)
        setStatuses(Object.values(data.GENERAL['STATUS']))
      }
    }

    fetchConstants()
  }, [])
  if (tempConstants?.KEYS) {
    console.log(Object.values(tempConstants['KEYS']), 'constanttyys')
  }
  useEffect(() => {
    if (mode === EDIT) {
      const fetchTemplateById = async () => {
        const { id } = param
        const data = await templateService.getTemplateById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            listingType: data.listingType,
            emailSubject: data.email.subject,
            emailContent: data.email.content,

            smsTemplateId: data.sms.templateId,
            smsContent: data.sms.content,

            fcmTitle: data.fcm.title,
            fcmDescription: data.fcm.description,
          })
          setEditorRender(true)
        } else {
          history.replace('/app/dashboards/template/template-list')
        }
      }

      fetchTemplateById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values.name,
          listingType: values.listingType,
          email: {
            subject: values.emailSubject,
            content: values.emailContent,
          },
          sms: {
            templateId: values.smsTemplateId,
            content: values.smsContent,
          },
          fcm: {
            title: values.fcmTitle,
            description: values.fcmDescription,
          },
          status: values.status,
        }

        if (mode === ADD) {
          const created = await templateService.createTemplate(sendingValues)
          if (created) {
            message.success(`Created ${values.name} to Template list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await templateService.editTemplate(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Template list`)
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
                {mode === 'ADD' ? 'Add New Template' : `Edit Template`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/template/template-list')
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
              <GeneralField tempConstants={tempConstants} form={form}  statusess={PresetStatusColorTypes}/>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default TemplateForm
