/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
import { Upload, Icon, message, Button } from 'antd'
import React, { useState } from 'react'
import AWS from 'aws-sdk'

const SingleImageUpload = () => {
  const [imgUrl, setImgUrl] = useState(null)
  const props = {
    // multiple: false,
    // onStart(file) {
    //   console.log("onStart", file, file.name);
    // },
    // onSuccess(ret, file) {
    //   console.log("onSuccess", ret, file.name);
    // },
    // onError(err) {
    //   console.log("onError", err);
    // },
    // onProgress({ percent }, file) {
    //   console.log("onProgress", `${percent}%`, file.name);
    // },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      AWS.config.update({
        accessKeyId: 'AKIA2MGENPR2BQUY3Y4Q',
        secretAccessKey: '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',
        // sessionToken: ""
      })

      const S3 = new AWS.S3({
        params: { Bucket: 'zapkarttest' },
      })
      console.log('DEBUG filename', file.name)
      console.log('DEBUG file type', file.type)

      const objParams = {
        ACL: 'public-read',
        Bucket: 'zapkarttest',
        Key: file.name,
        Body: file,
      }

      S3.putObject(objParams)
        .on('httpUploadProgress', function ({ loaded, total }) {
          onProgress(
            {
              percent: Math.round((loaded / total) * 100),
            },
            file,
          )
        })
        .send(function (err, data) {
          if (err) {
            onError()
            console.log('Something went wrong')
            console.log(err.code)
            console.log(err.message)
          } else {
            onSuccess(data.response, file)
            console.log('SEND FINISHED', data.response)
          }
        })
    },
  }

  // function getBase64(img, callback) {
  //   const reader = new FileReader()
  //   reader.addEventListener('load', () => callback(reader.result))
  //   reader.readAsDataURL(img)
  // }

  // function beforeUpload(file) {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!')
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!')
  //   }
  //   return isJpgOrPng && isLt2M
  // }

  // const SingleImageUpload = () => {
  //   const [loading, setLoading] = useState(false)
  //   const [imgUrl, setImgUrl] = useState(null)

  //   const handleChange = (info) => {
  //     if (info.file.status === 'uploading') {
  //       setLoading(true)
  //       return
  //     }
  //     if (info.file.status === 'done') {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj, (imageUrl) => {
  //         setImgUrl(imageUrl)
  //         setLoading(false)
  //       })
  //     }
  //   }

  //   const uploadButton = (
  //     <div>
  //       <Icon type={loading ? 'loading' : 'plus'} />
  //       <div className="ant-upload-text">Upload</div>
  //     </div>
  //   )
  return (
    <Upload {...props}>
      {imgUrl ? (
        <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      )}
    </Upload>
  )
}

export default SingleImageUpload
