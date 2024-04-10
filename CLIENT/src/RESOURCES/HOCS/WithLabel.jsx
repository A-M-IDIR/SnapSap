import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const StyledLabel = styled.p`
  position: absolute;
  left: 50%;
  top: ${(props) => (props.isBottom ? "30px" : "-30px")};
  transform: translate(-50%, 0);
  z-index: 100;

  min-width: max-content;
  padding: 0.2rem 0.4rem;

  background-color: rgb(20, 20, 80) !important;
  color: white !important;
  border-radius: 0.2rem;

  font-size: 0.6rem !important;

  pointer-events: none;
`;

const StyledHolder = styled.div`
  position: relative;
  z-index: 100;
`;

function WithLabel({ children, label, labelStyle, style, isBottom }) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <StyledHolder
      style={style}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <>{children}</>

      <AnimatePresence>
        {isHover && (
          <StyledLabel
            as={motion.p}
            initial={{ x: "-50%", y: -5, opacity: 0 }}
            animate={{
              x: "-50%",
              y: 0,
              opacity: 1,
              transition: { ease: [0.8, 0, 0, 1], duration: 0.3 },
            }}
            exit={{
              x: "-50%",
              y: -5,
              opacity: 0,
              transition: { ease: [0.8, 0, 0, 1], duration: 0.1 },
            }}
            style={labelStyle}
            isBottom={isBottom}
          >
            {label}
          </StyledLabel>
        )}
      </AnimatePresence>
    </StyledHolder>
  );
}

export default WithLabel;
