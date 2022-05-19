/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
// import { unflatten } from 'utils'
import { CATALOG_API_URL } from '_constants'
import { Skeleton } from 'antd'
import useFetching from 'hooks/useFetching'
import Form from './Form'

const FormIndex = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params

  // const generateCategoryTree = (categories) => {
  //   const categoriesFormatted = categories.map((item) => {
  //     if (id !== item._id) {
  //       return {
  //         title: item.name,
  //         value: item._id,
  //         key: item._id,
  //         id: item._id,
  //         parent: item.parent === null ? 0 : item.parent,
  //       }
  //     }
  //     return {}
  //   })
  //   console.log(categoriesFormatted)
  //   const tree = unflatten(categoriesFormatted)
  //   console.log(tree)
  //   return tree
  // }

  let categories = []
  const [{ response }] = useFetching(CATALOG_API_URL.getCategories)

  // TreeDataGenerator for categories
  // const createCategoryList = (categories, parentId = null) => {
  //   const categoryList = []
  //   let category
  //   if (parentId == null) {
  //     category = categories.filter((cat) => !cat?.parentId)
  //   } else {
  //     category = categories.filter((cat) => cat?.parentId === parentId)
  //   }
  //   // eslint-disable-next-line prefer-const
  //   for (let cate of category) {
  //     categoryList.push({
  //       id: cate.id,
  //       title: cate.name,
  //       value: cate.id,
  //       key: cate.id,
  //       children: createCategoryList(categories, cate.id),
  //     })
  //   }

  //   return categoryList
  // }

  // const [{ response: customoffer }] = useFetching(
  //   `${CATALOG_API_URL.customeoffer}/query?status=active`,
  // )
  // const [{ response: disclaimer }] = useFetching(
  //   `${CATALOG_API_URL.disclaimer}/query?status=active`,
  // )

  // if (response && response.data) categories = generateCategoryTree(response.data)
  if (response && response.data) {
    // const availableCategories = response.data.filter((cur) => cur.status !== 'Deleted')
    // categories = createCategoryList(availableCategories)
    const availableCategories = response.data.filter((cur) => cur.status !== 'Deleted')
    if (id) {
      const excludeCurrentId = availableCategories.filter((cur) => cur.id !== id)
      categories = excludeCurrentId
    } else {
      categories = availableCategories
    }
  }

  console.log('treeData', categories)

  let form = (
    <Form
      categories={categories}
      //  disclaimer={disclaimer?.data} customOffer={customoffer?.data}
    />
  )
  if (id) {
    form = (
      <Query url={`${CATALOG_API_URL.getCategories}/${id}`} loader={<Skeleton active />}>
        {({ data }) => {
          console.log(data)
          if (data)
            return (
              <Form
                data={data}
                categories={categories}
                // disclaimer={disclaimer?.data}
                // customOffer={customoffer?.data}
              />
            )
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit category' : 'Add category'
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
