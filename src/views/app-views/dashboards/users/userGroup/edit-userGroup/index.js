import React from 'react'
import UserGroupForm from '../UserGroupForm'

const EditProduct = (props) => {
  return <UserGroupForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
