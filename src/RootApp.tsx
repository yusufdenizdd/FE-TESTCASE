import App from "./App.tsx";
import "./styles-and-themes/App.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles-and-themes/theme.ts";
import { GlobalStyle } from "./styles-and-themes/GlobalStyle.ts";
import { useState } from "react";

export default function RootApp() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : false;
  });

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <App
        isDark={isDark}
        toggleTheme={() => {
          const next = !isDark;
          setIsDark(next);
          localStorage.setItem("theme", next ? "dark" : "light");
        }}
      />
    </ThemeProvider>
  );
}
