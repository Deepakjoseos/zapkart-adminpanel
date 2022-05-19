import { notification } from 'antd'
import callApi from 'utils/callApi'
// import { getFormData } from 'utils'

export async function getSafetyAdviceList(query) {
  // itemsPerPage, currentPage, limit, sortField, sortOrder
  console.log('query', query)
  // let appendQuery = ''
  // if (query)
  //   Object.entries(query).forEach(([key, val]) => {
  //     switch (key) {
  //       case 'itemsPerPage':
  //         appendQuery += `limit=${val}&`
  //         break
  //       case 'currentPage':
  //         appendQuery += `page=${val}&`
  //         break
  //       case 'sortField':
  //         appendQuery += `sortField=${val}&`
  //         break
  //       case 'sortOrder':
  //         appendQuery += `sortOrder=${val}&`
  //         break
  //       case 'search':
  //         Object.entries(val).forEach(([k, v]) => {
  //           console.log(val, k, v)
  //           appendQuery += `${key}[${k}]=${v}&`
  //         })
  //         break
  //       case 'fields':
  //         val.forEach((i) => {
  //           appendQuery += `fields[]=${i}&`
  //         })
  //         break
  //       default:
  //         break
  //     }
  //   })

  // const url = `${CATALOG_API_URL.getProducts}${appendQuery.length > 0 ? `?${appendQuery}&` : ''}`
  // /api/catalog/v1/safetyadvice?page=1&limit=4&field[]=name&field[]=icon.url,/api/catalog/v1/safetyadvice?page=1&limit=5&field[]=name&field[]=icon.url&sort[priorityOrder]=1
  const url = `/api/catalog/v1/safetyadvice?page=1`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    // const { products } = res
    const { data } = res
    console.log(data)
    if (data) return data
    notification.error({
      message: 'No products',
    })
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: error.message || 'ERROR_TRY_LATER',
    })
  }
  return null
}

export async function addSafetyAdvice(values) {
  console.log('Add SafetyAdd service', values)
  // const formData = getFormData(values)
  const { name, status, priorityOrder, icon } = values
  const formData = new FormData()
  formData.append('name', name)
  formData.append('status', status)
  formData.append('priorityOrder', priorityOrder)
  const modmainImg = icon[0].originFileObj
  formData.append('icon', modmainImg)

  // const formData = new FormData()
  // Object.entries(values).map(([key, data]) => {
  //   if (key === 'userData') formData.append(key, JSON.stringify(data))
  //   else if (key === 'validFrom' || key === 'validTo')
  //     formData.append(key, new Date(data).toISOString().slice(0, 10))
  //   else formData.append(key, data)
  //   return null
  // })
  const url = '/api/catalog/v1/safetyadvice'
  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    console.log('response', res)
    if (res && res.data) return res.data
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}

export async function editSafety(id, values, data) {
  console.log('Add SafetyAdd service', id, values, data)
  // const formData = getFormData(values)

  // const {name,status,priorityOrder}=values
  // console.log('values.image', values)
  // console.log('origData.image', data)

  // const formData = new FormData()
  // formData.append('name', name)
  // formData.append('status', status)
  // formData.append('priorityOrder', priorityOrder)
  // if(values.icon!==undefined){
  //   const formImgs = values.icon.map(i => {
  //     if (i.originFileObj) formData.append('icon', i.originFileObj)
  //     return i.uid
  //   })
  //   console.log('formImgs', formImgs)
  // }
  // delete values.icon

  const formData = new FormData()
  console.log('values.image', values)
  console.log('origData.image', data)

  // const file = new File([''], values.icon[0].name, {
  //   name: '2020-11-12T11_26_51.202ZDentists-in-the-US-Email-List.jpg',
  //   size: 9579,
  //   type: 'image/jpeg',
  //   uid: 'rc-upload-1607527320591-2',
  //   lastModifiedDate: new Date(),
  //   webkitRelativePath: '',
  // })
  // console.log('File array', file)
  // const origImgs = origData.images.map(i => i._id)
  // console.log(origImgs)
  if (values.icon !== undefined) {
    if (values.icon[0].originFileObj) formData.append('icon', values.icon[0].originFileObj)
    // else formData.append('icon', values.icon[0])
  }
 

  // formData.append('icon', values.icon[0].originFileObj ? values.icon[0].originFileObj : values.icon)

  const reqFields = ['name', 'status', 'priorityOrder']
  // if (data !== undefined) {
  //   console.log('inside daeleted')
  //   // eslint-disable-next-line no-underscore-dangle
  //   formData.append('deletedIcone', data.icon._id)
  // }

  Object.entries(values).map(([key, value]) => {
    if (reqFields.includes(key)) formData.append(key, value)
    return ''
  })

  // const formData = new FormData()
  // Object.entries(values).map(([key, data]) => {
  //   if (key === 'userData') formData.append(key, JSON.stringify(data))
  //   else if (key === 'validFrom' || key === 'validTo')
  //     formData.append(key, new Date(data).toISOString().slice(0, 10))
  //   else formData.append(key, data)
  //   return null
  // })
  const url = `api/catalog/v1/safetyadvice/${id}`
  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    console.log('response edit', res)
    if (res && res.data) return true
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}
