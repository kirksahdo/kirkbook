import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Container } from "./styles"

const HomePage = () => {
  return (
    <Container> 
      <Navbar />
      <Outlet />
    </Container>
  )
}

export default HomePage;