import fetch from 'auth/FetchInterceptor'

const payoutService = {};

payoutService.getPayoutReq= async function(paginationQuery = '', query = '') {
    try {
            let url = `https://ecommercelive.riolabz.com/api/v1/wallet/payout/requests/all/admin?${paginationQuery}&${query}`
            const res = fetch({
                url ,
                method: 'get'
            })
        return res;
    } catch(err) {
        console.log(err,'show-err')
    }
}

payoutService.approvePayout= async function(data) {
    try {
            let url = `https://ecommercelive.riolabz.com/api/v1/wallet/payout/requests/approve`
            const res = fetch({
                url ,
                method: 'post',
                data: data
            })
        return res;
    } catch(err) {
        console.log(err,'show-err')
    }
}

export default payoutService;