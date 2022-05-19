import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { getAllMerchnats } from 'services'

const { Option } = Select
function AdminDetails(props) {
  const [merchants, setMerchants] = useState([])
  const [merchantId, setMerchantId] = useState('')
  useEffect(() => {
    // setMerchantId(102)
    const fetchMerchants = async () => {
      const cData = await getAllMerchnats()
      console.log('CDATA MERchant', cData)
      if (cData) {
        setMerchants(cData)
        setMerchantId(cData[0].userId)
        props.fetchAdminDetails(cData[0].userId)
      }
    }
    fetchMerchants()
  }, [])

  const onChange = (e) => {
    console.log('e', e)
    setMerchantId(e)
    props.fetchAdminDetails(e)
    // setValues((prev) => ({ ...prev, merchantId: a }))
  }
  console.log('merchant', merchantId)
  return (
    <div>
      <span
        style={{
          fontWeight: 'lighter',
          fontSize:'1rem'
        }}
      >
        Merchant
      </span>
      &nbsp; &nbsp;
      <Select
        name="merchantId"
        value={merchantId}
        placeholder="Select Merchant"
        onChange={(a) => onChange(a)}
        style={{ width: '30%' }}
        defaultValue={merchantId}
        // onPopupScroll={this.handlePopupScroll}
      >
        {merchants.map((d) => (
          <Option key={d.userId} value={d.userId}>
            {d.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default AdminDetails
