import fetch from 'auth/FetchInterceptor'

const stateService = {}
const api = `/state`

stateService.getState = async function (
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

stateService.deleteState= async function (id) {
  try {
    const res = await fetch({
      url: `/state/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

stateService.getStateById = async function (id) {
  try {
    const res = await fetch({
      url: `/state/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

stateService.createState= async function (data) {
  try {
    const res = await fetch({
      url: `/state`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

stateService.editState = async function (id, data) {
  try {
    const res = await fetch({
      url: `/state/${id}`,
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

export default stateService 
