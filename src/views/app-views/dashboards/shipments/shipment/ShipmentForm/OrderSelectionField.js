import { Button, Form, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from 'services/orders'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const OrderSelectionField = ({
  form,
  fields,
  remove,
  add,
  selectedVendorId,
}) => {
  const { Option } = Select

  const [orders, setOrders] = useState([])
  const [orderChangeTracker, setOrderChangeTracker] = useState([])

  const getOrders = async () => {
    const data = await orderService.getOrders(
      '',
      `vendorId=${selectedVendorId}`
    )
    if (data.data) {
      setOrders(data.data)
    }
  }

  const resetOrderItem = (fieldIndex, orderId) => {
    const resetCur = form.getFieldValue('items')?.map((cur, i) => {
      if (i === fieldIndex) {
        return { orderId: orderId, itemIds: [] }
      } else {
        return { ...cur }
      }
    })
    return resetCur
  }

  const getOrderItems = (fieldIndex) => {
    const allOrderItems = orders?.find(
      (cur) => cur.id === form.getFieldValue('items')[fieldIndex]?.orderId
    )

    const filterOrderItemsByVendor = allOrderItems?.items?.filter(
      (cur) => cur.vendorId === selectedVendorId
    )

    return filterOrderItemsByVendor
  }

  useEffect(() => {
    getOrders()
  }, [selectedVendorId])

  return (
    <>
      <label style={{ fontWeight: 500, marginBottom: '10px' }}>Orders</label>
      {fields.map((field) => {
        console.log(field, 'shshsuigui')
        return (
          <Space
            key={field.key}
            style={{ display: 'flex', width: '100%' }}
            align="baseline"
          >
            <Form.Item
              {...field}
              rules={[{ required: true, message: 'required' }]}
              name={[field.name, 'orderId']}
              fieldKey={[field.fieldKey, 'orderId']}
            >
              <Select
                placeholder="Select Order"
                style={{ width: 300 }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(e) => {
                  setOrderChangeTracker(!orderChangeTracker)

                  form.setFieldsValue({
                    items: resetOrderItem(field.name, e),
                  })
                }}
              >
                {orders?.map((order) => (
                  <Option key={order.id} value={order.id}>
                    {order.orderNo}
                  </Option>
                ))}
              </Select>
              {/* <Input placeholder="name" /> */}
            </Form.Item>
            <Form.Item
              {...field}
              rules={[{ required: true, message: 'required' }]}
              name={[field.name, 'itemIds']}
              fieldKey={[field.fieldKey, 'itemIds']}
            >
              <Select
                mode="multiple"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                //   size={size}
                placeholder="Products Items"
                defaultValue={[]}
                onChange={(e) => {
                  // form.setFieldsValue({
                  //   [field.name]: {
                  //     ...form.getFieldsValue(field.name),
                  //     itemIds: e,
                  //   },
                  // })
                }}
                style={{ width: 300 }}
              >
                {/* {orders?.map((order) => {
                return order?.items.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))
              })} */}

                {/* {curOderItems.map((item) => ( */}
                {
                  form.getFieldValue('items')[field.name]?.orderId &&
                    getOrderItems(field.name)?.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))

                  // <Option
                  //   value={form.getFieldValue('items')[field.name]['orderId']}
                  // >
                  //   {form.getFieldValue('items')[field.name]['orderId']}
                  // </Option>
                }

                {/* ))} */}
              </Select>
            </Form.Item>
            {fields.length > 1 && (
              <MinusCircleOutlined
                onClick={() => {
                  //   onAttributeChange()
                  remove(field.name)
                }}
              />
            )}
          </Space>
        )
      })}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => {
            add()
            // checkPrescriptionRequired()
          }}
          icon={<PlusOutlined />}
        >
          Add Order
        </Button>
      </Form.Item>
    </>
  )
}

export default OrderSelectionField
