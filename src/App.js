import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { lightTheme, darkTheme } from "./themes";
import Login from "./pages/Login";

const App = () => {
  
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme = {{...theme, toggleTheme}} >
      <Login />
    </ThemeProvider>
  )
}
export default App;
