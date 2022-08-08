import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Card, Form } from 'antd'

const GeneralField = ({ form }) => {
  return (
    <Card>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Phone" type="tel" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="pin_code"
            label="Pincode"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input placeholder="Pincode" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Required',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="address_2" label="Address 2">
            <Input.TextArea rows={4} placeholder="Address 2" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default GeneralField