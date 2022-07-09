import { Button, Input, notification, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import attributeService from 'services/attribute'

const AddAttributeInput = ({
  attributeId,
  attributeValueId,
  value,
  refetchListDetails,
}) => {
  const [updateValue, setUpdateValue] = useState(null)
  const [mode, setMode] = useState('disabled')

  useEffect(() => {
    setUpdateValue(value)
  }, [value])

  const onEditAttributeValueHandler = async () => {
    const res = await attributeService.editAttributeValue(
      attributeId,
      attributeValueId,
      {
        value: updateValue,
      }
    )

    if (res) {
      setMode('disabled')
      refetchListDetails()
      notification.success({
        message: 'Success',
        description: 'Attribute value updated successfully',
      })
    }
  }

  const onDeleteAttributeValueHandler = async () => {
    const res = await attributeService.deleteAttributeValue(
      attributeId,
      attributeValueId
    )

    if (res) {
      setMode('disabled')
      notification.success({
        message: 'Success',
        description: 'Attribute value deleted successfully',
      })
      refetchListDetails()
    }
  }

  return (
    <Space direction="row" className="w-100">
      <Input
        value={updateValue}
        onChange={(e) => setUpdateValue(e.target.value)}
        disabled={mode === 'disabled'}
        className="w-100"
      />
      {mode === 'disabled' && (
        <Button icon={<EditOutlined />} onClick={() => setMode('edit')} />
      )}

      {mode === 'edit' && (
        <Button
          icon={<CheckOutlined />}
          onClick={onEditAttributeValueHandler}
        />
      )}
      {mode === 'edit' && (
        <Button onClick={() => setMode('disabled')}>Cancel</Button>
      )}
      {mode === 'disabled' && (
        <Button
          icon={
            <DeleteOutlined
              color="red"
              onClick={onDeleteAttributeValueHandler}
            />
          }
        />
      )}
    </Space>
  )
}

export default AddAttributeInput
