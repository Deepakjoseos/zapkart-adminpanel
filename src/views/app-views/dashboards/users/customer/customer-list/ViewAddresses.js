import { Card, Drawer } from 'antd'
import React from 'react'

const ViewAddresses = ({
  setOpenVariantsForm,
  openVariantsForm,
  addresses,
}) => {
  return (
    <div>
      <Drawer
        title="Variant Form"
        width={720}
        onClose={() => setOpenVariantsForm(false)}
        visible={openVariantsForm}
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
        {addresses.map((address) => (
          <Card key={address.id} title="Customer Addresses">
            Hi
          </Card>
        ))}
      </Drawer>
    </div>
  )
}

export default ViewAddresses
