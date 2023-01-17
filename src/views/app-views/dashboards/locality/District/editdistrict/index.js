import React from 'react'
import DistrictForm from '../DistrictForm'

const EditDistrict = (props) => {
  return <DistrictForm mode="EDIT" param={props.match.params} />
}

export default EditDistrict
