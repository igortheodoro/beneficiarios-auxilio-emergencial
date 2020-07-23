import Styled from "styled-components";

export const Div = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

export const Error = Styled.h1`
  color: #eb4034;
  font-size: 1.2rem;
  padding: 5px;
`;

export const DivResult = Styled.div`
  margin-top: 16px;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;

  @media(max-width: 680px){
    position: absolute;
    top: 70vh;
    flex-direction: column;
    width: 90%;
  }
`;
