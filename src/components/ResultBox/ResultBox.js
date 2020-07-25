import React from "react";
import { DivTitle, RoundedDiv } from "./Styles";

const result = (props) => (
  <DivTitle>
    <RoundedDiv>
      <i className={`${props.icon}`}></i>
    </RoundedDiv>
    <p>{props.title}</p>
    <p>Abril: {props.abril}</p>
    <p>Maio: {props.maio}</p>
    <p>Junho: {props.junho}</p>
    <p>Julho: {props.julho}</p>
  </DivTitle>
);

export default result;
