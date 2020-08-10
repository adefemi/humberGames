import Axios from "axios";
import { checkExpiration, updateExpiration } from "./helper";
import jwtDecode from "jwt-decode"
import { routeToLogin } from "../components/mainLayout/mainLayout";

export const axiosHandler = ({
  method = "",
  url = "",
  token = null,
  clientID = null,
  data = {},
  extra = null
}) => {
  let methodType = method.toUpperCase();
  if (
    ["GET", "POST", "PATCH", "PUT", "DELETE"].includes(methodType) ||
    {}.toString(data) !== "[object Object]"
  ) {
    let axiosProps = { method: methodType, url, data };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }
    if (clientID) {
      axiosProps.headers = { ...axiosProps.headers, "client-id": clientID };
    }
    if (extra) {
      axiosProps.headers = { ...axiosProps.headers, ...extra };
    }
    checkExpiration();
    updateExpiration();
    if(token){
      try{
        var decoded = jwtDecode(token);
        if(!checkExpiration(decoded.exp)){
          // routeToLogin()
        }
      }
      catch (e){
        routeToLogin()
      }
    }
    return Axios(axiosProps);
  } else {
    alert(`method ${methodType} is not accepted or data is not an object`);
  }
};

export const testToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg1MzkxNjUzLCJqdGkiOiI1YTU1Y2QyODQ4MmU0Nzk3YjYzYzQ0NDdlMjE0Mjg4NiIsInVzZXJfaWQiOjE0fQ.lGwJduA36I5zJCknQ2DveGDvfSEioHOSuf6FXBhxZyw";
