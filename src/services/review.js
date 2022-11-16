import fetch from 'auth/FetchInterceptor'

const reviewService = {}
const apiRoute = '/reviews'

reviewService.getReviews = async function (data,paginationQuery = '', filterQuery = '') {
  try {
    let url = `${apiRoute}?${paginationQuery}&${filterQuery}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}


export default reviewService
