import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, Alert, Divider } from 'antd'
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
} from 'redux/actions/Auth'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import CustomIcon from 'components/util-components/CustomIcon'
import { GoogleSVG } from 'assets/svg/icon'

const rules = {
  email: [
    {
      required: true,
      message: 'Please input your email address',
    },
    {
      type: 'email',
      message: 'Please enter a validate email!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input your password',
    },
  ],
  confirm: [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
        return Promise.reject('Passwords do not match!')
      },
    }),
  ],
}

export const RegisterForm = (props) => {
  const {
    signUp,
    showLoading,
    token,
    loading,
    redirect,
    message,
    showMessage,
    hideAuthMessage,
    allowRedirect,
    signInWithGoogle,
  } = props
  const [form] = Form.useForm()
  let history = useHistory()

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        showLoading()
        signUp(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect)
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage()
      }, 3000)
    }
  })

  const onGoogleLogin = () => {
    showLoading()
    signInWithGoogle()
  }

  const renderOtherSignIn = (
    <div>
      {/* <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          or connect with
        </span>
      </Divider>
      <div className="d-flex justify-content-center"> */}
        {/* <Button
          onClick={() => onGoogleLogin()}
          className="mr-2"
          disabled={loading}
          icon={<CustomIcon svg={GoogleSVG} />}
        >
          Google
        </Button> */}
        {/* <Button
			  onClick={() => onFacebookLogin()}
			  icon={<CustomIcon svg={FacebookSVG} />}
			  disabled={loading}
			>
			  Facebook
			</Button> */}
      {/* </div> */}
    </div>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="ConfirmPassword"
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      {renderOtherSignIn}
    </>
  )
}

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  showLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
