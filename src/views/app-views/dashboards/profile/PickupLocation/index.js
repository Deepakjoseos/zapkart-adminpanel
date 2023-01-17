import React, { useEffect, useState } from 'react'
import {
  Form,
  Avatar,
  Button,
  Input,
  Row,
  Col,
  Upload,
  Card,
  Space,
  List,
} from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex'
import { useSelector } from 'react-redux'
import authVendorService from 'services/auth/vendor'
import PickupLocationForm from './PickupLocationForm'
import localityService from 'services/locality'

const PickupLocation = () => {
  const { user } = useSelector((state) => state.auth)
  const [pickUpLocations, setPickUpLocations] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [pincode ,setPincode]=useState([])
  const [city ,setCity]=useState([])
  const [country, setCountry] = useState([])
  const [state ,setState]=useState([])
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  const getProfile = async () => {
    const data = await authVendorService.getProfile()

    if (data) {
      setPickUpLocations(data.pickupLocations)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  

 
  const getCity = async (query) => {
    const data = await localityService.getCity(query)
    if (data) {
      setCity(data.data)
    }
  }
  const getState = async () => {
    const data = await localityService.getState()
    if (data) {
      setState(data.data)
    }
  }
  const getCountry = async () => {
    const data = await localityService.getCountry()
    if (data) {
      setCountry(data.data)
    }
  }
  const getPincode = async (query) => {
    const data = await localityService.getPincode(query)
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

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">Pickup Location</h2>
          <Button
            type="primary"
            className="mr-4"
            onClick={() => setIsFormOpen(true)}
          >
            Add Pickup Location
          </Button>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 5,
          }}
          dataSource={pickUpLocations}
          //   footer={
          //     <div>
          //       <b>ant design</b> footer part
          //     </div>
          //   }
          renderItem={(item) => (
            <List.Item
              key={item.name}
              // actions={[
              //   <IconText
              //     icon={StarOutlined}
              //     text="156"
              //     key="list-vertical-star-o"
              //   />,
              //   <IconText
              //     icon={LikeOutlined}
              //     text="156"
              //     key="list-vertical-like-o"
              //   />,
              //   <IconText
              //     icon={MessageOutlined}
              //     text="2"
              //     key="list-vertical-message"
              //   />,
              // ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<p>{`${item?.name} (${item?.email})`}</p>}
                description={item?.phone}
              />
              {item?.address},
              {item?.city},
              {item?.state},
              {item?.country},
              {item?.pinCode}
            </List.Item>
          )}
        />
        <PickupLocationForm
          setIsFormOpen={setIsFormOpen}
          isFormOpen={isFormOpen}
          getProfile={getProfile}
          city={city}
                state={state}
                country={country}
                pincode={pincode}
                getPincode={getPincode}
                getCity={getCity}
        />
      </div>
    </>
  )
}

export default PickupLocation
