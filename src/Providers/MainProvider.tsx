import React, { Suspense } from "react";

import ThemeProvider from "./ThemeProvider";
import RouteProvider from "./RouteProvider";
import StateProvider from "./StateProvider";
import GestureProvider from "./GestureProvider";

type Props = {
  children: JSX.Element;
};

const MainProvider = ({ children }: Props) => {
  return (
    <StateProvider>
      <ThemeProvider>
        <GestureProvider>
          <RouteProvider>{children}</RouteProvider>
        </GestureProvider>
      </ThemeProvider>
    </StateProvider>
  );
};

export default MainProvider;
