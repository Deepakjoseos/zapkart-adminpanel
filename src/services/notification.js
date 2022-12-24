import fetch from 'auth/FetchInterceptor'

const notificationService = {}
const apiRoute = '/notifications'

notificationService.getNotifications = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

notificationService.createNotifications = async function (data) {
    try {
      const res = await fetch({
        url:`${apiRoute}/general` ,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }


  notificationService.createCartReminder= async function (data) {
    // console.log(data);
    try {
      const res = await fetch({
        url:`${apiRoute}/cartreminder`,
        method: 'post',
        data: {userId: data}
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  export default notificationService
