import { FaSearch } from "react-icons/fa";
import { Container, Input} from "./styles";

const SearchInput = ({value, onChangeInput}) => {
  return (
    <Container>
      <FaSearch />
      <Input 
        type="text" 
        placeholder="Pesquise um usuário pelo nome.."
        value={value} 
        onChange={onChangeInput}/>
    </Container>
  )
};

export default SearchInput;
