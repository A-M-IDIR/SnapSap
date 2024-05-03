import React from "react";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { TokenHandler } from "@/RESOURCES/HANDLERS/TokenHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

function WithAuth({ children }) {
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);

  /******************** REQUESTS ********************/
  const authUserMutation = UseRequest({
    onSuccess: () => {
      if (
        !location.pathname.includes("home") &&
        !location.pathname.includes("project")
      ) {
        navigate("/home?section=projects");
      }

      setLoading(false);
    },
    onError: () => {
      TokenHandler.clearToken();
      navigate("/auth?section=login");
    },
  });

  const verifyUserMutation = UseRequest({
    onSuccess: () => {
      AlertHandler({
        dispatch,
        message: "Verified !",
        type: "success",
        duration: 1,
      });
      navigate("/auth?section=login");
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
      navigate("/auth?section=login");
    },
    isPublic: true,
  });
  /******************** REQUESTS ********************/

  React.useEffect(() => {
    if (urlParams.get("otp")) {
      verifyUserMutation.mutate({
        route: "user/verify",
        method: "POST",
        load: {
          userId: urlParams.get("user"),
          code: urlParams.get("otp"),
        },
      });

      return;
    }

    const token = TokenHandler.getToken();
    const user = localStorage.getItem("user");

    if (!token || !user) {
      TokenHandler.clearToken();
      localStorage.removeItem("user");
      if (!location.pathname.includes("auth")) navigate("/auth?section=login");

      setLoading(false);
      return;
    }

    authUserMutation.mutate({
      route: "user",
      method: "GET",
    });
  }, [urlParams.get("section"), urlParams.get("otp")]);

  return <>{!loading && children}</>;
}

export default WithAuth;
