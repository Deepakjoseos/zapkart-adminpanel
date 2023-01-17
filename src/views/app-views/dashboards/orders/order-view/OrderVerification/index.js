import { Button, Card, Drawer, message, Steps } from "antd";
import React, { useState } from "react";
import "./index.css";
import GenerateInvoice from "./GenerateInvoice";
import Prescription from "./Prescription";
import Shipment from "./Shipment";
import Result from "./Result";

const OrderVerification = ({
  open,
  setOpen,
  products,
  orderId,
  orderNo,
  reFetchOrderData,
  prescriptions,
  vendorInvoices,
  orderStatus,
  userId,
}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
    reFetchOrderData();
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Prescription",
      content: (
        <Prescription
          products={products?.filter(
            (prod) =>
              prod.prescriptionRequired &&
              (prod.status === "Verifying Prescription" ||
                prod.status === "Prescriptions Missing")
          )}
          orderId={orderId}
          userId={userId}
          reFetchOrderData={reFetchOrderData}
          prescriptions={prescriptions}
          next={next}
          orderStatus={orderStatus}
        />
      ),
    },
    {
      title: "Shipment",
      content: (
        <Shipment
          products={products?.filter(
            (prod) => prod.status === "Confirmed" && !prod.shipmentId
          )}
          shipmentAvailableProducts={products?.filter(
            (prod) => prod.shipmentId
          )}
          orderNo={orderNo}
          next={next}
          orderId={orderId}
          reFetchOrderData={reFetchOrderData}
        />
      ),
    },
    {
      title: "GenerateInvoice",
      content: (
        <GenerateInvoice
          orderId={orderId}
          next={next}
          reFetchOrderData={reFetchOrderData}
          items={products}
        />
      ),
    },
    {
      title: "Results",
      content: (
        <Result
          orderId={orderId}
          reFetchOrderData={reFetchOrderData}
          products={products}
          vendorInvoices={vendorInvoices}
        />
      ),
    },
  ];
  // console.log(products, "shipment");
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const { Step } = Steps;

  return (
    <>
      <Drawer
        title="Order Informations"
        width={"100%"}
        onClose={() => {
          setOpen(false);
        }}
        visible={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Card>{steps[current].content}</Card>
        </div>
        <div className="steps-action">
          {/* {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )} */}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}

          {current < steps.length - 1 && (
            <Button
              type="primary"
              disabled={
                current === 1 &&
                products?.filter((prod) => prod.shipmentId)?.length === 0
              }
              onClick={() => next()}
            >
              Next
            </Button>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default OrderVerification;
