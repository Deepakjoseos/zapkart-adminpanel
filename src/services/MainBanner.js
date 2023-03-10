import fetch from 'auth/FetchInterceptor'

const mainBannerService = {}
const apiRoute = '/mainbanners'

mainBannerService.getMainBanners = async function (paginationQuery = '', filterQuery = '') {
    try {
      const res = await fetch({
        url: `${apiRoute}?${paginationQuery}&${filterQuery}`,
        method: 'get',
      })
      const data = res.data.filter((cur) => cur.status !== 'Deleted')
      return {data:data}
    } catch (err) {
      console.log(err, 'show-err')}
    }
  

mainBannerService.deleteMainBanner = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

mainBannerService.getMainBannerById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

mainBannerService.createMainBanner = async function (data) {
  try {
    const res = await fetch({
      url:`/mainbanners`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

mainBannerService.editMainBanner = async function (id, data) {
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



export default mainBannerService
