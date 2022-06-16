import fetch from 'auth/FetchInterceptor'

const manufacturerService = {}

manufacturerService.getManufacturer = async function () {
  try {
    const res = await fetch({
      url: '/manufacturer',
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
      url: `/manufacturer/${id}`,
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
      url: `/manufacturer/${id}`,
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
      url: `/manufacturer`,
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
      url: `/manufacturer/${id}`,
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
