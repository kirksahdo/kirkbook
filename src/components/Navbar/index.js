import { Link } from 'react-router-dom';
import { Container, LogoContainer, MenuContainer } from './styles';
import {
  FaFontAwesomeLogoFull,
  FaHome,
  FaSearch,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillMessage } from 'react-icons/ai';
import { BsFillPersonFill, BsFillSunFill } from 'react-icons/bs';
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { useTheme } from 'styled-components';
import { MdNightlightRound } from 'react-icons/md';

const Navbar = () => {
  const [scrollUp, setScrollUp] = useState(true);
  const {backgroundColor, toggleTheme} = useTheme();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrollUp = prevScrollpos > currentScrollPos;

    setScrollUp(scrollUp);
    prevScrollpos = currentScrollPos;
  };

  let prevScrollpos = window.pageYOffset;
  window.onscroll = handleScroll;

  return (
    <Container
      className={scrollUp ? 'navbar-scroll-up show' : 'navbar-scroll-up'}
    >
      <LogoContainer>
        <FaFontAwesomeLogoFull color="white" size={100} />
      </LogoContainer>
      <MenuContainer>
        <ul>
          <li>
            <Link title="Início" to={'/'}>
              <FaHome size={25} color="#fff" />
            </Link>
          </li>
          <li>
            <Link title="Procurar" to={'/procurar'}>
              <FaSearch size={20} color="#fff" />
            </Link>
          </li>
          <li>
            <Link title="Solicitações de Amizade" to={'/solicitacoes'}>
              <IoMdNotifications size={25} color="#fff" />
            </Link>
          </li>
          <li>
            <Link title="Conversa" to={'/conversas'}>
              <AiFillMessage size={25} color="#fff" />
            </Link>
          </li>
          <li>
            <Link title="Perfil" to={`/user/${auth.currentUser.uid}`}>
              <BsFillPersonFill size={25} color="#fff" />
            </Link>
          </li>
          <li>
            <Link title="Mudar tema" onClick={toggleTheme}>
              {backgroundColor === '#333333' ? <MdNightlightRound size={25} color="#fff"/> : <BsFillSunFill size={25} color="#fff"/>}
            </Link>
          </li>
          <li>
            <Link title="Sair" onClick={() => auth.signOut()}>
              <FaSignOutAlt size={25} color="#fff" />
            </Link>
          </li>
        </ul>
      </MenuContainer>
    </Container>
  );
};

export default Navbar;
