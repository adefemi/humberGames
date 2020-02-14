import React, { createContext, useReducer } from "react";
import { pageTitleReducer, stateData } from "./reducers/pageTitleReducer";

const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );

const combinedReducers = reduceReducers(pageTitleReducer);

const initialState = {
  ...stateData
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
