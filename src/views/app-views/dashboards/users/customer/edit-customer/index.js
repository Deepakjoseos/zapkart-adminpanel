import React from 'react'
import CustomerForm from '../CustomerForm'

const EditCustomer = (props) => {
  return <CustomerForm mode="EDIT" param={props.match.params} />
}

export default EditCustomer
