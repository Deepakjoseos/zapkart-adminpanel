import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { Skeleton } from 'antd'
import useFetching from 'hooks/useFetching'
import Form from './Form'

const Forms = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params

  console.log('id', id)
  let users=[];
  const [{ response }] = useFetching('/api/backend/v1/users/all?userTypeId=2')
  console.log('Categories Response', response)
  if(response!==null) users=[...users,...response.users]
  // if(response.users!==null) 


  let form = <Form users={users} />
  const loader = (
    // <div className="card-body">
    <Skeleton active />
    // </div>
  )
  if (id) {
    form = (
      <Query url={`/api/backend/v1/giftcard/${id}`} loader={loader}>
        {({ data }) => {
          console.log('dataIn sd', data)
          if (!data) return <Redirect to="/not-found" />
          return <Form data={data} users={users} />
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Gift Card' : 'Add Gift Card'
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
