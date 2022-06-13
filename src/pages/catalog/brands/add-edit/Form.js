/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Input, Button, Icon, Radio, InputNumber, notification, Upload, Form } from 'antd'
import { brandSchema } from 'utils/Schema'
// import { getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import { addBrand, editBrand } from 'services/brands'
import { STRINGS } from '_constants'
// import Upload from 'components/Upload'
// import Form from 'components/Form'
// import SingleImageUpload from 'components/ImageUpload/SingleUpload'
import { formItemLayout, getBaseName, tailFormItemLayout } from 'utils'
import useUpload from 'hooks/useUpload'
import { singleImageUploader } from 'utils/s3ImageUploader'
import useFormValidation from 'hooks/useFormValidation'

const FormA = ({ data }) => {
  const initialValues = {
    status: 'Hold',
  }

  // const [values, setValues] = useState(initialValues)

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  useEffect(() => {
    if (data) {
      let himg = []
      if (data.image) {
        // himg = data.images.map((item) => {
        himg = [
          {
            uid: Math.random() * 1000,
            name: getBaseName(data.image),
            url: data.image,
            thumbUrl: data.image,
          },
        ]
        // })
      }

      // let himg = []
      // if (data.image.length > 0) {
      //   himg = data.image.map(item => {
      //     return {
      //       uid: item._id,
      //       name: getBaseName(item.url),
      //       url: item.url,
      //       thumbnail: item.thumbnail,
      //     }
      //   })
      // }
      setValues({
        ...data,
        image: himg,
        // parent: data.parent,
        // metaTitle: data.seo.metaTitle,
        // metaKeywords: data.seo.metaKeywords,
        // metaDescription: data.seo.metaDescription,
      })
      setFileListImages(himg)
      console.log(initialValues)
    }
  }, [data])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(values, 'hey-me')
    setValues((a) => ({ ...a, image: fileListImages }))
  }, [fileListImages])

  const [success, setSuccess] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const fetchSubmit = async (formValues) => {
    console.log('formValues', formValues)

    const imgValue = await singleImageUploader(
      values.image[0].originFileObj,
      values.image,
      values.image[0].url,
    )
    values.image = imgValue

    // const modImgs = formValues?.image?.map((i) => i.originFileObj)
    const a = data
      ? await editBrand(data.id, values, data)
      : // : await addBrand({ ...formValues, image: modImgs })
        await addBrand({ ...values })

    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  // const onFilelistChange = (name, value) => setValues(a => ({ ...a, [name]: value }))

  const submitForm = (val) => {
    try {
      console.log('will submitform', val)
      fetchSubmit(val)
    } catch (err) {
      // setSubmitting(false)
    }
    // setSubmitting(false)
  }

  console.log(initialValues)

  console.log(values)

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
  } = useFormValidation(initialValues, brandSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values.image)

  const formItems = [
    { heading: 'General', key: 'general' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="Hold" buttonStyle="solid">
          <Radio.Button value="Active">Active</Radio.Button>
          <Radio.Button value="Hold">Hold</Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="priority"
          value={values.priority}
          min={0}
        />
      ),
      key: 'priority',
      label: 'Priority ',
      error: errors.name,
    },

    // {
    //   type: <Input name="image" />,
    //   key: 'image',
    //   label: 'Image Url',
    // },
    {
      label: 'Image',
      key: 'image',
      name: 'image',
      error: errors.image,
      type: (
        <>
          <Upload listType="picture-card" name="image" {...propsImages}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    // {
    //   label: 'Images',
    //   key: 'image',
    //   name: 'image',
    //   type: (
    //     <Upload
    //       name="image"
    //       defaultFileList={values.image}
    //       // maxCount={}
    //       // onChange={onFilelistChange}
    //     >
    //       {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
    //       <Button>
    //         <Icon type="upload" /> Select File
    //       </Button>
    //     </Upload>
    //   ),
    // },
    // {
    //   heading: 'SEO',
    //   key: 'seo',
    // },
    // {
    //   type: <Input name="metaTitle" />,
    //   key: 'metaTitle',
    //   label: 'Meta Title',
    // },
    // {
    //   type: <Input name="metaDescription" />,
    //   key: 'metaDescription',
    //   label: 'Meta Description',
    // },
    // {
    //   type: <Input name="metaKeywords" />,
    //   key: 'metaKeywords',
    //   label: 'Meta Keywords',
    // },
  ]

  if (success) return <Redirect to="/catalog/brands" />

  return (
    // <Form onSubmit={submitForm} schema={brandSchema} initialValues={values} formItems={formItems} />
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
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
