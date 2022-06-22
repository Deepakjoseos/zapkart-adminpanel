import fetch from 'auth/FetchInterceptor'

const customerService = {}
const apiRoute = '/customer'

customerService.getCustomers = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default customerService
