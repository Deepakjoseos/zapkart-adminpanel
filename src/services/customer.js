import fetch from 'auth/FetchInterceptor'

const customerService = {}
const apiRoute = '/customers'

customerService.getCustomers = async function (query = '') {
  try {
    const res = await fetch({
      url: `${apiRoute}/all?${query}`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.getCustomerById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.editCustomer = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.ediCustomerStatus = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/status`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.getCustomerPrescription = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/prescriptions/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.updateCustomerPrescription = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/prescriptions/${id}`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
customerService.addCustomer = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.addAddress = async function (customerId, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/address/${customerId}/admin`,
      method: 'post',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.editAddress = async function (customerId, addressId, data) {
  console.log(data, 'hjh')
  try {
    const res = await fetch({
      url: `${apiRoute}/address/${customerId}/${addressId}/admin`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

customerService.deleteAddress = async function (customerId, addressId, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/address/${customerId}/${addressId}/admin`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// *******************************EDIT**************************************************************

customerService.updatePhoneNumber = async function (data, id) {
  
  try {
    console.log(data);
  const res = await fetch({
    url: `https://ecommercelive.riolabz.com/api/v1/admin/update-user-phone/${id}`,
    method: 'put',
    data
  })
  return res
} catch (err) {
  console.log(err, 'show-err')
}
}

customerService.verifyEmailAdress = async(id) =>{
  try {
  const res = await fetch({
    url: `https://ecommercelive.riolabz.com/api/v1/admin/verify-user-email/${id}`,
    method: 'put'
  })
  return res
} catch (err) {
  console.log(err, 'show-err')
}
}

// *******************************EDIT**************************************************************

// *******************************DELETE**************************************************************

customerService.deleteCustomer = async function (id) {
  
  try {
  const res = await fetch({
    url: `https://ecommercelive.riolabz.com/api/v1/admin/delete-user/{userId}?userId=${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}





// *******************************DELETE**************************************************************



export default customerService
