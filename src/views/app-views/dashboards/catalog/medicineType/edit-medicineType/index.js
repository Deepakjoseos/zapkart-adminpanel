import React from 'react'
import MedicineTypeForm from '../MedicineTypeForm'

const EditMedicineType = (props) => {
  return <MedicineTypeForm mode="EDIT" param={props.match.params} />
}

export default EditMedicineType
