import { useMutation } from "react-query";
import axios from "axios";

import { TokenHandler } from "../HANDLERS/TokenHandler";

const handlePrivateRequest = async ({ route, load, method }) => {
  try {
    const result = await axios({
      method: method,
      url: `http://localhost:5000/${route}`,
      data: load,
      headers: { Authorization: `Bearer ${TokenHandler.getToken()}` },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

function UseRequest({ onSuccess, onError }) {
  const mutation = useMutation(handlePrivateRequest, {
    onSuccess,
    onError,
  });

  return mutation;
}

export default UseRequest;
