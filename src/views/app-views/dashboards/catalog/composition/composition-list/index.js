import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Menu,
  Tag,
  Form,
  Row,
  Col,Modal,notification,message
} from 'antd'
// import BrandListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileImageOutlined,
  PlusCircleOutlined,FileAddOutlined,DownloadOutlined
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import utils from 'utils'
import brandService from 'services/brand'
import _ from 'lodash'
import compositionService from 'services/composition'
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
const CompositionList = () => {
  let history = useHistory()
  const fileInputRef = React.useRef(null)
  const [form] = Form.useForm()

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // Added for Pagination
  const [loading, setLoading] = useState(false)
  const [filterEnabled, setFilterEnabled] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [excelFile, setExcelFile] = useState(null)

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  })
  const fetchConstants = async () => {
    const data = await constantsService.getConstants()
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL['STATUS']))

    }
  }
  // Changed here for pagination
  const getCompositions = async (paginationParams = {}, filterParams) => {
    setLoading(true)
    const data = await compositionService.getCompositions(
      qs.stringify(getPaginationParams(paginationParams)),
      qs.stringify(filterParams)
    )

    if (data) {
      setList(data.data)

      // Pagination
      setPagination({
        ...paginationParams.pagination,
        total: data.total,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    getCompositions({
      pagination,
    })
    fetchConstants()
  }, [])

  // pagination generator
  const getPaginationParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    // ...params,
  })

  // On pagination Change
  const handleTableChange = (newPagination) => {
    getCompositions(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
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

  const addProduct = () => {
    history.push(`/app/dashboards/catalog/composition/add-composition`)
  }

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/catalog/composition/edit-composition/${row.id}`
    )
  }

  const deleteRow = async (row) => {
    const resp = await compositionService.deleteComposition(row.id)

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

  const tableColumns = [
    {
      title: 'Composition',
      dataIndex: 'name',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
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

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  })

  // Filter Submit
  const handleFilterSubmit = async () => {
    setPagination(resetPagination())

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true)
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity)
        getCompositions({ pagination: resetPagination() }, sendingValues)
      })
      .catch((info) => {
        console.log('info', info)
        setFilterEnabled(false)
      })
  }

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields()

    setPagination(resetPagination())
    getCompositions({ pagination: resetPagination() }, {})
    setFilterEnabled(false)
  }
  const handleExcelUpload = (e) => {
    let file = e.target.files[0]

    setExcelFile(file)
  }

  const onExcelSubmit = async () => {
    const sendingData = {
      file: excelFile,
    }

    const sendExcelFile = await compositionService.createCompositionFromExcel(
      sendingData
    )

    if (sendExcelFile) {
      setIsExcelModalOpen(false)
      setExcelFile(null)
      notification.success({
        message: 'Product Excel File Uploaded',
      })
      getCompositions(pagination)
    }
  }

  const filtersComponent = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="search" label="Search">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>

        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="status" label="Status">
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
          </Form.Item>
        </Col>

        <Col className="mb-4 ml-5">
          <Button type="primary" onClick={handleFilterSubmit}>
            Filter
          </Button>
        </Col>
        <Col className="mb-4">
          <Button type="primary" onClick={handleClearFilter}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  )


  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filtersComponent()}
        </Flex>
        <div className="mr-2 d-flex justify-content-between">
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={() => setIsExcelModalOpen(true)}
        >
          Excel Upload
        </Button>
        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Composition
          </Button>
        </div>
        </div>
        <Modal
        title="Composition Excel Upload"
        visible={isExcelModalOpen}
        onCancel={() => {
          setIsExcelModalOpen(false)
          setExcelFile(null)
        }}
        footer={false}
      >
        <Flex flexDirection="column" alignItems="center">
          <div className="mb-4 mt-4">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => fileInputRef.current.click()}
            >
              Upload Excel File
            </Button>
            <input
              accept=".xls,.xlsx"
              multiple={false}
              ref={fileInputRef}
              type="file"
              onChange={handleExcelUpload}
              hidden
            />
            <p> {excelFile && excelFile?.name}</p>
          </div>
          <div>
            <Button icon={<FileImageOutlined />}>
              {' '}
              <a
               href="https://ecommerce-test2.s3.amazonaws.com/samplefiles/composition.xlsx"
                download={'sample'}
              >
                Download Sample File
              </a>
            </Button>
          </div>
         
        

          <Button type="primary" disabled={!excelFile} onClick={onExcelSubmit}>
            Submit
          </Button>
        </Flex>
      </Modal>
      
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" pagination={pagination}
          loading={loading}
          onChange={handleTableChange} />
      </div>
    </Card>
  )
}

export default CompositionList
