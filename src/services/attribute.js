import fetch from 'auth/FetchInterceptor'

const attributeService = {}

attributeService.getAttributes = async function () {
  try {
    const res = await fetch({
      url: '/attribute',
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.deleteAttribute = async function (id) {
  try {
    const res = await fetch({
      url: `/attribute/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.getAttributeById = async function (id) {
  try {
    const res = await fetch({
      url: `/attribute/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.createAttribute = async function (data) {
  try {
    const res = await fetch({
      url: `/attribute`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.editAttribute = async function (id, data) {
  try {
    const res = await fetch({
      url: `/attribute/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default attributeService
