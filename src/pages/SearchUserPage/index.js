import SearchInput from "../../components/SearchInput";
import UserCard from "../../components/UserCard";
import { Container, Content } from "./styles";
import LoadingScreen from "../../components/LoadingScreen";
import { useEffect, useState } from "react";
import { getAllUsuarios } from "../../controllers/UserController";
import { useSearchParams } from "react-router-dom";

const SearchUserPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("nome") || '');

  useEffect(() => {
    pegarUsuarios();
  }, [])

  useEffect(() => {
    setUsers(allUsers.filter(u => u.nome.toLowerCase().includes(inputValue.toLowerCase())));
  }, [allUsers, inputValue]);

  const pegarUsuarios = () => {
    getAllUsuarios()
      .then(allUsers => {
        setAllUsers(allUsers);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchParams({ nome: newValue });
  }

  return (
    <Container>
      {isLoading && <LoadingScreen />}
      <Content>
        <SearchInput value={inputValue} onChangeInput={handleInputChange} />
        {users && users.map(u => {
          return <UserCard to={`/user/${u.id}`} usuario={u} />
        })}
      </Content>
    </Container>
  );
};

export default SearchUserPage;