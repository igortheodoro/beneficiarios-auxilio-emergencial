import React from "react";
import { DivBar, Input, Button, DivInfo } from "./Styles";
import Aux from "../../hoc/Auxiliary";

const input = (props) => (
  <Aux>
    <DivBar>
      <i className="fas fa-search SearchIcon"></i>
      <Input onChange={props.changed} placeholder="São Paulo" />
      <Button onClick={props.search}>Pesquisar</Button>
    </DivBar>
    <DivInfo>
      <i class="fas fa-info-circle"></i>
      <p>Ainda não há dados dos meses de junho e julho.</p>
    </DivInfo>
  </Aux>
);

export default input;
