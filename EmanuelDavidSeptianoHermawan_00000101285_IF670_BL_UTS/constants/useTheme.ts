import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { light, dark } from "./theme";

export default function useTheme() {
  const { darkMode } = useContext(AppContext);
  return darkMode ? dark : light;
}