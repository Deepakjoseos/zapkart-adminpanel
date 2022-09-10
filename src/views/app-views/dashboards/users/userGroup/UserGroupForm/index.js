import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import userGroupService from 'services/userGroup'
import { useHistory } from 'react-router-dom'
import constantsService from 'services/constants'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [statuses,setStatuses] = useState([])
  

 const fetchConstants = async () => {
  const data = await constantsService.getConstants()
  if (data) {
    // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

    setStatuses(Object.values(data.GENERAL['STATUS']))

  }
}

  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchUserGroupById = async () => {
        const { id } = param
        const data = await userGroupService.getUserGroupById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            type: data.type,
          })
        } else {
          history.replace('/app/dashboards/users/usergroup/usergroup-list')
        }
      }

      fetchUserGroupById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          const created = await userGroupService.createUserGroup(values)
          if (created) {
            message.success(`Created ${values.name} to User Group list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await userGroupService.editUserGroup(param.id, values)
          if (edited) {
            message.success(`Edited ${values.name} to User Group list`)
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
                {mode === 'ADD' ? 'Add New UserGroup' : `Edit UserGroup`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/usergroup/usergroup-list'
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
              <GeneralField statuses={statuses}/>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
