/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Button, Icon, Table, Tooltip, Skeleton, notification, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import EditableCell from 'components/EditableCellNumber'
// import { getAllMerchantRequest, editMerchant } from 'services/merchantRequest'
import useFetching from 'hooks/useFetching'
import { STRINGS } from '_constants'
import callApi from 'utils/callApi'
import { editSafety } from 'services/safetyAdvice'

// import styles from './style.module.scss'
const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

const SafetyAdviceList = () => {
  const [datas, setDatas] = useState([])
  const [clickedId, setClickedId] = useState('')
  // /api/catalog/v1/safetyadvice?page=1&limit=4&field[]=name&field[]=icon.url
  // /api/catalog/v1/safetyadvice?page=1&limit=5&field[]=name&field[]=icon.url&sort[priorityOrder]=1
  const [{ response, loading, error }] = useFetching(`/api/catalog/v1/safetyadvice?page=1&limit=4`)

  console.log('response in safetyAdvice list', response, loading, error)

  useEffect(() => {
    if (response && response.data) {
      setDatas(response.data)
    }
  }, [response, error])
  //   state = {
  //     // tableData: [],
  //     data: [],
  //     // filterDropdownVisible: false,
  //     // searchText: '',
  //     // filtered: false,
  //     loading: false,
  //   }

  //   componentDidMount() {
  //     this.fetchDetails('request')
  //   }

  // fetchData = async () => {
  //   this.setState({ loading: true })
  //   const data = await getuserGroup(ROLES.merchant)
  //   const a = await getAllMerchantRequest('reject')
  //   console.log('Res', a)
  //   if (data && data.length > 0) this.setState({ loading: false, data })
  //   else {
  //     this.setState({ loading: false })
  //     notification.warning({
  //       message: 'No User Group',
  //     })
  //   }
  // }

  //   fetchDetails = async (e) => {
  //     this.setState({ loading: true })
  //     const data = await getAllMerchantRequest(e)
  //     console.log('Res', data)
  //     // const {requests}=data
  //     if (data) this.setState({ loading: false, data: data.requests })
  //     else {
  //       this.setState({ loading: false })
  //       notification.warning({
  //         message: 'No Merchant',
  //       })
  //     }
  //   }

  //   onChange = (e) => {
  //     console.log('e', e)
  //     this.fetchDetails(e)
  //   }

  const handleMenuClick = async (e) => {
    console.log("eventt", e.key, clickedId)
    // const { clickedId, data } = this.state
    // console.log('clicked on', e.key, data, clickedId)

    // if (isUpdated) {
    //   const recordIndex = data.findIndex((item) => item.id === clickedId)
    //   data[recordIndex].request = e.key
    //   return this.setState((prev) => ({
    //     ...prev.data,
    //     clickedId: null,
    //   }))
    // }
    // this.setState({ clickedId: null })
    try {
      const a = await callApi(`/api/catalog/v1/safetyadvice/${clickedId}/?status=${e.key}`, { method: 'PATCH',  headers: {
        'Content-Type': 'application/json',
      } })
      console.log("response status", a)
      if (a) {
        const recordIndex = datas.findIndex(item => item._id === clickedId)
        console.log("recordIndex",recordIndex)
        datas[recordIndex].status = e.key
       setClickedId(null)
       notification.success({
        message: 'Success!',
        description: 'Status Updated Successfully!',
      })
        return setDatas(datas)
      }
      throw new Error()
    } catch (err) {
      notification.error({
        message: 'Error!',
        description: 'Error updating! Please try again later!',
      })
    }
   setClickedId(null)

    return null
  }

  const handleDelete = async (id) => {
    console.log('id', id)

    const a = await callApi(`/api/catalog/v1/safetyadvice/${id}`, { method: 'DELETE' })
    console.log('a')
    if (a) {
      const filteredData = datas.filter((item) => item._id !== id)
      console.log('filtered Data', filteredData)
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      return setDatas(filteredData)
    }
    return null
  }

  const onCellChange = (id, key) => {
    return async value => {
      console.log("cell edit", id, key, value)
      const filteredData = datas
      .filter((item) => item._id ===id)
      .map((item) => {
        return {
          _id: item._id,
          icon: [item.icon],
          name: item.name,
          priorityOrder: value,          
          status: item.status,
        }
      })
    console.log("priosiryt", filteredData[0])
    const edited = await editSafety(id,filteredData[0])
    
      // const edited = await editSafety(id, { [key]: value })
      console.log("hello", edited)
      if (edited) {
        notification.success({ message:STRINGS.success,description: STRINGS.editSuccess })
        return true
      }
      return false
    }
  }

  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => {
        console.log('text', text, record)
        return (
          <span className={`'font-size-12 badge badgeText'`}>
            {text}
            {/* <p>{record.user.firstName}</p> */}
          </span>
        )
      },
      search: true,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'icon.thumbnail',
      key: 'icon',
      render: (text, record) => (
        <Link to={`safetyAdvice/${record._id}`} className="thumbnail-area">
          {/* <div className="image-view"> */}
          <img className="image-view" src={record.icon.thumbnail} alt={record.title} />
          {/* </div> */}
        </Link>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.status === 'hold') badge = 'badge-danger'
        return (
          <Dropdown
            overlay={menu}
            ref={clickedId}
            id={record._id}
            onClick={() => setClickedId(record._id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Hold', value: 'hold' },
      ],
    },
    {
      title: 'Priority',
      dataIndex: 'priorityOrder',
      key: 'priorityOrder',
      sorter: (a, b) => Number(a.priorityOrder) - Number(b.priorityOrder),
      render: (text, record) => (
        <EditableCell
          type="number"
          value={text}
          onChange={onCellChange(record._id, 'priorityOrder')}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          {console.log('record', record)}
          <Link to={`/catalog/safetyAdvice/${record._id}`}>
            <Tooltip title="Edit">
              <Button icon="edit" className="mr-1" size="small" />
            </Tooltip>
          </Link>
          <Tooltip placement="bottomRight" title="Delete">
            <Popconfirm title="Delete record?" onConfirm={() => handleDelete(record._id)}>
              <Button icon="close" className="mr-1" size="small" />
            </Popconfirm>
          </Tooltip>
        </span>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Safety Advice List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Safety Advice List</strong>
            <AddNew add attribute="Attributes" link="/catalog/safetyAdvice/create" />
          </div>
        </div>
        <div style={{ marginLeft: '40px' }} />

        <div className="card-body">
          {/* {loading && ( */}
          <div className="card-body">
            <Skeleton active />
          </div>
          {/* )} */}
          {/* {!loading && ( */}
          <SearchProvider columns={columns}>
            {(columnsWithSearch) => (
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                rowKey={(record) => record.id}
                columns={columnsWithSearch}
                dataSource={datas}
              />
            )}
          </SearchProvider>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default SafetyAdviceList
