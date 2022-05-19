/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, Form, Select, Radio, Input } from 'antd'
import PropTypes from 'prop-types'
import Editor from 'components/Editor/index'
import { getSafetyAdvice, getTherapy } from 'services'
import { FormContext } from '../tabs'

const widthStyle = { width: 300 }
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const SafetyAdvice = ({ hideSubmit, hasTitle,data, index,formControls ,show }) => {
  console.log("Data &&&&&&&&&",data,index ,data.description)
  const formContext = React.useContext(FormContext)
  const [safetyAdvicelist, setSafetyAdviceList] = useState([])
  const [therapylist, setTherapyList] = useState([])

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    setValues,
    // setSubmitting,
    isSubmitting,

    // validateForm,
  } = formControls || formContext

  console.log('values', values, safetyAdvicelist, therapylist)

  useEffect(() => {
    const fetchSafety = async () => {
      const cData = await getSafetyAdvice()
      console.log('DAta***************Advice', cData)
      if (cData) setSafetyAdviceList(cData)
    }
    const fetchtherapy = async () => {
      const cData = await getTherapy()
      console.log('DAta***************therapy', cData)
      if (cData) setTherapyList(cData)
    }
    fetchSafety()
    fetchtherapy()
  }, [])

  // const handleEditorChangeQuickTip = (e) => {
  //   console.log("Event",e)

  //   setValues((a) => ({ ...a,quickTip: e }))
  // }
  // const handleEditorChangeFaq = (e) => {
  //   console.log("Event",e)
  //   setValues((a) => ({ ...a,faq: e }))
  // }
  // const handleEditorChangeRefrences = (e) => {
  //   console.log("Event",e)
  //   setValues((a) => ({ ...a,references: e }))  
  // }

  const handleEditorChangeDescription = (e) => {
    console.log("Event",e)
    setValues((a) => {
      a.safe[index].description = e
       return { ...a }
     }) 
  }

  const statusTagOption = [
    {
      label: 'UNSAFE',
      value: 'UNSAFE',
    },
    {
      label: 'SAFE IF PRESCRIBED',
      value: 'SAFE IF PRESCRIBED',
    },
    {
      label: 'CAUTION',
      value: 'CAUTION',
    },
    {
      label: 'CONSULT YOUR DOCTOR',
      value: 'CONSULT YOUR DOCTOR',
    },
  ]

  //   quickTip : HTML CONTENT
  // faq : HTML CONTENT
  // references : HTML CONTENT
  // therapeutic_class : 5faaa10e166f7b26ebde8c26(ID FROM THERAPEUTIC API-LIST BOX)
  // habitForming : ENUM(Yes or No)
  // NB: safety_advice: (ID FROM SAFETY ADVICE API-LIST BOX)
  // status_tag: ENUM("UNSAFE", "SAFE IF PRESCRIBED","CAUTION","CONSULT YOUR DOCTOR")
  // description: STRING
  const formItems = [
    // { heading: hasTitle ? 'Safety Advice' : '' },
    {
      type: (
        <Select
          // mode="multiple"
          // name="safety_advice"
          // name={}
          value={data.safety_advice}
          // showSearch
          style={widthStyle}
          placeholder="Select Safety Advice"
          // optionFilterProp="children"
          onChange={(e) => {
            setValues((a) => {
              a.safe[index].safety_advice = e
               return { ...a }
             })
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {safetyAdvicelist.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'safety_advice',
      label: 'Safety Advice',
      error: errors.safety_advice,
      // dependency: 'prescriptionNeeded',
    },
     {
      type: (
        <Select
          mode="default"
          // showSearch
          value={data.status_tag}
          placeholder="Select Status Tag"
          // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          // onSearch={fetchProducts}
          onChange={(val) => {
            console.log("val",val)
            setValues((a) => {
             a.safe[index].status_tag = val
              return { ...a }
            })
          }}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {statusTagOption.map((d) => (
            <Select.Option key={d.value} value={d.value}>
              {d.label}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'status_tag',
      label: 'Status Tag',
      error: errors.status_tag,
      // dependency: 'prescriptionNeeded',
    },
    {
      type:  (
        <Editor
          placeholder="Write something..."
          editorHtml={data.description || ''}
          onChange={handleEditorChangeDescription}
        />
      ),

      label: 'description',
      key: 'Description',
      error: errors.description,
      dependency: 'prescriptionNeeded',
    },
   

  ]

  return (
    <>
      {/* <Form
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
        {...formItemLayout}
      > */}
        {formItems.map((item) => {
          if (item.heading)
            return (
              <h4 key={item.heading} className="text-black mb-3">
                <strong>{item.heading}</strong>
              </h4>
            )
            // if (item.dependency && item.dependency === 'prescriptionNeeded') {
            //   if (
            //     values[item.dependency] === 'true' ||
            //     values[item.dependency] === true ||
            //     item.render === true
            //   ) {
            //     console.log(values[item.dependency], typeof values[item.dependency])
            //     return (
            //       <Form.Item
            //         key={item.key}
            //         label={item.label}
            //         validateStatus={item.error && 'error'}
            //         help={item.error}
            //       >
            //         {item.type}
            //       </Form.Item>
            //     )
            //   }
            //   return null
            // }
  
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
        {/* {!hideSubmit && (
          <Form.Item>
            <Button disabled={isSubmitting} type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        )} */}
      {/* </Form> */}
    </>
  )
}

SafetyAdvice.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

SafetyAdvice.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default SafetyAdvice
