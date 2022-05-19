/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  TreeSelect,
  notification,
  // Select,
} from 'antd'
import { therepySchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import isEmpty from 'lodash/isEmpty'
import { STRINGS } from '_constants'
import { editTherepy, addTherepyClass } from 'services/therepy'

const dropdownStyle = { maxHeight: 400, overflow: 'auto' }

const FormA = ({ categories, data }) => {
  console.log('categories in props', categories, data)
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      setValues({
        ...data,
        parent: data.parent === null ? null : data.parent._id,
      })
      console.log('initailsVlaues', initialValues)
    }
  }, [data])

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    console.log('values', values)
        // eslint-disable-next-line no-underscore-dangle
    const a = data ? await editTherepy(data._id, values) : await addTherepyClass(values)
    console.log('7777777', a)
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }

  console.log('initails', initialValues)
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
  } = useFormValidation(initialValues, therepySchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log('VAlues', values)

  const formItems = [
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
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
        <InputNumber
          type="number"
          onChange={(e) => setValues((a) => ({ ...a, priorityOrder: e }))}
          name="priorityOrder"
          value={values.priorityOrder}
          min={1}
        />
      ),
      key: 'priorityOrder',
      label: 'Priority ',
      error: errors.priorityOrder,
    },
    {
      type: (
        <TreeSelect
          // style={{ width: 300 }}
          value={values.parent}
          dropdownStyle={dropdownStyle}
          treeData={categories}
          placeholder="Please select parent"
          treeDefaultExpandAll
          onChange={(e) => setValues((a) => ({ ...a, parent: e }))}
        />
      ),
      key: 'parent',
      label: 'Parent',
      error: errors.parent,
    },
    // {
    //   type: <Input value={values.slug} name="slug" />,
    //   key: 'slug',
    //   label: 'Slug',
    //   error: errors.slug,
    // },

    // {
    //   type: (
    //     <Select
    //       mode="multiple"
    //       onChange={(e) => setValues((a) => ({ ...a, disclaimer: e }))}
    //       value={values.disclaimer}
    //       name="disclaimer"
    //       placeholder="Select Disclemer"
    //     >
    //       {disclaimer?.map((i) => (
    //         <Select.Option key={i._id} value={i._id}>
    //           {`${i.name}`}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    //   key: 'disclaimer',
    //   label: 'Disclaimer',
    //   error: errors.disclaimer,
    // },
  ]

  if (success) return <Redirect to="/catalog/therepyClass" />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
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

export default withRouter(FormA)
