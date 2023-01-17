import React from 'react'
import MainBannerForm from '../main-banner-form'
const EditMainBanner = (props) => {
  return <MainBannerForm mode="EDIT" param={props.match.params} />
}

export default EditMainBanner