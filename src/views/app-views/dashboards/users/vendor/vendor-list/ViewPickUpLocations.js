import { Button, Card, Drawer, notification, Table, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import utils from 'utils'
import PickupLocationForm from './PickUpLocationForm'


const ViewPickupLocations = ({
 
  selectedVendorId,
  refetchData,
  pickupLocations
}) => {

  console.log('pickupLocations',pickupLocations)
  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [selectedFormPickUpLocation, setSelectedFormPickupLocation] = useState({})

//   const onDeleteAddress = async (addressId) => {
//     const customerDelete = await customerService.deleteAddress(
//       selectedCustomerId,
//       addressId
//     )

//     if (customerDelete) {
//       notification.success({
//         message: 'Address deleted successfully',
//       })
//       refetchData()
//     }
//   }



  return (
    <div className='table-responsive'>
          <Flex justifyContent="end" className="mb-2">
          <Button
            type="primary"
            onClick={() => {
              setViewFormModal(true)
              setFormMode('add')
            }}
          >
            {' '}
            + Add PickUpLocations
          </Button>
        </Flex>
        

        {pickupLocations?.map((pickupLocation, i) => (
          <Card
            key={pickupLocation.id}
            title={`pickupLocation ${i + 1}`}
            extra={
              <>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setViewFormModal(true)
                    setFormMode('edit')
                    setSelectedFormPickupLocation(pickupLocation)
                  }}
                  className="mr-2"
                />
                {/* <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onDeleteAddress(address.id)}
                /> */}
              </>
            }
          >
            {'City: ' + pickupLocation.city} <br />
            {'Country:' + pickupLocation.country} <br />
            {'Phone: ' + pickupLocation.phone} <br />
            {'State: ' + pickupLocation.state} <br />
            {'Address: ' + pickupLocation.address}
          </Card>
        ))}
      {/* </Drawer> */}

      <PickupLocationForm
        formMode={formMode}
        selectedFormPickUpLocation={selectedFormPickUpLocation}
        setSelectedFormPickupLocation={setSelectedFormPickupLocation}
        setFormMode={setFormMode}
        viewFormModal={viewFormModal}
        setViewFormModal={setViewFormModal}
        selectedVendorId={selectedVendorId}
        refetchData={refetchData}
      />

    </div>
  )
}

export default ViewPickupLocations
