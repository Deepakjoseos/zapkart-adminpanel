import fetch from 'auth/FetchInterceptor'

const categoryService = {}
const api = '/categories'

categoryService.getCategories = async function (query) {
  try {

    let url = `${api}`;
    const orderByPriority = query?.orderByPriority;
    const orderByLevel = query?.orderByLevel;

    if (orderByPriority) url = `${url}?orderByPriority=${orderByPriority}`;
    if (orderByLevel)
      url =
      orderByPriority && orderByPriority !== null
          ? `${url}&orderByLevel=${orderByLevel}`
          : `${url}?orderByLevel=${orderByLevel}`;
    const res = await fetch({
      url,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

categoryService.deleteCategory = async function (id) {
  try {
    const res = await fetch({
      url: `/categories/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

categoryService.getCategoryById = async function (id) {
  try {
    const res = await fetch({
      url: `/categories/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

categoryService.createCategory = async function (data) {
  try {
    const res = await fetch({
      url: `/categories`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

categoryService.editCategory = async function (id, data) {
  try {
    const res = await fetch({
      url: `/categories/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// categoryService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default categoryService
