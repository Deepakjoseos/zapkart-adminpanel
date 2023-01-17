import fetch from 'auth/FetchInterceptor'

const cityService = {}
const api = `/city`

cityService.getCity = async function (
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

cityService.deleteCity= async function (id) {
  try {
    const res = await fetch({
      url: `/city/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

cityService.getCityById = async function (id) {
  try {
    const res = await fetch({
      url: `/city/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

cityService.createCity= async function (data) {
  try {
    const res = await fetch({
      url: `/city`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

cityService.editCity = async function (id, data) {
  try {
    const res = await fetch({
      url: `/city/${id}`,
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

export default cityService
