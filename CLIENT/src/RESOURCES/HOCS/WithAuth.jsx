import React from "react";

import axios from "axios";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { TokenHandler } from "../HANDLERS/TokenHandler";

function WithAuth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const handleVerifyUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const { mutate } = useMutation(handleVerifyUser, {
    onSuccess: () => {
      if (
        !location.pathname.includes("home") &&
        !location.pathname.includes("project")
      ) {
        navigate("/home?section=projects");
      }
    },
    onError: () => {
      TokenHandler.clearToken();
      navigate("/auth?section=login");
    },
  });

  React.useEffect(() => {
    const token = TokenHandler.getToken();

    if (!token) {
      TokenHandler.clearToken();
      if (!location.pathname.includes("auth")) navigate("/auth?section=login");

      return;
    }

    mutate(token);
  }, [urlParams.get("section")]);

  return <>{children}</>;
}

export default WithAuth;
