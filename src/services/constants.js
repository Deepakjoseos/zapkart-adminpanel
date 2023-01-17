import fetch from 'auth/FetchInterceptor'

const constantsService = {}

constantsService.getConstants = async function () {
  try {
    const res = await fetch({
      url: '/constants',
      method: 'get',
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
constantsService.getSample = async function () {
  try {
    const res = await fetch({
      url: '/sample-files',
      method: 'get',
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}


export default constantsService
