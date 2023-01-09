import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddTemplate from './add-notification'
import ViewNotfication from './view-notification'
import NotifyHistory from './notification-list'

const NotificationHistory = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/notification-list`} />
      <Route path={`${match.url}/notification-list`}component={NotifyHistory} />
      <Route path={`${match.url}/add-notification`} component={AddTemplate} />
      <Route path={`${match.url}/edit-notification/:id`} component={ViewNotfication} />
    </Switch>
  )
}

export default NotificationHistory
