import React from 'react'
import TaxCategoryForm from '../taxCategoryForm'
const EditTaxCategory = (props) => {
  return <TaxCategoryForm mode="EDIT" param={props.match.params} />
}

export default EditTaxCategory