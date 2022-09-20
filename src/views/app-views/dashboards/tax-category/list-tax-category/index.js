import React, { useEffect, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  notification,
  Drawer,
} from 'antd'
// import CustomerListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import customerService from 'services/customer'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { groupList } from 'views/app-views/pages/profile/profileData'
import taxCategoryService from 'services/TaxCategory'
import constantsService from 'services/constants'

const { Option } = Select

const getStockStatus = (status) => {
  if (status === 'Active') {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    )
  }
  if (status === 'Hold') {
    return (
      <>
        <Tag color="red">Hold</Tag>
      </>
    )
  }
  return null
}
const TaxCategoryList = () => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [selectedViewAddress, setSelectedViewAddress] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [customerAddressOpen, setCustomerAddressOpen] = useState(false)
  const [customerAddFormOpen, setCustomerAddFormOpen] = useState(false)
  const [statuses, setStatuses] = useState([])

  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [selectedPrescriptionCustomerId, setSelectedPrescriptionCustomerId] =
    useState(null)

  const getTaxCategories = async () => {
    const data = await taxCategoryService.getTaxCategories()
    if (data) {
      setList(data)
      setSearchBackupList(data)
      console.log(selectedViewAddress, 'show-data')


    }
  }
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }

  useEffect(() => {
    getTaxCategories()
    fetchConstants()
  }, [])

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => editTaxCategory(row.id)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit Tax Category</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item>

    </Menu>
  )

  const deleteRow = async (row) => {
    const resp = await taxCategoryService.deleteTaxCategory(row.id)

    if (resp) {
      const objKey = 'id'
      let data = list
      if (selectedRows.length > 1) {
        selectedRows.forEach((elm) => {
          data = utils.deleteArrayRow(data, objKey, elm.id)
          setList(data)
          setSelectedRows([])
        })
      } else {
        data = utils.deleteArrayRow(data, objKey, row.id)
        setList(data)
      }
    }
  }

  const editTaxCategory = (id) => {
    history.push(`/app/dashboards/tax-category/edit-tax-category/${id}`)
  }

  // const deleteRow = async (row) => {
  //   const resp = await customerService.deleteUserGroup(row.id)

  //   if (resp) {
  //     const objKey = 'id'
  //     let data = list
  //     if (selectedRows.length > 1) {
  //       selectedRows.forEach((elm) => {
  //         data = utils.deleteArrayRow(data, objKey, elm.id)
  //         setList(data)
  //         setSelectedRows([])
  //       })
  //     } else {
  //       data = utils.deleteArrayRow(data, objKey, row.id)
  //       setList(data)
  //     }
  //   }
  // }
  const addTaxCategory = () => {
    history.push(`/app/dashboards/tax-category/add-tax-category`)
  }



  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Taxes',
      dataIndex: 'taxes',
      render: (taxes) => {
        return (
          <>
            {taxes?.map((item) => (
              <>
                <p>Type:{item.type}</p>
                <p>Percent:{item.percent}</p>
                <p>Same State:{item.sameState}</p>


              </>
            ))}
          </>
        )
      },
      // sorter: (a, b) => utils.antdTableSorter(a, b, 'lastname'),
    },
  

    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Flex alignItems="center">{getStockStatus(status)}</Flex>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ]

  const onSearch = (e) => {
    const value = e.currentTarget.value
    const searchArray = e.currentTarget.value ? list : searchBackupList
    const data = utils.wildCardSearch(searchArray, value)
    setList(data)
    setSelectedRowKeys([])
  }

  const handleShowStatus = (value) => {
    if (value !== 'All') {
      const key = 'status'
      const data = utils.filterArray(searchBackupList, key, value)
      setList(data)
    } else {
      setList(searchBackupList)
    }
  }

  const filters = () => (
    <Flex className="mb-1" mobileFlex={false}>
      <div className="mr-md-3 mb-3">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className="mb-3">
        <Select
          className="w-100"
          style={{ minWidth: 180 }}
          placeholder="Status"
        >
          <Option value="">All</Option>
          {statuses.map((item) => (
            <Option key={item.id} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    </Flex>
  )

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={addTaxCategory}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Tax Category
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />


      </div>
    </Card>
  )
}

export default TaxCategoryList
