import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ReviewList from './Review-List'
// import AddReview from './Add-Review'
// import EditReview from './Edit-Review'
// import Orders from './orders'

const Review = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/Review-List`}
      />
      {/* <Route path={`${match.url}/Add-Review`} component={AddReview} />
      <Route
        path={`${match.url}/Edit-Review/:id`}
        component={EditReview}
      /> */}
      <Route
        path={`${match.url}/Review-List`}
        component={ReviewList}
      />
    </Switch>
  )
}

export default Review
