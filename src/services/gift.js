
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { getFormData } from 'utils'

export async function getSafetyAdviceList(query) {
    // itemsPerPage, currentPage, limit, sortField, sortOrder
    console.log("query",query)
     
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
  
export async function addGiftCard(values) {
    console.log("Addtherpy service", values)
    const formData = getFormData(values)
   
    const url = '/api/backend/v1/giftcard/create'
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


export async function editGiftCard(id,values) {
    console.log("Edit therepy service", id,values)
 const {amount,userId,code,description,expirydate,status}=values
 const obj={
  amount,userId,code,description,expirydate,status 
 }
    const formData = getFormData(obj)
 
     
    const url = `/api/backend/v1/giftcard/${id}`
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
