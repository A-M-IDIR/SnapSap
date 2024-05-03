import React from "react";

import { useSelector } from "react-redux";
import { message } from "antd";

function WithAlert({ children }) {
  const alert = useSelector((state) => state.alertSlice.value);

  const [messageApi, contextHolder] = message.useMessage();

  const openNotification = (type, content, duration, style) => {
    const config = {
      type,
      content,
      duration,
      style,
    };

    messageApi.open(config);
  };

  React.useEffect(() => {
    if (alert) {
      openNotification(alert.type, alert.message, alert.duration, alert.style);
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
