import React from "react";

import ThemeProvider from "./ThemeProvider";
import RouteProvider from "./RouteProvider";

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <RouteProvider>{children}</RouteProvider>
    </ThemeProvider>
  );
};

export default MainProvider;
