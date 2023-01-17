import fetch from 'auth/FetchInterceptor'

const productService = {}
const api = '/products'
productService.getProducts = async function (paginationQuery = '', query = '') {
  try {
    let url = `${api}?${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.deleteProduct = async function (id) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.getProductById = async function (id) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.createProduct = async function (data) {
  try {
    const res = await fetch({
      url: `/products`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.editProduct = async function (id, data) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.createProductFromExcel = async function (data) {
  const formData = new FormData()
  formData.append('file', data.file)
  formData.append('deliveryZoneId', data.deliveryZoneId)

  try {
    const res = await fetch({
      url: `/products/createFromExcel`,
      method: 'post',
      data: formData,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}


productService.getPublicProducts = async function (paginationQuery = '', query = '') {
  try {
    let url = `${api}/public?${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// productService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default productService
