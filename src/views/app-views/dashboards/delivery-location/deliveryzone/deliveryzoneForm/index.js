import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import deliveryLocationService from 'services/deliveryLocation'
import Utils from 'utils'
import { useHistory } from 'react-router-dom'
import deliveryLocation from 'services/deliveryZone'
import deliveryzoneService from 'services/deliveryZone'
import vendorService from 'services/vendor'
import userGroupService from 'services/userGroup'
import constantsService from 'services/constants'
import countryService from 'services/country'
import _ from 'lodash'
import districtService from 'services/district'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const DeliveryZoneForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [uploadedImg, setImage] = useState(null)
  const [deliveryLocations, setDeliveryLocations] = useState([])
  const [isFinalTrue, setIsFinalTrue] = useState(false)
  const [vendors, setVendors] = useState([])
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [userGroups, setUserGroups] = useState([])
  const [form_statuses, setStatuses] = useState([])
  const [allTreesData, setAllTreesData] = useState([])
  const [sendingValuesDeliveryZones, setSendingDeliveryZones] = useState([])
  const [
    checkedDeliveryZoneSendingValues,
    setCheckedDeliveryZoneSendingValues,
  ] = useState([])

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

  // For selecting DELIVERY LOCATION PARENT
  //   const getDeliveryZones = async () => {
  //     const data = await deliveryzoneService.getDeliveryZones()
  //     console.log(data, 'myyy-data')

  //     if (data) {
  //       if (mode === EDIT) {
  //         const deliveryLocs = data.filter(
  //           (cur) => cur.isFinal !== true && cur.id !== param.id
  //         )
  //         setDeliveryLocations(deliveryLocs)
  //       } else {
  //         const deliveryLocs = data.filter((cur) => cur.isFinal !== true)
  //         setDeliveryLocations(deliveryLocs)
  //       }
  //     }
  //   }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
    }
  }

  const getCountry = async () => {
    const data = await countryService.getCountry('', `status=Active`)

    if (data) {
      const list = Utils.createDeliveryLocationList(data?.data)

      console.log(list, 'hukjbujk')
      setAllTreesData(list)
    }
  }

  const getDistrict = async () => {
    const data = await districtService.getDistrict('', `status=Active`)
    if (data?.data?.length > 0) {
      const list = Utils.createDeliveryLocationList(data?.data)
      setAllTreesData(list)
    }
  }

  console.log(allTreesData, 'hgdjkvb')

  useEffect(() => {
    getVendors()
    fetchConstants()
    if (process.env.REACT_APP_SITE_NAME === 'zapkart') {
      getCountry()
    } else {
      getDistrict()
    }
  }, [])

  console.log(allTreesData, 'opdjksgduk')

  useEffect(() => {
    if (mode === EDIT) {
      const fetchDeliveryZOneById = async () => {
        const { id } = param
        const data = await deliveryzoneService.getDeliveryZoneById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            status: data.status,
            vendorId: data.vendorId,
          })
          setCheckedDeliveryZoneSendingValues(
            data.deliveryLocations?.map((cur) => ({
              ...cur,
              id: cur?.deliveryLocationId,
              key: cur?.deliveryLocationId,
              deliveryZoneName: cur?.deliveryLocationType,

              fromInitial: true,
            }))
          )
          setIsFinalTrue(data.isFinal)
        } else {
          history.replace(
            '/app/dashboards/deliverylocation/deliverylocation-list'
          )
        }
      }

      fetchDeliveryZOneById()
    }
  }, [form, mode, param, props])

  const getParentBasedDeliveryZones = () => {
    // const childrenObjs = []
    // const parentObjs = []

    // // Spliting up with parentIds object, and Children Objs
    // checkedDeliveryZoneSendingValues.forEach((obj) =>
    //   [childrenObjs, parentObjs][
    //     +(
    //       checkedDeliveryZoneSendingValues
    //         .map((obj) => obj.parentlvlId)
    //         .filter((id) => id === obj.id).length > 1
    //     )
    //   ].push(obj)
    // )

    // console.log(childrenObjs, parentObjs, 'gsoeuye')

    // const parentIds = new Set(parentObjs.map(({ id }) => id))
    // const combined = [
    //   ...parentObjs,
    //   ...childrenObjs.filter(({ parentlvlId }) => !parentIds.has(parentlvlId)),
    // ]

    // return combined

    const cloneMergedNodes = [...checkedDeliveryZoneSendingValues]

    // one
    const partOne = cloneMergedNodes?.filter((cur) => !cur?.countryId)

    const partOneIds = new Set(partOne.map(({ id }) => id))
    //

    // two
    const partTwo = cloneMergedNodes?.filter(
      (cur) =>
        !partOneIds.has(cur.countryId) && cur.deliveryZoneName === 'STATE'
    )

    const partTwoIds = new Set(partTwo.map(({ id }) => id))
    //

    // three
    const partThree = cloneMergedNodes?.filter(
      (cur) =>
        !partTwoIds.has(cur.stateId) &&
        !partTwoIds.has(cur.countryId) &&
        cur.deliveryZoneName === 'DISTRICT'
    )
    const partThreeIds = new Set(partThree.map(({ id }) => id))
    //

    // four
    const partFour = cloneMergedNodes?.filter(
      (cur) =>
        !partThreeIds.has(cur.stateId) &&
        !partThreeIds.has(cur.countryId) &&
        !partThreeIds.has(cur.districtId) &&
        cur.deliveryZoneName === 'CITY'
    )
    const partFourIds = new Set(partFour.map(({ id }) => id))

    console.log('cities', partFourIds)
    //

    // FIVE
    const partFive = cloneMergedNodes?.filter((cur) => {
      return (
        !partFourIds.has(cur.stateId) &&
        !partFourIds.has(cur.countryId) &&
        !partFourIds.has(cur.districtId) &&
        !partFourIds.has(cur.cityId) &&
        cur.deliveryZoneName === 'PINCODE'
      )
    })

    // const partFiveIds = new Set(partFive.map(({ id }) => id))

    console.log(partOne, partTwo, partThree, partFour, partFive, 'lolll')
    //

    return _.uniqBy(
      [...partOne, ...partTwo, ...partThree, ...partFour, ...partFive],
      'id'
    )
  }

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          name: values?.name,
          status: values?.status,
          vendorId: values?.vendorId,
          deliveryLocations: getParentBasedDeliveryZones(
            checkedDeliveryZoneSendingValues
          )?.map((cur) => {
            const otherIds = {}
            if (cur?.countryId) {
              otherIds.countryId = cur?.countryId
            }

            if (cur?.stateId) {
              otherIds.stateId = cur?.stateId
            }

            if (cur?.districtId) {
              otherIds.districtId = cur?.districtId
            }

            if (cur?.cityId) {
              otherIds.cityId = cur?.cityId
            }

            return {
              deliveryLocationId: cur?.id,
              deliveryLocationType: cur?.deliveryZoneName,
              ...otherIds,
            }
          }),
        }
        console.log(sendingValues, 'sendinggggg')
        if (mode === ADD) {
          const created = await deliveryzoneService.createDeliveryZone(
            sendingValues
          )
          if (created) {
            message.success(`Created ${values.name} to Delivery zones List`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await deliveryzoneService.editDeliveryZone(
            param.id,
            sendingValues
          )
          if (edited) {
            message.success(`Edited ${values.name} to Delivery zone list`)
            history.goBack()
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

  console.log(sendingValuesDeliveryZones, 'plss')

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
          isFinal: false,
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
                  ? 'Add New Delivery Zone'
                  : `Edit Delivery Zone`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/deliverylocation/deliveryzone/deliveryzone-list'
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
                mode={mode}
                form_statuses={form_statuses}
                allTreesData={allTreesData}
                setAllTreesData={setAllTreesData}
                setCheckedDeliveryZoneSendingValues={
                  setCheckedDeliveryZoneSendingValues
                }
                checkedDeliveryZoneSendingValues={
                  checkedDeliveryZoneSendingValues
                }
                setSendingDeliveryZones={setSendingDeliveryZones}

                // isFinalTrue={isFinalTrue}
                // setIsFinalTrue={setIsFinalTrue}
                // deliveryLocations={deliveryLocations}
                // uploadLoading={uploadLoading}
                // handleUploadChange={handleUploadChange}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default DeliveryZoneForm
