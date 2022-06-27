import { Button, Card, Input, List, notification } from 'antd'
import Flex from 'components/shared-components/Flex'
import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import AddAttributeInput from './AddAttributeInput'
import { useParams } from 'react-router-dom'
import attributeService from 'services/attribute'

const AddAttributeValue = ({ history }) => {
  const [attributeValues, setAttributeValues] = useState('')
  const [newCreateAttrValue, setNewCreateAttrValue] = useState('')

  const { id } = useParams()

  const fetchAttributeById = async () => {
    const data = await attributeService.getAttributeById(id)
    if (data) {
      setAttributeValues(data.values)
    } else {
      history.replace('/app/dashboards/catalog/attribute/attribute-list')
    }
  }

  const onAddAttributeValueHandler = async () => {
    const data = await attributeService.addAttributeValue(id, {
      value: newCreateAttrValue,
    })
    if (data) {
      setNewCreateAttrValue('')
      notification.success({
        message: 'Success',
        description: 'Attribute value added successfully',
      })
      fetchAttributeById()
    }
  }

  useEffect(() => {
    fetchAttributeById()
  }, [])

  return (
    <Card title="Attribute Values">
      <Flex>
        {/* <Select
          placeholder="Delivery Locations"
          className="w-50 mr-2"
          onChange={(val) => setSelectedDeliveryLocationId(val)}
        >
          {deliveryLocations?.map((cur) => (
            <Option value={cur.id}>{cur.name}</Option>
          ))}
        </Select> */}
        <Input
          placeholder="Attribute Value"
          className="w-50 mr-2"
          value={newCreateAttrValue}
          onChange={(e) => setNewCreateAttrValue(e.target.value)}
        />
        <Button
          icon={<CheckCircleOutlined />}
          onClick={onAddAttributeValueHandler}
        />
      </Flex>
      <div className="w-50 mt-3">
        {/* <Divider orientation="left">Delivery Locations</Divider> */}
        <List
          //   header={<div>Header</div>}
          //   footer={<div>Footer</div>}
          bordered
          dataSource={attributeValues}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={
                  <AddAttributeInput
                    attributeId={id}
                    attributeValueId={item.id}
                    value={item.value}
                    refetchListDetails={fetchAttributeById}
                  />
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  )
}

export default AddAttributeValue
