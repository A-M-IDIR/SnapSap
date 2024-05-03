import React from "react";

import { useDispatch } from "react-redux";

import AlertHandler from "../HANDLERS/AlertHandler";
import UseResize from "../HOOKS/SHARED/UseResize";

function WithMobileWarning({ children }) {
  const dispatch = useDispatch();
  const { windowWidth } = UseResize();

  React.useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if ((windowWidth && windowWidth < 480) || isMobile) {
      AlertHandler({
        dispatch,
        message: "This App Is Designed For Desktop Use.",
        type: "warning",
        duration: 4,
      });
    }
  }, []);

  return <>{children}</>;
}

export default WithMobileWarning;
