import React, { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Radio, InputNumber, notification, Select } from 'antd'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { giftCardSchema } from 'utils/Schema'
import { Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import { addGiftCard,editGiftCard } from 'services/gift'
import { STRINGS } from '_constants'
import { formItemLayout, tailFormItemLayout } from 'utils'
// import FormIndex from 'pages/catalog/products/add-edit'
// import './AddForm.css'

const FormIndex = (props) => {
  console.log('props', props)
  const { data, users } = props
  // console.log('DataUSERS********', users)
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const initialvalues = {
    status: 'active',
    expirydate: moment().format(dateFormat),
  }

  useEffect(() => {
    console.log('ISEMOPUY', data)
    if (!isEmpty(data)) {
      setValues({
        ...data,
      })
    }
  }, [data])

  const [redirect, setRedirect] = useState(false)

  const fetchSubmit = async (values) => {
    console.log('12121212', values)
    // eslint-disable-next-line no-underscore-dangle
    const a = data ? await editGiftCard(data.id, values) : await addGiftCard(values)

    setSubmitting(false)
    console.log('7777777', a)
    if (a) {
      console.log('fgf')
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
        // description: STRINGS.addSuccess,
      })
      setRedirect(true)
    }
    // const a = await addCategory(values)
    // if (a)
  }

  const submitForm = () => {
    console.log("stater",values,errors)
    try {
      fetchSubmit(values)
    } catch (err) {
      setSubmitting(false)
    }
  }
  const onChangeStartDate = (e) => {
    console.log('e vent', e ,moment(e).format(dateFormat))
    setValues((a) => ({ ...a, expirydate: moment(e).format(dateFormat) }))
  }

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm
  } = useFormValidation(initialvalues, giftCardSchema, submitForm)
  console.log('**********1**********', values, errors)

  // amount:50(*)
  // status:active/redeemedm/block(*)
  // code:aqw123(*)
  // expirydate:2020-11-30 06:24:00(*)
  // userId:66(*)
  // description:ddd

  const formItems = [
    { heading: 'General Info' },
    {
      type: (
        <InputNumber
          onChange={(e) => setValues((a) => ({ ...a, amount: e }))}
          name="amount"
          value={values.amount}
          min={1}
          // size="large"
        />
      ),
      key: 'amount',
      label: 'Amount',
      error: errors.amount,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue={values.status} buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'redeem'} value="redeem">
            Redeem
          </Radio.Button>
          <Radio.Button checked={values.status === 'block'} value="block">
            Block
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: <Input value={values.code} name="code" />,
      key: 'code',
      label: 'Coupon Code',
      error: errors.code,
    },
    {
      type: <Input value={values.description} name="description" />,
      key: 'description',
      label: 'Description',
      error: errors.description,
    },
    {
      type: (
        <DatePicker
          showTime={{ format: 'HH:mm:ss' }}
          format={dateFormat}
          // allowClear={true}
          value={moment(values.expirydate)}
          onChange={onChangeStartDate}
        />
      ),
      key: 'expirydate',
      label: 'Expiry Date',
      error: errors.expirydate,
    },
    {
      type: (
        <>
          {' '}
          <Select
            value={values.userId}
            placeholder="Select User"
            onChange={(e) => setValues((a) => ({ ...a, userId: e }))}
            name="userId"
          >
            {users!==undefined && users.length > 0 ? (
              users.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.firstName ? item.firstName :item.phone} 
                </Select.Option>
              ))
            ) : (
              <Select.Option value={values.userId}>
                The selected user is deleted.Please select new user
              </Select.Option>
            )}
          </Select>
        </>
      ),
      key: 'userId',
      label: 'userId',
      error: errors.userId,
    },
  ]

  console.log('redirect', redirect)
  if (redirect) return <Redirect to="/gift" />
  return (
    <Form
      className="form-box"
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      {...formItemLayout}
    >
      {formItems.map((item) => {
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormIndex
