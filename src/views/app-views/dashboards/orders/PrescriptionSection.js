/* eslint-disable react/prop-types */
import { Button, message, notification, Upload } from 'antd'
import useUpload from 'hooks/useUpload'
import React, { useEffect, useState } from 'react'
import customerService from 'services/customer'
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
// import prescriptionIcon from 'assets/imgs/theme/icons/medical-prescription.png'
import PrescriptionImageSelect from './PrescriptionImageSelect'
// import { multipleImageUpload } from 'util/imageUploader'
// import authService from 'service/auth'
// import useUpload from 'hooks/useUpload'

const PrescriptionSection = ({
  // propsPrescriptions,
  // prescriptions,
  setSelectedPrescriptions,
  selectedPrescriptions,
  edit = false,
  customerPrescriptions,
  selectedCustomerId,
  getCustomerPrescriptions,
  // onUpdatePrescription,
}) => {
  const [prescriptions, setPrescriptions] = useState([])

  // console.log(prescriptions, 'shooo')
  const [mode, setMode] = useState(edit ? 'edit' : 'select')

  // const getUserPrescriptions = async () => {
  //   const data = await authService.getUserPrescriptions()
  //   if (data) {
  //     const prescs = data.map((cur, i) => {
  //       return {
  //         uid: i + Math.random() * 10,
  //         url: cur,
  //       }
  //     })

  //     setPrescriptions(prescs)

  //     setFileListImages(prescs)
  //   }
  // }

  // useEffect(() => {
  //   getUserPrescriptions()
  // }, [])

  console.log(customerPrescriptions, 'ajiojhioh')

  useEffect(() => {
    if (customerPrescriptions) {
      const prescs = customerPrescriptions.map((cur, i) => {
        return {
          uid: i + Math.random() * 10,
          url: cur,
        }
      })

      setPrescriptions(prescs)

      setFileListImages(prescs)
    }
  }, [customerPrescriptions])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1, 'multiple')

  const propsPrescriptions = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    setPrescriptions(fileListImages)
  }, [fileListImages])

  // For prescriptions
  const onUpdatePrescription = async () => {
    let sendingPresValues = []
    if (customerPrescriptions.length !== 0 && customerPrescriptions !== null) {
      const prescriptionsValue = await multipleImageUpload(
        prescriptions,
        'prescriptions'
      )
      sendingPresValues = prescriptionsValue
    } else {
      sendingPresValues = []
    }

    const data = await customerService.updateCustomerPrescription(
      selectedCustomerId,
      { prescriptions: sendingPresValues }
    )
    if (data) {
      getCustomerPrescriptions(selectedCustomerId)
      setMode('select')
      notification.success({
        message: 'Success',
        description: 'Prescription uploaded successfully',
      })
      message.success('Prescription updated successfully')
    }
  }

  // console.log(selectedBillingAddressId, selectedShippingAddressId, 'selectedss')

  return (
    <div>
      <h4 className="text-brand mb-3">
        {mode === 'select' ? 'Select Prescription' : 'Edit Prescriptions'}
      </h4>
      <div className="d-flex flex-wrap align-items-center mb-2 ">
        {mode === 'select' ? (
          <div>
            <div className="d-flex flex-wrap">
              {customerPrescriptions?.map((cur, index) => (
                <PrescriptionImageSelect
                  cur={cur}
                  key={index}
                  setSelectedPrescriptions={setSelectedPrescriptions}
                  selectedPrescriptions={selectedPrescriptions}
                />
              ))}
            </div>

            <Button
              className="mt-2"
              htmlType="button"
              onClick={() => setMode('edit')}
            >
              Edit
            </Button>
          </div>
        ) : (
          <>
            <Upload listType="picture-card" {...propsPrescriptions}>
              {/* <img
                src={prescriptionIcon}
                alt="prescription-add"
                height={80}
                width={80}
              /> */}
              Upload
            </Upload>
            <div className="d-flex">
              <Button
                htmlType="button"
                onClick={() => setMode('select')}
                className="mt-2"
              >
                Cancel
              </Button>

              <Button
                className="mt-2"
                htmlType="button"
                onClick={() => {
                  onUpdatePrescription()
                }}
              >
                Update
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PrescriptionSection
