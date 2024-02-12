import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import propTypes from "prop-types";

import UseResize from "@/RESOURCES/HOOKS/UseResize";

const BackDrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 400;

  width: 100dvw;
  height: 100dvh;

  background-color: blue;
  opacity: 0.03;

  cursor: pointer;
`;

function WithDropMenu(props) {
  const { children, DropMenu, withBackDrop } = props;

  const [isDropMenu, setIsDropMenu] = React.useState(false);

  const { windowWidth } = UseResize();

  return (
    <div
      style={{
        position: "relative",
        width: "max-content",
      }}
    >
      <div onClick={() => setIsDropMenu(!isDropMenu)}>{children}</div>

      {isDropMenu && (
        <>
          {DropMenu({ windowWidth, setIsDropMenu })}

          {withBackDrop && (
            <BackDrop
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.02 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDropMenu(false)}
            ></BackDrop>
          )}
        </>
      )}
    </div>
  );
}

WithDropMenu.defaultProps = {
  DropMenu: () => <></>,
  withBackDrop: false,
};

WithDropMenu.propTypes = {
  children: propTypes.element.isRequired,
  DropMenu: propTypes.func,
  withBackDrop: propTypes.bool,
};

export default WithDropMenu;
