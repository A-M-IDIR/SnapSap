import React from "react";

import styled from "styled-components";
import propTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

import UseResize from "@/RESOURCES/HOOKS/SHARED/UseResize";

const BackDrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 400;

  width: 100dvw;
  height: 100dvh;

  background-color: blue;
`;

function WithDropMenu({ children, DropMenu, withBackDrop, backDropOpacity }) {
  const [isDropMenu, setIsDropMenu] = React.useState(false);

  const { windowWidth } = UseResize();

  return (
    <div
      style={{
        position: "relative",
        width: "max-content",
      }}
    >
      <div
        style={{ position: "relative" }}
        onMouseDown={() => setIsDropMenu(!isDropMenu)}
      >
        {children}
      </div>

      <AnimatePresence mode="wait">
        {isDropMenu && (
          <>
            {DropMenu({ windowWidth, setIsDropMenu })}

            {withBackDrop && (
              <BackDrop
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: backDropOpacity != null ? backDropOpacity : 0.02,
                }}
                exit={{ opacity: 0 }}
                onMouseDown={() => setIsDropMenu(false)}
              ></BackDrop>
            )}
          </>
        )}
      </AnimatePresence>
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
  backDropOpacity: propTypes.number,
};

export default WithDropMenu;
