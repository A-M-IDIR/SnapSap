import React from "react";

import { AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Login from "@/COMPONENTS/MISC/AUTH/Login";
import Register from "@/COMPONENTS/MISC/AUTH/Register";
import BackGround from "@/COMPONENTS/MISC/AUTH/BackGround";

const StyledAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100dvw;
  height: 100dvh;

  span {
    margin: 0 0.5rem;
  }
`;

function Auth() {
  const [section, setSection] = React.useState(null);

  const sections = {
    login: <Login key={"LOGIN"} />,
    register: <Register key={"REGISTER"} />,
  };

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    if (!queryParams.get("section")) {
      navigate("/auth?section=login");

      return;
    }

    setSection(queryParams.get("section"));
  }, [queryParams.get("section")]);

  return (
    <StyledAuth>
      <AnimatePresence mode="wait">{sections[section]}</AnimatePresence>

      <BackGround />
    </StyledAuth>
  );
}

export default Auth;
