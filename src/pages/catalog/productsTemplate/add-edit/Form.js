/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Input, Button, Icon, Radio, InputNumber, notification, Select } from 'antd'
import { productTemplateSchema } from 'utils/Schema'
// import { getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import { addProductTemplate, editProductTemplate } from 'services/productTemplate'
import { STRINGS } from '_constants'
// import Upload from 'components/Upload'
import Form from 'components/Form'
import shortid from 'shortid'
import Upload from 'components/Upload'
// import ReactS3Client from 'utils/s3Bucket'
import { multipleImageUpload } from 'utils/s3ImageUploader'
// import AWS from 'aws-sdk'

const FormA = ({ data, categories, brands }) => {
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
      // const images = data.images.map((cur) => {
      //   const newId = shortid.generate()
      //   const item = {
      //     value: cur,
      //     _id: newId,
      //   }
      //   return item
      // })

      setValues({
        ...data,
        brandId: data.brand.id,
        categoryId: data.category.id,
        images: data.images.map((cur, i) => {
          return {
            uid: i + Math.random() * 10,
            url: cur,
          }
        }),
        lengthClass: data.shippingDetail.lengthClass,
        weightClass: data.shippingDetail.weightClass,
        height: data.shippingDetail.height,
        length: data.shippingDetail.length,
        width: data.shippingDetail.width,
        weight: data.shippingDetail.weight,
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
    console.log(formValues.images, 'show-image-pls')

    const uploadedImages = await multipleImageUpload(formValues.images)

    // const imagesArray = await formValues.images.reduce(async (result, el) => {
    //   if (el.originFileObj) {
    //     try {
    //       const asyncResult = await ReactS3Client.uploadFile(
    //         el.originFileObj,
    //         // formValues.images[1].originFileObj.name,
    //       )
    //       if (asyncResult) {
    //         ;(await result).push(asyncResult.location)
    //       }
    //     } catch (err) {
    //       // (await result).push(result.location);
    //       notification.error({
    //         message: 'Cannot upload Newly added Images',
    //       })

    //       console.log(err.message, 'pls')
    //     }
    //   } else {
    //     ;(await result).push(el.url)
    //   }

    //   return result
    // }, [])

    // const asyncResult = await someAsyncTask(el)
    // if (asyncResult) {
    //   ;(await result).push(newSavedFile)
    // }
    // return result

    // eslint-disable-next-line func-names
    // const sendableImages = formValues.images.reduce(function (pV, cV, cI) {
    //   if (cV.originFileObj) {
    //     ReactS3Client.uploadFile(
    //       cV.originFileObj,
    //       // formValues.images[1].originFileObj.name,
    //     )
    //       .then((imgData) => {
    //         console.log('the-loxc', imgData.location)
    //         pV.push(imgData.location)
    //         // return imgData.location
    //         // window.images.push(imgData.location)
    //         // window.uploadedStatus = true
    //       })
    //       .catch((err) => {
    //         // window.uploadedStatus = false
    //         pV = []
    //         console.log(err.message, 'errrrror-img')
    //       })
    //     // return res
    //   }

    //   return pV // *********  Important ******
    // }, [])

    // const uploadedImages = formValues.images.map(async (cur) => {
    //   if (cur.originFileObj) {
    //     const res = await ReactS3Client.uploadFile(
    //       cur.originFileObj,
    //       // formValues.images[1].originFileObj.name,
    //     )
    //       .then((imgData) => {
    //         return imgData.location
    //         // window.images.push(imgData.location)
    //         // window.uploadedStatus = true
    //       })
    //       .catch((err) => {
    //         // window.uploadedStatus = false
    //         console.log(err.message, 'errrrror-img')
    //       })
    //     return res
    //   }
    //   return cur
    // })
    // let datas = []

    // Promise.all(uploadedImages).then(function (results) {
    //   datas = results
    // })

    // console.log(imagesArray, 'hlooo')

    // AWS.config.update({
    //   accessKeyId: 'AKIA2MGENPR2BQUY3Y4Q',
    //   secretAccessKey: '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',
    // })

    // const myBucket = new AWS.S3({
    //   params: { Bucket: S3_BUCKET },
    //   region: REGION,
    // })

    // const uploadFile = (file) => {
    //   const params = {
    //     ACL: 'public-read',
    //     Body: formValues.images[1].originFileObj,
    //     Bucket: S3_BUCKET,
    //     Key: formValues.images[1].name,
    //   }

    //   myBucket
    //     .upload(params)
    //     .then((dataImg) => console.log('Data:', dataImg))
    //     .catch((err) => {
    //       console.log('err => ', err.message)
    //     })

    // .putObject(params)
    // // .on('httpUploadProgress', (evt) => {
    // //     setProgress(Math.round((evt.loaded / evt.total) * 100))
    // // })
    // .send((err, dataImg) => {
    //   if (err) {
    //     console.log(err.code, 'poi-code')
    //     console.log(err.message, 'poi-message')
    //   }
    //   if (dataImg) console.log(dataImg.response, 'kitti')
    // })
    // }

    // uploadFile()

    console.log('formValues', formValues)
    const sendingData = {
      brandId: formValues.brandId,
      categoryId: formValues.categoryId,
      name: formValues.name,
      description: formValues.description,
      images: uploadedImages,
      productType: formValues.productType,
      allowedPaymentTypes: formValues.allowedPaymentTypes,
      returnable: formValues.returnable,
      returnPeriod: formValues.returnPeriod,
      allowedQuantityPerOrder: formValues.allowedQuantityPerOrder,
      presriptionRequired: formValues.presriptionRequired,
      priority: formValues.priority,
      // status: formValues.status,
      shippingDetail: {
        lengthClass: formValues.lengthClass,
        weightClass: formValues.weightClass,
        height: formValues.height,
        length: formValues.length,
        width: formValues.width,
        weight: formValues.weight,
      },
    }
    // const modImgs = formValues?.image?.map((i) => i.originFileObj)
    let a

    if (data) {
      a = await editProductTemplate(data.id, sendingData)
    } else {
      a = await addProductTemplate({ ...sendingData })
    }
    // const a = data
    //   ? await editBrand(data.id, formValues, data)
    //   : // : await addBrand({ ...formValues, image: modImgs })
    //     await addBrand({ ...formValues })

    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  // const onFilelistChange = (name, value) => setValues((a) => ({ ...a, [name]: value }))

  const onFilelistChange = (value, name, current) => {
    console.log(value, name, current, 'show-the-right')

    // return setValues((a) => ({ ...a, [name]: value }))
    setValues((a) => ({ ...a, [name]: value }))
    // console.log(name, value, 'heyyyy')
  }

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

  console.log(values, 'show mee')

  const formItems = [
    { heading: 'General', key: 'general' },
    {
      type: <Input name="name" />,
      key: 'name',
      label: 'Name',
    },
    {
      type: <Input name="description" />,
      key: 'description',
      label: 'description',
    },

    {
      type: (
        <Select
          value={values.productType}
          name="productType"
          placeholder="Select productType"
          onChange={(e) => setValues((a) => ({ ...a, productType: e }))}
        >
          <Select.Option key="Medicine" value="Medicine">
            Medicine
          </Select.Option>
        </Select>
      ),
      key: 'productType',
      label: 'ProductType',
    },

    {
      type: (
        <Select
          value={values.returnable}
          name="returnable"
          placeholder="Select Returnable"
          onChange={(e) => setValues((a) => ({ ...a, returnable: e }))}
        >
          <Select.Option key={true} value={true}>
            Yes
          </Select.Option>
          <Select.Option key={false} value={false}>
            No
          </Select.Option>
        </Select>
      ),
      key: 'returnable',
      label: 'Returnable',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="returnPeriod"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'returnPeriod',
      label: 'Return Period',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="allowedQuantityPerOrder"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'allowedQuantityPerOrder',
      label: 'AllowedQuantityPerOrder',
    },
    {
      type: (
        <Select
          value={values.presriptionRequired}
          name="presriptionRequired"
          placeholder="Select PresriptionRequired"
          onChange={(e) => setValues((a) => ({ ...a, presriptionRequired: e }))}
        >
          <Select.Option key={true} value={true}>
            Yes
          </Select.Option>
          <Select.Option key={false} value={false}>
            No
          </Select.Option>
        </Select>
      ),
      key: 'presriptionRequired',
      label: 'PresriptionRequired',
    },

    // {
    //   type: (
    //     <Radio.Group name="status" defaultValue="Hold" buttonStyle="solid">
    //       <Radio.Button value="Active">Active</Radio.Button>
    //       <Radio.Button value="Hold">Hold</Radio.Button>
    //     </Radio.Group>
    //   ),
    //   key: 'status',
    //   label: 'Status',
    // },

    // {
    //   type: <Input name="images" />,
    //   key: 'images',
    //   label: 'Image Url',
    // },
    {
      label: 'Images',
      key: 'images',
      name: 'images',
      // dependency: 'linktoBase',
      type: (
        <>
          <Upload name="images" defaultFileList={values.images} onChange={onFilelistChange}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      type: (
        <Select
          value={values.categoryId}
          name="categoryId"
          placeholder="Select Category"
          onChange={(e) => setValues((a) => ({ ...a, categoryId: e }))}
        >
          {categories?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.name}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'categoryId',
      label: 'Category',
    },
    {
      type: (
        <Select
          value={values.brandId}
          name="brandId"
          placeholder="Select Brand"
          onChange={(e) => setValues((a) => ({ ...a, brandId: e }))}
        >
          {brands?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.name}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'brandId',
      label: 'Brand',
    },
    {
      type: (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          defaultValue={values.allowedPaymentTypes}
          // onChange={handleChange}
        >
          <Select.Option key="Cod" value="Cod">
            Cod
          </Select.Option>
          <Select.Option key="Online" value="Online">
            Online
          </Select.Option>
        </Select>
      ),
      key: 'allowedPaymentTypes',
      label: 'AllowedPaymentTypes',
    },

    {
      heading: 'Shipping Details',
      key: 'shippingDetails',
    },

    {
      type: (
        <Select
          value={values.lengthClass}
          name="lengthClass"
          placeholder="Select Length Class"
          onChange={(e) => setValues((a) => ({ ...a, lengthClass: e }))}
        >
          <Select.Option key="centimeter" value="centimeter">
            centimeter
          </Select.Option>
        </Select>
      ),
      key: 'lengthClass',
      label: 'lengthClass',
    },

    {
      type: (
        <Select
          value={values.weightClass}
          name="weightClass"
          placeholder="Select Weight Class"
          onChange={(e) => setValues((a) => ({ ...a, weightClass: e }))}
        >
          <Select.Option key="kilograms" value="kilograms">
            kilograms
          </Select.Option>
        </Select>
      ),
      key: 'weightClass',
      label: 'weightClass',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="height"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'height',
      label: 'Height',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="length"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'length',
      label: 'Length',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="width"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'width',
      label: 'Width',
    },
    {
      type: (
        <InputNumber
          // onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="weight"
          // value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'weight',
      label: 'Weight',
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

  if (success) return <Redirect to="/catalog/productsTemplate" />

  return (
    <Form
      onSubmit={submitForm}
      schema={productTemplateSchema}
      initialValues={values}
      formItems={formItems}
    />
  )
}

export default withRouter(FormA)
