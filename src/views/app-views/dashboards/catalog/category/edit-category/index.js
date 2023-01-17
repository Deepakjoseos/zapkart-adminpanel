import React from 'react'
import CategoryForm from '../CategoryForm'

const EditProduct = (props) => {
  return <CategoryForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
