import fetch from 'auth/FetchInterceptor'

const pickupService = {}
const apiRoute = '/pickupLocation'

pickupService.getAll = async function (paginationQuery='', query ='') {
    try {
      const res = await fetch({
        url: `${apiRoute}?${paginationQuery}&${query}`,
        method: 'get',
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }

  export default pickupService;