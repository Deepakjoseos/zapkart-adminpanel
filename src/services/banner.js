import fetch from 'auth/FetchInterceptor'

const bannerService = {}
const api = '/banners'
bannerService.getBanners = async function (paginationQuery = '', filterQuery = '') {
  try {
    let url = `${api}?${paginationQuery}&${filterQuery}`
    const res = await fetch({
      url,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}


bannerService.deleteBanner = async function (id) {
  try {
    const res = await fetch({
      url: `/banners/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

bannerService.getBannerById = async function (id) {
  try {
    const res = await fetch({
      url: `/banners/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

bannerService.createBanner = async function (data) {
  try {
    const res = await fetch({
      url: `/banners`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

bannerService.editBanner = async function (id, data) {
  try {
    const res = await fetch({
      url: `/banners/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default bannerService
