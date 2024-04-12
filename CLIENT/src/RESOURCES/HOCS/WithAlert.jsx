import React from "react";

import { notification, message } from "antd";
import { useSelector } from "react-redux";

function WithAlert({ children }) {
  const alert = useSelector((state) => state.alertSlice.value);

  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = (type, message) => {
  //   const config = {
  //     message: message,
  //     size: "small",
  //     placement: "left",
  //     maxCount: 3,
  //     style: {
  //       userSelect: "none",
  //       padding: "1rem",
  //     },
  //   };

  //   if (type == "success") {
  //     api.success(config);
  //   } else {
  //     api.error(config);
  //   }
  // };

  // if (error) {
  //   throw error;
  // }

  // React.useEffect(() => {
  //   if (alert) {
  //     openNotification(alert.type, alert.message);
  //   }
  // }, [alert]);

  const [messageApi, contextHolder] = message.useMessage();

  const openNotification = (type, content, duration) => {
    const config = {
      type,
      content,
      duration,
    };

    messageApi.open(config);
  };

  React.useEffect(() => {
    if (alert) {
      openNotification(alert.type, alert.message, alert.duration);
    }
  }, [alert]);

  return (
    <>
      <>{children}</>

      <>{contextHolder}</>
    </>
  );
}

export default WithAlert;
