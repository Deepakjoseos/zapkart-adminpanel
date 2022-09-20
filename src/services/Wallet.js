import fetch from 'auth/FetchInterceptor'

const walletService = {}
const apiRoute = '/wallet'

//Transactions
walletService.getTransactions = async function (query) {
    try {
      let url=  `${apiRoute}/all/transactions`
      const userId= query.userId
      if (userId)  url = `${url}?userId=${userId}`;
      const res = await fetch({
        url: url,
        method: 'post',
      })
      // const data = res.data.filter((cur) => cur.status !== 'Deleted')
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

walletService.getTransactionByUserId = async function (userId) {
  try {
    const res = await fetch({
      url: `${apiRoute}/transactions/${userId}`,
      method: 'post',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

walletService.createTaxCategory = async function (data) {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

walletService.editTaxCategory = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// medicineTypeService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default walletService
