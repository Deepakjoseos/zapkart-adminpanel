  import React, { useState } from 'react'
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Modal,
} from 'antd'
import ListingItemsTable from './listingItemsTable'
import AddListingItemsTable from './AddListingItemsTable'
import Editor from 'components/shared-components/Editor'
// const { Dragger } = Upload
const { Option } = Select

const rules = {
  numberOfItems: [
    {
      required: true,
      message: 'Required',
    },
  ],
  listingType: [
    {
      required: true,
      message: 'Required',
    },
  ],
  listingPlatform:[
    {
      required:true,
      message:'Required'
    }
  ],
  staticContent: [
    {
      required: true,
      message: 'Required',
    },
  ],
}

const listingType = [
  'Brands',
  'Banner',
  'Categories',
  'ProductTemplates',
  'MainBanner',
  'Static',
]

const WidgetField = ({
  form,
  onListingTypesChange,
  listItemsProvider,
  isStaticProviderSelected,
  listItems,
  setListItems,listing_platforms
}) => {
  const [isopenAddListingTableModal, setIsOpenAddListingTableModal] =
    useState(false)
  const [selectedRowItems, setSelectedRowItems] = useState([])

  const handleCancel = () => {
    setIsOpenAddListingTableModal(false)
    setSelectedRowItems([])
  }

  const onAddSelectedItems = () => {
    if (selectedRowItems?.length > 0) {
      setListItems((prev) => [...prev, ...selectedRowItems])
      setIsOpenAddListingTableModal(false)
      setSelectedRowItems([])
    }
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Widget Info">
          <Form.Item
            name="numberOfItems"
            label="Number Of Items"
            rules={rules.numberOfItems}
          >
            <InputNumber placeholder="Number Of Items" min={0} max={100000} />
          </Form.Item>

          <Form.Item
            name="listingType"
            label="Listing Type"
            rules={rules.listingType}
          >
            <Select
              placeholder="listing Type"
              onChange={(val) => {
                // form.setFieldsValue({ listingItems: [] })
                setListItems([])
                onListingTypesChange(val)
              }}
            >
              {listingType.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="listingPlatform"
            label="Listing Platform"
            rules={rules.allowedPaymentTypes}
          >
            <Select
              mode="multiple"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
              style={{ width: '100%' }}
              placeholder="Listing Platform"
            >
              {listing_platforms.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {isStaticProviderSelected && (
            // <Form.Item
            //   name="staticContent"
            //   label="Static Content"
            //   rules={rules.staticContent}
            // >
            //   <Input placeholder="Static Content" />
            // </Form.Item>
            <Form.Item
              name="staticContent"
              label="Static Content"
              rules={rules.staticContent}
            >
              <Editor
                placeholder="Write something..."
                editorHtml={form.getFieldValue('staticContent') || ''}
                onChange={(e) => form.setFieldsValue({ staticContent: e })}
                name="staticContent"
              />
            </Form.Item>
          )}

          {!isStaticProviderSelected && (
            <>
              <ListingItemsTable
                listItems={listItems}
                setListItems={setListItems}
              />
              <Button
                type="primary"
                className="mt-2"
                onClick={() => setIsOpenAddListingTableModal(true)}
              >
                Add Item
              </Button>

              <Modal
                title="Add List Items"
                style={{ top: 20 }}
                visible={isopenAddListingTableModal}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key="submit"
                    type="primary"
                    onClick={onAddSelectedItems}
                    disabled={!selectedRowItems.length > 0}
                  >
                    Submit
                  </Button>,
                ]}
                destroyOnClose
              >
                <AddListingItemsTable
                  listItemsProvider={listItemsProvider}
                  setListItems={setListItems}
                  setSelectedRowItems={setSelectedRowItems}
                />
              </Modal>
            </>
          )}
        </Card>
      </Col>
    </Row>
  )
}

export default WidgetField
