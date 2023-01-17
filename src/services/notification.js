import fetch from 'auth/FetchInterceptor'

const notificationService = {}

notificationService.getNotifications = async function () {
  try {
    const res = await fetch({
      url: '/notifications',
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}




notificationService.createNotification = async function (data) {
  try {
    const res = await fetch({
      url: `/notifications/general`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}





export default notificationService
