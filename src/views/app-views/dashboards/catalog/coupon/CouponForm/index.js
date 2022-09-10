import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import couponService from 'services/coupon'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import categoryService from 'services/category'
import brandService from 'services/brand'
import userGroupService from 'services/userGroup'
import customerService from 'services/customer'
import productTemplateService from 'services/productTemplate'
import constantsService from 'services/constants'
const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const ProductForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [categories, setCategories] = useState([])
  const [productsTemplate, setProductsTemplate] = useState([])
  const [brands, setBrands] = useState([])
  const [userGroups, setUserGroups] = useState([])
  const [users, setUsers] = useState([])
  const [valueTypes, setValueTypes] = useState([])
  const [availableTypes, setAvailableTypes] = useState([])
  const [statuses,setStatuses]= useState([])

  const getCategories = async () => {
    const data = await categoryService.getCategories()
    if (data) {
      const availableCategories = data.filter(
        (category) => category.status === 'Active'
      )
      setCategories(availableCategories)
    }
  }

  const getBrands = async () => {
    const data = await brandService.getBrands()
    if (data) {
      const availableBrands = data.filter(
        (category) => category.status === 'Active'
      )
      setBrands(data)
    }
  }

  const getUserGroups = async () => {
    const data = await userGroupService.getUserGroups()
    if (data) {
      const availableUserGroups = data.filter(
        (userGroups) =>
          userGroups.status === 'Active' && userGroups.type === 'Customer'
      )
      setUserGroups(availableUserGroups)
    }
  }

  const getUsers = async () => {
    const data = await customerService.getCustomers()
    if (data) {
      const availableUsers = data.filter((user) => user.status === 'Active')
      setUsers(availableUsers)
    }
  }

  const geProductsTemplate = async () => {
    const data = await productTemplateService.getProductTemplates()
    if (data) {
      const availableProductTemplates = data.filter(
        (productTemplate) => productTemplate.status === 'Active'
      )
      setProductsTemplate(availableProductTemplates)
    }
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')
      setValueTypes(Object.values(data.COUPON['VALUE_TYPE']))
      setAvailableTypes(Object.values(data.COUPON['AVAILABLE_TYPE']))
      setStatuses(Object.values(data.GENERAL['STATUS']))
    }
  }

  useEffect(() => {
    getCategories()
    getBrands()
    getUserGroups()
    getUsers()
    geProductsTemplate()
    fetchConstants()
  }, [])

  useEffect(() => {
    if (mode === EDIT) {
      const fetchBrandById = async () => {
        const { id } = param
        const data = await couponService.getCouponById(id)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            code: data.code,
            valueType: data.valueType,
            value: data.value,
            maxAmount: data.maxAmount,
            minOrderAmount: data.minOrderAmount,
            availableType: data.availableType,
            available: data.available,
            products: data.products,
            categories: data.categories,
            brands: data.brands,
            userGroups: data.userGroups,
            users: data.users,
            startEndDate: [
              moment(data.startDate, 'YYYY-MM-DD'),
              moment(data.endDate, 'YYYY-MM-DD'),
            ],
            status: data.status,
          })
        } else {
          history.replace('/app/dashboards/catalog/coupon/coupon-list')
        }
      }

      fetchBrandById()
    }
  }, [form, mode, param, props])

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          ...values,
        }

        if (sendingValues?.minOrderAmount === '') {
          delete sendingValues.minOrderAmount
        }

        if (sendingValues?.maxAmount === '') {
          delete sendingValues.maxAmount
        }

        if (sendingValues?.available === '') {
          delete sendingValues.available
        }

        // if (sendingValues?.products?.length === 0) {
        //   delete sendingValues.products
        // }

        // if (sendingValues?.categories?.length === 0) {
        //   delete sendingValues.categories
        // }

        // if (sendingValues?.brands?.length === 0) {
        //   delete sendingValues.brands
        // }

        // if (sendingValues?.userGroups?.length === 0) {
        //   delete sendingValues.userGroups
        // }

        // if (sendingValues?.users?.length === 0) {
        //   delete sendingValues.users
        // }

        if (values.startEndDate) {
          sendingValues.startDate = moment(values.startEndDate[0]).format(
            'YYYY-MM-DD'
          )
          sendingValues.endDate = moment(values.startEndDate[1]).format(
            'YYYY-MM-DD'
          )
        }

        delete sendingValues.startEndDate

        if (mode === ADD) {
          const created = await couponService.createCoupon(sendingValues)
          if (created) {
            message.success(`Created ${sendingValues.name} to Coupon list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await couponService.editCoupon(param.id, sendingValues)
          if (edited) {
            message.success(`Edited ${sendingValues.name} to Coupon list`)
            history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          status: 'Hold',
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === 'ADD' ? 'Add New Coupon' : `Edit Coupon`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/catalog/coupon/coupon-list')
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === 'ADD' ? 'Add' : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField
                categories={categories}
                brands={brands}
                productTemplates={productsTemplate}
                users={users}
                userGroups={userGroups}
                valueTypes={valueTypes}
                availableTypes={availableTypes}
                statuses={statuses}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default ProductForm
