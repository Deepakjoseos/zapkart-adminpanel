import { Image, Input } from 'antd'
import React, { useEffect, useState } from 'react'

const ImageDescription = ({ url, file }) => {
  const [image, setImage] = useState(null)

  const base64Converter = (file) => {
    if (file) {
      var filereader = new FileReader()
      filereader.readAsDataURL(file)
      filereader.onload = function (evt) {
        var base64 = evt.target.result
        console.log(base64, 'jlkh')
        setImage(base64)
      }
    }
  }

  useEffect(() => {
    if (file !== null && !url) {
      base64Converter(file)
    }
  }, [file])

  return (
    <>
      {url ? (
        <>
          <Image width={200} src={url} />
          <Input placeholder="Description" />
        </>
      ) : (
        <>
          <Image width={200} src={image} />
          <Input placeholder="Description" />
        </>
      )}
    </>
  )
}

export default ImageDescription
