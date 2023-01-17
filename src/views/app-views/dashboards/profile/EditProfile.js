import React, { Component, useEffect, useState } from 'react'
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Select,
  Option,
  Col,
  Row,
  message,
  Upload,
  Card,
} from 'antd'
import { UserOutlined ,CheckCircleOutlined , CloseOutlined} from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex'
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon'
import { useDispatch, useSelector } from 'react-redux'
import useUpload from 'hooks/useUpload'
import Utils from 'utils'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import authVendorService from 'services/auth/vendor'
import { authenticated } from 'redux/actions/Auth'
import localityService from 'services/locality'

const EditProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const [country ,setCountry]=useState([])
  const [state ,setState]=useState([])
  const [Logo, setLogo] = useState(null)
  
  console.log(user, 'mine')
  const dispatch = useDispatch()
  const { Option } = Select

  const [form] = Form.useForm()
  const getCountry = async ()=>{
    const data = await localityService.getCountry()
    if(data){
      setCountry(data.data)
    }
      }
      const getState = async ()=>{
        const data = await localityService.getState()
        if(data){
          setState(data.data)
        }
          }
          
  
  useEffect(()=>{
 getState()
  getCountry()
  
  },[])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gst: user.gst,
        address: user.address,
        tanNumber: user.tanNumber,
        pan: user.pan,
        tdsEnabled: user.tdsEnabled,
        drugLicense: user.drugLicense,
        country: user.country,
        state:user.state,
        business:user.business,
        emailVerified: user?.emailVerified,
        smsSubscription: user?.smsSubscription,
        emailSubscription: user?.emailSubscription,
        'address.line1': user?.address?.line1,
        'address.city': user?.address?.city,
        'address.state': user?.address?.state,
        'address.country': user?.address?.country,
        'address.phone': user?.address?.phone,
        'address.zipcode': user?.address?.zipcode,

         //Bank
         'bank.name':user?.bank?.name,
         'bank.accountNumber':user?.bank?.accountNumber,
         'bank.branch':user?.bank?.branch,
         'bank.swiftCode':user?.bank?.swiftCode,
         'bank.iBanNo':user?.bank?.iBanNo,

        // Bussiness
        'business.name': user?.business?.name,
        'business.address.line1': user?.business?.address?.line1,
        'business.address.city': user?.business?.address?.city,
        'business.address.state': user?.business?.address?.state,
        'business.address.country': user?.business?.address?.country,
        'business.address.phone': user?.business?.address?.phone,
        'business.address.zipcode': user?.business?.address?.zipcode,
      })
      let himg = []
      console.log(user,'users')
      if (user.displayImage) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(user.displayImage),
            url: user.displayImage,
            thumbUrl: user.displayImage,
          },
        ]
        console.log(user.displayImage, 'jeey', himg)
        setDisplayImage(himg)
        setFileListImages(himg)
      }
      
      if (user.logo) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(user.logo),
            url: user.logo,
            thumbUrl: user.logo,
          },
        ]
        setLogo(himg)
        setFileListLogo(himg)
      }
    }
  }, [])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  const {
    fileList: fileListLogo,
    beforeUpload: beforeUploadLogo,
    onChange: onChangeLogo,
    onRemove: onRemoveLogo,
    setFileList: setFileListLogo,
  } = useUpload(1)



  const onFinish = (values) => {
    form
      .validateFields()
      .then(async (values) => {
        const sendingValues = {
          firstName: values.firstName,
          lastName: values.lastName,
          gst: values.gst,
          tanNumber: values.tanNumber,
          pan: values.pan,
          emailVerified:values.emailVerified,
          tdsEnabled: values.tdsEnabled,
          smsSubscription:values.smsSubscription,
          emailSubscription: values.emailSubscription,
          drugLicense: values.drugLicense,
          bank: {
            name: values["bank.name"],
            accountNumber: values["bank.accountNumber"],
            branch: values["bank.branch"],
            swiftCode: values["bank.swiftCode"],
            iBanNo: values["bank.iBanNo"],
          },
          address: {
            line1: values["address.line1"],
            city: values["address.city"],
            state: values["address.state"],
            country: values["address.country"],
            phone: values["address.phone"],
            zipcode: values["address.zipcode"],
          },
          business: {
            name: values["business.name"],
            address: {
              line1: values["business.address.line1"],
              city: values["business.address.city"],
              state: values["business.address.state"],
              country: values["business.address.country"],
              phone: values["business.address.phone"],
              zipcode: values["business.address.zipcode"],
            },
          },
        };

        if (JSON.stringify(sendingValues.address) === '{}') {
          delete sendingValues.address
        }

        if (JSON.stringify(sendingValues.business) === '{}') {
          delete sendingValues.business
        } else if (JSON.stringify(sendingValues.business.address) === '{}') {
          if (sendingValues.business.name) {
            delete sendingValues.business.address
          } else {
            delete sendingValues.business
          }
        }

        // Checking if image exists
        // console.log(values, 'plss')
        if (displayImage?.length !== 0 && displayImage !== null) {
          const imgValue = await singleImageUploader(
            displayImage[0].originFileObj,
            displayImage,
            displayImage[0].url,
            'profile'
          )
          sendingValues.displayImage = imgValue
        } else {
          sendingValues.displayImage = null
        }

        const edited = await authVendorService.editProfile(sendingValues)
        if (edited) {
          message.success(`Edited Profile Successfully`)

          const data = await authVendorService.getProfile()

          console.log(data, 'heteet')
          if (data) {
            const userData = {
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              displayImage: data.displayImage,
              gst: data.gst,
              tanNumber: data.tanNumber,
              pan: data.pan,
              emailVerified:data.emailVerified,
              emailSubscription: data.emailSubscription,
              tdsEnabled: data.tdsEnabled ,
              smsSubscription: data.smsSubscription,
              drugLicense: data.drugLicense,
              address: data.address,
              business: data.business,
              bank:data.bank,
              country:data.country
            }
            dispatch(
              authenticated({
                user: userData,
                token: window.localStorage.getItem('auth_token'),
              })
            )
          }
        }
      })
      .catch((info) => {
        // setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  // const onFinishFailed = errorInfo => {
  // 	console.log('Failed:', errorInfo);
  // };

  // const onUploadAavater = info => {
  // 	const key = 'updatable';
  // 	if (info.file.status === 'uploading') {
  // 		message.loading({ content: 'Uploading...', key, duration: 1000 });
  // 		return;
  // 	}
  // 	if (info.file.status === 'done') {
  // 		this.getBase64(info.file.originFileObj, imageUrl =>
  // 			this.setState({
  // 				avatarUrl: imageUrl,
  // 			}),
  // 		);
  // 		message.success({ content: 'Uploaded!', key,  duration: 1.5 });
  // 	}
  // };

  const onRemoveAvater = () => {
    // this.setState({
    // 	avatarUrl: ''
    // })
    setDisplayImage(null)
    setPreviewUrl(null)
  }

  // const { name, email, userName, dateOfBirth, phoneNumber, website, address, city, postcode, avatarUrl } = this.state;

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    if (fileListImages?.length) {
      // Setting Preview
      if (fileListImages?.length > 0 && fileListImages[0]?.originFileObj) {
        setPreviewUrl(URL.createObjectURL(fileListImages[0].originFileObj))
      } else {
        setPreviewUrl(fileListImages[0].url)
      }
      setDisplayImage(fileListImages)
    }
  }, [fileListImages])

  // const onSwitch = (e) => {
  //     if(e=== true){
  //       setEmailVerified(true)
  //     }
  //     else{
  //       setEmailVerified(false)
  //     }
  // }

  const propsLogo = {
    multiple: false,
    beforeUpload: beforeUploadLogo,
    onRemove: onRemoveLogo,
    onChange: onChangeLogo,
    fileList: fileListLogo,
  }

  useEffect(() => {
    setLogo(fileListLogo)
  }, [fileListLogo])


  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={previewUrl} icon={<UserOutlined />} />
        <div className="ml-3 mt-md-0 mt-3">
          <Upload
            // onChange={onUploadAavater}
            showUploadList={false}
            name="image"
            {...propsImages}
            // action={this.avatarEndpoint}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          form={form}
          // initialValues={
          // 	{
          // 		'name': name,
          // 		'email': email,
          // 		'username': userName,
          // 		'dateOfBirth': dateOfBirth,
          // 		'phoneNumber': phoneNumber,
          // 		'website': website,
          // 		'address': address,
          // 		'city': city,
          // 		'postcode': postcode
          // 	}
          // }
          //   onFinish={}
          // onFinishFailed={onFinishFailed}
        >
          {/* <Row gutter={16}>
            <Col xs={24} sm={24} lg={17}> */}
          <Row gutter={ROW_GUTTER}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
         
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                // hasFeedback
                // validateStatus={user.emailVerified ? 'success' : 'error'}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                {/* <Input disabled /> */}
                {
user.emailVerified ?  <Input disabled status="success" prefix={<CheckCircleOutlined />}  /> : <Input disabled status="error" prefix={<CloseOutlined />}  />
}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                validateStatus='success'
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={24} md={12}>
            <Form.Item
                name="emailSubscription"
                label="Email Subscription"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}              >
                <Select  placeholder="Email Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
            <Form.Item
                name="smsSubscription"
                label="Sms Subscription"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}              >
                <Select placeholder="Sms Subscription">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
            <Form.Item
                name="tdsEnabled"
                label="TDS Enabled"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}              >
                <Select disabled placeholder="TDS Enabled">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
              <Form.Item label="GST" name="gst">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item name="pan" label="PAN" >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form.Item name="drugLicense" label="Drug License" >
                <Input />
              </Form.Item>
            </Col>

           

            <Card title="Address" style={{ width: '100%' }}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item name="address.line1" label="Line1">
                    <Input placeholder="Line 1" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                <Form.Item name="countryId" label="Country" >
          <Select placeholder="Country">
              {country.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
                    ))}
                 </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={24} md={12}>
                <Form.Item name="stateId" label="State" >
              <Select placeholder="State">
              {state.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.city" label="City">
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.phone" label="Phone">
                    <Input placeholder="Eg: +919988776655" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="address.zipcode" label="Zipcode">
                    <Input placeholder="Zipcode" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Bussiness */}


           

            <Card title="Business">
              <Form.Item name="business.name" label="Bussiness Name">
                <Input placeholder="Bussiness Name" />
              </Form.Item>

              <Card  title="Business logo">
        <Upload className='flex-column'
          listType="picture-card"
          name="business.address.logo"
          {...propsLogo}
          accept="image/*"
        >
          <CustomIcon className="display-3 " svg={ImageSvg} />
        </Upload>
        
      </Card>

              <br />
              <h4>Bussiness Addresss</h4>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item name="business.address.line1" label="Line1">
                    <Input placeholder="Line1" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.city" label="City">
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                 <Form.Item name="countryId" label="Country" >
          <Select placeholder="Country">
              {country.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
                    ))}
                 </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                <Form.Item name="stateId" label="State" >
          <Select placeholder="State">
              {state.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.phone" label="Phone">
                    <Input placeholder="Phone" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="business.address.zipcode" label="Zipcode">
                    <Input placeholder="Zipcode" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Row>




          
           {/* Bank account details */}

              
           <Card title="Bank account details">
           <Form.Item name="bank.name" label="Bank Name">
            
           <Input placeholder="Bank Name" />
              </Form.Item>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item name="bank.accountNumber" label="accountNumber">
                    <Input placeholder="accountNumber" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="bank.branch" label="branch">
                    <Input placeholder="branch" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                <Form.Item name="bank.swiftCode" label="swiftCode">
                    <Input placeholder="swiftCode" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                <Form.Item name="bank.iBanNo" label="iBanNo">
                    <Input placeholder="iBanNo" />
                  </Form.Item>
                </Col>

                </Row>
           </Card>




          

          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Save Change
          </Button>
          {/* </Col>
            <Col xs={24} sm={24} md={7}>
              <Card title="Profile Image">
                <Upload listType="picture-card" name="image" {...propsImages}>
                  <CustomIcon className="display-3" svg={ImageSvg} />
                </Upload>
              </Card>
            </Col>
          </Row> */}
        </Form>
      </div>
    </>
  )
}

export default EditProfile
