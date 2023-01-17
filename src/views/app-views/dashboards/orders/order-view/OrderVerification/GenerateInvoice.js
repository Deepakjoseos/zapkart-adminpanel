import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Table,
} from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import shipmentService from 'services/shipment'
import orderService from 'services/orders'
import authVendorService from 'services/auth/vendor'
import taxCategoryService from 'services/taxCategory'
import Item from 'antd/lib/list/Item'
const GenerateInvoice = ({ orderId, reFetchOrderData, items, next }) => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { Option } = Select
  const { Column } = Table

  const [submitLoading, setSubmitLoading] = useState(false)

  const [vendorBasedInvoiceData, setVendorBasedInvoiceData] = useState([])
  const [taxCategories, setTaxCategories] = useState([])
  const [creatingInvoiceValue, setCreatingInvoiceValue] = useState({
    items: [],
  })

  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false)

  const [selectedCurrentItemId, setSelectedCurrentItemId] = useState(null)
  const [currentUser, setCurrentUser] = useState([])
  const [invoiceID, setInvoiceID] = useState(null)
  // Items Form
  const [batch, setBatch] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [hsn, setHsn] = useState(null)
  const [taxCategoryId, setTaxCategoryId] = useState(null)

  // const getPickupLocations = async () => {
  //   const data = await shipmentService.getPickupLocations()
  //   if (data?.shipping_address) {
  //     setPickUpLocations(data.shipping_address)
  //   }
  // }


  const fetchTaxCategories = async () => {
    const allTaxCategories = await taxCategoryService.getTaxCategories()
    if (allTaxCategories) {
      setTaxCategories(allTaxCategories)
    }
  }

  useEffect(() => {
    fetchTaxCategories()
  }, [])

  const getCurrentUser = async () => {
    const data = authVendorService.getProfile()
    if (data) {
      setCurrentUser(data)
    }
    // console.log('currentUser', currentUser)
  }
  const invoiceId = items[0].invoiceId
//  console.log(invoiceId,'invoiceId') 
//  setInvoiceID(invoiceId)


  const getTaxCategories = async () => {
    const data = await taxCategoryService.getTaxCategories()

    if (data) {
      setTaxCategories(data)
    }
  }

  useEffect(() => {
    getCurrentUser()
    // getTaxCategories()
  }, [])
console.log(items,'invoice')

useEffect(() => {
  if(invoiceId?.length > 0 )
  {
    message.success('Invoice Part is Done')
    next()
  }
}, [invoiceId])
  // useEffect(() => {
  //   if (items?.length > 0) {
  //     const invoicesAvailableData = []
  //     items?.forEach((cur) => {
  //       const isAlreadyAddedVendor = vendorBasedInvoiceData?.find(
  //         (inv) => inv.vendorId === cur.vendorId
  //       )

  //       if (!isAlreadyAddedVendor) {
  //         invoicesAvailableData.push({
  //           vendorId: cur?.vendorId,
  //           vendorName: cur?.vendorName,
  //           items: [cur],
  //         })
  //       } else {
  //         invoicesAvailableData.forEach((inv, i) => {
  //           if (isAlreadyAddedVendor.vendorId === inv.vendorId) {
  //             invoicesAvailableData[i].items.push(cur)
  //           }
  //         })
  //       }
  //     })
  //     setVendorBasedInvoiceData(invoicesAvailableData)
  //   }
  //  }, [items])

  const resetInvoiceItemStateValues = () => {
    setBatch(null)
    setExpiry(null)
    setTaxCategoryId(null)
    setSelectedCurrentItemId(null)
  }

  const addToCreatingInvoiceValue = () => {
    // console.log(creatingInvoiceValue, 'djhk')
    setCreatingInvoiceValue((prev) => ({
      ...prev,
      items: [
        ...prev?.items,
        { id: selectedCurrentItemId, batch, expiry, hsn, taxCategoryId },
      ],
    }))
    resetInvoiceItemStateValues()
    setIsAddInvoiceModalOpen(false)
    notification.success({
      message: 'Added Item To Invoice',
    })
  }

  const removeProductItemFromCreatingInvoiceValue = (productitemId) => {
    const cloneCreatingInvoiceValue = { ...creatingInvoiceValue }

    const filteredData = cloneCreatingInvoiceValue?.items?.filter(
      (cur) => cur.id !== productitemId
    )

    const values = { ...creatingInvoiceValue, items: filteredData }

    setCreatingInvoiceValue(values)
  }

  // console.log('creatrei', creatingInvoiceValue)

  const ifItemIdIsInCreatingInvoiceValue = (itemId) => {
    const exist = creatingInvoiceValue?.items?.find((cur) => cur.id === itemId)
    if (exist?.id) {
      return true
    } else {
      return false
    }
  }

  const onFinish = async () => {
    const createdInvoice = await orderService?.createVendorOrderInvoice(
      orderId,
      creatingInvoiceValue
    )
    
    if (createdInvoice ) {
      notification.success({
        message: 'invoice Created',
      })
      resetMainStates()
      reFetchOrderData()
    }
  }

  const resetMainStates = () => {
    setVendorBasedInvoiceData([])
    setCreatingInvoiceValue({ items: [] })
    setIsAddInvoiceModalOpen(false)
    setSelectedCurrentItemId(null)
    setIsAddInvoiceModalOpen(false)
  }

  // console.log(items, 'shjkjui')

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <Card title="Invoice">
            {/* <Select
                className="w-100 mb-3"
                placeholder="Select Vendor"
                value={creatingInvoiceValue?.vendorId}
                onChange={(val) =>
                  setCreatingInvoiceValue((prev) => ({
                    ...prev,
                    vendorId: val,
                    items: [],
                  }))
                }
              >
                {vendorBasedInvoiceData?.map((cur) => (
                  <Option value={cur?.vendorId}>{cur?.vendorName}</Option>
                ))}
              </Select> */}

            <Input
              placeholder="Invoice No"
              value={creatingInvoiceValue?.invoice}
              onChange={(e) =>
                setCreatingInvoiceValue((prev) => ({
                  ...prev,
                  invoice: e.target.value,
                }))
              }
            />

            <Table dataSource={items} pagination={false} className="mb-5">
              <Column title="Product" dataIndex="name" key="name" />
              <Column title="Quantity" dataIndex="quantity" key="quantity" />
              <Column title="Price" dataIndex="price" key="price" />
              <Column title="Vendor" dataIndex="vendorName" key="vendorName" />
              {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                <Column
                  title="Prescription Required"
                  dataIndex="prescriptionRequired"
                  key="prescriptionRequired"
                  render={(presc) => <>{presc ? 'Yes' : 'No'}</>}
                />
              )}

              <Column title="Status" dataIndex="status" key="status" />
              <Column
                title="Invoice"
                render={(_, row) => (
                  <>
                    {ifItemIdIsInCreatingInvoiceValue(row.id) ? (
                      <Button
                        onClick={() =>
                          removeProductItemFromCreatingInvoiceValue(row.id)
                        }
                      >
                        Remove
                      </Button>
                    ) : (
                      <>
                        {!row?.invoiceId ? (
                          <Button
                            type="primary"
                            onClick={() => {
                              setIsAddInvoiceModalOpen(true)
                              setSelectedCurrentItemId(row.id)
                              setBatch(row.batch ? row.batch : null)
                              setExpiry(row.expiry ? moment(row.expiry) : null)
                              setHsn(row.hsn ? row.hsn : null)
                              setTaxCategoryId(
                                row?.taxCategoryId ? row?.taxCategoryId : null
                              )
                            }}
                          >
                            Add Invoice
                          </Button>
                        ) : (
                          <b>{row?.invoiceId}</b>
                        )}
                      </>
                    )}
                  </>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>

      <Modal
        title={`Add Invoice`}
        style={{ top: 20 }}
        visible={isAddInvoiceModalOpen}
        onCancel={() => setIsAddInvoiceModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={addToCreatingInvoiceValue}
            // disabled={!selectedRowItems.length > 0}
          >
            Add
          </Button>,
        ]}
        destroyOnClose
      >
        <p>Batch</p>
        <Input
          placeholder="Batch"
          className="mb-3"
          onChange={(e) => setBatch(e.target.value)}
          value={batch}
        />
        <p>Hsn</p>
        <Input
          placeholder="Hsn"
          className="mb-3"
          onChange={(e) => setHsn(e.target.value)}
          value={hsn}
        />

        {/* <Select placeholder="Tax Category" className="mb-3">
          {taxCategories?.map((cur) => (
            <Option value={cur.id}>{cur?.name}</Option>
          ))}
        </Select> */}
        <p>Expiry</p>
        <DatePicker
          placeholder="Expiry Date"
          format="YYYY-MM-DD"
          value={expiry ? moment(expiry) : null}
          className="w-100"
          onChange={(date, dateString) => setExpiry(dateString)}
        />
        <br/>
        <br/>
        <p>TaxCategory</p>
        <Select
          placeholder="Tax Category"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: '100%' }}
          onChange={(e) => setTaxCategoryId(e)}
          value={taxCategoryId}
        >
          {taxCategories.map((medicineType) => (
            <Option key={medicineType.id} value={medicineType.id}>
              {medicineType.name}
            </Option>
          ))}
        </Select>
      </Modal>
      {creatingInvoiceValue?.items?.length > 0 && (
        <Button type="primary" loading={submitLoading} onClick={onFinish}>
          Generate Invoice
        </Button>
      )}
    </>
  )
}

export default GenerateInvoice
