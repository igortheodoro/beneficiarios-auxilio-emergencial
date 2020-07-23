import React from "react";
import { DivBar, Input, Button } from "./Styles";
import Aux from "../../hoc/Auxiliary";

const input = (props) => (
  <Aux>
    <DivBar>
      <i className="fas fa-search SearchIcon"></i>
      <Input onChange={props.changed} placeholder="São Paulo" />
      <Button onClick={props.search}>Pesquisar</Button>
    </DivBar>
  </Aux>
);

export default input;
