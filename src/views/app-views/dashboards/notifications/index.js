import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Template from './template'
import NotificationHistory from './notification-history'

const notifications = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/notifications/template`}
      />
      <Route path={`${match.url}/template`} component={Template} />
      <Route path={`${match.url}/notification-history`}  component={NotificationHistory} />
    </Switch>
  )
}

export default notifications;
