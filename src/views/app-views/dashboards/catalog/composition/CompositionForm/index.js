import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import compositionService from 'services/composition'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const CompositionForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [editorName, setEditorName] = useState('')

  useEffect(() => {
    if (mode === EDIT) {
      const fetchCompositionById = async () => {
        const { id } = param
        const data = await compositionService.getCompositionById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
          })
          setEditorName(data.name)
        } else {
          history.replace('/app/dashboards/users/composition/composition-list')
        }
      }

      fetchCompositionById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        setSubmitLoading(false)
        if (mode === ADD) {
          const created = await compositionService.createComposition(values)
          if (created) {
            message.success(`Created ${values.name} to Composition list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await compositionService.editComposition(
            param.id,
            values
          )
          if (edited) {
            message.success(`Edited ${values.name} to Composition list`)
            history.goBack()
          }
        }
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
                {mode === 'ADD'
                  ? 'Add New Composition Type'
                  : `Edit Composition Type`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/composition/composition-list'
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
              <GeneralField />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default CompositionForm
