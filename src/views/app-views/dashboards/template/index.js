import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import TemplateList from './template-list'
import AddTemplate from './add-template'
import EditTemplate from './edit-template'
import GenNotification from './general-notifications'
import NotifyHistory from './notification-history'

const Template = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/template-list`} />
      <Route path={`${match.url}/general-notifications`} component={GenNotification} />
      <Route path={`${match.url}/notification-history`}component={NotifyHistory} />
      <Route path={`${match.url}/add-template`} component={AddTemplate} />
      <Route path={`${match.url}/edit-template/:id`} component={EditTemplate} />
      <Route path={`${match.url}/template-list`} component={TemplateList} />
    </Switch>
  )
}

export default Template
