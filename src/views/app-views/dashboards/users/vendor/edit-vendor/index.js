import React from 'react'
import VendorForm from '../VendorForm'

const EditVendor = (props) => {
  return <VendorForm mode="EDIT" param={props.match.params} />
}

export default EditVendor
