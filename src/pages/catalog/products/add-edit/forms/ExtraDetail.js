/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, Form, Select, TreeSelect, Radio, Input } from 'antd'
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

const { TreeNode } = TreeSelect

const SafetyAdvice = ({ hideSubmit, hasTitle, formControls }) => {
  //   console.log("Data &&&&&&&&&" )
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

  const handleEditorChangeQuickTip = (e) => {
    console.log('Event', e)

    setValues((a) => ({ ...a, quickTip: e }))
  }
  const handleEditorChangeFaq = (e) => {
    console.log('Event', e)
    setValues((a) => ({ ...a, faq: e }))
  }
  const handleEditorChangeRefrences = (e) => {
    console.log('Event', e)
    setValues((a) => ({ ...a, references: e }))
  }

  const handleEditorChangeDescription = (e) => {
    console.log('Event', e)
    setValues((a) => {
      a.safe[index].description = event.target.value
      return { ...a }
    })
  }

  const formItems = [
    // { heading: hasTitle ? 'Extra Details' : '' },
    {
      type: (
        <TreeSelect
          // mode="tags"
          name="therapeutic_class"
          value={values.therapeutic_class}
          // showSearch
          //   style={widthStyle}
          allowClear
          placeholder="Select Therapeutic Class"
          // optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, therapeutic_class: e }))}
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {therapylist.map((value, i) => (
            <TreeNode value={value._id} title={value.name} isLeaf={!value.parent}>
              {value.parent && (
                <TreeNode
                  value={value.parent._id}
                  title={value.parent.name}
                  isLeaf={!value.parent.parent}
                >
                  {value.parent.parent && (
                    <TreeNode
                      value={value.parent.parent._id}
                      title={value.parent.parent.name}
                      isLeaf={!value.parent.parent.parent}
                    />
                  )}
                </TreeNode>
              )}
            </TreeNode>
          ))}
        </TreeSelect>
      ),
      key: 'therapeutic_class',
      label: 'Therapeutic Class',
      error: errors.therapeutic_class,
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Radio.Group name="habitForming" defaultValue={values.habitForming} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.habitForming === 'Yes'} value="Yes">
            Yes
          </Radio.Button>
          <Radio.Button checked={values.habitForming === 'No'} value="No">
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'habitForming',
      label: 'Habit Forming',
      error: errors.habitForming,
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          editorHtml={values.quickTip || ''}
          onChange={handleEditorChangeQuickTip}
        />
      ),
      label: 'Tip',
      error: errors.quickTip,
      key: 'quickTip',
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          editorHtml={values.references || ''}
          onChange={handleEditorChangeRefrences}
        />
      ),
      label: 'References',
      error: errors.references,
      key: 'references',
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          editorHtml={values.faq || ''}
          onChange={handleEditorChangeFaq}
        />
      ),
      label: 'Faq',
      error: errors.faq,
      key: 'faq',
      dependency: 'prescriptionNeeded',
    },
  ]

  return (
    <>
      <Form
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
        {...formItemLayout}
      >
        {formItems.map((item) => {
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
        {!hideSubmit && (
          <Form.Item>
            <Button disabled={isSubmitting} type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        )}
      </Form>
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
