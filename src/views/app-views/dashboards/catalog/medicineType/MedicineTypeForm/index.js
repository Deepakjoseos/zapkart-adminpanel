import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import medicineTypeService from 'services/medicineType'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    if (mode === EDIT) {
      const fetchMedicineTypeById = async () => {
        const { id } = param
        const data = await medicineTypeService.getMedicineTypeById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
          })
        } else {
          history.replace(
            '/app/dashboards/users/medicinetype/medicinetype-list'
          )
        }
      }

      fetchMedicineTypeById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        setSubmitLoading(false)
        if (mode === ADD) {
          const created = await medicineTypeService.createMedicineType(values)
          if (created) {
            message.success(`Created ${values.name} to Medicine Type list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await medicineTypeService.editMedicineType(
            param.id,
            values
          )
          if (edited) {
            message.success(`Edited ${values.name} to Medicine Type list`)
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
                  ? 'Add New Medicine Type'
                  : `Edit Medicine Type`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/medicinetype/medicinetype-list'
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

export default ProductForm
