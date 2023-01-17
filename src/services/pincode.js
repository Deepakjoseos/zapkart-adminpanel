import fetch from 'auth/FetchInterceptor'

const pincodeService = {}
const api = `/pincode`

pincodeService.getPincode = async function (
  paginationQuery = '',
  filterQuery = ''
) {
  try {
    let url = `${api}?${paginationQuery}&${filterQuery}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

pincodeService.deletePincode= async function (id) {
  try {
    const res = await fetch({
      url: `/pincode/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

pincodeService.getPincodeById = async function (id) {
  try {
    const res = await fetch({
      url: `/pincode/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

pincodeService.createPincode= async function (data) {
  try {
    const res = await fetch({
      url: `/pincode`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

pincodeService.editPincode = async function (id, data) {
  try {
    const res = await fetch({
      url: `/pincode/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// brandService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default pincodeService
