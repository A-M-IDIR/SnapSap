import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import propTypes from "prop-types";

const getPositionStyles = (position) => {
  const styles = {
    justifyContent: "",
    alignItems: "",
  };

  if (position.x === "center") {
    styles.justifyContent = "center";
  } else if (position.x === "bottom") {
    styles.justifyContent = "flex-end";
  }

  if (position.y === "center") {
    styles.alignItems = "center";
  } else if (position.y === "bottom") {
    styles.alignItems = "flex-end";
  }

  return styles;
};

const StyledPopUp = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;

  display: flex;
  justify-content: ${(props) =>
    getPositionStyles(props.position).justifyContent};
  align-items: ${(props) => getPositionStyles(props.position).alignItems};

  width: 100dvw;
  height: 100dvh;

  pointer-events: none;
`;

const StyledBackDrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 400;

  width: 100dvw;
  height: 100dvh;

  background-color: black;
  opacity: 0.2;

  cursor: initial;
`;

function WithPopUp(props) {
  const { children, position, PopElement, ...rest } = props;

  const [isPopUp, setIsPopUp] = React.useState(false);

  const handleClick = () => {
    setIsPopUp(true);
  };

  return (
    <>
      <div onClick={handleClick} {...rest}>
        {children}
      </div>

      <AnimatePresence>
        {isPopUp && (
          <>
            <StyledPopUp
              position={position}
              as={motion.div}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              key={"POP-UP"}
            >
              <PopElement popUp={setIsPopUp} />
            </StyledPopUp>

            <StyledBackDrop
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              onMouseDown={() => setIsPopUp(false)}
            ></StyledBackDrop>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

WithPopUp.defaultProps = {
  position: { x: "", y: "" },
  PopElement: () => <></>,
};

WithPopUp.propTypes = {
  children: propTypes.element,
  position: propTypes.shape({ x: propTypes.string, y: propTypes.string }),
  PopElement: propTypes.func,
};

export default WithPopUp;
