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
  export default paymentService