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
import taxCategoryService from 'services/TaxCategory'

const CreateInvoiceForm = ({
  orderId,
  setIsInvoiceFormOpen,
  isInvoiceFormOpen,
  refetchOrderData,
  items,
}) => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { Option } = Select
  const { Column } = Table

  const [submitLoading, setSubmitLoading] = useState(false)

  const [vendorBasedInvoiceData, setVendorBasedInvoiceData] = useState([])

  const [creatingInvoiceValue, setCreatingInvoiceValue] = useState({})

  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false)

  const [selectedCurrentItemId, setSelectedCurrentItemId] = useState(null)

  // Items Form
  const [batch, setBatch] = useState(null)
  const [hsn, setHsn] = useState(null)
  const [taxCategoryId, setTaxCategoryId] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [taxCategories, setTaxCategories] = useState([])

  // const getPickupLocations = async () => {
  //   const data = await shipmentService.getPickupLocations()
  //   if (data?.shipping_address) {
  //     setPickUpLocations(data.shipping_address)
  //   }
  // }
  // useEffect(() => {
  //   getPickupLocations()
  // }, [])
  // const uniquevendor = vendorBasedInvoiceData.filter((item, index) => {
  //   return vendorBasedInvoiceData.findIndex(i => i.vendorId === item.vendorId) === index;
  // });
  let uniquevendor ={};
  let vendorDetails = {};
  vendorBasedInvoiceData.map((item) => {
      vendorDetails[item.items[0].vendorId] = {vendorId:item.items[0].vendorId,vendorName:item.items[0].vendorName}
      if (uniquevendor[item.items[0].vendorId]) 
      uniquevendor[item.items[0].vendorId].push(item.items[0]);
      else uniquevendor[item.items[0].vendorId] = [item.items[0]];
    });
 
    console.log(uniquevendor,'vendoris')
    console.log(vendorDetails,'vendordetails')
    console.log(items,'items')

  useEffect(() => {
    if (items?.length > 0) {
      const invoicesAvailableData = []
      items?.forEach((cur) => {
        const isAlreadyAddedVendor = vendorBasedInvoiceData?.find(
          (inv) => inv.vendorId === cur.vendorId
        )

        if (!isAlreadyAddedVendor) {
          invoicesAvailableData.push({
            vendorId: cur?.vendorId,
            vendorName: cur?.vendorName,
            items: [cur],
          })
        } else {
          invoicesAvailableData.forEach((inv, i) => {
            if (isAlreadyAddedVendor.vendorId === inv.vendorId) {
              invoicesAvailableData[i].items.push(cur)
            }
          })
        }
      })
      setVendorBasedInvoiceData(invoicesAvailableData)
    }
  }, [items])

  const fetchTaxCategories = async () => {
    const allTaxCategories = await taxCategoryService.getTaxCategories()
    if (allTaxCategories) {
      setTaxCategories(allTaxCategories)
    }
  }

  useEffect(() => {
    fetchTaxCategories()
  }, [])

  const resetInvoiceItemStateValues = () => {
    setBatch(null)
    setHsn(null)
    setTaxCategoryId(null)
    setExpiry(null)
    setSelectedCurrentItemId(null)
  }

  const addToCreatingInvoiceValue = () => {
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

  console.log('creatrei', creatingInvoiceValue)

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
    if (createdInvoice) {
      notification.success({
        message: 'invoice Created',
      })
      resetMainStates()
      setIsInvoiceFormOpen(false)
      refetchOrderData()
    }
  }

  const resetMainStates = () => {
    setVendorBasedInvoiceData([])
    setCreatingInvoiceValue({})
    setIsAddInvoiceModalOpen(false)
    setSelectedCurrentItemId(null)
    setIsAddInvoiceModalOpen(false)
  }

  console.log(vendorBasedInvoiceData, 'shjkjui')

  return (
    <>
      <Drawer
        title="Invoice Form"
        width={'70%'}
        onClose={() => {
          setIsInvoiceFormOpen(false)
          form.resetFields()
        }}
        visible={isInvoiceFormOpen}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                setIsInvoiceFormOpen(false)
                form.resetFields()
              }}
            >
              Cancel
            </Button>
            <Button type="primary" loading={submitLoading} onClick={onFinish}>
              Submit
            </Button>
          </Space>
        }
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24}>
            <Card title="Basic Info">
              <Select
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
                {Object.entries(uniquevendor)?.map(([vendorId,cur]) => (
                  <Option value={vendorId}>{vendorDetails[vendorId].vendorName}</Option>
                ))}
              </Select>

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

              <Table
                dataSource={
                  uniquevendor[creatingInvoiceValue?.vendorId]
                }
                pagination={false}
                className="mb-5"
              >
                <Column title="Product" 
                // dataIndex="name" 
                // key="name"
                render={(text) =>
                  !text.invoiceId ? (
                    
                    text?.name
                  ) : (
                    ''
                  )
                }
                />
                <Column title="Quantity"
                //  dataIndex="quantity"
                  // key="quantity"
                  render={(text) =>
                    !text.invoiceId ? (
                      
                      text?.quantity
                    ) : (
                      ''
                    )
                  } 
                  />
                <Column title="Price" 
                  // dataIndex="price"
                  // key="price"
                  render={(text) =>
                    !text.invoiceId ? (
                      
                      text?.price
                    ) : (
                      ''
                    )
                  }  />
                <Column
                  title="Vendor"
                  // dataIndex="vendorName"
                  // key="vendorName"
                  render={(text) =>
                    !text.invoiceId ? (
                      // <Link
                      //   to={`/app/dashboards/shipment/shipment-view/${text.shipmentId}`}
                      // >
                      //   {' '}
                      //   {text.shipmentNo}
                      // </Link>
                      text?.vendorName
                    ) : (
                      ''
                    )
                  } 
                />
                {process.env.REACT_APP_SITE_NAME === 'zapkart' && (
                  <Column
                    title="Prescription Required"
                    // dataIndex="prescriptionRequired"
                    // key="prescriptionRequired"
                    render={(presc) => 
                    !presc.invoiceId ?
                    (
                    <>
                    {presc.prescriptionRequired ? 'Yes' : 'No'}
                    </>
                    ): (
                      ''
                    )
                  }
                  />
                )}

                <Column title="Status"
                //  dataIndex="status" 
                //  key="status"
                 render={(text) =>
                  !text.invoiceId ? (
                    
                    text?.status
                  ) : (
                    ''
                  )
                } />
                <Column
                  title="Action"
                  render={(row) => (
                    !row.invoiceId ?(
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
                        <Button
                          type="primary"
                          onClick={() => {
                            setIsAddInvoiceModalOpen(true)
                            setSelectedCurrentItemId(row.id)
                            setBatch(row.batch ? row.batch : null)
                            setHsn(row.batch ? row.hsn : null)
                            setTaxCategoryId(
                              row.batch ? row.taxCategoryId : null
                            )
                            setExpiry(row.expiry ? moment(row.expiry) : null)
                          }}
                        >
                          Add Invoice
                        </Button>
                      )}

                    </>
                    ):('')
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </Drawer>

      <Modal
        title="Add Invoice"
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
        <p>Hsn</p>
        <Input
          placeholder="Hsn"
          className="mb-3"
          onChange={(e) => setHsn(e.target.value)}
          value={hsn}
        />

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
    </>
  )
}

export default CreateInvoiceForm
