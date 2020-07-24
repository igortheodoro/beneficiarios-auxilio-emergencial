import React from "react";
import { DivTitle, RoundedDiv } from "./Styles";

const result = (props) => (
  <DivTitle>
    <RoundedDiv>
      <i className={`${props.icon}`}></i>
    </RoundedDiv>
    <p>{props.title}</p>
    <p>{props.data}</p>
  </DivTitle>
);

export default result;
