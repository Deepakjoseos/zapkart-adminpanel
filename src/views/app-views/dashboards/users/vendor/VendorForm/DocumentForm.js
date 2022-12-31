import { Button, Card, Drawer, Form, Input, message, Upload, Select } from "antd";
import CustomIcon from "components/util-components/CustomIcon";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUpload from 'hooks/useUpload'
import { ImageSvg } from "assets/svg/icon";
import { multipleImageUpload } from 'utils/s3/s3ImageUploader'
import { useSelector } from "react-redux";
import productTemplateService from 'services/productTemplate'
import type { UploadFile } from 'antd/es/upload/interface'





const DocumentForm = ({
    openDocumentForm,
    setOpenDocumentForm,
    form
}
) => {

    const [submitLoading, setSubmitLoading] = useState(false)
    const [documents, setDocuments] = useState([])
    const { documentCategories } = useSelector((state) => state.auth)
    const { Option } = Select

    const {
        fileList: fileListImages,
        beforeUpload: beforeUploadImages,
        onChange: onChangeImages,
        onRemove: onRemoveImages,
        setFileList: setFileListImages,
      } = useUpload(1, 'multiple')

    const rules = {
        type: [
          {
            required: true,
            message: 'Required',
          },
        ],
        isVerified: [
          {
            required: true,
            message: 'Required',
          },
        ],
      }
    

    const { id } = useParams()

    // useEffect(() => {
    //   console.log(form.getFieldValue('attributes'), 'plss')
    // }, [form])

    const onFinish = async() =>{
        // setSubmitLoading(true)
        form
        .validateFields()
        .then(async(values) => {
            values.documents = documents
            console.log(values, 'doc values');

            if (documents.length !== 0 && documents !== null) {
              const documentCategory = documentCategories.find(
                (imgCat) => imgCat.imageFor === 'ProductTemplates'
              )
  
              const imgValues = await multipleImageUpload(
                documentCategory.id,
                documents
              )
  
              values.documents = imgValues
  
              const created =
                await productTemplateService.createProductTemplateVariant(
                  id,
                  values
                )
              if (created) {
                message.success(`Created Variant Success`)
                // setOpenVariantsForm(false)
                // setSelectedVariant(null)
                // refreshData()
                onDrawerClose()
              }
            } else {
              message.error('Please upload image')
            }
        })
        .catch((info) => {
            setSubmitLoading(false)
            console.log('info', info)
            message.error('Please enter all required field ')
        })
    }

    const propsImages = {
      multiple: true,
      beforeUpload: beforeUploadImages,
      onRemove: onRemoveImages,
      onChange: onChangeImages,
      fileList: fileListImages,
    }

    function onDrawerClose() {
        setOpenDocumentForm(false)
    }

    // const propsImages = {
    //   multiple: true,
    //   beforeUpload: beforeUploadImages,
    //   onRemove: onRemoveImages,
    //   onChange: onChangeImages,
    //   fileList: fileListImages,
    // }


    return (
        <Drawer    
            title='Document'
            width={720}
            onClose={() => onDrawerClose()}
            visible={openDocumentForm}
            bodyStyle={{ paddingBottom: 80 }}

            footer={
                <div
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <Button
                    onClick={() => onDrawerClose()}
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
            <Card title="Document info">
                <Form.Item name="type" label="Type" rules={rules.type}>
                    <Input placeholder="Type" />
                </Form.Item>

                <Form.Item
                    name="isVerified"
                    label="Is Verified?"
                    rules={rules.isVerified}
                >
                    <Select placeholder="---">
                      <Option value='yes' >Yes</Option>
                      <Option value='no'>No</Option>
                    </Select>
                </Form.Item>
            </Card>

            <Card title="Documents">
              <Upload multiple listType="picture-card" name="documents" action='https://www.http://localhost:3001/app/dashboards/settings/edit-settings' {...propsImages} 
                // beforeUpload={(data) => setDocuments(data)}
              >
                <CustomIcon className="display-3" svg={ImageSvg} />
              </Upload>
              size: 600px * 405px
            </Card>

            {/* <Card title="documents">
          <Upload multiple listType="picture" name="documents"
          accept=".png"
          beforeUpload={(file)=> {
            setDocuments(file)
            return true
          }}
 
          >
            <CustomIcon className="display-3" svg={ImageSvg} />
          </Upload>
          size: 600px * 405px
        </Card> */}
      </Form>
        </Drawer>
    )
}

export default DocumentForm;