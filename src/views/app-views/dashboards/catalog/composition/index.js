import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CompositionList from './composition-list'
import AddComposition from './add-composition'
import EditComposition from './edit-composition'

const Composition = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/composition-list`}
      />
      <Route path={`${match.url}/add-composition`} component={AddComposition} />
      <Route
        path={`${match.url}/edit-composition/:id`}
        component={EditComposition}
      />
      <Route
        path={`${match.url}/composition-list`}
        component={CompositionList}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Composition
