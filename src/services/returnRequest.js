import fetch from 'auth/FetchInterceptor'

const returnReqService = {};

returnReqService.getAllItems= async function(query = '') {
    try {
            let url = `https://ecommercelive.riolabz.com/api/v1/order/admin/view_all_items?status=Shipped&${query}`
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