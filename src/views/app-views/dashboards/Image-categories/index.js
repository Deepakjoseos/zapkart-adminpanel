import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Imagelist from './Image-list'
import Addimage from './Add-image'
import Editimage from './Edit-image'
// import Orders from './orders'

// In here we will define all our routes
const ImageCategories = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/Image-list`} />
      <Route path={`${match.url}/Add-image`} component={Addimage} />
      <Route path={`${match.url}/Edit-image/:id`} component={Editimage} />
      <Route path={`${match.url}/Image-list`} component={Imagelist} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default ImageCategories
