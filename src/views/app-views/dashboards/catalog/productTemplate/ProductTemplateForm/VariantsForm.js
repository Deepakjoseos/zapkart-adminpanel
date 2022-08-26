import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import productTemplateService from 'services/productTemplate'
import { useHistory, useParams } from 'react-router-dom'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import attributeService from 'services/attribute'

const VariantsForm = ({
  form,
  openVariantsForm,
  setOpenVariantsForm,
  selectedVariant,
  setSelectedVariant,
  refreshData,
}) => {
  const { Option } = Select
  const history = useHistory()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [images, setImages] = useState([])
  const [attributes, setAttributes] = useState([])
  const [selectedAttributeValues, setSelectedAttributeValues] = useState([])

  const { id } = useParams()

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  const rules = {
    name: [
      {
        required: true,
        message: 'Required',
      },
    ],
    description: [
      {
        required: true,
        message: 'Required',
      },
    ],
    images: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }

  useEffect(() => {
    if (selectedVariant) {
      console.log(selectedVariant.description, 'desc')
      form.setFieldsValue({
        description: selectedVariant.description,
        name: selectedVariant.name,
        attributes: selectedVariant.attributes.map((attr) => {
          return { attributeId: attr.id, valueId: attr.value.id }
        }),
      })

      onAttributeChange()

      attributes.map((cur) => {
        setTimeout(() => {
          // alert('heyyy')\
          console.log('doneeeee')
          onSelectAttribute(cur.id)
        }, 1000)
      })

      // onSelectAttribute()

      const images = selectedVariant.images.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
        }
      })

      setImages(images)

      setFileListImages(images)
    }
  }, [selectedVariant])

  useEffect(() => {
    console.log(form.getFieldValue('attributes'), 'plss')
  }, [form])

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setImages(fileListImages)
  }, [fileListImages])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        console.log(values, 'values')

        if (selectedVariant === null) {
          // Checking if image exists
          if (images.length !== 0 && images !== null) {
            const imgValues = await multipleImageUpload(
              images,
              'productTemplate-variant'
            )

            values.images = imgValues

            const created =
              await productTemplateService.createProductTemplateVariant(
                id,
                values
              )
            if (created) {
              message.success(`Created Variant Success`)
              setOpenVariantsForm(false)
              setSelectedVariant(null)
              refreshData()
              onFormModalClose()
            }
          } else {
            message.error('Please upload image')
          }
        }
        if (selectedVariant) {
          // Checking if image exists
          if (images.length !== 0 && images !== null) {
            console.log('images', images)
            const imgValues = await multipleImageUpload(
              images,
              'productTemplate'
            )
            values.images = imgValues

            const edited =
              await productTemplateService.editProductTemplateVariant(
                id,
                selectedVariant.id,
                values
              )
            if (edited) {
              message.success(`Edited Variant Success`)
              setOpenVariantsForm(false)
              setSelectedVariant(null)
              refreshData()
              onFormModalClose()
            }
          } else {
            message.error('Please upload image')
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  // useEffect(() => {
  //   onAttributeChange()
  // }, [selectedVariant])

  const getAttributes = async () => {
    const data = await attributeService.getAttributes()
    const activeAttributes = data.filter((item) => item.status === 'Active')
    setAttributes(activeAttributes)
    return activeAttributes
  }

  const onSelectAttribute = (attributeId) => {
    const attribute = attributes.find((item) => item.id === attributeId)

    console.log(attribute, 'attributeId')

    // const formattedAttributeValues = attribute.values.map((item) => {
    //   return {
    //     id: item.id,
    //     valueId: item.value.id,
    //   }
    // })

    setSelectedAttributeValues(attribute.values)
  }
  useEffect(() => {
    getAttributes()
  }, [selectedVariant])

  // Cut off already selected values from the list of attributes
  const onAttributeChange = async () => {
    const attributes = await getAttributes()

    const restAttributesListItems = attributes.filter(
      ({ id: id1 }) =>
        !form
          .getFieldValue('attributes')
          ?.some(({ attributeId: id2 }) => id2 === id1)
    )

    setAttributes(restAttributesListItems)
  }

  const onFormModalClose = () => {
    setOpenVariantsForm(false)
    // window.location.reload()
    setImages([])
    setAttributes([])
    setSelectedAttributeValues([])
    form.resetFields()
    setFileListImages([])
    setSelectedVariant(null)
  }

  return (
    <Drawer
      title={selectedVariant ? 'Edit Variant' : 'Create Variant'}
      width={720}
      onClose={() => onFormModalClose()}
      visible={openVariantsForm}
      bodyStyle={{ paddingBottom: 80 }}
      // destroyOnClose

      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => onFormModalClose()}
            style={{ marginRight: 8 }}
            htmlType="button"
          >
            Cancel
          </Button>
          <Button
            htmlType="button"
            onClick={onFinish}
            type="primary"
            loading={submitLoading}
          >
            Submit
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        hideRequiredMark
      >
        <Card title="Variant Info">
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <label style={{ fontWeight: 500, marginBottom: '10px' }}>
            Attributes
          </label>
          <Form.List name="attributes">
            {(fields, { add, remove }) => {
              console.log(fields, 'show-filelds')
              return (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', width: '100%' }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'required' }]}
                        name={[field.name, 'attributeId']}
                        fieldKey={[field.fieldKey, 'attributeId']}
                      >
                        <Select
                          placeholder="Select Attribute"
                          onChange={(e) => {
                            onSelectAttribute(e)
                            onAttributeChange()
                          }}
                        >
                          {attributes?.map((attribute) => (
                            <Option key={attribute.id} value={attribute.id}>
                              {attribute.name}
                            </Option>
                          ))}
                        </Select>
                        {/* <Input placeholder="name" /> */}
                      </Form.Item>
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: 'required' }]}
                        name={[field.name, 'valueId']}
                        fieldKey={[field.fieldKey, 'valueId']}
                      >
                        <Select placeholder="Select Attribute Value">
                          {selectedAttributeValues?.map((attribute) => (
                            <Option key={attribute.id} value={attribute.id}>
                              {attribute.value}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          onAttributeChange()
                          remove(field.name)
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add item
                    </Button>
                  </Form.Item>
                </>
              )
            }}
          </Form.List>
        </Card>

        <Card title="Media">
          <Upload listType="picture-card" name="image" {...propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 600 * 405
        </Card>
      </Form>
    </Drawer>
  )
}

export default VariantsForm
