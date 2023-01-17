import React from 'react'
import EditCompositionForm from '../CompositionForm'

const EditComposition = (props) => {
  return <EditCompositionForm mode="EDIT" param={props.match.params} />
}

export default EditComposition
