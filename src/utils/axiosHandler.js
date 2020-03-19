import Axios from "axios";

export const axiosHandler = (method = "", url = "", token = "", data = {}) => {
  let methodType = method.toUpperCase();
  if (
    ["GET", "POST", "PATCH", "DELETE"].includes(methodType) ||
    {}.toString(data) !== "[object Object]"
  ) {
    let axiosProps = { method: methodType, url, data };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }
    return Axios(axiosProps);
  } else {
    alert(`method ${methodType} is not accepted or data is not an object`);
  }
};

export const testToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1MDU3MjMyLCJqdGkiOiI1OWQ3NDE3MDYwZGI0YzcyOWJhODI5MzI2ODdlYjMzZCIsInVzZXJfaWQiOjE0fQ.mpcltcNEPX5wHWGiFrfj3eWlAsgzzvwpChlvOOBV2O0";
