import { Button, Card, Col, Form, Input, message, Modal, Row,Select } from 'antd'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import constantsService from 'services/constants'
import userGroupService from 'services/userGroup'
const {Option} = Select

const GroupForm = ({
  formMode,
  setFormMode,
  selectedGroupForm,
  setSelectedGroupForm,
  viewFormModal,
  setViewFormModal,
  selectedCustomerId,
  refetchData,
}) => {
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userType,setUserType] = useState([])

  const rules = {}

  useEffect(() => {
    if (formMode === 'edit') {
      selectedGroupForm && form.setFieldsValue(selectedGroupForm)
    } else {
      form.resetFields()
    }
    const fetchConstants = async () => {
      const data = await constantsService.getConstants()
      if (data) {
        // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
        setUserType( Object.values(data.USER['TYPES']))
      }
    }
    fetchConstants()
  }, [formMode, selectedGroupForm])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')
        values.country = 'India'

        if (formMode === 'add') {
          const addGroup = await userGroupService.createUserGroup(
            selectedCustomerId,
            values
          )
          if (addGroup) {
            refetchData()
            setFormMode('add')
            setViewFormModal(false)
            form.resetFields()
          }
        } else {
          const editGroup = await userGroupService.editUserGroup(
            selectedCustomerId,
            selectedGroupForm.id,
            values
          )
          if (editGroup) {
            refetchData()
            setFormMode('add')
            setSelectedGroupForm({})
            setViewFormModal(false)
            form.resetFields()
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
    <Modal
      title={formMode === 'add' ? 'Add Group' : 'Edit Group'}
      visible={viewFormModal}
      onCancel={() => {
        setViewFormModal(false)
        setSelectedGroupForm({})
      }}
      footer={false}
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
        }}
      >
        {/* <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {formMode === 'add' ? 'Add Address' : `Edit Address`}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() => {
                    setViewFormModal(false)
                    setSelectedFormAddress({})
                    setFormMode('add')
                  }}
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  //   onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {formMode === 'add' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt> */}

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            <Card>
              <Form.Item name="name" label="Name" rules={rules.city}>
                <Input placeholder="Name" />
              </Form.Item>
              
              <Form.Item
            name="type"
            label="User Type"
            rules={rules.weightClass}
          >
            
     
       
          <Select
            style={{ width: 150 }}
          >
            {userType?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        
    
          </Form.Item>
              <Form.Item name="status" label="Status" rules={rules.status}>
                    <Select placeholder="Status">
                        <Option value={true}>Active</Option>
                        <Option value={false}>Hold</Option>
                    </Select>
              </Form.Item>
              <Flex justifyContent="end">
                <Button
                  type="primary"
                  disabled={submitLoading}
                  onClick={onFinish}
                >
                  Submit
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default GroupForm
