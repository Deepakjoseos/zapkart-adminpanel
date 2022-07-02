import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import WidgetList from './widget-list'
import AddWidget from './add-widget'
import EditWidget from './edit-widget'
// import Orders from './orders'

const Widget = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/widget-list`} />
      <Route path={`${match.url}/add-widget`} component={AddWidget} />
      <Route path={`${match.url}/edit-widget/:id`} component={EditWidget} />
      <Route path={`${match.url}/widget-list`} component={WidgetList} />
    </Switch>
  )
}

export default Widget
