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
        images: data.images[0],
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
    console.log('formValues', formValues)
    const sendingData = {
      brandId: formValues.brandId,
      categoryId: formValues.categoryId,
      name: formValues.name,
      description: formValues.description,
      images: [formValues.images],
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

    {
      type: <Input name="images" />,
      key: 'images',
      label: 'Image Url',
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
