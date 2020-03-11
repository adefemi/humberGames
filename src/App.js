import React from "react";
import RouterMain from "./router";
import { StateProvider } from "./stateManagement/store";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <StateProvider>
        <RouterMain />
      </StateProvider>
    </CookiesProvider>
  );
}

export default App;
