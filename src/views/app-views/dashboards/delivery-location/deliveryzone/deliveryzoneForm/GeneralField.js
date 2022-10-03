import React, { useState } from 'react'
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
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import stateService from 'services/state'
import Utils from 'utils'
import districtService from 'services/district'
import _ from 'lodash'
import cityService from 'services/city'
import pincodeService from 'services/pincode'

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

const GeneralField = ({
  vendors,
  mode,
  form_statuses,
  allTreesData,
  setAllTreesData,
  setCheckedDeliveryZoneSendingValues,
  checkedDeliveryZoneSendingValues,
}) => {
  console.log('mode', mode)

  const [expandedKeys, setExpandedKeys] = useState([])
  const [checkedKeys, setCheckedKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [value, setValue] = useState(['India'])

  const { DirectoryTree, TreeNode } = Tree

  const onChange = (newValue, label, extra) => {
    console.log('onChange ', newValue, label, extra)
    setValue(newValue)
  }

  // TODO: PLAN

  // const treeData = [
  //   {
  //     title: 'India',
  //     key: 'india',

  //     children: [
  //       {
  //         title: 'kerala',
  //         key: 'state',
  //         deliveryLocation: 'state',
  //         children: [
  //           {
  //             title: 'malapauram',
  //             key: 'malapauram',
  //           },
  //           {
  //             title: 'kozhikode',
  //             key: 'kozhikode',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'karnataka',
  //         key: 'karnataka',
  //         deliveryLocation: 'state',
  //         children: [
  //           {
  //             title: 'banglore',
  //             key: 'banglore',
  //           },
  //           {
  //             title: 'royal',
  //             key: 'royal',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]

  const getState = async (countryId) => {
    const data = await stateService.getState('', `countryId=${countryId}`)
    console.log(countryId, 'idjhdjdk')

    // if (data) {
    //   let updatedList = allTreesData.map((item) => {
    //     // const value = JSON.parse(item.key)

    //     if (item?.value === countryId) {
    //       console.log(item.value, 'hsty')
    //       return {
    //         ...item,
    //         children: Utils.createDeliveryLocationList(data?.data),
    //       } //gets everything that was already in item, and updates "done"
    //     }
    //     return item // else return unmodified item
    //   })
    //   setAllTreesData(updatedList)
    // }
    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  // function IsJsonString(str) {
  //   try {
  //     JSON.parse(str)
  //   } catch (e) {
  //     return false
  //   }
  //   return true
  // }

  const getDistrict = async (stateId) => {
    const data = await districtService.getDistrict('', `stateId=${stateId}`)

    // if (data) {
    //   const updatedDistrictTree = allTreesData.map((item) => {
    //     // const value = JSON.parse(item.key)
    //     console.log(item, 'heyyy')
    //     if (item?.value === countryId) {
    //       item?.children.forEach((elem) => {
    //         console.log(elem, 'plsssss')
    //         if (elem?.value === stateId) {
    //           elem.children = Utils.createDeliveryLocationList(data?.data)
    //         }
    //       })
    //     }
    //     return item
    //   })

    //   setAllTreesData(updatedDistrictTree)
    // }
    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  const getCity = async (districtId) => {
    const data = await cityService.getCity('', `districtId=${districtId}`)

    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }
  const getPincode = async (cityId) => {
    const data = await pincodeService.getPincode('', `cityId[]=${cityId}`)

    if (data?.data?.length > 0) {
      return Utils.createDeliveryLocationList(data?.data)
    }
  }

  const onExpand = (expandedKeysValue) => {
    // console.log('onExpand', expandedKeysValue) // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // // or, you can remove all expanded children keys.
    // const deliveryZoneData =
    //   expandedKeysValue?.length > 0 &&
    //   JSON.parse(expandedKeysValue[expandedKeysValue?.length - 1])
    // console.log(deliveryZoneData, 'got-it')
    // // const deliveryZoneName = deliveryZoneData[0]
    // // const removeDeliveryZoneName = deliveryZoneData.shift()
    // // const deliveryZoneId = deliveryZoneData.join('-')
    // if (deliveryZoneData?.currentStage === 'COUNTRY') {
    //   getState(deliveryZoneData?.id)
    // } else if (deliveryZoneData?.currentStage === 'STATE') {
    //   getDistrict(deliveryZoneData?.countryId, deliveryZoneData?.id)
    // }
    // setExpandedKeys(expandedKeysValue)
    // setAutoExpandParent(false)
  }

  const onCheck = (checkedKeysValue, e) => {
    console.log('onCheck', checkedKeysValue, e)

    const checkDelivery = [...checkedDeliveryZoneSendingValues]

    const intialValues = checkDelivery?.filter(
      (cur) => cur.fromInitial && e.node.id !== cur?.id
    )

    // const initials = checkDelivery?.filter(
    //   (cur) => cur.fromInitial
    // )

    setCheckedDeliveryZoneSendingValues(intialValues)

    // if (e.node.id === intia) {
    // }

    const checkedNodes = [...e.checkedNodes, ...intialValues]

    const mergedNodes = _.uniqBy(checkedNodes, 'id')

    setCheckedDeliveryZoneSendingValues(mergedNodes)
    // setCheckedKeys(checkedKeysValue)
  }

  const onSelect = (selectedKeysValue) => {
    console.log('onSelect', selectedKeysValue)
    // setSelectedKeys(selectedKeysValue)
  }
  // const { SHOW_PARENT } = TreeSelect

  // const tProps = {
  //   treeData: allTreesData,
  //   value,
  //   onChange,
  //   treeCheckable: true,
  //   showCheckedStrategy: SHOW_PARENT,
  //   placeholder: 'Please select',
  //   treeIcon: true,
  //   showArrow: true,
  //   onTreeExpand: onExpand,
  //   style: {
  //     width: '100%',
  //   },
  // }

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
        const newData = await getState(key)
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

      <Card title="Delivery Locations">
        <Tree
          checkable
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
        />
      </Card>
    </>
  )
}

export default GeneralField
