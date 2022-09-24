import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotificationList from './notification-list'
import AddNotification from './add-notification'
import EditNotification from './edit-notification'

const Notification = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/notification-list`} />
      <Route path={`${match.url}/add-notification`} component={AddNotification} />
      <Route path={`${match.url}/edit-notification/:id`} component={EditNotification} />
      <Route path={`${match.url}/notification-list`} component={NotificationList} />
    </Switch>
  )
}

export default Notification
