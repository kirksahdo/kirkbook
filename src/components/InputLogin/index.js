import { Icon, Input, InputContainer } from "./styles";

import { FaUserAlt, FaLock, FaEnvelope, FaCalendar, FaCity, FaSearchLocation, FaCheckCircle } from "react-icons/fa";

const InputLogin = ({type, value, onChangeText, password = false}) => {

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
      default:
        return FaUserAlt;
    }
  }

  const getInputType = () => {
    if (password){
      return <Input placeholder={type} value={value} onChange={onChangeText} type="password"/>
    } else {
      return <Input placeholder={type} value={value} onChange={onChangeText}/>
    }
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

export default InputLogin;