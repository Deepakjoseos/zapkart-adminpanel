import React, { useEffect, useState } from 'react'
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
// import VariantsForm from './VariantsForm'
import productTemplateService from 'services/productTemplate'
import { useParams } from 'react-router-dom'
import BankAccountForm from './BankAccountForm'

const BankAccount = ({ variantsList, refreshData,selctedVendorId}) => {
    console.log('vendorIdBankAccount',selctedVendorId)
  const propsVariantImages = []
  const [openBankAccountForm, setOpenBankAccountForm] = useState(false)
  const [selectedBankAccount, setSelectedBankAccount] = useState(null)

  const { id } = useParams()

  const [form] = Form.useForm()

  console.log(variantsList, 'variatnsList')

//   const onEditClick = (variant) => {
//     setSelectedVariant(variant)
//     setOpenVariantsForm(true)
//   }
//   const onDeleteVariant = async (productTemplateVariantId) => {
//     const deleted = await productTemplateService.deleteProductTemplateVariant(
//       id,
//       productTemplateVariantId
//     )

//     if (deleted) {
//       refreshData()
//     }
//   }

  return (
    <>
      <Flex justifyContent="end">
        <Button
          type="primary"
          className="mr-1"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpenBankAccountForm(true)}>Add Bank Account</Button>
        
      </Flex>
      <Row gutter={16}>
        {variantsList?.map((variant, index) => (
          <Col xs={24} sm={24} md={12} key={index}>
            <Card
              title={variant.name}
            //   extra={
            //     <Flex alignItems="center">
            //       <Button
            //         type="primary"
            //         className="mr-1"
            //         icon={<EditOutlined />}
            //         onClick={() => onEditClick(variant)}
            //       />
            //       <Button
            //         type="text"
            //         icon={<DeleteOutlined />}
            //         onClick={() => onDeleteVariant(variant.id)}
            //       />
            //     </Flex>
            //   }
              style={{ marginBottom: 30 }}
            >
              {/* <Image.PreviewGroup>
                {variant.images.map((image, index) => (
                  <Image
                    key={index}
                    height={120}
                    width={120}
                    style={{ objectFit: 'cover' }}
                    src={image}
                  />
                ))}
              </Image.PreviewGroup> */}
            </Card>
          </Col>
        ))}

        <BankAccountForm
          openBankAccountForm={openBankAccountForm}
          setOpenBankAccountForm={setOpenBankAccountForm}
          selectedBankAccount={selectedBankAccount}
          setSelectedBankAccount={setSelectedBankAccount}
          refreshData={refreshData}
          form={form} selctedVendorId={selctedVendorId}
        />
      </Row>
    </>
  )
}

export default BankAccount
