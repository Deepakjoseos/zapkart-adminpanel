import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd'
import shortid from 'shortid'
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import attributeService from 'services/attribute'
import { useHistory } from 'react-router-dom'
import AddAttributeValue from './add-attributevalue'
import constantsService from 'services/constants'

const { TabPane } = Tabs

const ADD = 'ADD'
const EDIT = 'EDIT'

const AttributeForm = (props) => {
  const { mode = ADD, param } = props
  const history = useHistory()

  const [form] = Form.useForm()
  const [attributeOptions, setAttributeOptions] = useState([])
  //   const [uploadLoading, setUploadLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [form_statuses,setStatuses]= useState([])

  const handleDeleteAttributeOption = (id) => {
    const optionClone = [...attributeOptions]
    const arr = optionClone.filter((item) => item.id !== id)
    setAttributeOptions(arr)
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['FORM_STATUS']))

    }
  }
  useEffect(()=>{
    fetchConstants()
  })

  const handleAddAttributeOption = (e) => {
    const newId = shortid.generate()
    const item = {
      value: '',
      id: newId,
    }

    setAttributeOptions([...attributeOptions, item])
  }

  const handleAttributeOptionValueChange = (e, id) => {
    e.preventDefault()
    const typedInValue = e.target.value

    // check record.options index to check edited options
    // on add attr addedoptions check id here
    // on del attr deletedoptions push id there

    setAttributeOptions((prevState) => {
      console.log(prevState)
      const updatedoptions = [...prevState]
      const findIndex = updatedoptions.findIndex((x) => x.id === id)
      if (findIndex !== -1) {
        updatedoptions[findIndex].value = typedInValue
        return [...updatedoptions]
      }
      const newId = shortid.generate()
      const newObj = {
        _id: newId,
        value: typedInValue,
      }
      updatedoptions.push(newObj)
      return [...updatedoptions]
    })
    // }
  }

  useEffect(() => {
    if (mode === EDIT) {
      const fetchBrandById = async () => {
        const { id } = param
        const data = await attributeService.getAttributeById(id)
        if (data) {
          // const optionsArr = data.options.map((cur) => {
          //   const newId = shortid.generate()
          //   const item = {
          //     value: cur,
          //     id: newId,
          //   }
          //   return item
          // })

          // setAttributeOptions(optionsArr)
          form.setFieldsValue({
            name: data.name,
            status: data.status,
          })
        } else {
          history.replace('/app/dashboards/catalog/attribute/attribute-list')
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
        setSubmitLoading(false)
        if (mode === ADD) {
          const arrOptions = attributeOptions.map((cur) => cur.value)

          values.options = [...new Set(arrOptions)]

          const created = await attributeService.createAttribute(values)
          if (created) {
            message.success(`Created ${values.name} to product list`)
            history.goBack()
          }
        }
        if (mode === EDIT) {
          // Checking if image exists
          const arrOptions = attributeOptions.map((cur) => cur.value)

          values.options = [...new Set(arrOptions)]

          const edited = await attributeService.editAttribute(param.id, values)
          if (edited) {
            message.success(`Edited ${values.name} to product list`)
            history.goBack()
          }
        }
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
                {mode === 'ADD' ? 'Add New Attribute' : `Edit Attribute`}{' '}
              </h2>
              <div className="mb-3">
                <Button
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      '/app/dashboards/catalog/attribute/attribute-list'
                    )
                  }
                >
                  Discard
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={submitLoading}
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
                handleDeleteAttributeOption={handleDeleteAttributeOption}
                handleAddAttributeOption={handleAddAttributeOption}
                handleAttributeOptionValueChange={
                  handleAttributeOptionValueChange
                }
                attributeOptions={attributeOptions} form_statuses={form_statuses}
              />
            </TabPane>
            {mode === EDIT && (
              <TabPane tab="Attributes" key="2">
                <AddAttributeValue />
              </TabPane>
            )}
          </Tabs>
        </div>
      </Form>
    </>
  )
}

export default AttributeForm
