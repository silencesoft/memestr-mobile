import "react-native-gesture-handler";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import * as encoding from "text-encoding";
import { enableLegacyWebImplementation } from "react-native-gesture-handler";
import React from "react";

import MainProvider from "src/Providers/MainProvider";
import MainNavigator from "src/navigation/MainNavigator";

global.Buffer = global.Buffer || require("safe-buffer").Buffer;

Object.assign(global, {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
});

if (typeof btoa === "undefined") {
  global.btoa = function (str) {
    return Buffer.from(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function (b64Encoded) {
    return Buffer.from(b64Encoded, "base64").toString("binary");
  };
}

enableLegacyWebImplementation(true);

export default function App() {
  return (
    <MainProvider>
      <MainNavigator />
    </MainProvider>
  );
}
