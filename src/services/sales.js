import fetch from 'auth/FetchInterceptor'

const salesService = {}
const api = '/sales'
salesService.getSales = async function (data,paginationQuery = '',
filterQuery = '') {
    try {
      const res = await fetch({
        url: `${api}/admin?${paginationQuery}&${filterQuery}`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  



export default salesService
