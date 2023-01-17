import React from 'react'
import CityForm from '../City-Form'

const EditCity = (props) => {
  return <CityForm mode="EDIT" param={props.match.params} />
}

export default EditCity
