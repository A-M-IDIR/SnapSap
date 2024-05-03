import React from "react";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

import LoginForm from "@/COMPONENTS/MISC/AUTH/LoginForm";
import RegisterForm from "@/COMPONENTS/MISC/AUTH/RegisterForm";
import Header from "@/COMPONENTS/MISC/AUTH/Header";
import Outline from "@/COMPONENTS/MISC/AUTH/Outline";
import DemoInfo from "@/COMPONENTS/MISC/AUTH/DemoInfo";
import Socials from "@/COMPONENTS/MISC/AUTH/Socials";
import ColorSwitch from "@/COMPONENTS/MISC/AUTH/ColorSwitch";

import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import WithParallax from "@/RESOURCES/HOCS/WithParallax";

const StyledAuth = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;

  display: grid;
  place-items: center;
  padding: 5rem 0;

  width: 100dvw;
  height: 100dvh;

  .FormHolder {
    display: flex;
    flex-direction: column;

    width: 90%;
    max-width: 1050px;
    height: 78%;
    max-height: 700px;

    background-color: rgb(250, 250, 250);
    border-radius: 0.3rem;

    .Content {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;

      .Holder {
        position: relative;

        width: 90%;
        max-width: 500px;
        height: max-content;
        padding: 10px;
      }
    }
  }
`;

function Auth() {
  const [section, setSection] = React.useState(null);

  const queryParams = new URLSearchParams(location.search);

  const sections = {
    login: <LoginForm key={"LOGIN"} />,
    register: <RegisterForm key={"REGISTER"} />,
  };

  React.useEffect(() => {
    if (!queryParams.get("section")) {
      navigate("/auth?section=login");

      return;
    }

    setSection(QueryParamHandler.GetParam("section"));
  }, [queryParams.get("section")]);

  return (
    <StyledAuth>
      <Helmet>{section && <title>{section.toUpperCase()}</title>}</Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          QueryParamHandler.GetParam("section") === "register"
            ? {
                maxWidth: "950px",
                minHeight: "650px",
                opacity: 1,
              }
            : {
                maxWidth: "920px",
                minHeight: "620px",
                opacity: 1,
              }
        }
        exit={{
          opacity: 0,
          transition: { delay: 0.4 },
        }}
        transition={{ ease: [0.8, 0, 0, 0.8], duration: 0.4 }}
        className={"FormHolder"}
      >
        <Header />

        <div className={"Content"}>
          <div className={"Holder"}>
            <WithParallax speed={2} reverse={true}>
              <AnimatePresence mode="wait">{sections[section]}</AnimatePresence>
            </WithParallax>

            <WithParallax speed={1} isAbsolute={true}>
              <Outline />
            </WithParallax>
          </div>

          <WithParallax speed={3} reverse={true} isAbsolute={true}>
            <DemoInfo />
          </WithParallax>

          <WithParallax speed={1} isAbsolute={true}>
            <Socials />
          </WithParallax>

          <WithParallax speed={1} isAbsolute={true}>
            <ColorSwitch />
          </WithParallax>
        </div>
      </motion.div>
    </StyledAuth>
  );
}

export default Auth;
