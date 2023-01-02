import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row, Image } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons'
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";

import DocumentForm from "./DocumentForm";
import vendorService from "services/vendor";


const DocumentField =({documentData, refreshData }) => {
    
    const [openDocumentForm, setOpenDocumentForm] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const { id } = useParams()
    const [form] = Form.useForm()
    const [docs, setDocs] = useState({})

    // console.log(documentData,"doc data");

    const onEditDocument = ((doc) => {
        setSelectedDoc(doc)
        setOpenDocumentForm(true)
    })

    const onDeleteDocument = async(vendorId, docId) =>{
      const deleted = await vendorService.deleteVendorDocument(vendorId, docId)   
      if(deleted) refreshData()
    }

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
            <Row gutter={16}>
                {documentData.map((doc, index) => (
                    <Col xs={24} sm={24} md={12} key={index}>
                        <Card
                        title={doc.type}
                        style={{ marginBottom: 30 }}
                        extra={
                            <Flex alignItems="center">
                                <Button
                                    type="primary"
                                    className="mr-1"
                                    icon={<EditOutlined />}
                                    onClick={() => onEditDocument(doc)}
                                />
                                <Button 
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => onDeleteDocument(id, doc.id)}
                                />
                            </Flex>
                        }
                        >
                            <Image.PreviewGroup>
                                {doc.files.map((file, index) => (
                                <Image
                                    key={index}
                                    height={120}
                                    width={120}
                                    style={{ objectFit: 'cover' }}
                                    src={file}
                                />
                                ))}
                            </Image.PreviewGroup>
                        </Card>
                    </Col>
                ))}
                <DocumentForm 
                    openDocumentForm={openDocumentForm}
                    setOpenDocumentForm={setOpenDocumentForm}
                    form={form}
                    refreshData={refreshData}
                    selectedDoc={selectedDoc}
                    setSelectedDoc={setSelectedDoc}
                />
            </Row>
        </div>
    )
}

export default DocumentField