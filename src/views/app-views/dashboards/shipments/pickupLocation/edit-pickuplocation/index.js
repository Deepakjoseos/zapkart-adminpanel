import React from 'react'
import PickupLocationForm from '../PickupLocationForm'

const EditShipment = (props) => {
  return <PickupLocationForm mode="EDIT" param={props.match.params} />
}

export default EditShipment
