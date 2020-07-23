import React from "react";
import { DivCredits, DivBar, Input, Button } from "./Styles";
import Aux from "../../hoc/Auxiliary";

const input = (props) => (
  <Aux>
    <DivCredits>Feito por Igor Theodoro</DivCredits>
    <DivBar>
      <i className="fas fa-search SearchIcon"></i>
      <Input onChange={props.changed} placeholder="São Paulo" />
      <Button onClick={props.search}>Pesquisar</Button>
    </DivBar>
  </Aux>
);

export default input;
