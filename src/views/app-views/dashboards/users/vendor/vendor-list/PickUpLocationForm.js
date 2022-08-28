import { Button, Card, Col, Form, Input, message, Modal, Row ,InputNumber} from 'antd'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import vendorService from 'services/vendor'

const PickupLocationForm = ({
    formMode,
    setFormMode,
    selectedFormPickupLocation,
    setSelectedFormPickupLocation,
    viewFormModal,
    setViewFormModal,
    selectedVendorId,
    refetchData,
}) => {
    const [form] = Form.useForm()
    const [submitLoading, setSubmitLoading] = useState(false)

    const rules = {}

    useEffect(() => {
        if (formMode === 'edit') {
            selectedFormPickupLocation && form.setFieldsValue(selectedFormPickupLocation)
        } else {
            form.resetFields()
        }
    }, [formMode, selectedFormPickupLocation])

    const onFinish = async () => {
        setSubmitLoading(true)
        form
            .validateFields()
            .then(async (values) => {
                console.log(values, 'values')
                // values.country = 'India'

                if (formMode === 'add') {
                    //   const addAddress = await customerService.addAddress(
                    const addPickupLocation = await vendorService.addPickupLocation(
                        selectedVendorId,
                        values
                    )
                    if (addPickupLocation) {
                        refetchData()
                        setFormMode('add')
                        setViewFormModal(false)
                        form.resetFields()
                    }
                } else {
                    const editAddress = await customerService.editAddress(
                        selectedVendorId,
                        selectedFormPickupLocation.id,
                        values
                    )
                    if (editAddress) {
                        refetchData()
                        setFormMode('add')
                        setSelectedFormPickupLocation({})
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
            title={formMode === 'add' ? 'Add PickUpLocation' : 'Edit Address'}
            visible={viewFormModal}
            onCancel={() => {
                setViewFormModal(false)
                setSelectedFormPickupLocation({})
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
                            <Form.Item name="email" label="Email" rules={rules.state}>
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item name="phone" label="Phone" rules={rules.phone}>
                                <Input type="tel" placeholder="Phone" />
                            </Form.Item>
                            <Form.Item name="address" label="Address" rules={rules.zipcode}>
                                <Input placeholder="Address" />
                            </Form.Item>
                            <Form.Item name="address_2" label="Address2" rules={rules.zipcode}>
                                <Input placeholder="Address2 " />
                            </Form.Item>
                            <Form.Item name="city" label="City" rules={rules.line1}>
                                <Input placeholder="City" />
                            </Form.Item>
                            <Form.Item name="state" label="State" rules={rules.line1}>
                                <Input placeholder="State" />
                            </Form.Item>
                        
                            <Form.Item name="country" label="Country" rules={rules.line1}>
                                <Input placeholder="Country" />
                            </Form.Item>
                            <Form.Item name="pin_code" label="Pin Code">
                                <InputNumber placeholder="Pin Code" min={0} max={100000} />
                                <Form.Item name="lat" label="Latitude" rules={rules.priority}>
                                    <InputNumber placeholder="Latitude" min={0} max={100000} />
                                </Form.Item>
                                <Form.Item name="long" label="Longitude" rules={rules.priority}>
                                    <InputNumber placeholder="Longitude" min={0} max={100000} />
                                </Form.Item>

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

export default PickupLocationForm
