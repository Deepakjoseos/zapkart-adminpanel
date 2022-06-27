import { Card, Drawer, notification, Typography } from 'antd'
import React, { useEffect } from 'react'

const ViewAddresses = ({ selectedViewAddress, setSelectedViewAddress }) => {
  return (
    <div>
      <Drawer
        title="Address Details"
        width={720}
        onClose={() => setSelectedViewAddress([])}
        visible={selectedViewAddress?.length > 0}
        bodyStyle={{ paddingBottom: 80 }}
        // footer={
        //   <div
        //     style={{
        //       textAlign: 'right',
        //     }}
        //   >
        //     <Button
        //       onClick={() => setOpenVariantsForm(false)}
        //       style={{ marginRight: 8 }}
        //       htmlType="button"
        //     >
        //       Cancel
        //     </Button>
        //     <Button htmlType="button" onClick={onFinish} type="primary">
        //       Submit
        //     </Button>
        //   </div>
        // }
      >
        {selectedViewAddress.map((address, i) => (
          <Card key={address.id} title={`Address ${i + 1}`}>
            {'City: ' + address.city} <br />
            {'Country' + address.country} <br />
            {'line1: ' + address.line1} <br />
            {'Phone: ' + address.phone} <br />
            {'State: ' + address.state} <br />
            {'Zipcode: ' + address.zipcode}
          </Card>
        ))}
      </Drawer>
    </div>
  )
}

export default ViewAddresses
