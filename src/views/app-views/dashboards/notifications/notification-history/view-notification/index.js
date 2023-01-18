import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import notificationService from 'services/notification'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import {
    Input,
    Row,
    Col,
    Card,
    Form,
    Upload,
    InputNumber,
    Select,
    List,
    Button,
    Tabs,
    notification,
  } from 'antd'
import { useParams} from 'react-router-dom'
import qs from 'qs'

const ViewNotfication = () => {
    const [list, setList] = useState([])
    const { id } = useParams()

    useEffect(() => {
          const fetchNotificationById = async () => {
            const data = await notificationService.getNotificationsById(id);
            console.log(data,'fetchNotify')
            setList(data.data)
        }
          fetchNotificationById()
        })
        return(
            <>
            <PageHeaderAlt >
          <div className="container">
            <Flex
              className="py-1"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3 ml-3">
              View Notification
              </h2>
              </Flex>
          </div>
          </PageHeaderAlt>
          <div className="container">
          
            
          <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title="Basic Info">
          <span >
            <b>Name:</b>
          </span>
          <span>   {list?.userName}</span>
          <br></br>
          <span >
            <b>Email:</b>
          </span>
          <span>   {list?.userEmail}</span>
          <br></br>
          <span >
            <b>Notification Category Type:</b>
          </span>
          <span>  {list?.notificationCategoryType}</span>
          <br></br>
          <span >
            <b>Send Time:</b>
          </span>
          <span>  {moment(new Date(list?.createdAt * 1000)).format('DD-MMM-YYYY hh:mm:a')}  </span>
          <br></br>
          <span >
            <b>Listing Type:</b>
          </span>
          <span>  {list?.listingType}</span>
        </Card>
          {list.email &&
        <Card title="Email">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
            <span >
            <b>Email Subject:</b>
          </span>
          <span>  {list.email?.subject} </span>
          <br></br>
              <span>
              <b> Email Content:</b>
              </span>
              <span>
              <div dangerouslySetInnerHTML={{__html:list.email?.content}}/>
              </span>
              <br></br>
            </Col>
            <Col xs={24} sm={24} md={16}>
            <span>
            <b>Email Status:</b>
              </span>
              <span>{list.email?.status}</span>
            </Col>
          </Row>
        </Card>
}

        {/* SMS */}
        {list.sms && 
        <Card title="SMS">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
            <span>
            <b>SMS Phone:</b>
              </span>
              <span>{list.sms?.phone}</span>
              <br></br>
              <span>
            <b>SMS Template Id:</b>
              </span>
              <span>{list.sms?.templateId}</span>
              <br></br>
              <span>
            <b>SMS Content:</b>
              </span>
              <span>
                <div className='mt-2' dangerouslySetInnerHTML={{__html:list.sms?.content}}/>
              </span>
              <br></br>
              <span>
            <b>SMS Status:</b>
              </span>
              <span>{list.sms?.status}</span>
            </Col>
           
          </Row>
        </Card>
}

        {/* FCM */}

{list.fcm && 
        <Card title="FCM">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16}>
              
            <span>
            <b>FCM Title:</b>
              </span>
              <span>{list.fcm?.title}</span>
              <br></br>
              <span>
            <b>FCM Description:</b>
              </span>
              <span>
              <div dangerouslySetInnerHTML={{__html:list.fcm?.description}} />
                </span>
                <br></br>
                <span>
            <b>FCM Image:</b>
              </span>
              <span>{list.fcm?.image}</span>
              <br></br>
                <span>
            <b>FCM Status:</b>
              </span>
              <span>{list.fcm?.status}</span>
            </Col>
          </Row>
        </Card>

}
      </Col>
    </Row>
        </div>
            </>
            
        )
} 

export default ViewNotfication;