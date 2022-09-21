import fetch from 'auth/FetchInterceptor'

const countryService = {}
const api = `/country`

countryService.getCountry = async function (
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

countryService.deleteCountry= async function (id) {
  try {
    const res = await fetch({
      url: `/country/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

countryService.getCountryById = async function (id) {
  try {
    const res = await fetch({
      url: `/country/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

countryService.createCountry= async function (data) {
  try {
    const res = await fetch({
      url: `/country`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

countryService.editCountry = async function (id, data) {
  try {
    const res = await fetch({
      url: `/country/${id}`,
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

export default countryService
