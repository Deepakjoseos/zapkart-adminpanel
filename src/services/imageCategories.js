import fetch from 'auth/FetchInterceptor'

const imageCategoriesService = {}
const api = `/imageCategories`

imageCategoriesService.getImageCategories = async function (
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

imageCategoriesService.deleteImageCategories= async function (id) {
  try {
    const res = await fetch({
      url: `/imageCategories/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

imageCategoriesService.getImageCategoriesById = async function (id) {
  try {
    const res = await fetch({
      url: `/imageCategories/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

imageCategoriesService.createImageCategories= async function (data) {
  try {
    const res = await fetch({
      url: `/imageCategories`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

imageCategoriesService.editImageCategories = async function (id, data) {
  try {
    const res = await fetch({
      url: `/imageCategories/${id}`,
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

export default imageCategoriesService
