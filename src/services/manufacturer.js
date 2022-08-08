import fetch from 'auth/FetchInterceptor'

const manufacturerService = {}
const api= '/manufacturers'

manufacturerService.getManufacturer = async function (query) {
  try {
    let url = `${api}`
    const orderByPriority = query?.orderByPriority
    if(orderByPriority)
    url= `${api}?orderByPriority=${orderByPriority}`;
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

manufacturerService.deleteManufacturer = async function (id) {
  try {
    const res = await fetch({
      url: `/manufacturers/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

manufacturerService.getManufacturerById = async function (id) {
  try {
    const res = await fetch({
      url: `/manufacturers/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

manufacturerService.createManufacturer = async function (data) {
  try {
    const res = await fetch({
      url: `/manufacturers`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

manufacturerService.editManufacturer = async function (id, data) {
  try {
    const res = await fetch({
      url: `/manufacturers/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// manufacturerService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default manufacturerService
