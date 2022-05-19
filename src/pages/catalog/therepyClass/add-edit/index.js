/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { unflatten } from 'utils'
import { Skeleton } from 'antd'
import useFetching from 'hooks/useFetching'
import Form from './Form'

const FormIndex = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params

  console.log("id",id)

  const generateCategoryTree = (categories) => {
    console.log("Caegories generate",id,categories)
    const categoriesFormatted = categories.map((item) => {
      if (id !== item._id) {
        return {
          title: item.name,
          value: item._id,
          key: item._id,
          id: item._id,
          parent: item.parent === null ? 0 : item.parent,
        }
      }
      return {}
    })
    console.log("categories format",categoriesFormatted)
    const tree = unflatten(categoriesFormatted)
    console.log("tree",tree)
    return tree
  }

  let categories = []
  const [{ response }] = useFetching('/api/catalog/v1/therapeuticClass?status=active&sort[priorityOrder]=1&field[]=name')
console.log("Categories Response",response)

  if (response && response.data) categories = generateCategoryTree(response.data)
  // console.log('treeData', categories)

  let form = (
    <Form categories={categories} />
  )
  if (id) {
    form = (
      <Query url={`/api/catalog/v1/therapeuticClass/${id}`} loader={<Skeleton active />}>
        {({ data }) => {
          console.log(data)
          if (data)
            return (
              <Form
                data={data}
                categories={categories}

              />
            )
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Therepy Class' : 'Add Therepy Class'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)
