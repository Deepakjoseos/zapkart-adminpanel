import fetch from 'auth/FetchInterceptor'

const couponService = {}
const apiRoute = '/coupon'
couponService.getCoupons = async function (paginationQuery = '', filterQuery = '') {
  try {
    let url = `${apiRoute}?${paginationQuery}&${filterQuery}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
// couponService.getCoupons = async function () {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}`,
//       method: 'get',
//     })
//     const data = res.data.filter((cur) => cur.status !== 'Deleted')
//     return data
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

couponService.deleteCoupon = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

couponService.getCouponById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

couponService.createCoupon = async function (data) {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

couponService.editCoupon = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default couponService
