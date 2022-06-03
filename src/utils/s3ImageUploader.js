import ReactS3Client from 'utils/s3Bucket'

const { notification } = require('antd')

const multipleImageUpload = async (images) => {
  const imagesArray = await images.reduce(async (result, el) => {
    if (el.originFileObj) {
      try {
        const asyncResult = await ReactS3Client.uploadFile(
          el.originFileObj,
          // formValues.images[1].originFileObj.name,
        )
        if (asyncResult) {
          ;(await result).push(asyncResult.location)
        }
      } catch (err) {
        // (await result).push(result.location);
        notification.error({
          message: 'Cannot upload Newly added Images',
        })

        console.log(err.message, 'pls')
      }
    } else {
      ;(await result).push(el.url)
    }

    return result
  }, [])

  return imagesArray
}

const singleImageUploader = async (file, imgValue, defaultValueUrl) => {
  if (file) {
    try {
      const asyncResult = await ReactS3Client.uploadFile(
        file,
        // formValues.images[1].originFileObj.name,
      )
      imgValue = asyncResult.location
    } catch (err) {
      // (await result).push(result.location);
      notification.error({
        message: 'Cannot upload Newly added Images',
      })

      console.log(err.message, 'pls')
    }
  } else {
    imgValue = defaultValueUrl
  }
  return imgValue
}

export { multipleImageUpload, singleImageUploader }
