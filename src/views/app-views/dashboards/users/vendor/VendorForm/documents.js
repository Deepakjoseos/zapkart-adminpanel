import React from 'react'
import { Input, Row, Col, Card, Form, Upload, Select } from 'antd'
import { ImageSvg } from 'assets/svg/icon'
import CustomIcon from 'components/util-components/CustomIcon'

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

const Documents = ({ propsUploadtradelicense,mode,verifytradelicense,propsUploademiratesID,propssignedContractCopy,
  propsDisplaypassportOrVisa,propsDisplayvatTrnCertificate ,verifyemiratesID,verifysignedContractCopy,verifypassportOrVisa,verifyvatTrnCertificate}) => (



  <Card>
  <Row gutter={16}>
    <Col span={12}>
      <Card title="Tarde License">
        <Upload listType="picture-card" name="image-1" {...propsUploadtradelicense} accept="document/*">
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>
     

      {mode === 'EDIT' ?
          <>
              <Form.Item name="tradelicense" label="Verified" rules={rules.tradelicense}>
      <Select placeholder="verified">
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
           

          </>
          : ""}
    </Col>


    <Col span={12}>
      <Card title="Emirates ID">
        <Upload listType="picture-card" name="image-2" {...propsUploademiratesID} >
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>

      {mode === 'EDIT' ?
          <>
              <Form.Item name="emiratesID" label="emiratesID" rules={rules.emiratesID}>
      <Select placeholder="tradelicense">
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
          
          </>
          : ""}
    
    </Col>

    
    </Row>



    <Row gutter={16}>
    <Col span={12}>
      <Card title="Signed Contract Copy
">
        <Upload listType="picture-card" name="image-3" {...propssignedContractCopy} >
          <CustomIcon className="display-3" svg={ImageSvg} />
         
        </Upload>
      </Card>
      
      {mode === 'EDIT' ?
          <>
              <Form.Item name="signedContractCopy" label="signedContractCopy" rules={rules.signedContractCopy}>
      <Select placeholder="signedContractCopy">
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
           

          </>
          : ""}
      
    </Col>
    



    <Col span={12}>
      <Card title="Passport / Visa">
        <Upload listType="picture-card" name="image-4" {...propsDisplaypassportOrVisa} >
          <CustomIcon className="display-3" svg={ImageSvg} />
        </Upload>
      </Card>

      {mode === 'EDIT' ?
          <>
              <Form.Item name="passportOrVisa" label="passportOrVisa" rules={rules.passportOrVisa}>
      <Select placeholder="passportOrVisa">
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
           

          </>
          : ""}
     
    </Col>
    </Row>


    <Col span={12}>
      <Card title="VAT TRN certificate (if applicable)">
        <Upload listType="picture-card" name="image-5" {...propsDisplayvatTrnCertificate} >
          <CustomIcon className="display-3" svg={ImageSvg} />
         
        </Upload>
      </Card>



      {mode === 'EDIT' ?
          <>
              <Form.Item name="vatTrnCertificate" label="vatTrnCertificate" rules={rules.vatTrnCertificate}>
      <Select placeholder="vatTrnCertificate">
        <Option value={true}>Yes</Option>
        <Option value={false}>No</Option>
      </Select>
    </Form.Item>
           

          </>
          : ""}
     
    </Col>  
  </Card>
 
)




  
  






   

export default Documents
