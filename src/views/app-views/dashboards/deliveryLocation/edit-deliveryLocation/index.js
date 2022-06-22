import React from 'react'
import DeliveryLocationForm from '../DeliveryLocationForm'

const EditProduct = (props) => {
  return <DeliveryLocationForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
