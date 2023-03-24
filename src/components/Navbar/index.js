import { Link } from "react-router-dom"
import { Container, LogoContainer, MenuContainer } from "./styles"
import { FaFontAwesomeLogoFull, FaBars, FaHome, FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
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
          <li><Link to={"/"}><FaHome size={25} color="#fff" /></Link></li>
          <li><Link to={"/procurar"}><FaSearch size={25} color="#fff" /></Link></li>
          <li>
            <Link to={"/solicitacoes"}>
              <IoMdNotifications size={25} color="#fff"/>
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <AiFillMessage size={25} color="#fff"/>
            </Link>
          </li>
          <li>
            <Link to={"#"}>  
              <FaBars size={25} color="#fff"  />
            </Link>   
          </li>
        </ul>
        
      </MenuContainer>
    </Container>
  )
}

export default Navbar