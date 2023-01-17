import fetch from 'auth/FetchInterceptor'

const paymentService = {}
const apiRoute = '/payment'
paymentService.createBankAccount = async function (userId,data) {
    console.log('bankaccount',data,userId)
    try {
      const res = await fetch({
        url: `${apiRoute}/addFundAccountVendor/${userId}`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  paymentService.getBankAccounts = async function (query) {
    try {
      let url=  `${apiRoute}/getFundAccounts/admin`
      const userId= query.userId
      if (userId)  url = `${url}?userId=${userId}`;
      const res = await fetch({
        url: url,
        method: 'get',
      })
      // const data = res.data.filter((cur) => cur.status !== 'Deleted')
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  export default paymentService