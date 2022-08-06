import fetch from 'auth/FetchInterceptor'

const productTemplate = {}
const api= 'producttemplates'

productTemplate.getProductTemplates = async function (query) {
  try {
      let url = `${api}`;
      const brandId = query?.brandId;
      const categoryId = query?.categoryId;
      const status = query?.status;
      if (brandId) url = `${url}?brandId=${brandId}`;
      if (categoryId)
        url =
          brandId && brandId !== null
            ? `${url}&categoryId=${categoryId}`
            : `${url}?categoryId=${categoryId}`;
      if (status)
        url =
          (brandId && brandId !== null) ||
            (categoryId && categoryId !== null)
            ? `${url}&status=${status}`
            : `${url}?status=${status}`;
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

// Product template variant attributes
productTemplate.createProductTemplateVariantAttributeValue = async function (
  productTemplateId,
  productTemplateVariantId,
  attributeId,
  data
) {
  try {
    const res = await fetch({
      url: `/productTemplates/${productTemplateId}/variant/${productTemplateVariantId}/attribute/${attributeId}`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productTemplate.deleteProductTemplateVariantAttribute = async function (
  productTemplateId,
  productTemplateVariantId,
  attributeId
) {
  try {
    const res = await fetch({
      url: `/productTemplates/${productTemplateId}/variant/${productTemplateVariantId}/attribute/${attributeId}`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default productTemplate
