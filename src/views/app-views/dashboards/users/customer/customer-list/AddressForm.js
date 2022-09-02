import { Button, Card, Col, Form, Input, message, Modal, Row } from 'antd'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'

const AddressForm = ({
  formMode,
  setFormMode,
  selectedFormAddress,
  setSelectedFormAddress,
  viewFormModal,
  setViewFormModal,
  selectedCustomerId,
  refetchData,
}) => {
  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)

  const rules = {}

  useEffect(() => {
    if (formMode === 'edit') {
      selectedFormAddress && form.setFieldsValue(selectedFormAddress)
    } else {
      form.resetFields()
    }
  }, [formMode, selectedFormAddress])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')
        values.country = 'India'

        if (formMode === 'add') {
          const addAddress = await customerService.addAddress(
            selectedCustomerId,
            values
          )
          if (addAddress) {
            refetchData()
            setFormMode('add')
            setViewFormModal(false)
            form.resetFields()
          }
        } else {
          const editAddress = await customerService.editAddress(
            selectedCustomerId,
            selectedFormAddress.id,
            values
          )
          if (editAddress) {
            refetchData()
            setFormMode('add')
            setSelectedFormAddress({})
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
      title={formMode === 'add' ? 'Add Address' : 'Edit Address'}
      visible={viewFormModal}
      onCancel={() => {
        setViewFormModal(false)
        setSelectedFormAddress({})
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
            <Form.Item name="line1" label="Address" rules={rules.line1}>
                <Input.TextArea rows={4} placeholder="Address" />
              </Form.Item>
              <Form.Item name="city" label="City" rules={rules.city}>
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item name="state" label="State" rules={rules.state}>
                <Input placeholder="State" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={rules.phone}>
                <Input type="tel" placeholder="Phone" />
              </Form.Item>
              <Form.Item name="zipcode" label="Zipcode" rules={rules.zipcode}>
                <Input placeholder="Zipcode" />
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

export default AddressForm
