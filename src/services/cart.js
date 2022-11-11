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
  



export default cartService
