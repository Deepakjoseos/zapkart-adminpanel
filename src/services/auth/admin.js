import fetch from 'auth/FetchInterceptor'
import { auth } from 'auth/FirebaseAuth'

const authAdminService = {}

authAdminService.getProfile = async function () {
  try {
    const res = await fetch({
      url: '/admin',
      method: 'get',
    })

    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// authAdminService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default authAdminService
