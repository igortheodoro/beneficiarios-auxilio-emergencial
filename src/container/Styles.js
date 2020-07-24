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
  position: absolute;
  top: 55vh;
  margin-top: 8px;
  display: ${(props) => (props.show ? "flex" : "none")};

  @media(max-width: 680px){
    flex-direction: column;
    margin-top: 32px;
    width: 90%;
  }
`;
