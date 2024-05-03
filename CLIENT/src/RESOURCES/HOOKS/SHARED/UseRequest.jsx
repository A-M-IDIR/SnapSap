import axios from "axios";
import { useMutation } from "react-query";
import { TokenHandler } from "@/RESOURCES/HANDLERS/TokenHandler";

function UseRequest({ onSuccess, onError, isPublic }) {
  const mutation = useMutation(
    isPublic ? handlePublicRequest : handlePrivateRequest,
    {
      onSuccess,
      onError,
    }
  );

  return mutation;
}

const handlePrivateRequest = async ({ route, load, method }) => {
  try {
    const result = await axios({
      method: method,
      url: `${import.meta.env.VITE_SERVER_URL}/${route}`,
      data: load,
      headers: { Authorization: `Bearer ${TokenHandler.getToken()}` },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const handlePublicRequest = async ({ route, load, method }) => {
  try {
    const result = await axios({
      method: method,
      url: `${import.meta.env.VITE_SERVER_URL}/${route}`,
      data: load,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export default UseRequest;
