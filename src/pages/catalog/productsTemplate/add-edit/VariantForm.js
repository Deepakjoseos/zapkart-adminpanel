/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet'
import {
  addProductTemplateVariant,
  editProductTemplateVariant,
  deleteProductTemplateVariant,
} from 'services/productTemplate'

import {
  Tooltip,
  Icon,
  Tabs,
  List,
  Card,
  Row,
  Col,
  Divider,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  notification,
} from 'antd'
import shortid from 'shortid'
import { STRINGS } from '_constants'

import styles from './variantstyle.module.scss'

// const { TextArea } = Input

const VariantForm = ({ productTempVariants, productTemplateId, reCallApi, form }) => {
  const innerPropValueRef = useRef(null)
  const { TabPane } = Tabs
  const { getFieldDecorator, getFieldsError } = form
  console.log(productTempVariants, 'pls showw')
  const [currentAction, setCurrentAction] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const [description, setDescription] = useState('')
  const [images, setImages] = useState('')
  const [attributes, setAttributes] = useState([])

  // Tags Antd => used in last nested attribute item
  const [innerPropValue, setInnerPropValue] = useState('')
  const [innerPropInputVisible, setInnerPropInputVisible] = useState(false)

  const [currentSelectedVariantId, setCurrentSelectedVariantId] = useState(null)

  const resetFields = () => {
    setDescription('')
    setImages('')
    setAttributes([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }

  // When Adding
  const handleAddAttribute = (e) => {
    const newId = shortid.generate()
    // const finalResult = Object.assign(attributes, { '': {} })
    const item = {
      id: newId,
      name: '',
      innerAttributes: [],
    }
    setAttributes([...attributes, item])

    // const item = {
    //   '': {},
    //   id: newId,
    // }
    // this.setState({ options: [...options, item] })
  }

  const handleAddInnerAttribute = (id) => {
    const newId = shortid.generate()
    // const finalResult = Object.assign(attributes, { '': {} })
    const item = {
      id: newId,
      name: '',
      innerProps: [],
    }

    const attrArr = [...attributes]
    const findIndex = attrArr.findIndex((x) => x.id === id)

    if (findIndex !== -1) {
      attrArr[findIndex].innerAttributes.push(item)

      setAttributes(attrArr)
    }
  }

  const handleDeleteAttribute = (id, parentId) => {
    console.log(id)

    if (!parentId) {
      const arr = attributes.filter((item) => item.id !== id)

      setAttributes([...arr])
    } else {
      const attrArr = [...attributes]
      const findParentIndex = attrArr.findIndex((x) => x.id === parentId)
      if (findParentIndex !== -1) {
        const findInnerAttributeIndex = attrArr[findParentIndex].innerAttributes.findIndex(
          (cur) => cur.id === id,
        )
        attrArr[findParentIndex].innerAttributes.splice(findInnerAttributeIndex, 1)
        setAttributes(attrArr)
      }
    }
  }

  const onAttributeValChange = (e, id, parentId) => {
    e.preventDefault()
    const typedInValue = e.target.value
    console.log(typedInValue)

    const attrArr = [...attributes]
    if (!parentId) {
      const findIndex = attrArr.findIndex((x) => x.id === id)

      if (findIndex !== -1) {
        attrArr[findIndex].name = typedInValue

        setAttributes(attrArr)
      }
    } else {
      const findParentIndex = attrArr.findIndex((x) => x.id === parentId)
      if (findParentIndex !== -1) {
        const findInnerAttributeIndex = attrArr[findParentIndex].innerAttributes.findIndex(
          (cur) => cur.id === id,
        )
        attrArr[findParentIndex].innerAttributes[findInnerAttributeIndex].name = typedInValue

        setAttributes(attrArr)
      }
    }
  }

  // antd tag
  const innerPropHandleClose = (parent1Id, parent2Id, removedTag) => {
    const attrArr = [...attributes]
    const findParentIndex = attrArr.findIndex((x) => x.id === parent1Id)
    if (findParentIndex !== -1) {
      const findInnerAttributeIndex = attrArr[findParentIndex].innerAttributes.findIndex(
        (cur) => cur.id === parent2Id,
      )
      const currentInnerPropsArr =
        attrArr[findParentIndex].innerAttributes[findInnerAttributeIndex].innerProps

      const removedTagIndex = currentInnerPropsArr.findIndex((cur) => cur === removedTag)

      currentInnerPropsArr.splice(removedTagIndex, 1)

      setAttributes(attrArr)
      // const tags = this.state.tags.filter(tag => tag !== removedTag);
      // console.log(tags);
      // this.setState({ tags });
    }
  }

  const showInnerPropInput = () => {
    setInnerPropInputVisible(true)
    if (innerPropValueRef?.current) {
      innerPropValueRef.current.focus()
    }
    // this.setState({ inputVisible: true }, () => this.input.focus());
  }

  const innerPropHandleInputChange = (e) => {
    setInnerPropValue(e.target.value)
  }

  const innerPropHandleInputConfirm = (parent1Id, parent2Id) => {
    // console.log(parent1Id, parent2Id, 'show-meee')

    const attrArr = [...attributes]
    const findParentIndex = attrArr.findIndex((x) => x.id === parent1Id)
    console.log(findParentIndex, 'show')

    // console.log(findParentIndex, 'show-meee')
    if (findParentIndex !== -1) {
      const findInnerAttributeIndex = attrArr[findParentIndex].innerAttributes.findIndex(
        (cur) => cur.id === parent2Id,
      )

      // console.log(findInnerAttributeIndex, 'show-meee')
      const currentInnerPropsArr =
        attrArr[findParentIndex].innerAttributes[findInnerAttributeIndex].innerProps
      if (innerPropValue && currentInnerPropsArr.indexOf(innerPropValue) === -1) {
        currentInnerPropsArr.push(innerPropValue)
      }

      setAttributes(attrArr)
      setInnerPropInputVisible(false)
      setInnerPropValue('')
    }
    // const { inputValue } = this.state;
    // let { tags } = this.state;
    // if (inputValue && tags.indexOf(inputValue) === -1) {
    //   tags = [...tags, inputValue];
    // }
    // console.log(tags);
    // this.setState({
    //   tags,
    //   inputVisible: false,
    //   inputValue: '',
    // });
  }

  console.log(productTempVariants, 'varrr')

  console.log(attributes, 'our-attr')

  const onHandleSubmit = async () => {
    const sendingObj = {}
    if (attributes?.length > 0) {
      attributes.forEach((cur) => {
        const transformedObj = {
          [cur.name]: cur.innerAttributes.reduce((obj, attr) => {
            return Object.assign(obj, { [attr.name]: attr.innerProps })
          }, {}),
        }
        Object.assign(sendingObj, transformedObj)
      })

      console.log(sendingObj, 'semi-final')

      const sendingValues = {
        description,
        images,
        attributes: JSON.stringify(sendingObj),
      }

      const a = currentSelectedVariantId
        ? await editProductTemplateVariant(
            productTemplateId,
            currentSelectedVariantId,
            sendingValues,
          )
        : await addProductTemplateVariant(productTemplateId, sendingValues)
      if (a) {
        notification.success({
          message: STRINGS.success,
          description: currentSelectedVariantId ? STRINGS.editSuccess : STRINGS.addSuccess,
        })
        resetFields()
        setCurrentSelectedVariantId(null)
        reCallApi()
        setOpenModal(false)
        // setSuccess(true)
      }
    } else {
      notification.error({
        message: 'You need To add Attributes',
      })
    }
  }

  const onEditVariantHandler = (id) => {
    resetFields()
    setCurrentAction('edit')
    setOpenModal(true)
    setCurrentSelectedVariantId(id)

    const selectedVariant = productTempVariants.filter((cur) => cur.id === id)[0]

    setDescription(selectedVariant.description)
    setImages(selectedVariant.images[0])

    const attr = []

    if (selectedVariant.attributes) {
      Object.keys(selectedVariant.attributes).map(function (key, value) {
        const newId = shortid.generate()
        const item = {
          id: newId,
          name: key,
          innerAttributes: selectedVariant.attributes[key]
            ? Object.keys(selectedVariant.attributes[key]).map((attrChild) => {
                const newChildId = shortid.generate()

                const childObj = {
                  id: newChildId,
                  name: attrChild,
                  innerProps: selectedVariant.attributes[key][attrChild]
                    ? selectedVariant.attributes[key][attrChild]
                    : [],
                }
                return childObj
              })
            : [],
        }

        console.log(selectedVariant.attributes[key], 'mine')

        attr.push(item)
      })

      setAttributes(attr)
    }

    console.log(selectedVariant, attr, 'gettt')

    console.log(productTempVariants)
  }

  const onDeleteVariant = async (variantId) => {
    const a = await deleteProductTemplateVariant(productTemplateId, variantId)

    if (a) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })

      reCallApi()
    }
  }

  return (
    <>
      <Helmet title="Brands List" />

      <div className="utils__title" style={{ marginBottom: '20px' }}>
        <strong>Variant List</strong>
        <div className="pull-right">
          <Tooltip placement="topLeft" title="Add new Variant">
            <Button
              onClick={() => {
                setCurrentAction('add')
                setOpenModal(true)
                resetFields()
                setCurrentSelectedVariantId(null)
              }}
            >
              <Icon type="plus-circle" theme="filled" style={{ fontSize: '30px' }} />
            </Button>
          </Tooltip>
        </div>
      </div>
      {productTempVariants?.length > 0 ? (
        <>
          {productTempVariants?.map((cur) => (
            <div className={styles.cardContainer}>
              {/* <div className="images-cont">
                {cur.images?.map((img) => (
                  <img src={cur.images} alt="descImage" />
                ))}
              </div> */}
              <div className={styles.cardTopPart}>
                <h5>{cur.description}</h5>
                <div>
                  <span>
                    <Button
                      icon="edit"
                      className="mr-1"
                      size="small"
                      onClick={() => onEditVariantHandler(cur.id)}
                    />
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteVariant(cur.id)}>
                      <Button icon="close" size="small" />
                    </Popconfirm>
                  </span>
                </div>
              </div>
              {cur?.attributes ? (
                <Tabs defaultActiveKey="1" tabPosition="top">
                  {Object.keys(cur?.attributes).map(function (key, value) {
                    return (
                      <TabPane tab={key} key={key}>
                        <Row gutter={16}>
                          {cur?.attributes[key]
                            ? Object.keys(cur?.attributes[key]).map((key2) => {
                                return (
                                  <Col className="gutter-row" span={6}>
                                    <div className={styles.cardInsideContainer}>
                                      <div className={styles.cardHeader}>
                                        <p>{key2}</p>
                                      </div>
                                      <hr />
                                      <div className={styles.cardBody}>
                                        <p>{cur?.attributes[key][key2].join(', ')}</p>
                                      </div>
                                    </div>
                                  </Col>
                                )
                              })
                            : null}
                        </Row>
                      </TabPane>
                    )
                  })}
                </Tabs>
              ) : (
                'No attributes Found'
              )}
            </div>
          ))}
        </>
      ) : (
        'No Variants Found'
      )}

      <Modal
        title={currentAction === 'add' ? 'Add Variant' : 'Edit Variant'}
        visible={openModal}
        onOk={() => console.log('ok')}
        onCancel={() => {
          setOpenModal(false)
          setCurrentSelectedVariantId(null)
          resetFields()
        }}
        mask={false}
        destroyOnClose
        footer={false}
      >
        <Form onSubmit={onHandleSubmit}>
          <Form.Item label="Description">
            <Input
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Image">
            <Input
              placeholder="Image"
              value={images}
              name="image"
              onChange={(e) => setImages(e.target.value)}
            />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Add Attribute</div>
            <Button
              onClick={handleAddAttribute}
              shape="circle"
              icon="plus"
              style={{ marginBottom: '10px' }}
            />
          </div>

          <div className={styles.attributesGroup}>
            {attributes.map((item, index) => {
              // const key = shortid.generate()
              const key = item.id
              // console.log(item)
              return (
                <div key={key}>
                  {index > 0 && <Divider />}
                  <Input
                    onChange={(e) => onAttributeValChange(e, item.id)}
                    key={key}
                    value={item.name}
                    // autoFocus='true'
                    addonAfter={
                      <Popconfirm
                        key={key}
                        title="Sure to delete?"
                        onConfirm={() => handleDeleteAttribute(item.id)}
                      >
                        <Icon key={key} type="close" style={{ color: '#df071a' }} />
                      </Popconfirm>
                    }
                    // defaultValue={item.value}
                  />
                  <div style={{ marginLeft: 15, marginRight: 15 }}>
                    <div style={{ margin: '10px 0' }}>
                      Add Property:
                      <Button
                        style={{ marginLeft: '20px' }}
                        shape="circle"
                        icon="plus"
                        onClick={() => handleAddInnerAttribute(item.id)}
                      />
                    </div>

                    {item?.innerAttributes?.map((innerAttr) => (
                      <>
                        <Input
                          onChange={(e) => onAttributeValChange(e, innerAttr.id, item.id)}
                          key={innerAttr.id}
                          value={innerAttr.name}
                          // autoFocus='true'
                          addonAfter={
                            <Popconfirm
                              key={innerAttr.id}
                              title="Sure to delete?"
                              onConfirm={() => handleDeleteAttribute(innerAttr.id, item.id)}
                            >
                              <Icon key={innerAttr.id} type="close" style={{ color: '#df071a' }} />
                            </Popconfirm>
                          }
                          style={{ marginBottom: '15px' }}
                          // defaultValue={item.value}
                        />

                        <div style={{ marginBottom: '15px' }}>
                          {innerAttr.innerProps.map((tag, i) => {
                            const isLongTag = tag.length > 20
                            const tagElem = (
                              <Tag
                                key={tag}
                                onClose={() => innerPropHandleClose(item.id, innerAttr.id, tag)}
                                closable
                              >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                              </Tag>
                            )
                            return isLongTag ? (
                              <Tooltip title={tag} key={tag}>
                                {tagElem}
                              </Tooltip>
                            ) : (
                              tagElem
                            )
                          })}
                          {innerPropInputVisible && (
                            <Input
                              ref={innerPropValueRef}
                              // ref={this.saveInputRef}
                              type="text"
                              size="small"
                              style={{ width: 78 }}
                              value={innerPropValue}
                              onChange={innerPropHandleInputChange}
                              onBlur={() => innerPropHandleInputConfirm(item.id, innerAttr.id)}
                              onPressEnter={() => innerPropHandleInputConfirm}
                            />
                          )}
                          {!innerPropInputVisible && (
                            <Tag
                              onClick={showInnerPropInput}
                              style={{ background: '#fff', borderStyle: 'dashed' }}
                            >
                              <Icon type="plus" /> New Tag
                            </Tag>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              onClick={onHandleSubmit}
              // disabled={hasErrors(getFieldsError())}
            >
              {currentSelectedVariantId ? 'Edit Variant' : 'Add Variant'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Form.create()(VariantForm)
