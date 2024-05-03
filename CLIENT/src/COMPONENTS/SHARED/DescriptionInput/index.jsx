import React from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import WithInput from "@/RESOURCES/HOCS/WithInput";

import C from "./style.module.scss";

function DescriptionInput({ description, onChange, style, disabled }) {
  const [descriptionValue, setDescriptionValue] = React.useState(description);
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    setRendered(true);
  }, []);

  React.useEffect(() => {
    if (rendered) onChange(descriptionValue);
  }, [descriptionValue]);

  return (
    <WithInput
      Input={QuillInput}
      content={descriptionValue}
      setContent={setDescriptionValue}
      disabled={disabled}
    >
      {descriptionValue && descriptionValue != "" ? (
        <div
          className={C.DescriptionContent}
          dangerouslySetInnerHTML={{ __html: descriptionValue }}
          style={style}
        ></div>
      ) : (
        <p className={C.EmptyDescription} style={style}>
          📝 <span style={{ margin: "0.2rem" }}></span> UMM...
        </p>
      )}
    </WithInput>
  );
}

const QuillInput = ({ className, placeholder, defaultValue, onChange }) => {
  const $editorContRef = React.useRef();
  const $editorRef = React.useRef();
  const initialValueRef = React.useRef(defaultValue || "");

  React.useLayoutEffect(() => {
    let quill = new Quill($editorRef.current, { placeholder, ...quillConfig });

    const insertInitialValue = () => {
      quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
      quill.blur();
    };
    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () =>
      $editorContRef.current.querySelector(".ql-editor").innerHTML;

    insertInitialValue();

    quill.on("text-change", handleContentsChange);
    return () => {
      quill.off("text-change", handleContentsChange);
      quill = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const quillConfig = {
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, false] }],
        [{ color: [] }, { background: [] }],
      ],
    },
  };

  return (
    <div className={className} ref={$editorContRef}>
      <div ref={$editorRef} />
    </div>
  );
};

export default DescriptionInput;
