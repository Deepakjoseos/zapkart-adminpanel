import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'

import stateService from 'services/state'
import pincodeService from 'services/pincode'
import cityService from 'services/city'
import vendorService from 'services/vendor'
import Utils from 'utils'

import shipmentService from 'services/shipment'
import { useHistory } from 'react-router-dom'
import Shipment from '..'
import moment from 'moment'

import PickupLocations from 'views/app-views/dashboards/users/vendor/VendorForm/pickuplocation'
import countryService from 'services/country'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ShipmentForm = (props) => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  const { mode = ADD, param } = props
  const history = useHistory()
  const [state, setState] = useState([])

  const [form] = Form.useForm()
  const [city, setCity] = useState([])

  const [submitLoading, setSubmitLoading] = useState(false)
  const [vendors, setVendors] = useState([])
  const [pincode, setPincode] = useState([])
  const [country, setCountry] = useState([])

  const getVendors = async () => {
    const data = await vendorService.getVendors()
    if (data) {
      const vendorsList = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        }
      })
      setVendors(vendorsList)
    }
  }
  useEffect(() => {
    getVendors()
  }, [])

  // const getPincode = async (query) => {
  //   const data = await pincodeService.getPincode(query)
  //   if (data) {
  //     setPincode(data.data)
  //   }
  // }
  // const getState = async (query) => {
  //   const data = await stateService.getState(query)
  //   if (data) {
  //     setState(data.data)
  //   }
  // }
  // const getCity = async () => {
  //   const data = await cityService.getCity()
  //   if (data) {
  //     setCity(data.data)
  //   }
  // }

  // useEffect(() => {
  //   getState()
  //   getCity()
  //   getPincode()

  // }, [])

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
  //   if (mode === EDIT) {
  //     const fetchBrandById = async () => {
  //       const { id } = param
  //       const data = await shipmentService.getBrandById(id)
  //       if (data) {
  //         // For Image upload
  //         let himg = []
  //         if (data.image) {
  //           himg = [
  //             {
  //               uid: Math.random() * 1000,
  //               name: Utils.getBaseName(data.image),
  //               url: data.image,
  //               thumbUrl: data.image,
  //             },
  //           ]

  //           setImage(himg)
  //           setFileListImages(himg)
  //         }
  //         // For setting form values when Load if it is in EDIT mode
  //         form.setFieldsValue({
  //           name: data.name,
  //           status: data.status,
  //           priority: data.priority,
  //         })
  //       } else {
  //         history.replace('/app/dashboards/catalog/brand/brands-list')
  //       }
  //     }

  //     fetchBrandById()
  //   }
  // }, [form, mode, param, props])

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true)

    form
      .validateFields()
      .then(async (values) => {
        if (mode === ADD) {
          // values.country = 'India'

          const data = await shipmentService.createPickupLocation(
            SITE_NAME === 'zapkart'
              ? { ...values, country: country[0].name }
              : { ...values, country: country[0].name, state: state[0].name }
          )

          if (data) {
            message.success('Pickup Location Added Successfully')
            history.goBack()
          }
        }
        // if (mode === EDIT) {
        //   // Checking if image exists
        //   if (uploadedImg.length !== 0 && uploadedImg !== null) {
        //     console.log('uploadedImg', uploadedImg)
        //     // We will upload image to S3 and get the image url
        //     const imgValue = await singleImageUploader(
        //       uploadedImg[0].originFileObj,
        //       uploadedImg,
        //       uploadedImg[0].url,
        //       'brand'
        //     )

        //     //  append image url to values object
        //     values.image = imgValue

        //     const edited = await brandService.editBrand(param.id, values)
        //     if (edited) {
        //       message.success(`Edited ${values.name} to Brand list`)
        //       history.goBack()
        //     }
        //   } else {
        //     message.error('Please upload image')
        //   }
        // }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          items: [
            {
              orderId: '',
              itemIds: [],
            },
          ],
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD'
                  ? 'Add New Pickup Location'
                  : `Edit Pickup Location`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/pickuplocation/pickuplocation-list'
                    )
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                form={form}
                vendors={vendors}
                city={city}
                state={state}
                country={country}
                pincode={pincode}
                getPincode={getPincode}
                getCity={getCity}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ShipmentForm
