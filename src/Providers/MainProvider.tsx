import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native-paper";

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
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <RouteProvider>{children}</RouteProvider>
        </Suspense>
      </ThemeProvider>
    </StateProvider>
  );
};

export default MainProvider;
