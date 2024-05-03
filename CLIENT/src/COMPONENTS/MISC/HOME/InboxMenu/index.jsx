import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import Inbox from "./Inbox";

import UseResize from "@/RESOURCES/HOOKS/SHARED/UseResize";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";

import C from "./style.module.scss";

function InboxMenu({ sizeBreak, style, inboxes, setInboxes, setIsDropMenu }) {
  const $ref = React.useRef(null);

  const { windowWidth, windowHeight } = UseResize();

  React.useEffect(() => {
    if ($ref) {
      window.addEventListener("mousemove", () => $ref.current?.focus());

      return () => {
        window.removeEventListener("mousemove", () => $ref.current?.focus());
      };
    }
  }, [$ref]);

  return (
    <>
      {windowWidth && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: windowWidth <= 600 ? windowHeight - 55 : "320px",
            transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0 },
          }}
          exit={{
            opacity: 1,
            height: "0",
            transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.2 },
          }}
          className={C.InboxMenu}
          style={windowWidth > sizeBreak ? style : { width: windowWidth - 59 }}
          ref={$ref}
          tabIndex={0}
          onBlur={() => {
            if (windowWidth > 600) setIsDropMenu(false);
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-100%)" }}
            animate={{
              opacity: 1,
              transform: "translateY(0)",
              transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.2 },
            }}
            exit={{
              opacity: 0,
              transform: "translateY(-100%)",
              transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.1 },
            }}
            className={C.Header}
          >
            <aside>
              <div className={C.Icon}>{SvgHandler.Inbox()}</div>

              <p className={C.Label}>INBOX</p>
            </aside>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: "translateY(-10px)" }}
            animate={{
              opacity: 1,
              transform: "translateY(0)",
              transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0.3 },
            }}
            exit={{
              opacity: 0,
              transform: "translateY(-10px)",
              transition: { duration: 0.4, ease: [0.8, 0, 0, 1], delay: 0 },
            }}
            className={C.Content}
          >
            <AnimatePresence mode="wait">
              {inboxes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={C.Image}
                  key={"EMPTY"}
                >
                  {SvgHandler.EmptyInbox({ width: "60px" })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  key={"INBOXES"}
                >
                  <AnimatePresence mode="sync">
                    {inboxes.map((e, i) => (
                      <Inbox
                        {...e}
                        key={e._id}
                        index={i}
                        setInboxes={setInboxes}
                        inboxes={inboxes}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default InboxMenu;
