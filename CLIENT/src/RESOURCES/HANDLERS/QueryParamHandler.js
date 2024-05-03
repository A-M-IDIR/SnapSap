export const QueryParamHandler = {
  GetParam,
  UpdateParam,
  RemoveParam,
};

function GetParam(paramKey) {
  const queryParams = new URLSearchParams(location.search);

  return queryParams.get(paramKey);
}

function RemoveParam(paramKey) {
  const queryString = location.search;

  const paramsArray = queryString.substring(1).split("&");

  const filteredParams = paramsArray.filter((param) => {
    const [key] = param.split("=");
    return key !== paramKey;
  });

  const newQueryString = "?" + filteredParams.join("&");

  return newQueryString;
}

function UpdateParam(paramKey, newParamValue) {
  const queryString = location.search;

  const paramsArray = queryString.substring(1).split("&");

  let paramExists = false;

  const updatedParams = paramsArray.map((param) => {
    const [key, value] = param.split("=");
    if (key === paramKey) {
      paramExists = true;
      return `${key}=${newParamValue}`;
    }
    return param;
  });

  if (!paramExists) {
    updatedParams.push(`${paramKey}=${newParamValue}`);
  }

  const newQueryString = "?" + updatedParams.join("&");

  return newQueryString;
}
