import {
  reloadApplication,
  setGlobalLoader,
  setRoles,
  setUserDetails
} from "../actions";

export const userDetailsState = {
  userDetails: {}
};
export const rolesState = {
  roles: []
};
export const reloadApplicationState = {
  reloadApplicationStatus: false
};
export const globalLoaderState = {
  globalLoader: {
    status: false,
    content: ""
  }
};

export const userDetailReducer = (state, action) => {
  if (action.type === setUserDetails) {
    return {
      ...state,
      userDetails: action.payload
    };
  } else {
    return state;
  }
};

export const userRolesReducer = (state, action) => {
  if (action.type === setRoles) {
    return {
      ...state,
      roles: action.payload
    };
  } else {
    return state;
  }
};

export const reloadApplicationReducer = (state, action) => {
  if (action.type === reloadApplication) {
    return {
      ...state,
      reloadApplicationStatus: action.payload
    };
  } else {
    return state;
  }
};

export const globalLoaderReducer = (state, action) => {
  if (action.type === setGlobalLoader) {
    return {
      ...state,
      globalLoader: action.payload
    };
  } else {
    return state;
  }
};
