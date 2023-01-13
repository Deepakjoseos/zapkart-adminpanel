import fetch from 'auth/FetchInterceptor'

const cartService = {}
const api = '/cart'
cartService.getCart = async function (customerId) {
    try {
      const res = await fetch({
        url: `${api}/${customerId}`,
        method: 'get',
      })
      return res.data
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  cartService.addCart = async function (customerId,data) {
    try {
      const res = await fetch({
        url: `${api}/items/${customerId}`,
        method: 'post',
        data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  



export default cartService
