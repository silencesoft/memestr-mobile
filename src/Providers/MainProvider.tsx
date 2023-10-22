import React, { Suspense } from "react";

import ThemeProvider from "./ThemeProvider";
import RouteProvider from "./RouteProvider";
import StateProvider from "./StateProvider";

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <ThemeProvider>
        <RouteProvider>{children}</RouteProvider>
      </ThemeProvider>
    </StateProvider>
  );
};

export default MainProvider;
