/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input, Form, Switch, Icon, Button, Skeleton, Popconfirm, notification } from 'antd'
import shortid from 'shortid'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import { EDIT_SUCCESS_MESSAGE, SUCCESS, API_URL, STRINGS, CATALOG_API_URL } from '_constants'
import { Redirect } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import differenceBy from 'lodash/differenceBy'
import { editAttribute } from 'services/attributes'
import styles from '../style.module.scss'

const ATTRIBUTES_URL = CATALOG_API_URL.getAttributes

const FormItem = Form.Item

@Form.create()
class AttributesEdit extends React.Component {
  abortController = new AbortController()

  state = {
    name: '',
    status: '',
    values: [],
    loading: false,
    sendSuccess: false,

    // options: [],
  }

  componentDidMount() {
    const { match } = this.props
    const { params } = match
    const { id } = params
    console.log(id)
    this.fetchDetails(id)
    // const record = dataAtr.data.find(item => item.id === id)
    // const attributesList = record.values;
    // this.setState({ record, attributesList, loading: false })
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  fetchDetails = async (id) => {
    this.setState({
      loading: true,
    })
    const url = `${ATTRIBUTES_URL}/${id}`
    const options = {
      METHOD: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options, { signal: this.abortController.signal })
    console.log(response)
    if (response.ok) {
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { data } = responseJSON
      console.log(data)
      const optionsArr = data.options.map((cur) => {
        const newId = shortid.generate()
        const item = {
          value: cur,
          _id: newId,
        }
        return item
      })

      this.setState({
        record: data,
        loading: false,
        values: optionsArr,

        status: data.status,
        name: data.name,
      })
    }
  }

  handleDelete = (id) => {
    // console.log(id)
    // const { values, newValues, editedValues, record } = this.state
    // let deletedValues
    // const arr = values.filter((item) => item._id !== id)
    // const deletedValueObj = {
    //   _id: id,
    // }
    // const add = record.values.findIndex((a) => a._id === id) > -1

    // const newValuesFilter = newValues.filter((item) => item._id !== id)
    // const editedFilter = editedValues.filter((item) => item._id !== id)
    // this.setState((prevState) => {
    //   if (add) {
    //     deletedValues = [...prevState.deletedValues, deletedValueObj]
    //   } else {
    //     deletedValues = [...prevState.deletedValues]
    //   }
    //   return {
    //     values: [...arr],
    //     deletedValues: [...deletedValues],
    //     newValues: [...newValuesFilter],
    //     editedValues: [...editedFilter],
    //   }
    // })

    const { values } = this.state
    const arr = values.filter((item) => item._id !== id)

    this.setState({
      values: [...arr],
    })
  }

  handleAddAttribute = (e) => {
    console.log('in handleAddAttribute')
    console.log(e)
    console.log(e.target.value)
    const { values } = this.state
    const newId = shortid.generate()
    const item = {
      value: '',
      _id: newId,
    }
    this.setState({ values: [...values, item] })
    // console.log('in handleAddAttribute')
    // console.log(e)
    // console.log(e.target.value)
    // const { values, newValues } = this.state
    // const newId = shortid.generate()
    // const item = {
    //   value: '',
    //   _id: newId,
    // }
    // this.setState({ values: [...values, item], newValues: [...newValues, item] })
  }

  sendEditAttribute = async ({ values, status, name }) => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const optionsArray = values.map((item) => item.value)
    const sendData = {
      status,
      name,
      options: _.uniq(optionsArray),
      // options,
    }
    const add = await editAttribute(id, sendData)
    if (add) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.addSuccess,
      })
      this.setState({
        sendSuccess: true,
      })
    }
  }

  handleReset = () => {
    console.log('resetting')
    this.setState({
      name: '',
      status: 'Hold',
      values: [],
      loading: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('will submit form')
    // eslint-disable-next-line camelcase
    const { name, status, values } = this.state
    const data = {
      name,
      status,
      values,
    }
    console.log(data)
    this.sendEditAttribute(data)
  }

  onStatusChange = () => {
    console.log('changing status')
    this.setState((prevState) => {
      const status = prevState.status === 'Active' ? 'Hold' : 'Active'
      return { status }
    })
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  onAttributeValChange = (e, id) => {
    e.preventDefault()
    const typedInValue = e.target.value
    console.log(typedInValue)

    // check record.options index to check edited options
    // on add attr addedoptions check id here
    // on del attr deletedoptions push id there
    this.setState((prevState) => {
      console.log(prevState)
      const updatedoptions = [...prevState.values]
      const findIndex = updatedoptions.findIndex((x) => x._id === id)
      if (findIndex !== -1) {
        updatedoptions[findIndex].value = typedInValue
        return {
          ...prevState,
          values: [...updatedoptions],
        }
      }
      const newId = shortid.generate()
      const newObj = {
        _id: newId,
        value: typedInValue,
      }
      updatedoptions.push(newObj)
      return {
        ...prevState,
        values: [...updatedoptions],
      }
    })
    // }
  }

  render() {
    console.log(this.state)

    const { record, loading, values, status, name, sendSuccess } = this.state
    const { form } = this.props
    console.log(loading)
    console.log(record)
    if (sendSuccess) return <Redirect to="/catalog/attributes" />
    return (
      <div>
        <Helmet title="Edit Attribute group" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Edit Attribute group</strong>
            </div>
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && record && (
            <div className="card-body">
              <Form onSubmit={this.handleSubmit} layout="vertical">
                <div className="column">
                  <div className="row">
                    <div className="col-lg-4">
                      <FormItem label="Attribute group" hasFeedback name="name">
                        <Input
                          value={name}
                          name="name"
                          placeholder="Attribute group"
                          onChange={this.onChange}
                        />
                        ,
                      </FormItem>
                    </div>

                    <div className="col-lg-4">
                      <FormItem label="Status">
                        <Switch
                          onChange={this.onStatusChange}
                          checked={status === 'Active'}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <FormItem
                        label="Attribute group options"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <div className={styles.attributesGroup}>
                          {values.map((item, index) => {
                            const key = item._id

                            return (
                              <div key={key}>
                                <Input
                                  onChange={(e) =>
                                    this.onAttributeValChange(e, item._id, key, index)
                                  }
                                  key={key}
                                  addonAfter={
                                    <Popconfirm
                                      key={key}
                                      title="Sure to delete?"
                                      onConfirm={() => this.handleDelete(item._id)}
                                    >
                                      <Icon key={key} type="close" style={{ color: '#df071a' }} />
                                    </Popconfirm>
                                  }
                                  defaultValue={item.value}
                                />
                              </div>
                            )
                          })}

                          <div>
                            <Button onClick={this.handleAddAttribute} shape="circle" icon="plus" />
                          </div>
                        </div>
                      </FormItem>
                    </div>

                    <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                      <Button type="primary" htmlType="submit" className="btn-margins">
                        Save
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AttributesEdit
