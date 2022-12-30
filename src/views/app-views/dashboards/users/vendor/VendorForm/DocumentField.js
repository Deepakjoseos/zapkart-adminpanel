import React, { useState } from "react";
import { Button, Row } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons'
import Flex from "components/shared-components/Flex";
import DocumentForm from "./DocumentForm";

const DocumentField =() => {

    const [openDocumentForm, setOpenDocumentForm] = useState(false)


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
                />
            </Row>
        </div>
    )
}

export default DocumentField