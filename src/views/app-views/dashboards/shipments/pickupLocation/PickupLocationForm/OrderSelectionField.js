import { Button, Form, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from 'services/orders'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const OrderSelectionField = ({ form, fields, remove, add }) => {
  const { Option } = Select

  const [orders, setOrders] = useState([])
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [curOderItems, setCurOderItems] = useState([])

  const getOrders = async () => {
    const data = await orderService.getOrders()
    if (data) {
      setOrders(data)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <label style={{ fontWeight: 500, marginBottom: '10px' }}>Orders</label>
      {fields.map((field) => (
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => {
                setSelectedOrderId(e)
                const curOrder = orders?.find((cur) => cur.id === e)
                if (curOrder) {
                  setCurOderItems(curOrder.items)
                }
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
              mode="multiple" optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              {curOderItems.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
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
      ))}
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
