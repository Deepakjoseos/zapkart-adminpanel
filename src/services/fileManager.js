import fetch from 'auth/FetchInterceptor'

const fileManagerService = {}

fileManagerService.uploadImage = async function (imageCategoryId, image) {
  console.log('ssjhlhsjl', image, imageCategoryId)

  try {
    var bodyFormData = new FormData()
    bodyFormData.append('imageCategoryId', imageCategoryId)
    bodyFormData.append('image', image)
    bodyFormData.append('thumbnailNotRequired', true)
    const res = await fetch({
      url: `/filemanager/upload-image`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: bodyFormData,
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default fileManagerService
