import React, { useState } from "react";
import { Button, Form, Row } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons'
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";

import DocumentForm from "./DocumentForm";

const DocumentField =() => {

    const [openDocumentForm, setOpenDocumentForm] = useState(false)
    const { id } = useParams()
    const [form] = Form.useForm()


    return(
        <div>
            <Flex justifyContent="end">
                <Button
                    type="primary"
                    className="mr-1"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {setOpenDocumentForm(true)}}
                />
            </Flex>
            <Row>
                <DocumentForm 
                    openDocumentForm={openDocumentForm}
                    setOpenDocumentForm={setOpenDocumentForm}
                    form={form}
                />
            </Row>
        </div>
    )
}

export default DocumentField