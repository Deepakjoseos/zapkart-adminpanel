import fetch from 'auth/FetchInterceptor'

const attributeService = {}

attributeService.getAttributes = async function () {
  try {
    const res = await fetch({
      url: '/attributes',
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
      url: `/attributes/${id}`,
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
      url: `/attributes/${id}`,
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
      url: `/attributes`,
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
      url: `/attributes/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.addAttributeValue = async function (attributeId, data) {
  try {
    const res = await fetch({
      url: `/attributes/${attributeId}/value`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.editAttributeValue = async function (
  attributeId,
  attributeValueId,
  data
) {
  try {
    const res = await fetch({
      url: `/attributes/${attributeId}/value/${attributeValueId}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

attributeService.deleteAttributeValue = async function (
  attributeId,
  attributeValueId
) {
  try {
    const res = await fetch({
      url: `/attributes/${attributeId}/value/${attributeValueId}`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default attributeService
