import React, { createContext, useReducer } from "react";
import { pageTitleReducer, stateData } from "./reducers/pageTitleReducer";
import {
  propertyPageData,
  propertyPageReducer
} from "./reducers/propertyPageReducer";

const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );

const combinedReducers = reduceReducers(pageTitleReducer, propertyPageReducer);

const initialState = {
  ...stateData,
  ...propertyPageData
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
