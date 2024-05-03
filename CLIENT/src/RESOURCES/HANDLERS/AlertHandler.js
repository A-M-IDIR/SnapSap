import { setAlert } from "@/CONTEXT/SHARED/AlertSlice";

export default function AlertHandler({
  dispatch,
  error,
  message,
  type,
  duration,
}) {
  if (!error) {
    dispatch(
      setAlert({
        type: type ? type : "error",
        message,
        duration: duration ? duration : 1,
      })
    );

    return;
  }

  const errors = error.response.data.errors;

  errors.forEach((err) => {
    dispatch(
      setAlert({
        type: "error",
        message: err.msg,
        duration: duration ? duration : 1,
      })
    );
  });
}
