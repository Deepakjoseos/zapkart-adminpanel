/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Table, Button, Select, Popconfirm, Dropdown, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import { LINKS } from '_constants'
import { getAttributes, deleteAttribute, editAttribute } from 'services/attributes'
// import SearchProvider from 'components/RenderProps/SearchProvider'
// import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'
import Filters from './Filters'

const limits = [4, 10, 20, 50]
const menuItems = [
  {
    key: 'Active',
    title: 'Active',
  },
  {
    key: 'Hold',
    title: 'Hold',
  },
]
class AttributesList extends React.Component {
  state = {
    data: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    selectedData: {},
  }

  componentDidMount() {
    const { pagination } = this.state
    this.fetchAttributes({ pagination })
  }

  updateTableData = (data) => {
    this.setState((prev) => ({
      ...prev,
      data,
      pagination: {
        current: 1,
        pageSize: prev.pagination.pageSize,
        total: data.length,
      },
    }))
  }

  fetchAttributes = async (params = {}) => {
    this.setState({ loading: true })
    const res = await getAttributes('')
    const availableData = res.data.filter((cur) => cur.status !== 'Deleted')
    console.log(res)
    if (res && res.data)
      this.setState({
        data: availableData,
        loading: false,
        pagination: {
          ...params.pagination,
          total: res.data.length,
        },
      })
    else this.setState({ loading: false })
  }

  handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    this.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: Number(paginationParams.current),
        pageSize: Number(paginationParams.pageSize),
      },
    }))
    // this.fetchAttributes({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination,
    //   ...filters,
    // })
  }

  handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit', selLimit)
    this.setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: Number(selLimit),
      },
    }))
  }

  handleDelete = (id) => {
    this.fetchDelete(id)
  }

  fetchDelete = async (id) => {
    const a = await deleteAttribute(id)
    if (a) {
      this.setState((prevState) => {
        const updatedData = prevState.data.filter((item) => item.id !== id)
        return {
          ...prevState,
          data: updatedData,
        }
      })
    }
  }

  handleMenuClick = async (e) => {
    const { clickedId, data } = this.state

    const { selectedData } = this.state
    const sendingData = {
      name: selectedData.name,
      options: selectedData.options,
      status: e.key,
    }

    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editAttribute(clickedId, sendingData)
    if (isUpdated) {
      const recordIndex = data.findIndex((item) => item.id === clickedId)
      data[recordIndex].status = e.key
      return this.setState((prev) => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = (id, sData) => {
    this.setState({ clickedId: id })
    this.setState({ selectedData: sData })
  }

  render() {
    const { data, loading, pagination } = this.state

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Attribute Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text, record) => <Link to={`${LINKS.editAttribute}/${record.id}`}>{text}</Link>,
        search: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          let badge = 'badge-success'
          if (record.status === 'Hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id, record)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text.toUpperCase()}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
        // filters: [
        //   {
        //     label: 'Active',
        //     value: 'Active',
        //   },
        //   {
        //     label: 'Hold',
        //     value: 'Hold',
        //   },
        // ],
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <span>
            <Link to={`${LINKS.editAttribute}/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>

            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          </span>
        ),
      },
    ]

    // if (loading) return <Skeleton active />
    return (
      <div>
        <Helmet title="Attributes List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Attributes List</strong>
              <AddNew add link={LINKS.addAttribute} attribute="attribute" />
            </div>
          </div>

          <div className="card-body">
            {/* <FilterProvider columns={columns} data={data}>
              {(filteredData) => (
                <> */}
            <Filters updateData={this.updateTableData} />

            {limits.length > 0 && (
              <div className="right-flex">
                <span>
                  <strong>Items per page:&nbsp;</strong>
                </span>
                <Select value={Number(pagination.pageSize)} onChange={this.handleLimitChange}>
                  {limits.map((i) => (
                    <Select.Option key={i}>{Number(i)}</Select.Option>
                  ))}
                </Select>
              </div>
            )}
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              // scroll={{ x: true }}
              rowKey={(record) => record.id}
              columns={columns.map((i) => omit(i, ['filters']))}
              dataSource={data}
              loading={loading}
              limits={limits}
              currentPage={pagination.current}
              limit={pagination.pageSize}
              total={pagination.total}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
            {/* </>
              )}
            </FilterProvider> */}
          </div>
        </div>
      </div>
    )
  }
}

export default AttributesList
