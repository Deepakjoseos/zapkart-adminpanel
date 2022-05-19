/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import { Button, Input, Select } from 'antd'
import React, { useState } from 'react'
import { getBrands } from 'services/brands'

const Filters = ({ updateData }) => {
  const [status, setStatus] = useState(null)
  const [orderByPriority, setOrderByPriority] = useState(null)

  const onFilterUpdate = async () => {
    const sendingParams = {}
    if (status) sendingParams.status = status
    if (orderByPriority) sendingParams.orderByPriority = orderByPriority

    const qs = Object.keys(sendingParams)
      .map((key) => `${key}=${sendingParams[key]}`)
      .join('&')

    const res = await getBrands(qs)
    if (res && res.data) {
      updateData(res.data)
    } else {
      console.log('hi')
    }
  }

  const onFilterCancel = async () => {
    const res = await getBrands('')
    if (res && res.data) {
      const availableData = res.data.filter((cur) => cur.status !== 'Deleted')

      updateData(availableData)
      setStatus(null)
      setOrderByPriority(null)
    } else {
      console.log('hi')
    }
  }

  return (
    <div className="filter-container">
      <h5>
        <strong>Filters</strong>
      </h5>
      {/* {renderSearchAndFilters()} */}
      <div className="filter-list">
        <div className="filter-item">
          <div className="label">Status</div>
          <Select
            allowClear
            style={{ width: '100%' }}
            // mode={i.filterMultiple ? 'multiple' : ''}
            value={status}
            onChange={(val) => setStatus(val)}
          >
            <Select.Option key="Actice" value="Active">
              Active
            </Select.Option>
            <Select.Option key="Hold" value="Hold">
              Hold
            </Select.Option>
          </Select>
        </div>

        <div className="filter-item">
          <div className="label">orderByPriority</div>
          <Select
            allowClear
            style={{ width: '100%' }}
            // mode={i.filterMultiple ? 'multiple' : ''}
            value={orderByPriority}
            onChange={(val) => setOrderByPriority(val)}
          >
            <Select.Option key={true} value={true}>
              Yes
            </Select.Option>
            <Select.Option key={false} value={false}>
              No
            </Select.Option>
          </Select>
        </div>
      </div>

      <div className="filter-footer">
        <Button type="primary" onClick={onFilterUpdate}>
          Submit
        </Button>
        <Button type="dashed" onClick={onFilterCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Filters
