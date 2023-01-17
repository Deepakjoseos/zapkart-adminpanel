import React from 'react'
import ShipmentForm from '../ShipmentForm'

const EditShipment = (props) => {
  return <ShipmentForm mode="EDIT" param={props.match.params} />
}

export default EditShipment
