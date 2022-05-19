/* eslint-disable */
import React, { useEffect } from 'react'
import {
  Button,
  Form, // Input,Upload,
  Select,
  Row,
  Col,
  InputNumber,
} from 'antd'
// import _uniqueId from 'lodash/uniqueId'
// import _ from 'lodash'

import { generateKey } from 'utils'

// import useUpload from 'hooks/useUpload'
import PropTypes from 'prop-types'
import AddNew from 'components/CustomComponents/AddNew'
import { getuserGroup } from 'services/usergroups'
import { ROLES } from '_constants'
import { FormContext } from '../tabs'
import Safety from './Safety'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const FormD = (props) => {
  console.log('FormD props', props)
  // eslint-disable-next-line no-unused-vars
  const { type, hasTitle, hideSubmit, formControls } = props
  // const [id] = React.useState(_uniqueId('prefix-'));
  const formContext = React.useContext(FormContext)
  const [attributesData, setAttributesData] = React.useState([])

  // const [attributesValues, setAttributesValues] = React.useState([])
  const [formShow, setformShow] = React.useState(false)

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,
    setValues,
    // validateForm,
  } = formControls || formContext

  console.log('values**************', values.safety_advice, values.safe)

  const onChangeAttrGrp = (val, index) => {
    // const aVals = attributesData.filter((i) => i.id === val)
    setValues((m) => {
      m.tierPrice[index] = {}
      m.tierPrice[index].customerGroup = val
      m.tierPrice[index].price = null
      m.tierPrice[index].quantity = null
      return { ...m }
    })
  }

  const onChangeAttrValues = (val, index, name) => {
    setValues((a) => {
      a.tierPrice[index][name] = val
      return { ...a }
    })
  }

  //   quickTip : HTML CONTENT
  // faq : HTML CONTENT
  // references : HTML CONTENT
  // therapeutic_class : 5faaa10e166f7b26ebde8c26(ID FROM THERAPEUTIC API-LIST BOX)
  // habitForming : ENUM(Yes or No)
  // NB: safety_advice: (ID FROM SAFETY ADVICE API-LIST BOX)
  // status_tag: ENUM("UNSAFE", "SAFE IF PRESCRIBED","CAUTION","CONSULT YOUR DOCTOR")
  // description: STRING
  const onClickAddAttr = () => {
    setformShow(true)
    setValues((a) => {
      const newData = {
        key: generateKey('attr'),
        safety_advice: null,
        status_tag: null,
        description: null,
      }
      console.log('new safe', a.safe)
      a.safe = [...a.safe, newData]
      console.log('a', a.safety_advice, a.safe, newData)
      return { ...a }
    })
  }

  const handleDeleteAttr = (ind) => {
    console.log('delete attr', ind)
    setValues((a) => {
      const filtered = a.safe.filter((i, index) => index !== ind)
      console.log('updated', filtered, filtered.length)
      return { ...a, safe: filtered }
    })
  }

  return (
    <>
      <Form
        {...formItemLayout}
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
      >
        <Row>
          {hasTitle && (
            <Col xs={20} sm={20} md={5} lg={5} xl={5}>
              <h4 className="text-black mb-3">
                <strong>Safety Advice</strong>
              </h4>
            </Col>
          )}
          {/* {(values.prescriptionNeeded === 'true' || values.prescriptionNeeded === true) && ( */}

          <Col xs={4} sm={4} md={2} lg={2} xl={2}>
            <AddNew add onClick={onClickAddAttr} attribute="safety advice" />
          </Col>
          {/* // )} */}
        </Row>
        {/* {formShow && <Safety/>} */}
        {values.safe && values.safe.length > 0 ? (
          values.safe.map((i, index, array) => {
            console.log('ffffffffffffff', array, values.safe.length, i, index)
            return (
              <>
                <Row key={i.key} gutter={10}>
                  {/* <Col span={10}> */}
                  <Safety index={index} data={i} show={true} />

                  {/* <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].customerGroup`] && 'error'}
                      help={errors[`tierPrice[${index}].customerGroup`]}
                    >
                      <Select
                        // disabled={mandatorytierPrice.includes(i.attribute)}
                        defaultValue={i.customerGroup}
                        placeholder="Select Use Group"
                        onBlur={(val) => onChangeAttrGrp(val, index)}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option selected value={0}>
                          default
                        </Select.Option>
                        {selectAttrGrpOptions(index)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].price`] && 'error'}
                      help={errors[`tierPrice[${index}].price`]}
                    >
                      {
                        <InputNumber
                          defaultValue={i.price}
                          type="number"
                          placeholder="price"
                          onChange={(val) => onChangeAttrValues(val, index, 'price')}
                        />
                      }
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].quantity`] && 'error'}
                      help={errors[`tierPrice[${index}].value`]}
                    >
                      {
                        <InputNumber
                          defaultValue={i.quantity}
                          type="number"
                          placeholder="quantity"
                          min={0}
                          onChange={(val) => onChangeAttrValues(val, index, 'quantity')}
                        />
                      }
                    </Form.Item> */}
                  {/* </Col> */}
                  {
                    <Col span={24}>
                      <AddNew onRemove={() => handleDeleteAttr(index)} attribute="Safety Advice" />
                    </Col>
                  }
                </Row>
              </>
            )
          })
        ) : (
          <>
            <Row>
              <Form.Item
                className={`${errors.safe ? 'has-error' : ''}`}
                validateStatus={errors.safe}
                help={errors.safe}
              />
              {!errors.safe && <span>Add Safety...</span>}
            </Row>
          </>
        )}

        {values.safe.length > 0 && !hideSubmit && (
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form>
    </>
  )
}

FormD.propTypes = {
  type: PropTypes.string,
  hasTitle: PropTypes.bool,
  hideSubmit: PropTypes.bool,
  formControls: PropTypes.object,
}

FormD.defaultProps = {
  type: 'multiple',
  hasTitle: true,
  hideSubmit: false,
  formControls: null,
}

export default FormD
