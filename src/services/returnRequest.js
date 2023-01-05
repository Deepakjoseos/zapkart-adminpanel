import fetch from 'auth/FetchInterceptor'

const returnReqService = {};

returnReqService.getPayoutReq= async function(paginationQuery = '', query = '') {
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

export default returnReqService;