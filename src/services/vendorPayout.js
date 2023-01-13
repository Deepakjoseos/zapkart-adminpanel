import fetch from 'auth/FetchInterceptor'

const vendorPayoutService = {}
const apiRoute = '/vendorPayout'

vendorPayoutService.getPayouts =async() =>{
    let url = `${apiRoute}/get`
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