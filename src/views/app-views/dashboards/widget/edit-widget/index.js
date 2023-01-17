import React from 'react'
import WidgetForm from '../WidgetForm'

const EditProduct = (props) => {
  return <WidgetForm mode="EDIT" param={props.match.params} />
}

export default EditProduct
