import fetch from 'auth/FetchInterceptor'

const medicineService = {}
const api = '/medicineType'

medicineService.getMedicinetypes = async function (paginationQuery = '', query = ''){
    try {
        let url = `${api}?${paginationQuery}&${query}`
        const res = await fetch({
          url,
          method: 'get',
        })
        const data = res.data.filter((cur) => cur.status !== 'Deleted')
        return data
      } catch (err) {
        console.log(err, 'show-err')
      }
    }
export default medicineService;
