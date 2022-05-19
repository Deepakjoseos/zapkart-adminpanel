import React from 'react'
import { Helmet } from 'react-helmet'
import { API_COMMISSION_CATAGORY, STRINGS } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
// import { editData } from 'services'
// import { commissionByadminschema } from 'utils/Schema'
import commissionByadmin from 'services/commission'
import { connect } from 'react-redux'
import Form from './Form'

const ZoneEditIndex = (props) => {
  const { id, user, onResponse } = props

  const onAddNew = (values) => {
    console.log("Values**********",values ,user,user.userTypeId)
    const { merchantId, ...rest } = values

    const url = `${API_COMMISSION_CATAGORY.create}${
      user.userTypeId === 1 ? `?merchentId=${merchantId}` : ``
    }`
    console.log("url",url,rest)
    // editZone(url, { ...rest }, 'POST')
    editZone(url, values, 'POST')

  }

  const onEdit = (values) => {
    console.log("Values",values)
    const url = `${API_COMMISSION_CATAGORY.list}/${id}`
    editZone(url, values, 'PATCH')
  }

  const editZone = async (url, values, method = 'POST') => {
    console.log("Va************,",values,url,method)
    const res = await commissionByadmin(`${url}`, values, method)

    if (res?.success) {
      if (onResponse) onResponse()
     if(method==='PATCH') notification.success({
        message: STRINGS.editSuccess,
      })
      else{
      notification.success({
        message: STRINGS.addSuccess,
      })
    }
    }
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  let form = <Form onSubmit={onAddNew} />
  if (id) {
    form = (
      <Query url={`${API_COMMISSION_CATAGORY.list}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data) return <Form initialValues={res.data} onSubmit={onEdit} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit' : 'Add'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default connect(({user}) => ({ user }))(ZoneEditIndex)
