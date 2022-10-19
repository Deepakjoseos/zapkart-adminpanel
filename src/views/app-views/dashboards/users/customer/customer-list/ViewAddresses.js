import { Button, Card, Drawer, notification, Table, Typography } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AddressForm from './AddressForm'
import customerService from 'services/customer'
import utils from 'utils'
import countryService from 'services/country'
import stateService from 'services/state'
import cityService from 'services/city'



const ViewAddresses = ({
 
  selectedCustomerId,
  refetchData,
  addressList
}) => {

  console.log('addressList',addressList)
  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [selectedFormAddress, setSelectedFormAddress] = useState({})
  const [country ,setCountry]=useState([])
  const [city ,setCity]=useState([])
  const [state ,setState]=useState([])

  const getCity = async ()=>{
    const data = await cityService.getCity()
    if(data){
      setCity(data.data)
    }
  }
  const getState = async ()=>{
    const data = await stateService.getState()
    if(data){
      setState(data.data)
    }
  }
  const getCountry = async ()=>{
    const data = await countryService.getCountry()
    if(data){
      setCountry(data.data)
    }
      }
  
  useEffect(()=>{
 
  getCity()
  getState()
  getCountry()
  
  },[])

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
            + Add Address
          </Button>
        </Flex>
        

        {addressList?.map((address, i) => (
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
            {'Country:' + address.country} <br />
            {'address: ' + address.line1} <br />
            {'Phone: ' + address.phone} <br />
            {'State: ' + address.state} <br />
            {'Zipcode: ' + address.zipcode}

            
          </Card>
        ))}
      {/* </Drawer> */}

      <AddressForm
        formMode={formMode}
        selectedFormAddress={selectedFormAddress}
        setSelectedFormAddress={setSelectedFormAddress}
        setFormMode={setFormMode}
        viewFormModal={viewFormModal}
        setViewFormModal={setViewFormModal}
        selectedCustomerId={selectedCustomerId}
        refetchData={refetchData}
        city={city}
        state={state}
        country={country}
      />

    </div>
  )
}

export default ViewAddresses
