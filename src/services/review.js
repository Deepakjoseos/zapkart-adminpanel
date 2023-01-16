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
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

reviewService.getReviewsById = async function (customerId) {
  try {
    let url = `${apiRoute}?userId=${customerId}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}


export default reviewService
