import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AttributeList from './attribute-list'
import AddAttribute from './add-attribute'
import AddAttributeValue from './add-attributevalue'
import EditAttribute from './edit-attribute'
// import Orders from './orders'

const Attribute = (props) => {
  const { match } = props
  return (
    <Switch>
      <Route path={`${match.url}/add-attribute`} component={AddAttribute} />
      <Route
        path={`${match.url}/edit-attribute/:id`}
        component={EditAttribute}
      />
      <Route path={`${match.url}/attribute-list`} component={AttributeList} />
      <Route
        path={`${match.url}/add-attributevalue/:id`}
        component={AddAttributeValue}
      />

      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/attribute-list`}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Attribute
