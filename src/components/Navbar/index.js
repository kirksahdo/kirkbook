import { Link } from "react-router-dom"
import { Container, LogoContainer, MenuContainer } from "./styles"
import { FaFontAwesomeLogoFull, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <Container>
      <LogoContainer>
        <FaFontAwesomeLogoFull color="white" size={100} />
      </LogoContainer>
      <MenuContainer>
        <ul>
          <li><Link to={"/"}>Início</Link></li>
          <li><FaBars color="#fff" /></li>
        </ul>
        
      </MenuContainer>
    </Container>
  )
}

export default Navbar