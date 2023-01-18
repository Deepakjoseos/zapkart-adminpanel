import fetch from 'auth/FetchInterceptor'

const vendorPayoutService = {}
const apiRoute = '/vendorPayout'

vendorPayoutService.getPayouts =async(pagination, filter) =>{
    let url = `${apiRoute}/get?${pagination}&${filter}`
    try{
        const res = await fetch({
            url: url,
            method: 'get'
        })
        return res
    } catch(err) {
        console.log(err, "show err")
    }
}

export default vendorPayoutService