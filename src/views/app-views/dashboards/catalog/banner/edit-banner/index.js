import React from 'react'
import BannerForm from '../BannerForm'

const EditProduct = (props) => {
  return <BannerForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
