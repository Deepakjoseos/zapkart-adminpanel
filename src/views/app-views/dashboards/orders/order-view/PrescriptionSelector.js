import { Button, Card, Drawer, message, Upload } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import Flex from 'components/shared-components/Flex'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import orderService from 'services/orders'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'

const ViewPrescriptions = ({
  //   selectedPrescriptionCustomerId,
  //   setSelectedPrescriptionCustomerId,
  userId,
  orderId,
  setIsPrescriptionModalOpen,
}) => {
  const [prescriptions, setPrescriptions] = useState([])
  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  useEffect(() => {
    if (userId) {
      getPrescriptions()
    }
  }, [userId])

  const getPrescriptions = async () => {
    const data = await customerService.getCustomerPrescription(userId)
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
      const imgValues = await multipleImageUpload(prescriptions, 'prescription')

      prescs = imgValues
    } else {
      prescs = []
    }

    const data = await orderService.updateUserOrderPrescriptions(
      orderId,
      userId,
      {
        prescription: prescs[0],
      }
    )

    if (data) {
      message.success('Prescription updated successfully')
      //   setSelectedPrescriptionCustomerId(null)
      setIsPrescriptionModalOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
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
