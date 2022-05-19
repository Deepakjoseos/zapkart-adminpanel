/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { USERGROUP_API_URL, USER_API_URL } from '_constants'

const USERGROUP_URL = USERGROUP_API_URL.getUserGroup
const USER_API = USER_API_URL.getUserPerPage

// eslint-disable-next-line no-unused-vars
export async function getuserGroup(filters = '') {
  try {
    const res = await callApi(`${USERGROUP_URL}?${filters}`)
    if (res) return res
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function edituserGroup(id, values) {
  const url = `${USERGROUP_URL}/${id}`
  // const formData = new FormData()
  // console.log('value', values)
  // Object.entries(values).map(([key, value]) => {
  //   formData.append(key, value)
  //   return ''
  // })
  const sendingValues = {
    name: values.name,
    type: values.type,
    status: values.status,
  }

  const options = {
    method: 'PUT',
    // body: formData,
    body: JSON.stringify(sendingValues),
    headers: {
      'Content-type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    if (res) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function deleteuserGroup(id) {
  const url = `${USERGROUP_URL}/${id}`
  // const formData = new FormData()
  // console.log('value', values)
  // Object.entries(values).map(([key, value]) => {
  //   formData.append(key, value)
  //   return ''
  // })

  const options = {
    method: 'DELETE',
  }
  try {
    const res = await callApi(url, options)
    if (res) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function getparticularuserGroup(id) {
  try {
    const res = await callApi(`${USERGROUP_URL}/${id}`)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function adduserGroup(values) {
  const url = `${USERGROUP_URL}`
  // const formData = new FormData()
  // console.log('value', values)
  // Object.entries(values).map(([key, value]) => {
  //   formData.append(key, value)
  //   return ''
  // })

  const options = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    if (res) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function getActiveUserPagination(limit, page) {
  try {
    const res = await callApi(`${USER_API}/${limit}/${page}`)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}
