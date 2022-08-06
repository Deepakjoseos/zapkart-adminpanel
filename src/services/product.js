import fetch from 'auth/FetchInterceptor'

const productService = {}
const api = '/products'

productService.getProducts = async function (query) {
  try {
    let url = `${api}`;
    const brandId = query?.brandId;
    const categoryId = query?.categoryId;
    const status = query?.status;
    const vendorId = query?.vendorId;
    const approval = query?.approval;
    const acquirementMethod = query?.acquirementMethod;
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

    if (vendorId)
      url =
        (brandId && brandId !== null) ||
          (categoryId && categoryId !== null)
          ? `${url}&vendorId=${vendorId}`
          : `${url}?vendorId=${vendorId}`;
    if (approval)
      url =
        (brandId && brandId !== null) ||
          (categoryId && categoryId !== null) ||
          (vendorId && vendorId !== null) 
          ? `${url}&approval=${approval}`
          : `${url}?approval=${approval}`;
    if (acquirementMethod)
      url =
        (brandId && brandId !== null) ||
          (categoryId && categoryId !== null) ||
          (vendorId && vendorId !== null)||
          (approval && approval!==null)
          ? `${url}&acquirementMethod=${acquirementMethod}`
          : `${url}?acquirementMethod=${acquirementMethod}`;


    const res = await fetch({
      url,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};
productService.deleteProduct = async function (id) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.getProductById = async function (id) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.createProduct = async function (data) {
  try {
    const res = await fetch({
      url: `/products`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.editProduct = async function (id, data) {
  try {
    const res = await fetch({
      url: `/products/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.approvalProduct = async function (id, approvalValue) {
  try {
    const res = await fetch({
      url: `/products/${id}/${approvalValue}`,
      method: 'put',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

productService.createProductFromExcel = async function (data) {
  const formData = new FormData()
  formData.append('file', data.file)
  formData.append('deliveryZoneId', data.deliveryZoneId)
  formData.append('vendorId', data.vendorId)

  try {
    const res = await fetch({
      url: `/products`,
      method: 'post',
      data: formData,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// productService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default productService
