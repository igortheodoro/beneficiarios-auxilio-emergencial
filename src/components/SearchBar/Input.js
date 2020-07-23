import React from "react";
import { DivSearch, DivBar, Input, Button } from "./Styles";

const input = (props) => (
  <DivSearch>
    <DivBar>
      <i className="fas fa-search SearchIcon"></i>
      <Input onChange={props.changed} placeholder="São Paulo" />
      <Button onClick={props.search}>Pesquisar</Button>
    </DivBar>
  </DivSearch>
);

export default input;
