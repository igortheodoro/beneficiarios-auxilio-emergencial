import React from "react";
import { Loading } from "./Styles";

const loading = (props) => {
  const text = [
    "As requisições podem demorar um pouco.",
    "Buscando informações sobre a cidade...",
    "Isso pode demorar um minuto.",
    "Acessando o portal transparência.",
  ];

  return (
    <Loading show={props.show}>
      <i className="fas fa-spinner"></i>
      <p>{text[Math.floor(Math.random() * text.length)]}</p>
    </Loading>
  );
};

export default loading;
