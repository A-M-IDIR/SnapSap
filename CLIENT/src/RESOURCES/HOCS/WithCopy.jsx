import React from "react";

import { useDispatch } from "react-redux";
import { setAlert } from "@/CONTEXT/SHARED/AlertSlice";

function WithCopy({ children, content }) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(
          setAlert({
            type: "success",
            message: "Copied !",
            duration: 1,
          })
        );

        navigator.clipboard.writeText(content);
      }}
    >
      {children}
    </div>
  );
}

export default WithCopy;
