import fetch from 'auth/FetchInterceptor'

const salesService = {}
const api = '/sales'
salesService.getSales = async function (data) {
    try {
      const res = await fetch({
        url: `${api}/admin`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  



export default salesService
