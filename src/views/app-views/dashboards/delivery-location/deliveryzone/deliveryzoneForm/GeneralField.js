/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  InputNumber,
  Select,
  TreeSelect,
  Tree,
  Button,
  AutoComplete,
  notification,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import stateService from 'services/state'
import Utils from 'utils'
import districtService from 'services/district'
import _ from 'lodash'
import cityService from 'services/city'
import pincodeService from 'services/pincode'
import countryService from 'services/country'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  name: [
    {
      required: true,
      message: 'Required',
    },
  ],

  status: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

const GeneralField = ({
  vendors,
  mode,
  form_statuses,
  allTreesData,
  setAllTreesData,
  setCheckedDeliveryZoneSendingValues,
  checkedDeliveryZoneSendingValues,
}) => {
  const SITE_NAME = process.env.REACT_APP_SITE_NAME
  const [searchPincodes, setSearchPincodes] = useState([])
  const [searchPincode, setSearchPincode] = useState(null)
  const [pincodeSearchLoading, setPincodeSearchLoading] = useState(false)

  const [expandedKeys, setExpandedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const getCountry = async () => {
    const data = await countryService.getCountry('', `status=Active`)

    if (data) {
      const list = Utils.createDeliveryLocationList(data?.data)

      console.log(list, 'hukjbujk')
      setAllTreesData(list)
    }
  }

  const getState = async (countryId) => {
    const data = await stateService.getState(
      '',
      `status=Active&countryId=${countryId}`
    )
    console.log(countryId, 'idjhdjdk')

    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  const getDistrict = async (stateId) => {
    const data = await districtService.getDistrict(
      '',
      `status=Active&stateId=${stateId}`
    )
    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  const getCity = async (districtId) => {
    const data = await cityService.getCity(
      '',
      `status=Active&districtId=${districtId}`
    )

    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }
  const getPincode = async (cityId) => {
    const data = await pincodeService.getPincode(
      '',
      `status=Active&cityId[]=${cityId}`
    )

    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  console.log(checkedDeliveryZoneSendingValues, ';ssh')

  const onCheck = (checkedKeysValue, e) => {
    console.log('onCheck', checkedKeysValue, e)

    const checkDelivery = [...checkedDeliveryZoneSendingValues]

    const intialValues = checkDelivery?.filter(
      (cur) =>
        cur.fromInitial &&
        e.node.id !== cur?.id &&
        cur.id !== e.node.countryId &&
        cur.id !== e.node.stateId &&
        cur.id !== e.node.districtId &&
        cur.id !== e.node.cityId &&
        // new
        cur?.countryId !== e.node.id &&
        cur?.stateId !== e.node.id &&
        cur?.districtId !== e.node.id &&
        cur?.cityId !== e.node.id
    )

    console.log(intialValues, 'removed-one')

    // const initials = checkDelivery?.filter(
    //   (cur) => cur.fromInitial
    // )

    // setCheckedDeliveryZoneSendingValues(intialValues)

    // if (e.node.id === intia) {
    // }

    const checkedNodes = [...intialValues, ...e.checkedNodes]

    const mergedNodes = _.uniqBy(checkedNodes, 'id')

    setCheckedDeliveryZoneSendingValues(mergedNodes)
    // setCheckedKeys(checkedKeysValue)
  }

  const onSelect = (selectedKeysValue) => {
    console.log('onSelect', selectedKeysValue)
  }

  const updateTreeData = (list, key, children) => {
    const data = list.map((node) => {
      if (node.key === key) {
        return { ...node, children }
      }

      if (node.children) {
        return {
          ...node,

          children: updateTreeData(node.children, key, children),
        }
      }

      return node
    })

    console.log(data, 'pgygdyu')

    return data
  }

  const onLoadData = (nodeData) => {
    console.log(nodeData, 'plss')
    const { children, key, deliveryZoneName } = nodeData

    return new Promise(async (resolve) => {
      if (children) {
        resolve()
        return
      }
      // Check id deliveryzone
      if (deliveryZoneName === 'COUNTRY') {
        // setTimeout(async () => {
        let newData = await getState(key)
        if (newData) {
          setAllTreesData((origin) => updateTreeData(origin, key, newData))
        }
        resolve()
        // }, 1000)
      }
      if (deliveryZoneName === 'STATE') {
        // setTimeout(async () => {
        const newData = await getDistrict(key)
        if (newData) {
          console.log(newData, 'hjdt7eit7i')
          setAllTreesData((origin) => updateTreeData(origin, key, newData))
        }
        resolve()
        // }, 1000)
      }
      if (deliveryZoneName === 'DISTRICT') {
        // setTimeout(async () => {
        const newData = await getCity(key)
        if (newData) {
          setAllTreesData((origin) => updateTreeData(origin, key, newData))
        }
        resolve()
        // }, 1000)
      }
      if (deliveryZoneName === 'CITY') {
        const newData = await getPincode(key)
        if (newData) {
          setAllTreesData((origin) => updateTreeData(origin, key, newData))
        }
        resolve()
      } else {
        resolve()
      }
    })
  }

  // FOR PINCODE SEARCH PURPOSE
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const getPincodeForSearch = async (query) => {
    const data = await pincodeService.getPincode(query)
    if (data) {
      const pincodes = data.data

      const formattedPincodes = pincodes.map((pin) => {
        return { ...pin, label: pin.name, value: pin.name }
      })

      setSearchPincodes(formattedPincodes)
      return formattedPincodes
    }
  }

  const onPincodeSearchSubmit = async (value) => {
    const pinCodes = await getPincodeForSearch(`search=${value}`)

    const matchedPincodeWithSearchValue = pinCodes.find(
      (pin) => pin.name == value
    )

    if (matchedPincodeWithSearchValue) {
      setSearchPincode(matchedPincodeWithSearchValue)
    } else {
      setSearchPincode(null)
      notification.warning({
        message: 'Cannot Find Pincode',
      })
    }

    console.log(matchedPincodeWithSearchValue, 'getSearchValue')
  }

  useEffect(() => {
    const onSearchPinCodeHandler = async () => {
      setPincodeSearchLoading(true)
      setAllTreesData([])

      await getCountry()
      const { countryId, stateId, districtId, cityId } = searchPincode

      setExpandedKeys([])
      setAutoExpandParent(false)

      // It's a sequencial way of opening trees from country pincodes while pincode search

      await onLoadData({
        deliveryZoneName: 'COUNTRY',
        key: countryId,
      })

      setExpandedKeys([countryId])
      setAutoExpandParent(true)

      await onLoadData({
        deliveryZoneName: 'STATE',
        key: stateId,
      })

      setExpandedKeys((prev) => [...prev, stateId])

      await onLoadData({
        deliveryZoneName: 'DISTRICT',
        key: districtId,
      })

      setExpandedKeys((prev) => [...prev, districtId])

      await onLoadData({
        deliveryZoneName: 'CITY',
        key: cityId,
      })

      setExpandedKeys((prev) => [...prev, cityId])

      setTimeout(() => {
        if (document.querySelector('.ant-tree-node-selected')) {
          document
            .querySelector('.ant-tree-node-selected')
            .scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 1000)

      // const elm = await waitForElm('.ant-tree-node-selected')

      // elm.scrollIntoView({ behavior: 'smooth', block: 'center' })

      setPincodeSearchLoading(false)
    }

    if (searchPincode) {
      onSearchPinCodeHandler()
    }
  }, [searchPincode])

  // Additional Function
  function onlyNumberKey(evt) {
    var theEvent = evt || window.event

    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain')
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which
      key = String.fromCharCode(key)
    }
    var regex = /[0-9]|\./
    if (!regex.test(key)) {
      theEvent.returnValue = false
      if (theEvent.preventDefault) theEvent.preventDefault()
    }
  }

  return (
    <>
      <Card title="Basic Info">
        <Form.Item name="name" label="Name" rules={rules.name}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="status" label="Status" rules={rules.status}>
          <Select placeholder="Status">
            {form_statuses.map((item) => (
              <Option key={item.id} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="vendorId" label="Vendor" rules={rules.vendor}>
          <Select
            disabled={mode === 'EDIT' ? true : false}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Vendor"
          >
            {vendors.map((vendor) => (
              <Option value={vendor.id}>{vendor.fullName}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* <TreeSelect
        {...tProps}
        // checkable
        // showCheckedStrategy={SHOW_PARENT}
        // onTreeExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        // checkedKeys={checkedKeys}
        // onSelect={onSelect}
        // selectedKeys={selectedKeys}
        // treeData={allTreesData}
        // value={value}
        // onChange={onChange}
        // onDrop={({ event, node, dragNode, dragNodesKeys }) => {
        //   console.log(event, node, dragNode, dragNodesKeys, 'wjbsdkhj')
        // }}
        style={{ width: 700 }}
      /> */}
        {/* <label style={{ fontWeight: 'bold' }}>Delivery Location</label> */}
      </Card>

      <Card
        title="Delivery Locations"
        extra={
          SITE_NAME === 'zapkart' && (
            <>
              <AutoComplete 
                options={searchPincodes}
                dropdownMatchSelectWidth={252}
                style={{
                  width: 300,
                
                }}
                onSelect={(data, option) => {
                  setSearchPincode(option)
                }}
                onSearch={(searchText) =>
                  getPincodeForSearch(`search=${searchText}`)
                  
                }
                
              >
                <Input.Search 
                  size="large"
                  inputMode="numeric"
                  typeof="number"
                  type="number"
                  placeholder="Search Pincode"
                  itemType="number"
                  onSearch={(val) => onPincodeSearchSubmit(val)}
                  enterButton="Search"
                  loading={pincodeSearchLoading}
                  onKeyPress={(event) => onlyNumberKey(event)}
                />
              </AutoComplete>
            </>
          )
        }
      >
        {allTreesData?.length > 0 ? (
          <Tree
            checkable
            selectable
            selectedKeys={searchPincode?.id ? [searchPincode?.id] : []}
            // showCheckedStrategy={SHOW_PARENT}

            // onExpand={onExpand}
            // expandedKeys={expandedKeys}
            // autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedDeliveryZoneSendingValues?.map((cur) => cur.id)}
            // checkedKeys={checkedKeys}
            onSelect={onSelect}
            multiple
            // selectedKeys={selectedKeys}
            treeData={allTreesData}
            loadData={onLoadData}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          />
        ) : null}
      </Card>
    </>
  )
}

export default GeneralField
