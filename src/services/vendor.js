import fetch from 'auth/FetchInterceptor'

const vendorService = {}
const apiRoute = '/vendors'

vendorService.getVendors = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// vendorService.getCustomerById = async function (id) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'get',
//     })
//     return res.data
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// vendorService.editCustomer = async function (id, data) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'put',
//       data,
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

export default vendorService
