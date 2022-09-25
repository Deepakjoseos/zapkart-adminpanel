import React from 'react'
import ImageForm from '../Image-Form'

const EditImage = (props) => {
  return <ImageForm mode="EDIT" param={props.match.params} />
}

export default EditImage
