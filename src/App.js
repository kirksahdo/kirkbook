import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "./themes";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const App = () => {
  
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme = {{...theme, toggleTheme}} >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App;
