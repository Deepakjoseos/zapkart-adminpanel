import fetch from 'auth/FetchInterceptor'
import _ from 'lodash'


const salesService = {}
const api = '/sales'
salesService.getSales = async function (paginationQuery = '',
//     &${filterQuery} filterQuery = '',
data) {
    try {
      // const pageValues = _.pickBy(paginationQuery,_.identity)
      console.log(paginationQuery.pagination);
      const res = await fetch({
        url: `${api}/admin`,
        method: 'post',
        data: {...data ,
        "page": paginationQuery.pagination.current,
        "limit": paginationQuery.pagination.pageSize
        }
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  



export default salesService
