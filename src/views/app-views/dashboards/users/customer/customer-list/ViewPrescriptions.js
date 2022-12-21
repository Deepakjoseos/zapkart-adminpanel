import { Button, Card, Drawer, message, Upload } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import Flex from 'components/shared-components/Flex'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import { useSelector } from 'react-redux'

const ViewPrescriptions = ({
  selectedPrescriptionCustomerId,
  setSelectedPrescriptionCustomerId,
}) => {
  const [prescriptions, setPrescriptions] = useState([])
  const { imageCategories } = useSelector((state) => state.auth)
  console.log('customerId',selectedPrescriptionCustomerId)
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  useEffect(() => {
    if (selectedPrescriptionCustomerId) {
      getPrescriptions()
    }
  }, [selectedPrescriptionCustomerId])

  const getPrescriptions = async () => {
    const data = await customerService.getCustomerPrescription(
      selectedPrescriptionCustomerId
    )
    if (data) {
      const prescs = data?.prescriptions.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
        }
      })

      setPrescriptions(prescs)

      setFileListImages(prescs)
    }
  }

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    console.log(fileListImages, 'hey-me')
    setPrescriptions(fileListImages)
  }, [fileListImages])

  const updatePrescription = async () => {
    let prescs = []
    if (prescriptions.length !== 0 && prescriptions !== null) {
      console.log('prescriptions', prescriptions)
      const imageCategory = imageCategories.find(
        (imgCat) => imgCat.imageFor === 'Prescriptions'
      )
      const imgValues = await multipleImageUpload(imageCategory.id,
        prescriptions)

      prescs = imgValues
    } else {
      prescs = []
    }

    const data = await customerService.updateCustomerPrescription(
      selectedPrescriptionCustomerId,
      { prescriptions: prescs }
    )
    if (data) {
      message.success('Prescription updated successfully')
      // setSelectedPrescriptionCustomerId(null)
    }
  }

  return (
    // <Drawer
    //   title="Prescription Details"
    //   width={720}
    //   onClose={() => {
    //     setSelectedPrescriptionCustomerId(null)
    //   }}
    //   visible={selectedPrescriptionCustomerId ? true : false}
    //   bodyStyle={{ paddingBottom: 80 }}
      // footer={
      //   <div
      //     style={{
      //       textAlign: 'right',
      //     }}
      //   >
      //     <Button
      //       onClick={() => setOpenVariantsForm(false)}
      //       style={{ marginRight: 8 }}
      //       htmlType="button"
      //     >
      //       Cancel
      //     </Button>
      //     <Button htmlType="button" onClick={onFinish} type="primary">
      //       Submit
      //     </Button>
      //   </div>
      // }
    // >
      <Card title="Media">
        <Upload listType="picture-card" name="image" {...propsImages}>
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
        <Flex justifyContent="end" className="mt-4">
          <Button type="primary" onClick={updatePrescription}>
            Update
          </Button>
        </Flex>
      </Card>
    // </Drawer>
  )
}

export default ViewPrescriptions
