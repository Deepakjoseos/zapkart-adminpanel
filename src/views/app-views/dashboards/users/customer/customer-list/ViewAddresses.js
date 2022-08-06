import { Button, Card, Drawer, notification, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddressForm from './AddressForm'
import customerService from 'services/customer'

const ViewAddresses = ({
  customerAddressOpen,
  setCustomerAddressOpen,
  selectedViewAddress,
  setSelectedViewAddress,
  selectedCustomerId,
  refetchData,
}) => {
  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [selectedFormAddress, setSelectedFormAddress] = useState({})

  const onDeleteAddress = async (addressId) => {
    const customerDelete = await customerService.deleteAddress(
      selectedCustomerId,
      addressId
    )

    if (customerDelete) {
      notification.success({
        message: 'Address deleted successfully',
      })
      refetchData()
    }
  }

  return (
    <div>
      <Drawer
        title="Address Details"
        width={720}
        onClose={() => {
          setCustomerAddressOpen(false)
          setSelectedViewAddress([])
        }}
        visible={customerAddressOpen}
        bodyStyle={{ paddingBottom: 80 }}
        // footer={
        //   <div
        //     style={{
        //       textAlign: 'right',
        //     }}
        //   >
        //     <Button
        //       onClick={() => setOpenVariantsForm(false)}
        //       style={{ marginRight: 8 }}
        //       htmlType="button"
        //     >
        //       Cancel
        //     </Button>
        //     <Button htmlType="button" onClick={onFinish} type="primary">
        //       Submit
        //     </Button>
        //   </div>
        // }
      >
        <Flex justifyContent="end" className="mb-2">
          <Button
            type="primary"
            onClick={() => {
              setViewFormModal(true)
              setFormMode('add')
            }}
          >
            {' '}
            + Add Address
          </Button>
        </Flex>

        {selectedViewAddress.map((address, i) => (
          <Card
            key={address.id}
            title={`Address ${i + 1}`}
            extra={
              <>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setViewFormModal(true)
                    setFormMode('edit')
                    setSelectedFormAddress(address)
                  }}
                  className="mr-2"
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onDeleteAddress(address.id)}
                />
              </>
            }
          >
            {'City: ' + address.city} <br />
            {'Country' + address.country} <br />
            {'line1: ' + address.line1} <br />
            {'Phone: ' + address.phone} <br />
            {'State: ' + address.state} <br />
            {'Zipcode: ' + address.zipcode}
          </Card>
        ))}
      </Drawer>

      <AddressForm
        formMode={formMode}
        selectedFormAddress={selectedFormAddress}
        setSelectedFormAddress={setSelectedFormAddress}
        setFormMode={setFormMode}
        viewFormModal={viewFormModal}
        setViewFormModal={setViewFormModal}
        selectedCustomerId={selectedCustomerId}
        refetchData={refetchData}
      />
    </div>
  )
}

export default ViewAddresses
