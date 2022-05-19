/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { getProductsTemplate, getProductTemplate } from 'services/productTemplate'

import { Skeleton, Tabs } from 'antd'

import { CATALOG_API_URL } from '_constants'
import useFetching from 'hooks/useFetching'

import Form from './Form'
import VariantForm from './VariantForm'

const FormIndex = (props) => {
  const [productTempVariants, setProductTempVariants] = useState([])
  const { match } = props
  const { params } = match
  const { id } = params
  const { TabPane } = Tabs

  const PRODUCT_TEMPLATE_URL = CATALOG_API_URL.getProductTemplate
  const [{ response: categories }] = useFetching(CATALOG_API_URL.getCategories)
  const [{ response: brands }] = useFetching(CATALOG_API_URL.getBrands)
  // const [{ response: productTemplateData }] = useFetching(`${PRODUCT_TEMPLATE_URL}/${id}`)

  let availableBrands = []
  let availableCategories = []
  // let productTempVariants = []

  if (categories?.data) {
    availableCategories = categories?.data.filter((cur) => cur.status !== 'Deleted')
  }

  if (brands?.data) {
    availableBrands = brands?.data.filter((cur) => cur.status !== 'Deleted')
  }
  useEffect(() => {
    // if (productTemplateData?.data) {
    //   console.log(productTemplateData, 'plsssss')
    //   setProductTempVariants(productTemplateData.data.variants)
    // }
    reCallProductTemplateApi()
  }, [])

  const reCallProductTemplateApi = async () => {
    const res = await getProductTemplate(id)
    if (res) {
      console.log(res, 'okayy')
      setProductTempVariants(res.data.variants)
    }
  }

  let form = <Form categories={availableCategories} brands={availableBrands} />
  if (id) {
    form = (
      <Query url={`${PRODUCT_TEMPLATE_URL}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res.data)
            return (
              <Form data={res.data} categories={availableCategories} brands={availableBrands} />
            )
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Product Template' : 'Add Product Template'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">
          <Tabs tabPosition="left">
            <TabPane tab="Details" key="1">
              {form}
            </TabPane>
            {id && (
              <TabPane tab="Variants" key="2">
                <VariantForm
                  productTempVariants={productTempVariants}
                  productTemplateId={id}
                  reCallApi={reCallProductTemplateApi}
                />
              </TabPane>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)
