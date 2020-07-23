import React from "react";
import { DivNav } from "./Styles";
import Aux from "../../hoc/Auxiliary";

const layout = (props) => (
  <Aux>
    <DivNav>
      <p>Feito por Igor Theodoro</p>
    </DivNav>
    {props.children}
  </Aux>
);

export default layout;
