import React from 'react'
import DeliveryZoneForm from '../deliveryzoneForm'

const EditDeliveryZone = (props) => {
  return <DeliveryZoneForm mode="EDIT" param={props.match.params} />
}

export default EditDeliveryZone
