import fetch from 'auth/FetchInterceptor'

const productTemplate = {}
const api = 'producttemplates'

// productTemplate.getProductTemplates = async function (query) {
//   try {
//     let url = `${api}`
//     const brandId = query?.brandId
//     const categoryId = query?.categoryId
//     const status = query?.status
//     const manufacturerId = query?.manufacturerId
//     const medicineTypeId= query?.medicineTypeId
//     const prescriptionRequired = query?.prescriptionRequired
//     if (brandId) url = `${url}?brandId=${brandId}`
//     if (categoryId)
//       url =
//         brandId && brandId !== null
//           ? `${url}&categoryId=${categoryId}`
//           : `${url}?categoryId=${categoryId}`
//     if (status)
//       url =
//         (brandId && brandId !== null) || (categoryId && categoryId !== null)
//           ? `${url}&status=${status}`
//           : `${url}?status=${status}`

//           if (manufacturerId)
//           url =
//             (brandId && brandId !== null) || (categoryId && categoryId !== null)
//             || (status && status !==null)
//               ? `${url}&manufacturerId=${manufacturerId}`
//               : `${url}?manufacturerId=${manufacturerId}`
//           if(medicineTypeId)
//           url =
//           (brandId && brandId !== null) || (categoryId && categoryId !== null)
//           ||(status && status !==null) ||(manufacturerId && manufacturerId !==null)
//           ? `${url}&medicineTypeId=${medicineTypeId}`
//           : `${url}?medicineTypeId=${medicineTypeId}`

//           if(prescriptionRequired)
//           url =
//           (brandId && brandId !== null) || (categoryId && categoryId !== null)
//           ||(status && status !==null) ||(manufacturerId && manufacturerId !==null) || (medicineTypeId && medicineTypeId !==null)

//           ? `${url}&prescriptionRequired=${prescriptionRequired === "Yes" ?  true: false}`
//           : `${url}?prescriptionRequired=${prescriptionRequired === "Yes" ?  true: false}`

//     const res = await fetch({
//       url,
//       method: 'get',
//     })

//     const data = res.data.filter((cur) => cur.status !== 'Deleted')
//     return data
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }
productTemplate.getProductTemplates = async function (
  paginationQuery = '',
  query = ''
) {
  try {
    let url = `${api}?${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
productTemplate.getProductTemplatesPublic = async function (
  paginationQuery = '',
  query = 'status=Active'
) {
  try {
    let url = `${api}/public?${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
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

productTemplate.createProductFromExcel = async function (data) {
  const formData = new FormData()
  formData.append('file', data.file)

  try {
    const res = await fetch({
      url: `/productTemplates/createFromExcel`,
      method: 'post',
      data: formData,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default productTemplate
