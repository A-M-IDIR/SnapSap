import React from "react";

import { motion } from "framer-motion";

import C from "./style.module.scss";

const doesTextFit = (text, fontSize, textAreaWidth) => {
  const span = document.createElement("span");
  span.textContent = text;
  span.style.fontSize = fontSize + "rem";

  document.body.appendChild(span);

  const textWidth = span.offsetWidth;

  document.body.removeChild(span);

  return textWidth <= textAreaWidth;
};

function TextArea({ label, text, action, className }) {
  const [Text, setText] = React.useState(text);
  const [height, setHeight] = React.useState();
  const textareaRef = React.useRef(null);

  const handleChange = (event) => {
    const textarea = event.target;
    const previousHeight = textarea.style.height;

    textarea.style.height = "auto";

    setHeight(`${textarea.scrollHeight}px`);
    setText(textarea.value);
    action(textarea.value);

    if (previousHeight) {
      textarea.style.height = previousHeight;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      textareaRef.current.blur();
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    const fits = doesTextFit(
      textareaRef.current.value,
      "1.4",
      textareaRef.current.offsetWidth - 24
    );

    if (Text == "" || fits) {
      setHeight(`45px`);
    }
  }, [Text]);

  return (
    <div className={C.TextArea}>
      <motion.textarea
        initial={{ height: "45px" }}
        animate={{ height: height }}
        transition={{ ease: [0.8, 0, 0, 1], duration: 0.3 }}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={`${C.Box} ${className}`}
        value={Text}
        ref={textareaRef}
        placeholder={label}
      ></motion.textarea>
    </div>
  );
}

export default TextArea;
