import fetch from 'auth/FetchInterceptor'

const taxCategoryService = {}
const apiRoute = '/taxCategory'

taxCategoryService.getTaxCategories = async function () {
    try {
      const res = await fetch({
        url: `${apiRoute}`,
        method: 'get',
      })
      const data = res.data.filter((cur) => cur.status !== 'Deleted')
      return data
    } catch (err) {
      console.log(err, 'show-err')
    }
  }

taxCategoryService.deleteTaxCategory = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

taxCategoryService.getTaxCAtegoryById = async function (id) {
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

taxCategoryService.createTaxCategory = async function (data) {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

taxCategoryService.editTaxCategory = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// medicineTypeService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default taxCategoryService
