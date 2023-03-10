import fetch from 'auth/FetchInterceptor'

const medicineTypeService = {}
const apiRoute = '/medicineType'

medicineTypeService.getMedicineTypes = async function (paginationQuery = '', query = '') {
  try {
    let url = `${apiRoute}?${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

medicineTypeService.deleteMedicineType = async function (id) {
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

medicineTypeService.getMedicineTypeById = async function (id) {
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

medicineTypeService.createMedicineType = async function (data) {
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

medicineTypeService.editMedicineType = async function (id, data) {
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

export default medicineTypeService
