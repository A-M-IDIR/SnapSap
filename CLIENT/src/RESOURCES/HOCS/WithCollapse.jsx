import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import WithLabel from "@/RESOURCES/HOCS/WithLabel";

const StyledCollapse = styled.div`
  .Controller {
    position: relative;

    width: 100%;
    min-height: 6px;
    margin: 2rem 0;

    border-top: 1.5px solid rgb(245, 245, 245);
    border-bottom: 1.5px solid rgb(245, 245, 245);
  }
`;

function WithCollapse({ children, containerRef, elements }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    if (open) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (elements.length > 1) {
      setOpen(!open);
    }
  };

  return (
    <StyledCollapse>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        exit={{ opacity: 0 }}
        className="Controller"
      >
        <WithLabel
          isBottom={true}
          label={open ? "COLLAPSE" : "EXPAND"}
          labelStyle={{ top: "20px" }}
        >
          <Button
            icon={SvgHandler.ArrowsFromLine({ width: "12px" })}
            theme={open ? buttonThemes.LightGray : buttonThemes.Blue}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: "30px",
              height: "24px",
            }}
            onMouseUp={handleClick}
          />
        </WithLabel>
      </motion.div>

      {React.cloneElement(children, { open })}
    </StyledCollapse>
  );
}

export default WithCollapse;
