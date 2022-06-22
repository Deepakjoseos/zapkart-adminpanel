import fetch from 'auth/FetchInterceptor'

const bannerService = {}

bannerService.getBanners = async function () {
  try {
    const res = await fetch({
      url: '/banner',
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

bannerService.deleteBanner = async function (id) {
  try {
    const res = await fetch({
      url: `/banner/${id}`,
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
      url: `/banner/${id}`,
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
      url: `/banner`,
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
      url: `/banner/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default bannerService
