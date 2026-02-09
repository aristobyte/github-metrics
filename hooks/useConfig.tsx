"use client";

import { createContext, useContext } from "react";
import { CONFIG } from "../config";

const ConfigContext = createContext(CONFIG);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigContext.Provider value={CONFIG}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
