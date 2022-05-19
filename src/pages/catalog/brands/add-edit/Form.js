/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Input, Button, Icon, Radio, InputNumber, notification } from 'antd'
import { brandSchema } from 'utils/Schema'
// import { getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import { addBrand, editBrand } from 'services/brands'
import { STRINGS } from '_constants'
// import Upload from 'components/Upload'
import Form from 'components/Form'

const FormA = ({ data }) => {
  const initialValues = {
    status: 'Hold',
  }

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (data) {
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
        // name: data.name,
        // image: himg,
        // metaTitle: data.seo.metaTitle,
        // metaKeywords: data.seo.metaKeywords,
        // metaDescription: data.seo.metaDescription,
      })
      console.log(initialValues)
    }
  }, [data])

  const [success, setSuccess] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const fetchSubmit = async (formValues) => {
    console.log('formValues', formValues)
    // const modImgs = formValues?.image?.map((i) => i.originFileObj)
    const a = data
      ? await editBrand(data.id, formValues, data)
      : // : await addBrand({ ...formValues, image: modImgs })
        await addBrand({ ...formValues })

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

  const formItems = [
    { heading: 'General', key: 'general' },
    {
      type: <Input name="name" />,
      key: 'name',
      label: 'Name',
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
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'priority',
      label: 'Priority ',
    },

    {
      type: <Input name="image" />,
      key: 'image',
      label: 'Image Url',
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
    <Form onSubmit={submitForm} schema={brandSchema} initialValues={values} formItems={formItems} />
  )
}

export default withRouter(FormA)
