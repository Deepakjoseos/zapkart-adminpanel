/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, Checkbox, Select, notification } from 'antd'
import { deliveryAdminLocationSchema, deliveryMerchantLocationSchema } from 'utils/Schema'
// import callApi from 'utils/callApi'
import { formItemLayout, tailFormItemLayout } from 'utils'
import { Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addDeliveryLocation, editDeliveryLocation } from 'services/deliverLocation'
import { STRINGS } from '_constants'
import { getStat, getCity, getCountries, getZip, getAllMerchnats } from 'services'
import { connect } from 'react-redux'

// import useUpload from 'hooks/useUpload'
import Demo from './dynamic'
import isEmpty from 'lodash/isEmpty'

const { Option } = Select

const FormA = (props) => {
  console.log('props', props)
  const { data, user } = props
  useEffect(() => {
    console.log(values, props, errors)
    if (data) {
      const setP = data.pincodes.some((item) => typeof item === 'object')
      console.log('setPform', setP, data.type)

      // if(data.type==='range'){
      //   setValues({...data,pincodes:data.pincodes})
      // }
      // if (setP) {
      //   console.log('insiede if************')
      //   setValues({ ...data, pincodes: [] })
      // } else {
      //   console.log('inside else**************')
      //   setValues({ ...data })
      // }
      // setValues({ ...data ,locality_district:[] ,locality_state:""})

      if (data.zone_type === 'state') {
        console.log('insidr***************')
        setStateMode('multiple')
        setValues({ ...data, locality_state: data.zone_states, locality_district: [] })
      }
      if (data.zone_type === 'nation' || data.zone_type === 'locality') {
        setStateMode('single')
        setValues({ ...data, locality_district:data.locality_district!==null?data.locality_district: [], locality_state:data.locality_state!==null?data.locality_state:'',zone_states:[] })
      }

      setRangePinCode(data.pincodes)
      // if (data.district) fetchZip(data.district)
    }
  }, [values, errors])

  // useEffect(() => {
  // if(values.state) fetchCity(values.state)
  // if(values.district) fetchZip(values.district)
  // }, [])

  const initialValues = {
    status: 'hold',
    locality_type: 'single',
  }

  let localType = [
    {
      label: 'Single',
      value: 'single',
    },
    {
      label: 'Range',
      value: 'range',
    },
    {
      label: 'None',
      value: 'none',
    },
  ]

  const [pincode, setPincode] = useState([])
  // const [pincodeOptions, setpincodeOptions] = useState([])
  const [countries, setCountries] = useState([])
  const [merchants, setMerchants] = useState([])
  const [stat, setStats] = useState([])
  const [citie, setCitie] = useState([])
  const [zip, setZip] = useState([])
  const [rangePincode, setRangePinCode] = useState([])
  // const [selectAll, setSelectAll] = useState(false)
  const [stateMode, setStateMode] = useState('single')
  const [hidelocalType, setHideLocalType] = useState(localType)

  // let selectAllmode=false;

  const fetchSubmit = async () => {
    console.log('values*************', values)
    // delete values.state
    // delete values.district
    // if (values.start && values.end) {
    //   delete values.start
    //   delete values.end
    // }
    // console.log('values', values)
    // if("zone_type":"state")
    // "location_name":"st",
    // "status":"active",
    // "zone_type":"state",
    // "zone_states":["KERALA"],
    // "locality_type":"none
    let obj = {}
    const { zone_type } = values
    if (zone_type === 'state') {
      obj = {
        ...values,
        zone_states: values.locality_state,
      }
    }
    if (zone_type === 'nation') {
      obj = {
        ...values,
      }
    }
    if (zone_type === 'locality') {
      obj = {
        ...values,
      }
    }

    if (!isEmpty(obj)) {
      const a = data ? await editDeliveryLocation(data._id, obj) : await addDeliveryLocation(obj)
      // const a = await addDeliveryLocation({ ...values })
      console.log('a', a)
      setSubmitting(false)
      if (a) {
        notification.success({
          message: STRINGS.success,
          description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
        })
        setSuccess(true)
      }
    }
  }

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
      setSuccess(false)
      // setPincode([])
    } catch (err) {
      setSubmitting(false)
    }
  }

  // "zone_type": ["nation", "state","locality"]

  // if("zone_type":"locality")
  // {
  // "location_name":"locality",
  // "status":"active",
  // "zone_type":"locality",
  // "zone_states":[],
  // "locality_state":"keral",
  // "locality_district":["MALAPPURAMUP"],
  // "locality_type"

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(
    initialValues,
    user.userTypeId === 1 ? deliveryAdminLocationSchema : deliveryMerchantLocationSchema,
    submitForm,
  ) // file as object {fileInputName:'icon', maxCount:1}
  console.log('values', values)

  const fetchCity = async (id) => {
    const cData = await getCity(id)
    if (cData) setCitie(cData)
  }

  const fetchCity2 = async (e) => {
    if (e && e.length > 0) {
      let arr1 = await Promise.all(
        e.map(async (i) => {
          const cData2 = await getCity(i)
          console.log('cData2', cData2)

          // setValues((a) => ({ ...a, pincodes:cData2}))
          if (cData2) return cData2
        }),
      )
      console.log('arr1*******', [].concat.apply([], arr1), values.district)
      if (arr1) setCitie([].concat.apply([], arr1))
    }
  }
  const fetchZip2 = async (e) => {
    if (e && e.length > 0) {
      let arr1 = await Promise.all(
        e.map(async (i) => {
          const cData2 = await getZip(i)
          console.log('cData2', cData2)

          // setValues((a) => ({ ...a, pincodes:cData2}))
          if (cData2) return cData2
        }),
      )
      console.log('arr1*******', [].concat.apply([], arr1), values.district)
      if (arr1) setZip([].concat.apply([], arr1))
    }
  }

  const fetchZip = async (id) => {
    const cData = await getZip(id)
    if (cData) setZip(cData)
  }

  // fetch categories, brands, compositions on component mount

  useEffect(() => {
    const fetchCountries = async () => {
      const cData = await getCountries()
      console.log('countries', cData)
      if (cData) setCountries(cData)
      console.log('888', countries)
    }

    const fetchStat = async () => {
      const cData = await getStat()
      if (cData) setStats(cData)
      console.log('state is ', stat)
    }
    fetchCountries()
    fetchStat()
  }, [])

  useEffect(() => {
    const fetchMerchants = async () => {
      const cData = await getAllMerchnats()
      if (cData) setMerchants(cData)
    }
    fetchMerchants()
  }, [])

  const [success, setSuccess] = useState(false)

  const handlePincodes = (pinArray) => {
    console.log('parent', pinArray)
    setPincode(pinArray)
    setValues((a) => ({
      ...a,
      pincodes: pinArray,
    }))
    console.log('pin', pincode, values.pincodes)
    // values.pincodes=pinArray
  }

  const zones = [
    {
      label: 'Nation',
      value: 'nation',
    },
    {
      label: 'State',
      value: 'state',
    },
    {
      label: 'Locality',
      value: 'locality',
    },
  ]

  console.log('VAlues(((((((((((((((((((', values)
  const widthStyle = { width: 300 }
  let formItems = [
    {
      type: <Input value={values.location_name} name="location_name" />,
      key: 'location_name',
      label: 'Location Name',
      error: errors.location_name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: (
        <Select
          mode="default"
          // showSearch
          value={values.locality_type}
          placeholder="Select Type"
          // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          // onSearch={fetchProducts}
          onChange={(val) => {
            console.log('val', val)
            setValues((a) => ({ ...a, locality_type: val }))
            // if (val === 'state') {
            //   console.log('((((((((((')
            //   setStateMode('multiple')
            // }
            // if (val === 'locality') {
            //  setStateMode('single')
            // }
            // if (val === 'nation') {
            //   setValues((a) => ({ ...a, locality_type:'none' }))
            //  }
          }}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {hidelocalType.map((d) => (
            <Select.Option key={d.value} value={d.value}>
              {d.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'locality_type',
      label: 'Type',
      error: errors.locality_type,
    },
    {
      type: (
        <Select
          mode="default"
          // showSearch
          value={values.zone_type}
          placeholder="Select Zone"
          // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          // onSearch={fetchProducts}
          onChange={(val) => {
            console.log('val', val)
            setValues((a) => ({ ...a, zone_type: val }))
            if (val === 'state') {
              console.log('((((((((((')
              setStateMode('multiple')
              setValues((a) => ({ ...a, locality_type: 'single' ,locality_state:[]}))
              localType = localType.filter((item) => item.value !== 'none')
              setHideLocalType(localType)
            }
            if (val === 'locality') {
              setStateMode('single')
              setValues((a) => ({ ...a, locality_type: 'single' ,locality_state:''}))
              // localType = localType.filter((item) => item.value !== 'none')
              // setHideLocalType(localType)
            }
            if (val === 'nation') {
              setStateMode('single')
              setValues((a) => ({ ...a, locality_type: 'none' }))
            }
          }}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {zones.map((d) => (
            <Select.Option key={d.value} value={d.value}>
              {d.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'zone_type',
      label: 'Zone Type',
      error: errors.zone_type,
      // dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Select
          // labelInValue
          mode={stateMode}
          showSearch
          style={widthStyle}
          placeholder="Select State"
          optionFilterProp="children"
          onChange={(e) => {
            console.log('stvl', e, values.locality_district, values.pincodes)
            if (values.locality_district || values.pincodes) {
              setValues((a) => ({ ...a, locality_district: [], pincodes: [] }))
            }
            // setStateval(e)
            // values.district = ''
            // values.pincodes = ''
            setValues((a) => ({ ...a, locality_state: e }))
            if (Array.isArray(e) && e.length > 0) {
              console.log('event', e)
              fetchCity2(e)
            }
            fetchCity(e)
          }}
          name="locality_state"
          value={values.locality_state}
          // onSelect={e => setStateval(e.target.value)}

          filterOption={(input, option) => option.props.children.indexOf(input.toLowerCase()) >= 0}
        >
          {stat.map((i) => (
            <Option
              key={i}
              value={i}
              // onSelect={(e) => {
              //   console.log('stvl', stateval, e)
              //   setStateval(e)
              // }}
            >
              {i}
            </Option>
          ))}
        </Select>
      ),
      key: 'locality_state',
      label: 'State',
      error: errors.locality_state,
      // resetOnChange: 'countryId',
    },
    {
      type: (
        <Select
          // labelInValue
          mode="multiple"
          showSearch
          style={widthStyle}
          placeholder="Select District"
          optionFilterProp="children"
          // allowClear={false}
          onChange={(e) => {
            // values.pincodes = ''
            setValues((a) => ({ ...a, locality_district: e }))
            // values.pincodes = ''
            console.log('E', e)
            fetchZip2(e)
          }}
          name="locality_district"
          value={values.locality_district}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {citie?.length > 0 &&
            citie?.map((i) => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
        </Select>
      ),
      key: 'locality_district',
      label: 'District',
      error: errors.locality_district,
      resetOnChange: 'state',
    },
    {
      type: (
        <Select
          showSearch
          mode="multiple"
          style={widthStyle}
          placeholder="Select Pincode"
          optionFilterProp="children"
          onChange={(e) => {
            // setZipVal(e)
            setValues((a) => ({ ...a, pincodes: e }))
          }}
          name="pincodes"
          value={values.pincodes}
          // filterOption={(input, option) => option.props.children.indexOf(input.toLowerCase()) >= 0}
        >
          {zip.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
      ),
      label: 'Pincodes',
      key: 'pincodes',
      error: errors.pincodes,
      resetOnChange: 'district',
    },
  ]
  const options = [
    {
      type: (
        <>
          {' '}
          <Demo values={rangePincode} handlePincodes={handlePincodes} />
        </>
      ),
      label: 'Pincodes',
      key: 'pincodes',
      error: errors.pincodes,
    },
  ]

  const adminMerchantId = [
    {
      label: 'Merchant',
      error: errors.merchantId,
      key: 'merchantId',
      name: 'merchantId',
      visible: [1],
      // edit: isEdit,
      type: (
        <Select
          name="merchantId"
          value={values.merchantId}
          placeholder="Select Merchant"
          onChange={(a) => setValues((prev) => ({ ...prev, merchantId: a }))}
          // style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {merchants.map((d) => (
            <Select.Option key={d.userId} value={d.userId}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ]

  if (user.userTypeId === 1) {
    formItems = [...adminMerchantId, ...formItems]
  }
  if (values.locality_type === 'range') {
    console.log('in', options, rangePincode)
    // if(rangePincode) {
    //   setValues((a)=>({...a,pincodes:rangePincode}))
    // }

    // const filteredState = formItems.filter(
    //   (item) => item.key !== 'state' && item.key !== 'district',
    // )
    formItems = [...formItems.filter((item) => item.key !== 'pincodes'), ...options]
    // if(data){
    //   const setP =data.pincodes ? data.pincodes.some((item) => typeof item === 'object'):false
    //   console.log('setPform *********', setP)
    //   if(setP){
    //     // setValues((a) => ({ ...a, pincodes:[] }))
    //   }
    // }
  }
  if (values.locality_type === 'single') {
    console.log('FitleredITems', formItems[6], values)

    if (values.pincodes) {
      const setP = values.pincodes
        ? values.pincodes.some((item) => typeof item === 'object')
        : false
      console.log('setPform******', setP)
      if (setP) {
        setRangePinCode(values.pincodes)
        setValues((a) => ({ ...a, pincodes: [] }))
      }
    }

    // if (data.pincodes) {
    //   const setP = data.pincodes.some((item) => typeof item === 'object')
    //   console.log('setPform', setP)
    //  }
    formItems = [...formItems]
  }
  if (values.locality_type === 'none') {
    formItems = [...formItems.filter((item) => item.key !== 'pincodes')]
  }
  if (values.zone_type === 'nation') {
    const newData = formItems.filter(
      (item) => item.key !== 'pincodes' && item.key !== 'locality_state',
    )
    formItems = newData.filter(
      (item) => item.key !== 'locality_district' && item.key !== 'locality_type',
    )
  }
  if (values.zone_type === 'state') {
    const newData = formItems.filter(
      (item) => item.key !== 'pincodes' && item.key !== 'locality_district',
    )
    // localType=localType.filter(item=>item.value!=='none')
    formItems = newData
    // console.log("&&&&&&&&&&&&Abc",localType)
    // setHideLocalType(localType)
  }

  if (success) return <Redirect to="/deliverLocation" />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        console.log('item', item)
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ user }) => ({ user }))(FormA)

// const fetchCity2 = async (id) => {
//   const cData = await getCity(id)
//   if (cData) {
//     setCitie(cData)
//     // console.log("CADSASFSD",cData.map(({i})=>i))
//     setValues((a) => ({ ...a, district: cData }))
//     // console.log("district",values.district)
//     let arr1 = await Promise.all(
//       cData.map(async (i) => {
//         const cData2 = await getZip(i)
//         console.log('cData2', cData2)

//         // setValues((a) => ({ ...a, pincodes:cData2}))
//         if (cData2) return cData2
//       }),
//     )
//     console.log('arr1*******', [].concat.apply([], arr1), values.district)
//     if (arr1) setValues((a) => ({ ...a, pincodes: [].concat.apply([], arr1) }))
//   }
// }

// async function changeDistrict(e) {
//   if (e && e.length > 0) {
//     let arr1 = await Promise.all(
//       e.map(async (i) => {
//         const cData2 = await getZip(i)
//         console.log('cData2', cData2)

//         // setValues((a) => ({ ...a, pincodes:cData2}))
//         if (cData2) return cData2
//       }),
//     )
//     console.log('arr1*******', [].concat.apply([], arr1), values.district)
//     if (arr1) setValues((a) => ({ ...a, pincodes: [].concat.apply([], arr1) }))
//   }
// }

// const fetchCity3 = async (id) => {
//   const cData = await getCity(id)
//   if (cData) {
//     setCitie(cData)
//     // console.log("CADSASFSD",cData.map(({i})=>i))
//     //       setValues((a) => ({ ...a, district:cData}))
//     //     // console.log("district",values.district)
//     //  let arr1=  await Promise.all( cData.map(async(i)=>{

//     //     const cData2= await getZip(i)
//     //     console.log("cData2",cData2)

//     //     // setValues((a) => ({ ...a, pincodes:cData2}))
//     //    if(cData2) return cData2
//     //     }))
//     //   console.log("arr1*******",[].concat.apply([], arr1))
//     //     setValues((a) => ({ ...a, pincodes:[].concat.apply([], arr1)}))
//   }
// }

// {
// type: (
//     <Checkbox
//       onChange={(e) => {
//         setSelectAll(e.target.checked)

//         if (e.target.checked === false) {
//           setValues((a) => ({ ...a, pincodes: [] }))
//           setSelectMode('single')
//           setValues((a) => ({ ...a, district: '', pincodes: [] }))
//           fetchCity(values.state)
//         } else {
//           setSelectMode('multiple')
//           fetchCity2(values.state)
//           // setValues((a) => ({ ...a, district:[], pincodes: [] }))
//         }
//       }}
//       name="checkbox"
//       checked={selectAll}
//     />
//   ),
//   key: 'checkbox',
//   label: 'Select All',
//   error: errors.checkbox,
// },
