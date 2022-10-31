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
import districtService from 'services/district'
import pincodeService from 'services/pincode'

const ViewAddresses = ({ selectedCustomerId, refetchData, addressList }) => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME

  console.log('addressList', addressList)
  const [viewFormModal, setViewFormModal] = useState(false)
  const [formMode, setFormMode] = useState('add')
  const [selectedFormAddress, setSelectedFormAddress] = useState({})
  const [country, setCountry] = useState([])
  const [city, setCity] = useState([])
  const [state, setState] = useState([])
  const [pincode, setPincode] = useState([])
  const [district, setDistrict] = useState([])

  const getCity = async (query) => {
    const data = await cityService.getCity(query)
    if (data) {
      setCity(data.data)
    }
  }
  const getState = async () => {
    const data = await stateService.getState()
    if (data) {
      setState(data.data)
    }
  }
  const getCountry = async () => {
    const data = await countryService.getCountry()
    if (data) {
      setCountry(data.data)
    }
  }
  const getPincode = async (query) => {
    const data = await pincodeService.getPincode(query)
    if (data) {
      setPincode(data.data)
    }
  }
  // const getDistrict = async () => {
  //   const data = await districtService.getDistrict()
  //   if (data) {
  //     setDistrict(data.data)
  //   }
  // }

  useEffect(() => {
    // getCity()
    if (SITE_NAME !== 'zapkart') {
      getState()
    }

    getCountry()
    // getDistrict()
    // getPincode()
  }, [])

  useEffect(() => {
    if (SITE_NAME === 'zapkart') {
      if (country?.length > 0) {
        getState(`countryName=${country[0].name}`)
      }
    }
  }, [country])

  useEffect(() => {
    if (SITE_NAME !== 'zapkart') {
      if (state?.length > 0) {
        getCity(`stateName=${state[0]?.name}`)
      }
    }
  }, [state])

  // useEffect(() => {
  //   if(city?.length > 0) {

  //   }
  // }, [])

  useEffect(() => {
    if (selectedFormAddress) {
      if (selectedFormAddress?.country) {
        getState(`countryName=${selectedFormAddress?.country}`)
      }

      if (selectedFormAddress?.state) {
        getCity(`stateName=${selectedFormAddress?.state}`)
      }

      if (selectedFormAddress?.city) {
        getPincode(`cityName=${selectedFormAddress?.city}`)
      }
    }
  }, [selectedFormAddress])

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
    <div className="table-responsive">
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
          {'address: ' + address.line1} <br />
          {`${SITE_NAME === 'zapkart' ? 'Country' : 'Country'}: ` +
            address.country}{' '}
          <br />
          {SITE_NAME === 'zapkart' && (
            <>
              {'State: ' + address.state} <br />
            </>
          )}
          {`${SITE_NAME === 'zapkart' ? 'City' : 'Emirates'}: ` + address.city}{' '}
          <br />
          {`${SITE_NAME === 'zapkart' ? 'Pincode' : 'City'}: ` +
            address.zipcode}
          <br />
          {'Phone: ' + address.phone} <br />
          {/* {'Zipcode: ' + address.zipcode} */}
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
        pincode={pincode}
        district={district}
        getPincode={getPincode}
        getCity={getCity}
      />
    </div>
  )
}

export default ViewAddresses
