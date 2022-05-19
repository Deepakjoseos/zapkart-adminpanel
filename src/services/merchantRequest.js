/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'

export async function getAllMerchantRequest(request) {
  console.log('valuesin ', request)
  // const url=`/api/backend/v1/requests/?request=${request}`
  const url = `/api/backend/v1/requests?request=${request}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await callApi(url, options)
    console.log('response', res)
    if (res && res.success) {
      notification.success({
        message: 'Success!',
        description: 'Fetched successfully',
      })
      return res.data
    }
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function editMerchant(id, values) {
  console.log('value', id, values)

  const url = `api/backend/v1/requests/${id}`
  // const formData = new FormData()
  // Object.entries(values).map(([key, value]) => {
  //   formData.append(key, value)
  //   return ''
  // })

  const options = {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    console.log('res', res)
    if (res && res.success) {
      notification.success({
        message: 'Success!',
        description: 'Updated successfully',
      })
      return true
    }
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}
