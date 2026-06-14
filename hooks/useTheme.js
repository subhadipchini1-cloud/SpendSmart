import { useState } from "react";
import { DARK, LIGHT } from "../constants";
export function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? DARK : LIGHT;
  const toggleTheme = () => setIsDark(d => !d);
  return { isDark, theme, toggleTheme };
}
