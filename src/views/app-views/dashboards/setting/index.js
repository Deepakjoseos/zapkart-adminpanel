import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SettingList from './setting-list'
import AddSetting from './add-setting'
import EditInformation from './edit-setting'
// import Orders from './orders'

const Setting = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/information-list`}
      />
      <Route path={`${match.url}/add-information`} component={AddSetting} />
      <Route
        path={`${match.url}/edit-information/:id`}
        component={EditInformation}
      />
      <Route path={`${match.url}/information-list`} component={SettingList} />
    </Switch>
  )
}

export default Setting
