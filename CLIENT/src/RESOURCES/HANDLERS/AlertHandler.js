import { setAlert } from "@/CONTEXT/SHARED/AlertSlice";

export default function AlertHandler(dispatch, errorMessage, type, duration) {
  dispatch(
    setAlert({
      type: type ? type : "error",
      message: errorMessage,
      duration: duration ? duration : 0.8,
    })
  );
}
