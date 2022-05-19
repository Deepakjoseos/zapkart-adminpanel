
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { getFormData } from 'utils'

export async function getSafetyAdviceList(query) {
    // itemsPerPage, currentPage, limit, sortField, sortOrder
    console.log("query",query)
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
      const res = await callApi(url,options)
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
  
export async function addTherepyClass(values) {
    console.log("Addtherpy service", values)
    const formData = getFormData(values)
   
  

    // const formData = new FormData()
    // Object.entries(values).map(([key, data]) => {
    //   if (key === 'userData') formData.append(key, JSON.stringify(data))
    //   else if (key === 'validFrom' || key === 'validTo')
    //     formData.append(key, new Date(data).toISOString().slice(0, 10))
    //   else formData.append(key, data)
    //   return null
    // })
    const url = ' /api/catalog/v1/therapeuticClass'
    const options = {
        method: 'POST',
        body: formData,
    }
    try {
        const res = await callApi(url, options)
        console.log("response", res)
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


export async function editTherepy(id,values) {
    console.log("Edit therepy service", id,values)
    const formData = getFormData(values)
 
     
    const url = ` /api/catalog/v1/therapeuticClass/${id}`
    const options = {
        method: 'PATCH',
        body: formData,
    }
    try {
        const res = await callApi(url, options)
        console.log("response edit", res)
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
