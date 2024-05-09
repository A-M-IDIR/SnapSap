import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

function WithInput({ children, Input, content, setContent, disabled }) {
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
          onClick={() => {
            if (!disabled) setIsInput(true);
          }}
          key={"CONTENT"}
        >
          {children}
        </motion.div>
      ) : (
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.div
            style={{ wordBreak: "break-word" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.2 }}
            key={"INPUT"}
          >
            <Input defaultValue={value} onChange={setValue} />
          </motion.div>

          <motion.div
            style={{ display: "flex", gap: "0.5rem" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ ease: [0.8, 0, 0, 1], duration: 0.2, delay: 0.1 }}
            key={"INPUT_BUTTONS"}
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
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
              onClick={(e) => {
                e.preventDefault();
                setIsInput(false);
                setValue(content);
              }}
              style={{ height: "30px" }}
              theme={buttonThemes.LightGray}
              label="CANCEL"
            />
          </motion.div>
        </form>
      )}
    </AnimatePresence>
  );
}

export default WithInput;
