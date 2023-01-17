import { Button, Card, Modal, notification, Upload } from 'antd'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon'
import Flex from 'components/shared-components/Flex'
import { useSelector } from 'react-redux'
import { bulkImagesUpload, multipleImageUpload } from 'utils/s3/s3ImageUploader'

const BulkProductTemplateImageUpload = ({
  setIsBulkImageModalOpen,
  isBulkImageModalOpen,
}) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const { imageCategories } = useSelector((state) => state.auth)

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

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

  const onSubmit = async () => {
    setLoading(true)

    const imageCategory = imageCategories.find(
      (imgCat) => imgCat.imageFor === 'ProductTemplates'
    )

    const imgValues = await bulkImagesUpload(imageCategory.id, images)

    if (imgValues?.length > 0) {
      notification.success({
        message: 'Images Uploaded',
      })
      onClose()
    }

    setLoading(false)
  }

  const onClose = () => {
    setImages([])
    setFileListImages([])
    setIsBulkImageModalOpen(false)
  }

  return (
    <Modal
      title="Bulk Image Upload"
      visible={isBulkImageModalOpen}
      onCancel={onClose}
      footer={false}
    >
      <Card title="Media">
        <Upload
          listType="picture-card"
          name="image"
          {...propsImages}
          accept="image/*"
        >
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        size: 600px * 405px
      </Card>
      <Button type="primary" loading={loading} onClick={onSubmit}>
        Submit
      </Button>
    </Modal>
  )
}

export default BulkProductTemplateImageUpload
