import fetch from 'auth/FetchInterceptor'

const paymentService = {}
const apiRoute = '/payment'

//Transactions
// walletService.getTransactions = async function (query) {
//     try {
//       let url=  `${apiRoute}/all/transactions`
//       const userId= query.userId
//       if (userId)  url = `${url}?userId=${userId}`;
//       const res = await fetch({
//         url: url,
//         method: 'post',
//       })
//       // const data = res.data.filter((cur) => cur.status !== 'Deleted')
//       return res
//     } catch (err) {
//       console.log(err, 'show-err')
//     }
//   }
paymentService.getBankAccounts = async function (query) {
    try {
      let url=  `${apiRoute}/user/getFundAccounts`
    //   const userId= query.userId
    //   if (userId)  url = `${url}?userId=${userId}`;
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
  paymentService.createBankAccount = async function (data) {
    console.log('bankaccount',data)
    try {
      const res = await fetch({
        url: `${apiRoute}/addFundAccountVendor`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  
//   walletService.deleteTaxCategory = async function (id) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'delete',
//     })
//     //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// walletService.getTransactionByUserId = async function (userId) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/transactions/${userId}`,
//       method: 'post',
//     })
//     return res.data
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// walletService.getWallet = async function () {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}`,
//       method: 'get',
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }
// walletService.getBankAccounts = async function () {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}`,
//       method: 'get',
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// walletService.editTaxCategory = async function (id, data) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'put',
//       data: data,
//     })
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// medicineTypeService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default paymentService
