import { Button, Card, Drawer, Form, Input, message, Upload } from "antd";
import CustomIcon from "components/util-components/CustomIcon";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUpload from 'hooks/useUpload'


const DocumentForm = ({
    openDocumentForm,
    setOpenDocumentForm,
    form
}
) => {

    const [submitLoading, setSubmitLoading] = useState(false)

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

    const onFinish = async() =>{
        // setSubmitLoading(true)
        form
        .validateFields()
        .then(async(values) => {
            console.log(values, 'doc values');
        })
        .catch((info) => {
            setSubmitLoading(false)
            console.log('info', info)
            message.error('Please enter all required field ')
        })
    }

    function onDrawerClose() {
        setOpenDocumentForm(false)
    }


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
                    <Input placeholder="Display Name" />
                </Form.Item>
            </Card>

            <Card>
              <Upload  listType="picture-card" name="document">
                <CustomIcon className="display-3"/>
              </Upload>
            </Card>

            {/* <Card title="Media">
                <Upload listType="picture-card" name="image" {...propsImages}>
                    <CustomIcon className="display-3" svg={ImageSvg} />
                </Upload>
                size: 600px * 405px
            </Card> */}
      </Form>
        </Drawer>
    )
}

export default DocumentForm;