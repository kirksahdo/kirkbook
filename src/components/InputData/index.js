import { Icon, Input, InputContainer, SelectInput } from "./styles";

import { FaUserAlt, FaLock, FaEnvelope, FaCalendar, FaCity, FaSearchLocation, FaCheckCircle } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";

const InputData = ({type, value, onChangeText, password = false, mask = ""}) => {

  const size = 20;

  const getIcon = () => {
    switch(type){
      case "E-mail":
        return <FaEnvelope color="#fff" size={size}/>;
      case "Nome":
        return <FaUserAlt color="#fff" size={size}/>;
      case "Senha":
        return <FaLock color="#fff" size={size}/>;
      case "Data de nascimento":
        return <FaCalendar color="#fff" size={size}/>;
      case "Cidade":
        return <FaCity color="#fff" size={size}/>;
      case "Estado":
        return <FaSearchLocation color="#fff" size={size}/>;
      case "Confirme sua senha":
        return <FaCheckCircle color="#fff" size={size}/>;
      case "Sexo":
        return <BsGenderAmbiguous color="#fff" size={size}/>;
      default:
        return <FaUserAlt color="#fff" size={size} />;
    }
  }

  const getInputType = () => {
    if (password){
      return <Input placeholder={type} value={value} onChange={onChangeText} type="password"/>
    }
    if (type === "Sexo") {
      return (
        <SelectInput value={value} name="sexo" onChange={onChangeText}>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outros">Outros</option>
        </SelectInput>
      )
    }
    return <Input mask={mask} placeholder={type} value={value} onChange={onChangeText}/>
  }

  return (
    <InputContainer >
      <Icon>
        {getIcon()}
      </Icon>
      {getInputType()}
    </InputContainer>
  )
}

export default InputData;