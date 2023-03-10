import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import authAdminService from "services/auth/admin";
import settingsService from "services/settings";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const SettingsForm = (props) => {
  const { mode = ADD, param } = props;
  const history = useHistory();
  const [form] = Form.useForm();
  console.log(mode);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [settings, setSettings] = useState({})
const[setmode,setMode]=useState('')
  useEffect(()=>{
    const getSettings = async () => {

      const data = await settingsService.getSettings()
      if (data) {
        // const isEmpty = Object.keys(data).length === 0;
       
    
          setMode(EDIT)

        const codDeliveryCharges =
          data.deliveryCharges.find((charge) => charge.paymentType === 'Cod')
            ?.values || [];

        const onlineDeliveryCharges =
          data.deliveryCharges.find((charge) => charge.paymentType === 'Online')
            ?.values || [];

        form.setFieldsValue({
          name: data.name,
          address: data.address,
          email: data.email,
          phone: data.phone,
          facebookUrl: data.facebookUrl,
          instagramUrl: data.instagramUrl,
          twitterUrl: data.twitterUrl,
          vendorCommission: data.vendorCommission,
          codDeliveryCharges: codDeliveryCharges,
          onlineDeliveryCharges: onlineDeliveryCharges,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          keywords: data.keywords,
          whatsappNo: data.whatsappNo,
          razorPayPayoutAccountNumber: data.razorPayPayoutAccountNumber,
          agreement: data.agreement,
          footer: data.footer,
          tdsPercentage: data.tdsPercentage,
          vendorDeliveryCharges: data.vendorDeliveryCharges,
        });

        setSettings(data);
        console.log(data, 'settings-settings');
      } else {
        setMode(ADD);
      }
    }
  
    getSettings()
  
  },[])

  // Trigger When Submit Button pressed
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        // const deliveryCharges={
        //   startAmount:values?.startAmount,
        //   endAmount:values?.endAmount,
        //   charge:values?.charge
        // }

        const codDeliveryCharges = {
          paymentType: 'Cod',
          values: values?.codDeliveryCharges || []
        };

        const onlineDeliveryCharges = {
          paymentType: 'Online',
          values: values?.onlineDeliveryCharges || []
        };
        
        const sendingValues =
        {
          name: values?.name,
          address: values?.address,
          email: values?.email,
          phone: values?.phone,
          keywords:values?.keywords,
          metaTitle:values?.metaTitle,
          metaDescription:values?.metaDescription,
          facebookUrl: values?.facebookUrl,
          instagramUrl: values?.instagramUrl,
          twitterUrl: values?.twitterUrl,
          vendorCommission: values?.vendorCommission,
          deliveryCharges: [codDeliveryCharges, onlineDeliveryCharges],
          whatsappNo: values?.whatsappNo,
          razorPayPayoutAccountNumber: values?.razorPayPayoutAccountNumber,
          agreement: values?.agreement,
          footer: values?.footer,
          tdsPercentage: values?.tdsPercentage,
          vendorDeliveryCharges: values?.vendorDeliveryCharges
        };




        if (setmode === 'Add') {
            console.log(sendingValues, "values");

          const created = await settingsService.createSettings(sendingValues);
          if (created) {
            console.log(created);
            message.success(`Created New Settings`);
            // history.goBack();
          }
        }
        if (setmode === 'Edit') {

          const edited = await settingsService.editSettings(
            param.id,
            values
          )
          if (edited) {
            message.success(`Edited settings list`)
            // history.goBack()
          }
        }
        setSubmitLoading(false)
      })
      .catch((info) => {
        setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  return (
    <>
      <Form
       
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          deliveryCharges: [
            {
              startAmount: '',
              endAmount: '',
              charge:''
            },
          ],
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {setmode === "ADD" ? "Add New settings" : `Edit settings`}{" "}
              </h2>
              <div className="mb-3">
                {/* <Button
                  className="mr-2"
                  onClick={() =>
                    history.push("/app/dashboards/settings/edit-settings/user-list")
                  }
                >
                  Discard
                </Button> */}
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {setmode === "ADD" ? "Add" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="General" key="1">
              <GeneralField form={form} mode={setmode}  />
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default SettingsForm;
