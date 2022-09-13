import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddMainBanner from './add-main-banner'
import EditMainBanner from './edit-main-banner'
import MainBannerList from './main-banner-list'

// import Orders from './orders'

const MainBanner = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/main-banner-list`}
      />
     <Route
        path={`${match.url}/add-main-banner`}
        component={AddMainBanner}
      /> 
       <Route
        path={`${match.url}/edit-main-banner/:id`}
        component={EditMainBanner}
      /> 
     <Route
        path={`${match.url}/main-banner-list`}
        component={MainBannerList}
      /> 
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default MainBanner
