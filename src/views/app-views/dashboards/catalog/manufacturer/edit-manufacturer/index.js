import React from 'react'
import ManufacturerForm from '../ManufacturerForm'

const EditProduct = (props) => {
  return <ManufacturerForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
