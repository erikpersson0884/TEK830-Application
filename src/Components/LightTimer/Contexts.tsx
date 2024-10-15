import { createContext, useContext } from "react";
import { Time } from "../StatusPage/ContentPane/ContentPane";

export const DimContext = createContext<Time | undefined>(undefined);

export function useTimeContext() {
  let time = useContext(DimContext);

  if (time === undefined) {
    throw new Error("useTimeContext must be used with a DimContext");
  }

  return time;
}
