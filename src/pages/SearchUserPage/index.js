import SearchInput from '../../components/SearchInput';
import UserCard from '../../components/UserCard';
import { Container, Content } from './styles';
import LoadingScreen from '../../components/LoadingScreen';
import { useEffect, useState } from 'react';
import { getAllUsuarios, getUsuario } from '../../controllers/UserController';
import { useSearchParams } from 'react-router-dom';
import EditarPerfil from '../../components/EditarPerfil';
import { auth } from '../../config/firebase';

const SearchUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('nome') || '');
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  
  useEffect(() => {
    pegarUsuarios();
  }, []);

  useEffect(() => {
    setUsers(
      allUsers.filter((u) =>
        u.nome.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [allUsers, inputValue]);

  const pegarUsuarioLogado = async() => {
    setIsLoading(true);
    try {
      const user = await getUsuario(auth.currentUser.uid);
      setUserLogged(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const pegarUsuarios = () => {
    setIsLoading(true);
    getAllUsuarios()
      .then((allUsers) => {
        setAllUsers(allUsers);
        pegarUsuarioLogado();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(_ => setIsLoading(false));
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchParams({ nome: newValue });
  };

  const clickEdit = (usuario) => {
    setUserToEdit(usuario);
    setEditarPerfil(true);
  }

  return (
    <Container>
      {(editarPerfil && userToEdit) && <EditarPerfil id={userToEdit} isOpen={editarPerfil} onClose={() => {
        setEditarPerfil(false)
        pegarUsuarios();
      }} />}
      {isLoading && <LoadingScreen />}
      <Content>
        <SearchInput value={inputValue} onChangeInput={handleInputChange} />
        {users &&
          users.map((u, i) => {
            return <UserCard key={i} admin={userLogged?.administrador} onClickEdit={clickEdit} to={`/user/${u.id}`} usuario={u} />;
          })}
      </Content>
    </Container>
  );
};

export default SearchUserPage;
