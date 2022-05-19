import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { Skeleton } from 'antd'
import Form from './Form'

const Forms = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params

  console.log('id', id)
  let form = <Form />
  const loader = (
    // <div className="card-body">
    <Skeleton active />
    // </div>
  )
  if (id) {
    form = (
      <Query url={`/api/catalog/v1/safetyadvice/${id}`} loader={loader}>
        {({ data }) => {
          console.log('dataIn sd', data)
          if (!data) return <Redirect to="/not-found" />
          return <Form data={data} />
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Safety' : 'Add Safety'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body min-height-700">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(Forms)
