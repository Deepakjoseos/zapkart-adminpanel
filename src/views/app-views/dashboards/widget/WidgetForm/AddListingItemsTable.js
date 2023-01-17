import { Button, Table } from 'antd'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { useEffect, useState } from 'react'

const AddListingItemsTable = ({ listItemsProvider, setSelectedRowItems }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = (newSelectedRowKeys, selectedRowData) => {
    // console.log('selectedRowKeys changed: ', selectedRowData, selectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRowItems(selectedRowData)
  }

  useEffect(() => {
    if (listItemsProvider?.length === 0) {
      setSelectedRowKeys([])
      setSelectedRowItems([])
    }
  }, [listItemsProvider])

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record?.images ? record.images[0] : record.image}
            name={record.name}
          />
        </div>
      ),
    },
  ]

  return (
    <div>
      <div>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={listItemsProvider}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 300 }}
      />
      {/* <Button
        type="primary"
        onClick={onAddSelectedItems}
        disabled={!hasSelected}
      >
        Add
      </Button> */}
    </div>
  )
}

export default AddListingItemsTable
