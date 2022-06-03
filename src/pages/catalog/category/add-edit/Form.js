/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  // Icon,
  Radio,
  // InputNumber,
  // TreeSelect,
  notification,
  // eslint-disable-next-line no-unused-vars
  Select,
  Upload,
  Icon,
} from 'antd'
import { categorySchema } from 'utils/Schema'
// eslint-disable-next-line no-unused-vars
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
// import Upload from 'components/Upload'
import { addCategory, editCategory } from 'services/categories'
import { STRINGS } from '_constants'
import useUpload from 'hooks/useUpload'
// import ReactS3Client from 'utils/s3Bucket'
import { singleImageUploader } from 'utils/s3ImageUploader'

// const dropdownStyle = { maxHeight: 400, overflow: 'auto' }

// eslint-disable-next-line no-unused-vars
const FormA = ({ categories, data, disclaimer, customOffer }) => {
  console.log(categories)
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'Hold',
  }

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
      setValues({
        ...data,
        image: himg,
        // parent: data.parent,
        // metaTitle: data.seo.metaTitle,
        // metaKeywords: data.seo.metaKeywords,
        // metaDescription: data.seo.metaDescription,
      })
      console.log(initialValues)
      setFileListImages(himg)
    }
  }, [data])

  useEffect(() => {
    setValues((a) => ({ ...a, image: fileListImages }))
  }, [fileListImages])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    console.log(values.image, 'show-mee')
    // setImgValue, defaultValueUrl
    const imgValue = await singleImageUploader(
      values.image[0].originFileObj,
      values.image,
      values.image[0].url,
    )
    values.image = imgValue
    // if (values.image[0].originFileObj) {
    //   try {
    //     const asyncResult = await ReactS3Client.uploadFile(
    //       values.image[0].originFileObj,
    //       // formValues.images[1].originFileObj.name,
    //     )
    //     values.image = asyncResult.location
    //   } catch (err) {
    //     // (await result).push(result.location);
    //     notification.error({
    //       message: 'Cannot upload Newly added Images',
    //     })

    //     console.log(err.message, 'pls')
    //   }
    // } else {
    //   values.image = values.image[0].url
    // }

    // const modImgs = values.image.map((i) => i.originFileObj)
    const a = data ? await editCategory(data.id, values, data) : await addCategory({ ...values }) // image: modImgs
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  // const onFilelistChange = (value, name) => setValues((a) => ({ ...a, [name]: value }))

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }

  console.log(initialValues)
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
  } = useFormValidation(initialValues, categorySchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values.image)

  const formItems = [
    { heading: 'General' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      label: 'Image',
      error: errors.image,
      key: 'image',
      name: 'image',
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
    //   type: <Input value={values.image} name="image" />,
    //   key: 'image',
    //   label: 'Image',
    //   error: errors.image,
    // },
    {
      type: (
        <Radio.Group name="status" defaultValue="Hold" buttonStyle="solid">
          <Radio.Button checked={values.status === 'Active'} value="Active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'Hold'} value="Hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    // {
    //   type: (
    //     <InputNumber
    //       type="number"
    //       onChange={(e) => setValues((a) => ({ ...a, priorityOrder: e }))}
    //       name="priorityOrder"
    //       value={values.priorityOrder}
    //       min={0}
    //     />
    //   ),
    //   key: 'priorityOrder',
    //   label: 'Priority ',
    //   error: errors.priorityOrder,
    // },
    // {
    //   type: (
    //     <TreeSelect
    //       // style={{ width: 300 }}
    //       value={values.parentId}
    //       dropdownStyle={dropdownStyle}
    //       treeData={categories}
    //       placeholder="Please select parent"
    //       treeDefaultExpandAll
    //       onChange={(e) => setValues((a) => ({ ...a, parentId: e }))}
    //     />
    //   ),
    //   key: 'parentId',
    //   label: 'ParentId',
    //   error: errors.parent,
    // },
    {
      type: (
        <Select
          value={values.parentId}
          name="parentId"
          placeholder="Select Parent"
          onChange={(e) => setValues((a) => ({ ...a, parentId: e }))}
        >
          {categories?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.name}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'parentId',
      label: 'parent',
      error: errors.parentId,
    },

    // {
    //   type: <Input.TextArea value={values.description} name="description" />,
    //   key: 'description',
    //   label: 'Description',
    //   error: errors.description,
    // },
    // {
    //   type: (
    //     <Select
    //       mode="multiple"
    //       value={values.custome_offer}
    //       name="custome_offer"
    //       placeholder="Select Offer"
    //       onChange={(e) => setValues((a) => ({ ...a, custome_offer: e }))}
    //     >
    //       {customOffer?.map((i) => (
    //         <Select.Option key={i._id} value={i._id}>
    //           {`${i.name}`}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    //   key: 'custome_offer',
    //   label: 'Custom Offer',
    //   error: errors.custome_offer,
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
    // {
    //   type: <Input value={values.imageTag} name="imageTag"  />,
    //   key: 'imageTag',
    //   label: 'Image Tag',
    //   error: errors.imageTag,
    // },
    // {
    //   label: 'Images',
    //   error: errors.image,
    //   key: 'image',
    //   name: 'image',
    //   type: (
    //     <>
    //       {' '}
    //       <Upload name="image" onChange={onFilelistChange} defaultFileList={values.image}>
    //         {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
    //         <Button>
    //           <Icon type="upload" /> Select File
    //         </Button>
    //       </Upload>
    //     </>
    //   ),
    // },
    // {
    //   heading: 'SEO',
    // },
    // {
    //   type: <Input value={values.metaTitle} name="metaTitle" />,
    //   key: 'metaTitle',
    //   label: 'Meta Title',
    //   error: errors.metaTitle,
    // },
    // {
    //   type: <Input value={values.metaDescription} name="metaDescription" />,
    //   key: 'metaDescription',
    //   label: 'Meta Description',
    //   error: errors.metaDescription,
    // },
    // {
    //   type: <Input value={values.metaKeywords} name="metaKeywords" />,
    //   key: 'metaKeywords',
    //   label: 'Meta Keywords',
    //   error: errors.metaKeywords,
    // },
  ]

  if (success) return <Redirect to="/catalog/category" />

  return (
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
