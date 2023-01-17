import React, { useState } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  notification,
} from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { auth } from 'auth/FirebaseAuth'

const backgroundStyle = {
  backgroundImage: 'url(/img/others/img-17.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const ForgotPassword = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const theme = useSelector((state) => state.theme.currentTheme)

  const onSend = async (values) => {
    setLoading(true)
    // setTimeout(() => {
    // setLoading(false)
    // 	message.success('New password has send to your email!');
    // }, 1500);
    const config = {
      url: 'https://vendorbackend.riolabz.com/auth/login',
      handleCodeInApp: true,
    }
    await auth
      .sendPasswordResetEmail(values.email, config)
      .then(() => {
        setLoading(false)
        notification.success({
          message: 'Please check your email',
          description: `Email is sent to ${values.email}. Click the link in the email to reset your password.`,
        })
      })
      .catch((err) => {
        notification.error({ message: 'Error', description: err.message })
        setLoading(false)
      })
  }

  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  {process.env.REACT_APP_SITE_NAME === 'zapkart' ? (
                    <img
                      className="img-fluid"
                      src={`/img/${
                        theme === 'light' ? 'logo.png' : 'logo-white.png'
                      }`}
                      alt=""
                    />
                  ) : process.env.REACT_APP_SITE_NAME === 'athathy' ? (
                    <img
                      className="img-fluid"
                      src={`/img/${
                        theme === 'light' ? 'athathy.png' : 'logo-white.png'
                      }`}
                      alt=""
                    />
                  ) : (
                    process.env.REACT_APP_SITE_NAME === 'awen' && (
                      <img
                        className="img-fluid"
                        src={`/img/${
                          theme === 'light' ? 'awenlogo.png' : 'logo-white.png'
                        }`}
                        alt=""
                      />
                    )
                  )}

                  <h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
                  <p className="mb-4">Enter your Email to reset password</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      name="forget-password"
                      onFinish={onSend}
                    >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email address',
                          },
                          {
                            type: 'email',
                            message: 'Please enter a validate email!',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email Address"
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          {loading ? 'Sending' : 'Send'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ForgotPassword
