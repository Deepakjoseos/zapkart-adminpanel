import React, { useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  Image,
  Button,
  Drawer,
} from 'antd'

import Flex from 'components/shared-components/Flex'

import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import VariantsForm from './VariantsForm'
import productTemplateService from 'services/productTemplate'
import { useParams } from 'react-router-dom'

const VariantsField = ({ variantsList, refreshData }) => {
  const propsVariantImages = []
  const [openVariantsForm, setOpenVariantsForm] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const { id } = useParams()

  const [form] = Form.useForm()

  console.log(variantsList, 'variatnsList')

  const onEditClick = (variant) => {
    setSelectedVariant(variant)
    setOpenVariantsForm(true)
  }
  const onDeleteVariant = (productTemplateVariantId) => {
    const deleted = productTemplateService.deleteProductTemplateVariant(
      id,
      productTemplateVariantId
    )

    if (deleted) {
      refreshData()
    }
  }

  return (
    <>
      <Flex justifyContent="end">
        <Button
          type="primary"
          className="mr-1"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenVariantsForm(true)}
        />
      </Flex>
      <Row gutter={16}>
        {variantsList.map((variant, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Card
              title={variant.description}
              extra={
                <Flex alignItems="center">
                  <Button
                    type="primary"
                    className="mr-1"
                    icon={<EditOutlined />}
                    onClick={() => onEditClick(variant)}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => onDeleteVariant(variant.id)}
                  />
                </Flex>
              }
              style={{ marginBottom: 30 }}
            >
              <Image.PreviewGroup>
                {variant.images.map((image, index) => (
                  <Image
                    key={index}
                    height={120}
                    width={120}
                    style={{ objectFit: 'cover' }}
                    src={image}
                  />
                ))}
              </Image.PreviewGroup>
            </Card>
          </Col>
        ))}

        <VariantsForm
          openVariantsForm={openVariantsForm}
          setOpenVariantsForm={setOpenVariantsForm}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          refreshData={refreshData}
        />
      </Row>
    </>
  )
}

export default VariantsField
