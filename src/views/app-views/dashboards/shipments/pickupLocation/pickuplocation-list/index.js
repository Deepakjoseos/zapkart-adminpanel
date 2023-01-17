import React, { useEffect, useState } from "react";
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
  Col,
} from "antd";
// import PickupLocationListData from 'assets/data/product-list.data.json'
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import utils from "utils";
import qs from "qs";
import _ from "lodash";
import pickupService from "services/pickuplocation";
import constantsService from "services/constants";
import vendorService from "services/vendor";

const { Option } = Select;

const getStockStatus = (status) => {
  if (status === "Active") {
    return (
      <>
        <Tag color="green">Active</Tag>
      </>
    );
  }
  if (status === "Hold") {
    return (
      <>
        <Tag color="orange">Hold</Tag>
      </>
    );
  }

  if (status === "Deleted") {
    return (
      <>
        <Tag color="red">Deleted</Tag>
      </>
    );
  }
  return null;
};
const PickupLocationList = () => {
  let history = useHistory();

  const [list, setList] = useState([]);
  const [searchBackupList, setSearchBackupList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm();

  // pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  const fetchConstants = async () => {
    const data = await constantsService.getConstants();
    if (data) {
      // console.log( Object.values(data.ORDER['ORDER_STATUS']), 'constanttyys')

      setStatuses(Object.values(data.GENERAL["STATUS"]));
    }
  };

  const getVendors = async () => {
    const data = await vendorService.getVendors();
    if (data) {
      const users = data.map((cur) => {
        return {
          ...cur,
          fullName: `${cur.firstName} ${cur.lastName}`,
        };
      });
      setVendors(users);
    }
  };
  
  const getPickupLocations = async (paginationParams = {}, filterParams) => {
    const data = await pickupService.getAll(
      qs.stringify(getPaginationParams(paginationParams)),
    qs.stringify(filterParams)
    );
    if (data) {
      setList(data?.data);
      setPagination({
        ...paginationParams.pagination,
        total: data?.total,
      })
      setLoading(false)

    }
  };

  useEffect(() => {
    // Getting Brands List to display in the table
    
    getVendors();
    getPickupLocations({pagination,});
    fetchConstants();
  }, []);

  // Dropdown menu for each row
  const dropdownMenu = (row) => (
    <Menu>
      {/* <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item> */}
      {/* <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : 'Delete'}
          </span>
        </Flex>
      </Menu.Item> */}
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/dashboards/shipments/pickuplocation/add-pickuplocation`);
  };

  const viewDetails = (row) => {
    history.push(
      `/app/dashboards/shipments/pickuplocation/edit-pickuplocation/${row.id}`
    );
  };

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
  // pagination generator
const getPaginationParams = (params) => ({
  limit: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
})

  

  const handleTableChange = (newPagination) => {
    getPickupLocations(
      {
        pagination: newPagination,
      },
      filterEnabled ? _.pickBy(form.getFieldsValue(), _.identity) : {}
    )
  }

  const resetPagination = () => ({
    ...pagination,
    current: 1,
    pageSize: 10,
  }); 

  // Filter Submit
  const handleFilterSubmit = async () => {
    setPagination(resetPagination());
    getPickupLocations({ pagination: resetPagination() }, {});
    setFilterEnabled(false);

    form
      .validateFields()
      .then(async (values) => {
        setFilterEnabled(true);
        // Removing falsy Values from values
        const sendingValues = _.pickBy(values, _.identity);
        getPickupLocations({ pagination: resetPagination() }, sendingValues);
      })
      .catch((info) => {
        // console.log('info', info)
        setFilterEnabled(false);
      });
  };
  

  // Clear Filter
  const handleClearFilter = async () => {
    form.resetFields();

    setPagination(resetPagination());
    getPickupLocations({ pagination: resetPagination() }, {});
    setFilterEnabled(false);
  };

  // Antd Table Columns
  const tableColumns = [
    // {
    //   title: 'Pickup Location Name',
    //   dataIndex: 'pickup_location',

    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'name'),
    // },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (_, record) => (
        <Flex alignItems="center">
          {record.address},{record.city},{record.state},{record.pinCode}
        </Flex>
      ),
    },
    // {
    //   title: "City , State & Pincode",
    //   dataIndex: "city",
    //   render: (_, record) => (
    //     <Flex alignItems="center">
    //       {record.city},{record.state},{record.pinCode}
    //     </Flex>
    //   ),
    //   // sorter: (a, b) => utils.antdTableSorter(a, b, 'city'),
    // },
    // {
    //   title: 'State',
    //   dataIndex: 'state',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'state'),
    // },
    // {
    //   title: 'Pin Code',
    //   dataIndex: 'pinCode',
    //   sorter: (a, b) => utils.antdTableSorter(a, b, 'pinCode'),
    // },

    // {
    //   title: '',
    //   dataIndex: 'actions',
    //   render: (_, elm) => (
    //     <div className="text-right">
    //       <EllipsisDropdown menu={dropdownMenu(elm)} />
    //     </div>
    //   ),
    // },
  ];

  // When Search is used
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : searchBackupList;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  // Filter Status Handler
  const handleShowStatus = (value) => {
    if (value !== "All") {
      const key = "status";
      const data = utils.filterArray(searchBackupList, key, value);
      setList(data);
    } else {
      setList(searchBackupList);
    }
  };

  // Table Filters JSX Elements
  const filters = () => (
    <Form
      layout="vertical"
      form={form}
      name="filter_form"
      className="ant-advanced-search-form"
    >
      <Row gutter={8} align="bottom">
        <Col md={6} sm={24} xs={24} lg={6}>
          <Form.Item name="vendorId" label="Vendors">
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              optionFilterProp="children"
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Vendors"
            >
              <Option value="">All</Option>
              {vendors.map((users) => (
                <Option key={users.id} value={users.id}>
                  {users.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="mb-4"style={{marginLeft:"80px"}}>
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
  );

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        {filters()}
        <div>
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add Pickup Location
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table 
            columns={tableColumns} 
            dataSource={list}
            scroll={{
              x: true,
            }}
            rowKey="id"
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange} />
      </div>
    </Card>
  );
};

export default PickupLocationList;
