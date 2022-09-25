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
  Form,
  Row,
  Col,
  InputNumber,
  message,
  Popconfirm,
} from 'antd'
// import CheckIfDeliverableData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router-dom'
import utils from 'utils'
import shipmentService from 'services/shipment'

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
        <Tag color="orange">Hold</Tag>
      </>
    )
  }

  if (status === 'Deleted') {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    )
  }
  return null
}
const CheckIfDeliverable = ({
  setCheckIfDeliverableOpen,
  checkIfDeliverableOpen,
  selectable,
  setSelectedCourierId,
  shipment,
  title = 'Check If Deliverable',
}) => {
  let history = useHistory()

  const [list, setList] = useState([])
  const [searchBackupList, setSearchBackupList] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)

  const [form] = Form.useForm()

  const rules = {
    pickup_postcode: [
      {
        required: true,
        message: 'Required',
      },
    ],

    delivery_postcode: [
      {
        required: true,
        message: 'Required',
      },
    ],
    cod: [
      {
        required: true,
        message: 'Required',
      },
    ],
    weight: [
      {
        required: true,
        message: 'Required',
      },
    ],
  }

  //   useEffect(() => {
  //     // Getting Brands List to display in the table
  //     const getShipments = async () => {
  //       const data = await shipmentService.getShipments()
  //       if (data) {
  //         setList(data)
  //         setSearchBackupList(data)
  //         console.log(data, 'show-data')
  //       }
  //     }
  //     getShipments()
  //   }, [])

  // For deleting a row
  // const deleteRow = async (row) => {
  //   const resp = await shipmentService.dele(row.id)

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

  // Antd Table Columns
  const tableColumns = [
    {
      title: 'Courier name',
      dataIndex: 'courier_name',

      sorter: (a, b) => utils.antdTableSorter(a, b, 'courier_name'),
    },
    {
      title: 'Cash On Delivery Available',
      dataIndex: 'cod',
      render: (text) => <div>{text === 1 ? 'Yes' : 'No'}</div>,
    },
    {
      title: 'Estimate Time Delivery',
      dataIndex: 'etd',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
    },
    {
      title: 'Volumetric Max weight (Kg)',
      dataIndex: 'volumetric_max_weight',
    },
    {
      title: 'Min Weight (Kg)',
      dataIndex: 'min_weight',
    },
  ]

  if (selectable) {
    tableColumns?.push({
      title: 'Action',
      render: (_, row) => (
        <Popconfirm
          title="Are you sure?"
          onConfirm={() => setSelectedCourierId(row.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Select Courier</Button>
        </Popconfirm>
      ),
    })
  }

  // When Search is used
  //   const onSearch = (e) => {
  //     const value = e.currentTarget.value
  //     const searchArray = e.currentTarget.value ? list : searchBackupList
  //     const data = utils.wildCardSearch(searchArray, value)
  //     setList(data)
  //     setSelectedRowKeys([])
  //   }

  const makeReqForCheckIfDeliverable = async (values) => {
    const resp = await shipmentService.checkIfDeliverable(values)
    if (resp) {
      setList(resp)
      setSearchBackupList(resp)

      setSubmitLoading(false)
    } else {
      setSubmitLoading(false)
      setList([])
      setSearchBackupList([])
    }
  }

  const onFinish = async () => {
    setSubmitLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const resp = await shipmentService.checkIfDeliverable(values)
        if (resp) {
          setList(resp)
          setSearchBackupList(resp)

          setSubmitLoading(false)
        } else {
          setSubmitLoading(false)
          setList([])
          setSearchBackupList([])
        }
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
    setSubmitLoading(false)
  }

  useEffect(() => {
    if (selectable && shipment?.customer_pincode) {
      console.log(shipment, 'heyieyig')
      const values = {
        pickup_postcode: shipment?.pickup_address?.pin_code,
        delivery_postcode: shipment?.customer_pincode,
        cod: shipment?.cod,
        weight: shipment?.others?.weight,
      }
      form.setFieldsValue(values)

      makeReqForCheckIfDeliverable(values)
    }
  }, [selectable, shipment])

  // Table Filters JSX Elements
  const filters = () => (
    <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      initialValues={{
        status: 'Hold',
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6}>
          {/* <Card title="Basic Info"> */}
          <Form.Item
            name="pickup_postcode"
            label="Pickup Postcode"
            rules={rules.pickup_postcode}
          >
            <Input placeholder="Pickup Postcode" disabled={selectable} />
          </Form.Item>

          {/* </Card> */}
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item
            name="delivery_postcode"
            label="Delivery Postcode"
            rules={rules.delivery_postcode}
          >
            <Input placeholder="Delivery Postcode" disabled={selectable} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item name="cod" label="Is Cash on Delivery" rules={rules.cod}>
            <Select placeholder="Is Cash on Delivery" disabled={selectable}>
              <Option value={1}>Yes</Option>
              <Option value={0}>No</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item name="weight" label="Weight" rules={rules.weight}>
            <InputNumber
              disabled={selectable}
              placeholder="Weight"
              style={{ width: '100%' }}
              // size="large"
              min={0}
              max={100000}
              addonAfter="kg"
            />
          </Form.Item>
        </Col>
        {!selectable && (
          <Button
            className="ml-auto"
            type="primary"
            onClick={onFinish}
            loading={submitLoading}
          >
            Check Deliverable
          </Button>
        )}
      </Row>
    </Form>
  )

  return (
    <Drawer
      title={title}
      width="100%"
      onClose={() => setCheckIfDeliverableOpen(false)}
      visible={checkIfDeliverableOpen}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
    >
      <Card>
        {filters()}
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={list} rowKey="id" />
        </div>
      </Card>
    </Drawer>
  )
}

export default CheckIfDeliverable
