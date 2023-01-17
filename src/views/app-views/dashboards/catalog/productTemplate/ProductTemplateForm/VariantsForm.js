import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Upload,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import productTemplateService from 'services/productTemplate'
import { useHistory, useParams } from 'react-router-dom'

const VariantsForm = ({
  openVariantsForm,
  setOpenVariantsForm,
  selectedVariant,
  setSelectedVariant,
  refreshData,
}) => {
  const history = useHistory()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [images, setImages] = useState([])

  const [form] = Form.useForm()
  const { id } = useParams()

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  const rules = {
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
      })

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
        setSubmitLoading(false)

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
            }
          } else {
            message.error('Please upload image')
          }
        }
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <Drawer
      title="Variant Form"
      width={720}
      onClose={() => setOpenVariantsForm(false)}
      visible={openVariantsForm}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={() => setOpenVariantsForm(false)}
            style={{ marginRight: 8 }}
            htmlType="button"
          >
            Cancel
          </Button>
          <Button htmlType="button" onClick={onFinish} type="primary">
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
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Input placeholder="Description" />
          </Form.Item>
        </Card>
        <Card title="Media">
          <Upload listType="picture-card" name="image" {...propsImages}>
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Card>
      </Form>
    </Drawer>
  )
}

export default VariantsForm
