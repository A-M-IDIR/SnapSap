import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";

const StyledView = styled.div`
  .ViewContent {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    overflow: auto;

    display: grid;

    width: 100dvw;
    height: 100dvh;
    max-height: 100dvh;

    pointer-events: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .BackDrop {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 450;

    width: 100dvw;
    height: 100dvh;

    background-color: black;
    opacity: 0.2;
  }
`;

function WithView({ children, viewKey, style }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(QueryParamHandler.RemoveParam(viewKey));
  };

  return (
    <AnimatePresence>
      {QueryParamHandler.GetParam(viewKey) && (
        <StyledView>
          <motion.div
            className="ViewContent"
            initial={{ opacity: 0, transform: "translateY(-5px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-5px)" }}
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            style={style}
          >
            {children}
          </motion.div>

          <motion.div
            className="BackDrop"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </StyledView>
      )}
    </AnimatePresence>
  );
}

export default WithView;
