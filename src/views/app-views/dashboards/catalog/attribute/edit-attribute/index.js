import React from 'react'
import AttributeForm from '../AttributeForm'

const EditProduct = (props) => {
  return <AttributeForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
