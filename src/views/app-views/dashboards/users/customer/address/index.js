import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Image,
  Button,
  Drawer,
  notification,
} from 'antd'

import Flex from 'components/shared-components/Flex'

import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'

import { useParams } from 'react-router-dom'

import AddressForm from './addressForm'
import customerService from 'services/customer'

const AddressList = ({ addressList, refreshData }) => {
//   const propsVariantImages = []
  const [openAddressForm, setOpenAddressForm] = useState(false)
   const [selectedAddress, setSelectedAddress] = useState(null)

  const { id } = useParams()

  const [form] = Form.useForm()

  console.log(addressList, 'addressList')

  const onEditClick = (address) => {
    setSelectedAddress(address)
    setOpenAddressForm(true)
  }
  const onDeleteAddress = async (addressId) => {
    const deleted = await customerService.deleteAddress(id, addressId)

    if (deleted) {
      notification.success({
        message: 'Success',
        description: 'Addrezs deleted successfully',
      })
      refreshData()
    }
  }

  return (
    <>
      <Flex justifyContent="end">
        <Button
          type="primary"
          className="mr-1"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenAddressForm(true)}
        />
      </Flex>
      <Row gutter={16}>
        {addressList.map((address, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Card
              title={address?.city}
              extra={
                <Flex alignItems="center">
                  <Button
                    type="primary"
                    className="mr-1"
                    icon={<EditOutlined />}
                    onClick={() => onEditClick(address)}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteAddress(address.id)}
                  />
                </Flex>
              }
              style={{ marginBottom: 30 }}
            >
          
            </Card>
          </Col>
        ))}

        <AddressForm
          openAddressForm={openAddressForm}
          setOpenAddressForm={setOpenAddressForm}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          refreshData={refreshData}
          form={form}
        />
      </Row>
    </>
  )
}

export default AddressList
