import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "./themes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastProvider } from "./contexts/ToastContext";
import { GlobalStyle } from "./styles";
import { off } from "firebase/database";

const App = () => {
  
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme = {{...theme, toggleTheme}} >
      <GlobalStyle />
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
      
    </ThemeProvider>
  )
}
export default App;
