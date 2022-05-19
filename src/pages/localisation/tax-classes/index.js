/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react'
import { Button, Popconfirm,Select, Icon, Dropdown, notification, Table } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import { editData, deleteData } from 'services'
import { CATALOG_API_URL } from '_constants'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import { reducer, initialState } from './reducer'

const URL = CATALOG_API_URL.taxClass

const limits = [5, 10, 20,30, 40]
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

const TaxClass = () => {
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);

  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state.searchQuery)

  const [{ response, loading, error }] = useFetching(URL)

  const handleMenuClick = async (e) => {
    if (state.statusClickedId) {
      const res = await editData(
        `${URL}/${state.statusClickedId}`,
        {
          status: e.key,
        },
        'json',
      )
      if (res?.success) {
        dispatch({
          type: 'updateClickedProdStatus',
          payload: e.key,
        })
      }
      dispatch({
        type: 'clearStatusClickedId',
      })
    }
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      dispatch({
        type: 'setData',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.count,
      })
    }
    console.log(error, response)
    if (error) {
      dispatch({
        type: 'clearData',
      })
      dispatch({
        type: 'clearPagination',
      })
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  const handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    // if (onLimitChange) onLimitChange(l)
    console.log('SElelLimit')
    //  dispatch({
    //       type: 'setCurrentPage',
    //       payload: params.current,
    //     })
    dispatch({
      type: 'setPageSize',
      payload: Number(selLimit),
    })
  }

  const handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, filters, sorters)
    dispatch({
      type: 'setCurrentPage',
      payload: Number(paginationParams.current),
    })
    dispatch({
      type: 'setPageSize',
      payload: Number(paginationParams.pageSize),
    })
    // if (!isEmpty(filters.search)) {
    //   if (filters.search.priorityOrder) {
    //     dispatch({
    //       type: 'setSorters',
    //       payload: { priorityOrder: filters.search.priorityOrder },
    //     })
    //   }
    // }

    if (!isEmpty(sorters)) {
      console.log('sortParams.field', sorters.field)
      console.log('sortParams.order', sorters.order)
      dispatch({
        type: 'setSorters',
        payload: {
          [sorters.field]: sorters.order === 'descend' ? 2 : 3,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    }

    // dispatch({
    //   type: 'setSearchers',
    //   payload: filters.search,
    // })

    // dispatch({
    //   type: 'setFilters',
    //   payload: filters.filters,
    // })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = (id) => {
    return async () => {
      const isDeleted = await deleteData(`${URL}/${id}`)
      if (isDeleted) {
        dispatch({
          type: 'deleteItem',
          payload: id,
        })
      }
    }
  }

  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => `#${index + 1}`,
      // search: true,
      // filterLabel: 'ID',
      // search: true,
      // sorter: (a, b) => a._id - b._id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.localeCompare(b.name),
      sorter: true,
      multiple: 1,
      render: (text, record) => (
        <Link
          className="utils__link--underlined"
          to={`/localisation/tax-classes/edit/${record.slug}`}
        >
          {text}
        </Link>
      ),
      search: true,
    },
    {
      title: 'Tax Rates',
      dataIndex: 'taxes',
      key: 'taxes',
      render: (_, record) => {
        if (record?.taxes?.length)
          return record.taxes.map((i) => (
            <>
              {i.name} - {i?.type === '%' ? `${i?.rate}%` : `₹ ${i?.rate}`}
              <br />
            </>
          ))
        return ''
      },
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
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            // ref={this.clickId}
            id={record._id}
            onClick={() => handleStatusClick(record._id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${badge} 'badgeText'`}>
              {text.toUpperCase()}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
      filters: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Hold',
          value: 'hold',
        },
      ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <Link to={`/localisation/tax-classes/edit/${record._id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          {state.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }
  return (
    <div>
      <Helmet title="Tax Class List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Tax Class List</strong>
            <AddNew add attribute="tax class" link="/localisation/tax-classes/add" />
          </div>
        </div>
        <div className="card-body">
          <FilterProvider data={state.data} columns={columns}>
            {(filteredData) => (
              <>
                {limits.length > 0 && (
                  <div className="right-flex">
                    <span>
                      <strong>Items per page:&nbsp;</strong>
                    </span>
                    <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
                      {limits.map((i) => (
                        <Select.Option key={i}>{Number(i)}</Select.Option>
                      ))}
                    </Select>
                  </div>
                )}
                <Table
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  rowKey={setRowKey}
                  columns={columns.map((i) => omit(i, ['filters']))}
                  loading={loading}
                  dataSource={filteredData}
                  limits={limits}
                  currentPage={pagination.current}
                  limit={pagination.pageSize}
                  total={pagination.total}
                  pagination={pagination}
                  onChange={handleTableChange}
                  // rowSelection={rowSelection}
                />
              </>
            )}
          </FilterProvider>
        </div>
      </div>
    </div>
  )
}

export default TaxClass
