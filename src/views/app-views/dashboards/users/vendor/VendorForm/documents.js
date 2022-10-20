import React, { useEffect, useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Select,
  Button,
  notification,
} from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'
import useUpload from 'hooks/useUpload'
import vendorService from 'services/vendor'
import { useParams } from 'react-router-dom'
import Utils from 'utils'
import Flex from 'components/shared-components/Flex'
import { fileDocUpload } from 'utils/s3/s3ImageUploader'

// const { Dragger } = Upload
const { Option } = Select

const rules = {
  tanNumber: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const Documents = () => {
  const { id } = useParams()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isVerifiedTradeLicense, setIsVerifiedTradeLicense] = useState(false)
  const [isVerifiedEmiratesId, setIsVerifiedEmiratesId] = useState(false)
  const [isVerifiedSignedContractCopy, setIsVerifiedSignedContractCopy] =
    useState(false)
  const [isVerifiedPassportOrVisa, setIsVerifiedPassportOrVisa] =
    useState(false)
  const [isVerifiedVatTrnCertificate, setIsVerifiedVatTrnCertificate] =
    useState(false)

  const [tradeLicense, setTradeLicense] = useState(null)
  const [emiratesID, setEmiratesID] = useState(null)
  const [signedContractCopy, setSignedContractCopy] = useState(null)
  const [passportOrVisa, setPassportOrVisa] = useState(null)
  const [vatTrnCertificate, setVatTrnCertificate] = useState(null)

  // For Trade Liences
  const {
    fileList: fileListDisplaytradelicense,
    beforeUpload: beforeUploadDisplaytradelicense,
    onChange: onChangeDisplaytradelicense,
    onRemove: onRemoveDisplaytradelicense,
    setFileList: setFileListDisplaytradelicense,
  } = useUpload(1)

  const propsTradeImage = {
    multiple: false,
    beforeUpload: beforeUploadDisplaytradelicense,
    onRemove: onRemoveDisplaytradelicense,
    onChange: onChangeDisplaytradelicense,
    fileList: fileListDisplaytradelicense,
  }

  useEffect(() => {
    setTradeLicense(fileListDisplaytradelicense)
  }, [fileListDisplaytradelicense])

  // For Emirates ID
  const {
    fileList: fileListEmiratesID,
    beforeUpload: beforeUploadEmiratesID,
    onChange: onChangeEmiratesID,
    onRemove: onRemoveEmiratesID,
    setFileList: setFileListEmiratesID,
  } = useUpload(1)

  const propsEmiratesID = {
    multiple: false,
    beforeUpload: beforeUploadEmiratesID,
    onRemove: onRemoveEmiratesID,
    onChange: onChangeEmiratesID,
    fileList: fileListEmiratesID,
  }

  useEffect(() => {
    setEmiratesID(fileListEmiratesID)
  }, [fileListEmiratesID])

  // For SignedContractCopy
  const {
    fileList: fileListSignedContractCopy,
    beforeUpload: beforeUploadSignedContractCopy,
    onChange: onChangeSignedContractCopy,
    onRemove: onRemoveSignedContractCopy,
    setFileList: setFileListSignedContractCopy,
  } = useUpload(1)

  const propsSignedContractCopy = {
    multiple: false,
    beforeUpload: beforeUploadSignedContractCopy,
    onRemove: onRemoveSignedContractCopy,
    onChange: onChangeSignedContractCopy,
    fileList: fileListSignedContractCopy,
  }

  useEffect(() => {
    setSignedContractCopy(fileListSignedContractCopy)
  }, [fileListSignedContractCopy])

  // For passportOrVisa
  const {
    fileList: fileListPassportOrVisa,
    beforeUpload: beforeUploadPassportOrVisa,
    onChange: onChangePassportOrVisa,
    onRemove: onRemovePassportOrVisa,
    setFileList: setFileListPassportOrVisa,
  } = useUpload(1)

  const propsPassportOrVisa = {
    multiple: false,
    beforeUpload: beforeUploadPassportOrVisa,
    onRemove: onRemovePassportOrVisa,
    onChange: onChangePassportOrVisa,
    fileList: fileListPassportOrVisa,
  }

  useEffect(() => {
    setPassportOrVisa(fileListPassportOrVisa)
  }, [fileListPassportOrVisa])

  // For passportOrVisa
  const {
    fileList: fileListVatTrnCertificate,
    beforeUpload: beforeUploadVatTrnCertificate,
    onChange: onChangeVatTrnCertificate,
    onRemove: onRemoveVatTrnCertificate,
    setFileList: setFileListVatTrnCertificate,
  } = useUpload(1)

  const propsVatTrnCertificate = {
    multiple: false,
    beforeUpload: beforeUploadVatTrnCertificate,
    onRemove: onRemoveVatTrnCertificate,
    onChange: onChangeVatTrnCertificate,
    fileList: fileListVatTrnCertificate,
  }

  useEffect(() => {
    setVatTrnCertificate(fileListVatTrnCertificate)
  }, [fileListVatTrnCertificate])

  const getVendorDocumentById = async () => {
    let getDoc = await vendorService.getDocumentsById(id)
    if (getDoc) {
      setIsVerifiedEmiratesId(getDoc?.emiratesID?.isVerified)
      setIsVerifiedTradeLicense(getDoc?.tradelicense?.isVerified)
      setIsVerifiedSignedContractCopy(getDoc?.signedContractCopy?.isVerified)
      setIsVerifiedPassportOrVisa(getDoc?.passportOrVisa?.isVerified)
      setIsVerifiedVatTrnCertificate(getDoc?.vatTrnCertificate?.isVerified)
      let himg = []
      if (getDoc?.emiratesID?.url) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(getDoc?.emiratesID?.url),
            url: getDoc.emiratesID.url,
            thumbUrl: getDoc.emiratesID.url,
          },
        ]
        setEmiratesID(himg)
        setFileListEmiratesID(himg)
      }
      if (getDoc?.tradelicense?.url) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(getDoc?.tradelicense?.url),
            url: getDoc.tradelicense.url,
            thumbUrl: getDoc.tradelicense.url,
          },
        ]
        setTradeLicense(himg)
        setFileListDisplaytradelicense(himg)
      }
      if (getDoc?.signedContractCopy?.url) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(getDoc?.signedContractCopy?.url),
            url: getDoc.signedContractCopy.url,
            thumbUrl: getDoc.signedContractCopy.url,
          },
        ]
        setSignedContractCopy(himg)
        setFileListSignedContractCopy(himg)
      }
      if (getDoc?.passportOrVisa?.url) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(getDoc?.passportOrVisa?.url),
            url: getDoc.passportOrVisa.url,
            thumbUrl: getDoc.passportOrVisa.url,
          },
        ]
        setPassportOrVisa(himg)
        setFileListPassportOrVisa(himg)
      }
      if (getDoc?.vatTrnCertificate?.url) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(getDoc?.vatTrnCertificate?.url),
            url: getDoc.vatTrnCertificate.url,
            thumbUrl: getDoc.vatTrnCertificate.url,
          },
        ]
        setVatTrnCertificate(himg)
        setFileListVatTrnCertificate(himg)
      }
    }
  }
  useEffect(() => {
    getVendorDocumentById()
  }, [])

  console.log(isVerifiedEmiratesId, 'psjk;j')

  const onSaveDocument = async () => {
    let tradeLicenseFileUrl,
      emiratesIDFileUrl,
      signedContractCopyFileUrl,
      passportOrVisaFileUrl,
      vatTrnCertificateFileUrl
    setSubmitLoading(true)
    // for tradeLic ense
    if (tradeLicense?.length > 0) {
      const tradeLicenseFileValue = await fileDocUpload(
        tradeLicense[0].originFileObj,
        tradeLicense,
        tradeLicense[0].url,
        'Users'
      )

      tradeLicenseFileUrl = tradeLicenseFileValue
    }

    if (emiratesID?.length > 0) {
      const emiratesIDFileValue = await fileDocUpload(
        emiratesID[0].originFileObj,
        emiratesID,
        emiratesID[0].url,
        'Users'
      )

      emiratesIDFileUrl = emiratesIDFileValue
    }

    if (signedContractCopy?.length > 0) {
      const signedContractCopyFileValue = await fileDocUpload(
        signedContractCopy[0].originFileObj,
        signedContractCopy,
        signedContractCopy[0].url,
        'Users'
      )

      signedContractCopyFileUrl = signedContractCopyFileValue
    }

    if (passportOrVisa?.length > 0) {
      const passportOrVisaFileValue = await fileDocUpload(
        passportOrVisa[0].originFileObj,
        passportOrVisa,
        passportOrVisa[0].url,
        'Users'
      )

      passportOrVisaFileUrl = passportOrVisaFileValue
    }

    if (vatTrnCertificate?.length > 0) {
      const vatTrnCertificateFileValue = await fileDocUpload(
        vatTrnCertificate[0].originFileObj,
        vatTrnCertificate,
        vatTrnCertificate[0].url,
        'Users'
      )

      vatTrnCertificateFileUrl = vatTrnCertificateFileValue
    }

    //
    const uploadDatas = {
      tradelicense: tradeLicenseFileUrl,
      emiratesID: emiratesIDFileUrl,
      signedContractCopy: signedContractCopyFileUrl,
      passportOrVisa: passportOrVisaFileUrl,
      vatTrnCertificate: vatTrnCertificateFileUrl,
    }

    const uploadDocs = await vendorService.uploadDocuments(id, uploadDatas)

    if (uploadDocs) {
      const verificationDatas = {
        tradelicense: {
          url: tradeLicenseFileUrl,
          isVerified: isVerifiedTradeLicense,
        },
        emiratesID: {
          url: emiratesIDFileUrl,
          isVerified: isVerifiedEmiratesId,
        },
        signedContractCopy: {
          url: signedContractCopyFileUrl,
          isVerified: isVerifiedSignedContractCopy,
        },
        passportOrVisa: {
          url: passportOrVisaFileUrl,
          isVerified: isVerifiedPassportOrVisa,
        },
        vatTrnCertificate: {
          url: vatTrnCertificateFileUrl,
          isVerified: isVerifiedVatTrnCertificate,
        },
      }

      const verificationDocs = await vendorService.verifyDocument(
        id,
        verificationDatas
      )

      if (verificationDocs) {
        notification.success({
          message: 'Success',
          description: 'Document Updated Successfully Done',
        })
      }
    }

    setSubmitLoading(false)

    // then call api to verify
  }
  return (
    <Card>
      <Flex justifyContent="end" className="mb-4">
        <Button
          type="primary"
          onClick={onSaveDocument}
          htmlType="submit"
          loading={submitLoading}
        >
          Save Documents
        </Button>
      </Flex>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Tarde License">
            <Upload
              listType="picture-card"
              name="image-1"
              {...propsTradeImage}
              accept="document/*"
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>
          <label className="mb-3">Is Verified</label>
          <Select
            style={{ width: '100%' }}
            placeholder="verified"
            value={isVerifiedTradeLicense}
            onChange={(val) => setIsVerifiedTradeLicense(val)}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Col>

        <Col span={12}>
          <Card title="Emirates ID">
            <Upload listType="picture-card" name="image-2" {...propsEmiratesID}>
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <label className="mb-3">Is Verified</label>
            <Select
              style={{ width: '100%' }}
              placeholder="tradelicense"
              onChange={(val) => setIsVerifiedEmiratesId(val)}
              value={isVerifiedEmiratesId}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </>
        </Col>

        <Col span={12} className="mt-4">
          <Card title="Signed Contract Copy">
            <Upload
              listType="picture-card"
              name="image-2"
              {...propsSignedContractCopy}
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <label className="mb-3">Is Verified</label>
            <Select
              style={{ width: '100%' }}
              placeholder="SignedContractCopy"
              onChange={(val) => setIsVerifiedSignedContractCopy(val)}
              value={isVerifiedSignedContractCopy}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </>
        </Col>

        <Col span={12} className="mt-4">
          <Card title="Passport Or Visa">
            <Upload
              listType="picture-card"
              name="image-2"
              {...propsPassportOrVisa}
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <label className="mb-3">Is Verified</label>
            <Select
              style={{ width: '100%' }}
              placeholder="passportOrVisa"
              onChange={(val) => setIsVerifiedPassportOrVisa(val)}
              value={isVerifiedPassportOrVisa}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </>
        </Col>

        <Col span={12} className="mt-4">
          <Card title="VatTrnCertificate">
            <Upload
              listType="picture-card"
              name="image-2"
              {...propsVatTrnCertificate}
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <label className="mb-3">Is Verified</label>
            <Select
              style={{ width: '100%' }}
              placeholder="vatTrnCertificate"
              onChange={(val) => setIsVerifiedVatTrnCertificate(val)}
              value={isVerifiedVatTrnCertificate}
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </>
        </Col>
      </Row>

      {/* <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Signed Contract Copy
"
          >
            <Upload
              listType="picture-card"
              name="image-3"
              {...propssignedContractCopy}
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <Form.Item
              name="signedContractCopy"
              label="signedContractCopy"
              rules={rules.signedContractCopy}
            >
              <Select placeholder="signedContractCopy">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
          </>
        </Col>

        <Col span={12}>
          <Card title="Passport / Visa">
            <Upload
              listType="picture-card"
              name="image-4"
              {...propsDisplaypassportOrVisa}
            >
              <CustomIcon className="display-3" svg={ImageSvg} />
            </Upload>
          </Card>

          <>
            <Form.Item
              name="passportOrVisa"
              label="passportOrVisa"
              rules={rules.passportOrVisa}
            >
              <Select placeholder="passportOrVisa">
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
            <Form.Item
              hasFeedback
              validateStatus={verifypassportOrVisa ? 'success' : 'error'}
              name="passportOrVisa"
              label="Verified"
            >
              <Input disabled id="success" />
            </Form.Item>
          </>
        </Col>
      </Row> */}

      {/* <Col span={12}>
        <Card title="VAT TRN certificate (if applicable)">
          <Upload
            listType="picture-card"
            name="image-5"
            {...propsDisplayvatTrnCertificate}
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
        </Card>

        <>
          <Form.Item
            name="vatTrnCertificate"
            label="vatTrnCertificate"
            rules={rules.vatTrnCertificate}
          >
            <Select placeholder="vatTrnCertificate">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={verifyvatTrnCertificate ? 'success' : 'error'}
            name="vatTrnCertificate"
            label="Verified"
          >
            <Input disabled id="success" />
          </Form.Item>
        </>
      </Col> */}
    </Card>
  )
}

export default Documents
