import fetch from 'auth/FetchInterceptor'

const taxCategoryService = {}
const apiRoute = '/taxCategory'

taxCategoryService.getTaxCategories = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default taxCategoryService
