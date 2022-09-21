import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import statelist from './statelist'
import Addstate from './Add-state'
import editstate from './editstate'

const State= (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/statelist`} />
      <Route path={`${match.url}/Add-state`} component={Addstate} />
      <Route path={`${match.url}/editstate/:id`} component={editstate} />
      <Route path={`${match.url}/statelist`} component={statelist} />
    </Switch>
  )
}



export default State
