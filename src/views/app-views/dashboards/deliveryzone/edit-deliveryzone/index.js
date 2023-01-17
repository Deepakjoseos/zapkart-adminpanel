import React from 'react'
import DeliveryZoneForm from '../DeliveryZoneForm'

const EditProduct = (props) => {
  return <DeliveryZoneForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
