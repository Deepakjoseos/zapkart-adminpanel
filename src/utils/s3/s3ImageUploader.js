// import ReactS3Client from 'utils/s3/s3Bucket'

// import S3 from 'react-aws-s3'
import fileManagerService from 'services/fileManager'

const { notification } = require('antd')

// const multipleImageUpload = async (images, folder) => {
//   const imagesArray = await images.reduce(async (result, el) => {
//     if (el.originFileObj) {
//       const config = {
//         bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
//         dirName: folder /* optional */,
//         region: process.env.REACT_APP_S3_REGION,
//         accessKeyId: process.env.REACT_APP_S3_ACCESSKEY_ID,
//         secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
//       }

//       // const newFileName = 'test-file';
//       const ReactS3Client = new S3(config)
//       try {
//         const asyncResult = await ReactS3Client.uploadFile(
//           el.originFileObj
//           // formValues.images[1].originFileObj.name,
//         )
//         if (asyncResult) {
//           ;(await result).push(asyncResult.location)
//         }
//       } catch (err) {
//         // (await result).push(result.location);
//         notification.error({
//           message: 'Cannot upload Newly added Images',
//         })

//         console.log(err.message, 'pls')
//       }
//     } else {
//       ;(await result).push(el.url)
//     }

//     return result
//   }, [])

//   return imagesArray
// }

// const singleImageUploader = async (file, imgValue, defaultValueUrl, folder) => {
//   if (file) {
//     const config = {
//       bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
//       dirName: folder /* optional */,
//       region: process.env.REACT_APP_S3_REGION,
//       accessKeyId: process.env.REACT_APP_S3_ACCESSKEY_ID,
//       secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
//     }

//     // const newFileName = 'test-file';
//     const ReactS3Client = new S3(config)

//     console.log(file, 'show-correct')
//     try {
//       const asyncResult = await ReactS3Client.uploadFile(
//         file
//         // formValues.images[1].originFileObj.name,
//       )
//       imgValue = asyncResult.location
//     } catch (err) {
//       // (await result).push(result.location);
//       notification.error({
//         message: 'Cannot upload Newly added Images',
//       })

//       console.log(err.message, 'pls')
//     }
//   } else {
//     imgValue = defaultValueUrl
//   }
//   return imgValue
// }

const multipleImageUpload = async (imageCategoryId, images) => {
  const imagesArray = await images.reduce(async (result, el) => {
    if (el.originFileObj) {
      try {
        const asyncResult = await fileManagerService.uploadImage(
          imageCategoryId,
          el.originFileObj
          // formValues.images[1].originFileObj.name,
        )
        if (asyncResult) {
          ;(await result).push(asyncResult.original)
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

const singleImageUploader = async (
  file,
  imgValue,
  defaultValueUrl,
  imageCategoryId
) => {
  if (file) {
    console.log(file, 'show-correct')
    try {
      const asyncResult = await fileManagerService.uploadImage(
        imageCategoryId,
        file
        // formValues.images[1].originFileObj.name,
      )
      imgValue = asyncResult.original
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

// ypu can also used for uploading multiple images
const bulkImagesUpload = async (imageCategoryId, images) => {
  const allImagesFiles = images.map((img) => img.originFileObj)
  console.log(allImagesFiles, 'yaaaa')

  try {
    const uploadBulkImages = await fileManagerService.bulkuploadImages(
      imageCategoryId,
      allImagesFiles
    )

    return uploadBulkImages
  } catch (err) {
    notification.error({
      message: 'Cannot upload Newly added Images',
    })
  }
}

const fileDocUpload = async (file, fileValue, defaultValueUrl, imageFor) => {
  if (file) {
    console.log(file, 'show-correct')
    try {
      const asyncResult = await fileManagerService.uploadFile(
        imageFor,
        file
        // formValues.images[1].originFileObj.name,
      )
      fileValue = asyncResult.file
    } catch (err) {
      // (await result).push(result.location);
      notification.error({
        message: 'Cannot upload Newly added File',
      })

      console.log(err.message, 'pls')
    }
  } else {
    fileValue = defaultValueUrl
  }
  return fileValue
}
export {
  multipleImageUpload,
  singleImageUploader,
  bulkImagesUpload,
  fileDocUpload,
}
