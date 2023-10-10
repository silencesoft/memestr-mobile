import React from "react";

import MainProvider from "src/Providers/MainProvider";
import MainNavigator from "src/navigation/MainNavigator";

export default function App() {
  return (
    <MainProvider>
      <MainNavigator />
    </MainProvider>
  );
}
