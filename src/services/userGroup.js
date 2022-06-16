import fetch from 'auth/FetchInterceptor'

const userGroupService = {}
const apiRoute = '/userGroup'

userGroupService.getUserGroups = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}?page=1&limit=10`,
      method: 'get',
    })
    const data = res.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

userGroupService.deleteUserGroup = async function (id) {
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

userGroupService.getUserGroupById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

userGroupService.createUserGroup = async function (data) {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

userGroupService.editUserGroup = async function (id, data) {
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

// userGroupService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default userGroupService
