import React from "react";
import RouterMain from "./router";
import { StateProvider } from "./stateManagement/store";
import { CookiesProvider } from "react-cookie";

function App() {
<<<<<<< US-merging-notification
  return (
    <CookiesProvider>
      <StateProvider>
        <RouterMain />
      </StateProvider>
    </CookiesProvider>
  );
=======
  return <RouterMain />;
>>>>>>> local
}

export default App;
