import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "./themes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastProvider } from "./contexts/ToastContext";

const App = () => {
  
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme = {{...theme, toggleTheme}} >
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
      
    </ThemeProvider>
  )
}
export default App;
