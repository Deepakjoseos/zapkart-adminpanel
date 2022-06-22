import React from 'react'
import ProductTemplateForm from '../ProductTemplateForm'

const EditProduct = (props) => {
  return <ProductTemplateForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
