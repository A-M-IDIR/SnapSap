import React from "react";

import { useDispatch } from "react-redux";

import { setAlert } from "@/CONTEXT/SHARED/AlertSlice";

function WithCopy({ children, content, ...rest }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setAlert({
        type: "success",
        message: "Copied !",
        duration: 1,
      })
    );

    navigator.clipboard.writeText(content);
  };

  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
}

export default WithCopy;
