import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { AuthLayout } from "@/COMPONENTS/LAYOUT/AuthLayout";

const StyledAuth = styled.div`
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100dvw;
  height: 100dvh;

  &::-webkit-scrollbar {
    display: none;
  }

  span {
    margin: 0 0.5rem;
  }
`;

function Auth() {
  const [section, setSection] = React.useState(null);

  const sections = {
    login: <AuthLayout.LoginSkeleton />,
    register: <AuthLayout.SignUpSkeleton />,
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
      {sections[section]}

      <AuthLayout.BackGroundSkeleton />
    </StyledAuth>
  );
}

export default Auth;
