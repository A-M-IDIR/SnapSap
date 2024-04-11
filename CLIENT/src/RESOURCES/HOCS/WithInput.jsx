import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "../../COMPONENTS/SHARED/Button";

function WithInput({ children, Input, content, setContent }) {
  const [isInput, setIsInput] = React.useState(false);
  const [value, setValue] = React.useState(content);

  return (
    <AnimatePresence mode="wait">
      {!isInput ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ ease: [0.8, 0, 0, 1], duration: 0.2 }}
          onClick={() => setIsInput(true)}
          key={"CONTENT"}
        >
          {children}
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.2 }}
            key={"INPUT"}
            style={{ wordBreak: "break-word" }}
          >
            <Input
              placeholder=""
              defaultValue={value}
              onChange={setValue}
              getEditor={() => {}}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.2, delay: 0.1 }}
            key={"INPUT_BUTTONS"}
            style={{ display: "flex", gap: "0.5rem" }}
          >
            <Button
              onClick={() => {
                setIsInput(false);
                if (value === "<p><br></p>") {
                  setContent("");
                  return;
                }
                setContent(value);
              }}
              style={{ height: "30px" }}
              label="SAVE"
            />

            <Button
              onClick={() => {
                setIsInput(false);
                setValue(content);
              }}
              style={{ height: "30px" }}
              theme={buttonThemes.LightGray}
              label="CANCLE"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default WithInput;
