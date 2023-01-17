import React from 'react'
import PincodeForm from '../PincodeForm'

const EditPincode = (props) => {
  return <PincodeForm mode="EDIT" param={props.match.params} />
}

export default EditPincode
