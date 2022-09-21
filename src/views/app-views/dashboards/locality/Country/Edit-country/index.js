import React from 'react'
import CountryForm from '../CountryForm'

const EditCountry = (props) => {
  return <CountryForm mode="EDIT" param={props.match.params} />
}

export default EditCountry
