/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import { Button, Input, Select } from 'antd'
import React, { useState } from 'react'
import { getuserGroup } from 'services/usergroups'

const Filters = ({ updateData }) => {
  const [status, setStatus] = useState(null)

  const onFilterUpdate = async () => {
    const sendingParams = {}
    if (status) sendingParams.status = status

    const qs = Object.keys(sendingParams)
      .map((key) => `${key}=${sendingParams[key]}`)
      .join('&')

    const res = await getuserGroup(qs)
    if (res) {
      updateData(res)
    } else {
      console.log('hi')
    }
  }

  const onFilterCancel = async () => {
    const res = await getuserGroup()
    if (res) {
      const availableData = res.filter((cur) => cur.status !== 'Deleted')

      updateData(availableData)
      setStatus(null)
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
