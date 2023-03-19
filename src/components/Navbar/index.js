import { Link } from "react-router-dom"
import { Container, LogoContainer, MenuContainer } from "./styles"
import { FaFontAwesomeLogoFull, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [scrollUp, setScrollUp] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrollUp = prevScrollpos > currentScrollPos;

    setScrollUp(scrollUp);
    prevScrollpos = currentScrollPos;
  };

  let prevScrollpos = window.pageYOffset;
  window.onscroll = handleScroll;

  return (
    <Container className={scrollUp ? 'navbar-scroll-up show' : 'navbar-scroll-up'}>
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