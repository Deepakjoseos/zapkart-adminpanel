import React from 'react'
import NotificationForm from '../NotificationForm'

const EditNotification = (props) => {
  return <NotificationForm mode="EDIT" param={props.match.params} />
}

export default EditNotification
