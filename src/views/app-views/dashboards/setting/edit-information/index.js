import React from 'react'
import InformationForm from '../InformationForm'

const EditProduct = (props) => {
  return <InformationForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
