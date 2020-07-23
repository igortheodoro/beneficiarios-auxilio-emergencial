import React from "react";
import { DivTitle, RoundedDiv } from "./Styles";

const result = (props) => (
  <DivTitle>
    <RoundedDiv>
      <i className={`${props.icon} icon`}></i>
    </RoundedDiv>
    <p>{props.title}</p>
    <p>{props.data}</p>
  </DivTitle>
);

/* 
Total de beneficiados:
 fas fa-users icon
    <DivTitle>
      <RoundedDiv>
        <i className="fas fa-coins icon"></i>
      </RoundedDiv>
      <p>Reais distribuídos:</p>
      <p>1.056.259</p>
    </DivTitle>

    <DivTitle>
      <RoundedDiv>
        <i className="fas fa-venus icon"></i>
      </RoundedDiv>
      <p>Chefes de família:</p>
      <p>2515</p>
    </DivTitle> */

export default result;
