import { Button, Card, Drawer, notification, Table, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
// import AddressForm from './AddressForm'
import customerService from 'services/customer'
import GroupForm from './GroupForm'
import utils from 'utils'


const ViewGroups = ({
 
  selectedCustomerId,
  refetchData,
  groupList
}) => {

  console.log('groupList',groupList)
  console.log('selectedCustomerId',selectedCustomerId)

  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [selectedGroupForm, setSelectedGroupForm] = useState({})

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
            + Add Group
          </Button>
        </Flex>
        

        {groupList?.map((group, i) => (
          <Card
            key={group.id}
            title={`group ${i + 1}`}
            extra={
              <>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setViewFormModal(true)
                    setFormMode('edit')
                    setSelectedGroupForm(group)
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
            {/* {'City: ' + groups.city} <br />
            {'Country:' + groups.country} <br />
            {'line1: ' + groups.line1} <br />
            {'Phone: ' + groups.phone} <br />
            {'State: ' + groups.state} <br />
            {'Zipcode: ' + groups.zipcode} */}
          </Card>
        ))}
      {/* </Drawer> */}

      <GroupForm
        formMode={formMode}
        selectedGroupForm={selectedGroupForm}
        setSelectedGroupForm={setSelectedGroupForm}
        setFormMode={setFormMode}
        viewFormModal={viewFormModal}
        setViewFormModal={setViewFormModal}
        selectedCustomerId={selectedCustomerId}
        refetchData={refetchData}
      />

    </div>
  )
}

export default ViewGroups
