import fetch from 'auth/FetchInterceptor'

const localityService = {}

localityService.getCountry = async function () {
  try {
    const res = await fetch({
      url: '/country/public',
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

localityService.getState = async function (query) {
  try {
    const res = await fetch({
      url: `/state/public?${query}`,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

localityService.getDistrict = async function (query) {
  try {
    const res = await fetch({
      url: `/district/public?${query}`,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

localityService.getCity = async function (query) {
  try {
    const res = await fetch({
      url: `/city/public?${query}`,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

localityService.getPincode = async function (query) {
  try {
    const res = await fetch({
      url: `/pincode/public?${query}`,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default localityService
