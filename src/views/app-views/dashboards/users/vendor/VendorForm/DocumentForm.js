import { Drawer, Form } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const DocumentForm = (
    openDocumentForm,
    setOpenDocumentForm
) => {

    const { id } = useParams()
    const [form] = Form.useForm()

    const onFormModalClose = () => {
        setOpenDocumentForm(false)
    }

    return (
        <Drawer    
            title='Document'
            width={720}
            onClose={() => onFormModalClose()}
            visible={false}
            bodyStyle={{ paddingBottom: 80 }}

        >

        </Drawer>
    )
}

export default DocumentForm;