import React, { useEffect, useState } from 'react'
import { Form, Input, Upload, Button, Icon, Radio, InputNumber, notification } from 'antd'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { safetyAdvice } from 'utils/Schema'
import { Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import useUpload from 'hooks/useUpload'
import isEmpty from 'lodash/isEmpty'
import useDidMountEffect from 'hooks/useDidMountEffect'
import { addSafetyAdvice, editSafety } from 'services/safetyAdvice'
import { STRINGS } from '_constants'
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
// import FormIndex from 'pages/catalog/products/add-edit'
// import './AddForm.css'

const FormIndex = (props) => {
  console.log('props', props)
  const { data } = props

  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialvalues = {
    status: 'active',
  }

  useEffect(() => {
    console.log('ISEMOPUY', data)
    if (!isEmpty(data)) {
      const icon = [
        {
          // eslint-disable-next-line no-underscore-dangle
          uid: data.icon._id,
          name: getBaseName(data.icon.url),
          url: data.icon.url,
          thumbnail: data.icon.url,
        },
      ]
      // beforeUploadMain(icon[0])
      setFileListMain(icon)
      setValues({
        ...data,
        icon,
      })
    }
  }, [data])



  const [redirect, setRedirect] = useState(false)

  const fetchSubmit = async (values) => {
    console.log('12121212', values)
    // eslint-disable-next-line no-underscore-dangle
    const a = data ? await editSafety(data._id, values, data) : await addSafetyAdvice(values)

    setSubmitting(false)
    console.log('7777777', a)
    if (a) {
      console.log('fgf')
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
        // description: STRINGS.addSuccess,
      })
      setRedirect(true)
    }
    // const a = await addCategory(values)
    // if (a)
  }

  const submitForm = () => {
    try {
      fetchSubmit(values)
    } catch (err) {
      setSubmitting(false)
    }
  }

  const {
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
    setFileList: setFileListMain,
  } = useUpload(1)

  const propsMainImage = {
    listType: 'picture',
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
  }

  console.log("fileList",fileListMain)
  useDidMountEffect(() => {
    setValues((a) => ({
      ...a,
      icon: fileListMain,
    }))
    console.log("Values.iconin did mount",values.icon)
  }, [fileListMain])

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm
  } = useFormValidation(initialvalues, safetyAdvice, submitForm)
  console.log('**********1**********', values, errors)

  const formItems = [
    { heading: 'General Info' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue={values.status} buttonStyle="solid">
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
      label: 'Icon',
      error: errors.icon,
      key: 'icon',
      type: (
        <>
          {' '}
          <Upload {...propsMainImage} name="icon" listType="picture">
            <Button>
              <Icon type="upload" /> Select file
            </Button>
          </Upload>
        </>
      ),
    },
    {
      type: (
        <InputNumber
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
  ]

  console.log('redirect', redirect)
  if (redirect) return <Redirect to="/catalog/safetyAdvice" />
  return (
    <Form
      className="form-box"
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
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

export default FormIndex
