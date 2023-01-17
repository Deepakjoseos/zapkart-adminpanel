import fetch from 'auth/FetchInterceptor'

const fileManagerService = {}

fileManagerService.uploadImage = async function (imageCategoryId, image) {
  console.log('ssjhlhsjl', image, imageCategoryId)

  try {
    var bodyFormData = new FormData()
    bodyFormData.append('imageCategoryId', imageCategoryId)
    bodyFormData.append('image', image)
    bodyFormData.append('thumbnailNotRequired', true)
    bodyFormData.append('saveAsImageName', true)
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
fileManagerService.uploadFile = async function (imageFor, file) {
  console.log('ssjhlhsjl', file, imageFor)

  try {
    var bodyFormData = new FormData()
    bodyFormData.append('imageFor', imageFor)
    bodyFormData.append('file', file)

    const res = await fetch({
      url: `/filemanager/upload-file`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: bodyFormData,
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
fileManagerService.bulkuploadImages = async function (imageCategoryId, images) {
  try {
    var bodyFormData = new FormData()
    bodyFormData.append('imageCategoryId', imageCategoryId)
    images.forEach((img) => {
      bodyFormData.append('images', img)
    })
    // bodyFormData.append('images', images)
    bodyFormData.append('thumbnailNotRequired', true)
    bodyFormData.append('saveAsImageName', true)
    const res = await fetch({
      url: `/filemanager/upload-images`,
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
