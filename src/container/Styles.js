import Styled from "styled-components";

export const Div = Styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.centralized ? "center" : "flex-start")};
  flex-direction: column;
  height: 100vh;
`;

export const Error = Styled.h1`
  color: #eb4034;
  font-size: 1.2rem;
  padding: 5px;
`;

export const DivResult = Styled.div`
  position: relative;
  margin-top: 16px;
  display: ${(props) => (props.show ? "flex" : "none")};

  @media(max-width: 680px){
    flex-direction: column;
    margin-top: 32px;
    width: 90%;
  }
`;

export const Img = Styled.img`
  width: 100%;
  height: 150px;
  margin: 30px;
`;
