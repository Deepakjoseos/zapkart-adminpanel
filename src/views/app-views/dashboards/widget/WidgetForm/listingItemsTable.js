import { MenuOutlined } from '@ant-design/icons'
import { Button, Menu, Table } from 'antd'
import { arrayMoveImmutable } from 'array-move'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { useState } from 'react'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc'
import { DeleteOutlined } from '@ant-design/icons'
import utils from 'utils'

const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: 'grab',
      color: '#999',
    }}
  />
))

const SortableItem = SortableElement((props) => <tr {...props} />)
const SortableBody = SortableContainer((props) => <tbody {...props} />)

const ListingItemsTable = ({ listItems, setListItems }) => {
  //   const [dataSource, setDataSource] = useState(data)

  const deleteRow = async (row) => {
    const objKey = 'id'
    let data = listItems

    data = utils.deleteArrayRow(data, objKey, row.id)
    setListItems(data)
  }

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
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
    {
      title: '',
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right">
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteRow(elm)}
          ></Button>
        </div>
      ),
    },
  ]

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        listItems.slice(),
        oldIndex,
        newIndex
      ).filter((el) => !!el)
      console.log('Sorted items: ', newData)
      setListItems(newData)
    }
  }

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = listItems.findIndex(
      (x) => x.index === restProps['data-row-key']
    )
    return <SortableItem index={index} {...restProps} />
  }

  return (
    <Table
      pagination={false}
      dataSource={listItems}
      columns={columns}
      rowKey="index"
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  )
}

export default ListingItemsTable
// .row-dragging {
//   background: #fafafa;
//   border: 1px solid #ccc;
// }

// .row-dragging td {
//   padding: 16px;
// }

// .row-dragging .drag-visible {
//   visibility: visible;
// }
