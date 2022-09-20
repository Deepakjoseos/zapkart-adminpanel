import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import widgetService from 'services/widget'
import { useHistory } from 'react-router-dom'
import brandService from 'services/brand'
import bannerService from 'services/banner'
import categoryService from 'services/category'
import productTemplate from 'services/productTemplate'
import moment from 'moment'
import WidgetField from './WidgetField'
import { uuid } from 'uuidv4'
import constantsService from 'services/constants'
import mainBannerService from 'services/MainBanner'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const WidgetForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [listItemsProvider, setListItemsProvider] = useState([])
  const [listItems, setListItems] = useState([])
  const [isStaticProviderSelected, setIsStaticProviderSelected] =
    useState(false)
 const [form_statuses,setStatuses]= useState([])
 const [listing_platforms,setListingPlatforms]=useState([])
 const fetchConstants = async () => {
  const data = await constantsService.getConstants()
  if (data) {
    // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

    setStatuses(Object.values(data.GENERAL['FORM_STATUS']))
    setListingPlatforms(Object.values(data.WIDGET['LISTING_PLATFORM']))

  }
}
  useEffect(() => {
    fetchConstants()
    if (mode === EDIT) {
      const fetchWidgetById = async () => {
        const { id } = param
        const data = await widgetService.getWidgetById(id)
        if (data) {
          form.setFieldsValue({
            tabTitle: data.tabTitle,
            isTitleShow: data.isTitleShow,
            priority: data.priority,
            numberOfItems: data.numberOfItems,
            listingType: data.listingType,
            listingItems: data?.listingItems?.map((item) => item.id),
            staticContent: data.staticContent,
            status: data.status,
            listingPlatform:data.listingPlatform,
            startEndDate: [
              moment(data.startDate, 'YYYY-MM-DD'),
              moment(data.endDate, 'YYYY-MM-DD'),
            ],
          })

          if (data.staticContent) {
            setIsStaticProviderSelected(true)
          } else {
            setIsStaticProviderSelected(false)
          }

          if (data.listingType) {
            onListingTypesChange(data.listingType)
          }

          // For Display Listing Items in table For draging functionality
          const formatedTableListingItems = data?.listingItems?.map(
            (cur, i) => {
              return { ...cur, key: cur.id, index: cur.id }
            }
          )
          setListItems(formatedTableListingItems)
        } else {
          history.replace('/app/dashboards/widget/widget-list')
        }
      }

      fetchWidgetById()
    }
  }, [form, mode, param, props])

  useEffect(() => {
    onListingTypesChange(form.getFieldValue('listingType'))
  }, [listItems])

  const getRestListTypesItemsForDisplaying = (listingTypeItems) => {
    const restListTypesItems = listingTypeItems?.data?.filter(
      ({ id: id1 }) => !listItems?.some(({ id: id2 }) => id2 === id1)
    )

    return restListTypesItems
  }

  const addKeyIndexFieldToItems = (items) => {
    console.log(items, 'itemsmain bana')
    const addKeyFieldToArray = items.map((cur, i) => {
      return { ...cur, key: cur.id, index: cur.id }
    })

    return addKeyFieldToArray
  }

  const fetchBrands = async () => {
    const brands = await brandService.getBrands()

    if (brands) {
      // Removes same list values brands
      const restListTypesItems = getRestListTypesItemsForDisplaying(brands)

      // Add key and index field to items
      const listTypeProvider = addKeyIndexFieldToItems(restListTypesItems)

      setListItemsProvider(listTypeProvider)
      setIsStaticProviderSelected(false)
    }
  }

  const fetchBanner = async () => {
    const banners = await bannerService.getBanners()

    if (banners) {
      // Removes same list values brands
      const restListTypesItems = getRestListTypesItemsForDisplaying(banners)

      // Add key and index field to items
      const listTypeProvider = addKeyIndexFieldToItems(restListTypesItems)

      setListItemsProvider(listTypeProvider)
      setIsStaticProviderSelected(false)
    }
  }
  const fetchMainBanner = async () => {
    const mainBanners = await mainBannerService.getMainBanners()
    console.log('mainBanners',mainBanners)

    if (mainBanners) {
      // Removes same list values brands
      const restListTypesItems = getRestListTypesItemsForDisplaying(mainBanners)

      // Add key and index field to items
      const listTypeProvider = addKeyIndexFieldToItems(restListTypesItems)

      setListItemsProvider(listTypeProvider)
      setIsStaticProviderSelected(false)
    }
  }

  const fetchCategories = async () => {
    const categories = await categoryService.getCategories()

    if (categories) {
      // Removes same list values brands
      const restListTypesItems = getRestListTypesItemsForDisplaying(categories)

      // Add key and index field to items
      const listTypeProvider = addKeyIndexFieldToItems(restListTypesItems)

      setListItemsProvider(listTypeProvider)
      setIsStaticProviderSelected(false)
    }
  }

  const fetchProductTemplates = async () => {
    const productTemplates = await productTemplate.getProductTemplates()

    if (productTemplates) {
      // Removes same list values brands
      const restListTypesItems =
        getRestListTypesItemsForDisplaying(productTemplates)

      // Add key and index field to items
      const listTypeProvider = addKeyIndexFieldToItems(restListTypesItems)

      setListItemsProvider(listTypeProvider)
      setIsStaticProviderSelected(false)
    }
  }

  const onListingTypesChange = (type) => {
    switch (type) {
      case 'Brands':
        return fetchBrands()
      case 'Banner':
        return fetchBanner()
      case 'MainBanner':
        return fetchMainBanner()
      case 'Categories':
        return fetchCategories()
      case 'ProductTemplates':
        return fetchProductTemplates()
      default:
        setListItemsProvider([])
        setIsStaticProviderSelected(true)
    }
  }

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values, then) => {
        const sendingValues = {
          tabTitle: values.tabTitle,
          status: values.status,
          priority: values.priority,
          listingPlatform:values.listingPlatform,
          numberOfItems: values?.numberOfItems
            ? values?.numberOfItems
            : form.getFieldValue('numberOfItems'),
          listingType: values?.listingType
            ? values?.listingType
            : form.getFieldValue('listingType'),
          isTitleShow: values.isTitleShow,
        }

        // Check if static content is not selected
        if (values.listingType !== 'Static' && listItems?.length > 0) {
          sendingValues.listingItems = listItems?.map((item) => item.id)
        }

        // Check if static content is not selected and listingItems is not empty
        if (values.listingType !== 'Static' && listItems?.length === 0) {
          setSubmitLoading(false)
          return message.error('Please select at least one item')
        }

        if (values.staticContent)
          sendingValues.staticContent = values.staticContent

        if (values.startEndDate) {
          sendingValues.startDate = moment(values.startEndDate[0]).format(
            'YYYY-MM-DD'
          )
          sendingValues.endDate = moment(values.startEndDate[1]).format(
            'YYYY-MM-DD'
          )
        }

        if (mode === ADD) {
          const created = await widgetService.createWidget(sendingValues)
          if (created) {
            message.success(`Created ${values.tabTitle} to Widget list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          const edited = await widgetService.editWidget(param.id, sendingValues)
          if (edited) {
            message.success(`Edited ${values.tabTitle} to Widget list`)
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
                {mode === 'ADD' ? 'Add New Widget' : `Edit Widget`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push('/app/dashboards/widget/widget-list')
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
              <GeneralField form_statuses={form_statuses}/>
            </TabPane>
            <TabPane tab="Widget" key="2">
              <WidgetField
                onListingTypesChange={onListingTypesChange}
                listItemsProvider={listItemsProvider}
                form={form}
                isStaticProviderSelected={isStaticProviderSelected}
                listItems={listItems}
                setListItems={setListItems} listing_platforms={listing_platforms}
              />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default WidgetForm
