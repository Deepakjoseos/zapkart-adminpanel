import fetch from 'auth/FetchInterceptor'

const reviewService = {}
const apiRoute = '/reviews'

reviewService.getReviews = async function (vendorId,paginationQuery = '', filterQuery = '',) {
  try {
    let url = `${apiRoute}?vendorId=${vendorId}&${paginationQuery}&${filterQuery}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

reviewService.getReviewsById = async function (vendorId) {
  try {
    let url = `${apiRoute}?userId=${vendorId}`
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
