import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const backgroundStyle = {
  backgroundImage: 'url(/img/others/img-17.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

const LoginOne = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme)
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
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

                  {/* <p>Don't have an account yet? <a href="/auth/register-1">Sign Up</a></p> */}
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                    <Link to="/auth/forgot-password">Forgot Password ?</Link>
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

export default LoginOne
