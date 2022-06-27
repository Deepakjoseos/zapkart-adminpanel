import fetch from 'auth/FetchInterceptor'

const productTemplate = {}

productTemplate.getProductTemplates = async function () {
  try {
    const res = await fetch({
      url: '/productTemplates',
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.deleteProductTemplate = async function (id) {
  try {
    const res = await fetch({
      url: `/productTemplates/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.getProductTemplateById = async function (id) {
  try {
    const res = await fetch({
      url: `/productTemplates/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.createProductTemplate = async function (data) {
  try {
    const res = await fetch({
      url: `/productTemplates`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.editProductTemplate = async function (id, data) {
  try {
    const res = await fetch({
      url: `/productTemplates/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// Product template variants
productTemplate.createProductTemplateVariant = async function (
  productTemplateId,
  data
) {
  try {
    const res = await fetch({
      url: `/productTemplates/${productTemplateId}/variant`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.editProductTemplateVariant = async function (
  productTemplateId,
  productTemplateVariantId,
  data
) {
  try {
    const res = await fetch({
      url: `/productTemplates/${productTemplateId}/variant/${productTemplateVariantId}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.deleteProductTemplateVariant = async function (
  productTemplateId,
  productTemplateVariantId
) {
  try {
    const res = await fetch({
      url: `/productTemplates/${productTemplateId}/variant/${productTemplateVariantId}`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default productTemplate
