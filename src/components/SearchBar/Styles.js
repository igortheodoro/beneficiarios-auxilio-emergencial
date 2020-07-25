import Styled from "styled-components";

export const DivBar = Styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 30px;
  background-color: #F1F1F8;
  color: #49536B;
  box-shadow: 0px 0px 8px #858CA2;

  @media(max-width: 450px){
    width: 75%;
  }

  .SearchIcon{
    color: #49536B;
    font-size: 1.6rem;
    margin: 0px 6px;
  }
`;

export const Input = Styled.input`
  outline: none;
  border: none;
  font-size: 1.2rem;
  background-color: transparent;
  color: #49536B;
  padding: 0 5px;
  margin: 0 8px;
  width: inherit;

  &::placeholder{
    color: #BCBCC8;
    font-size: 1rem;
  }
`;

export const Button = Styled.button`
  outline: none;
  color: #49536B;
  border: transparent;
  padding: 3px 8px;
  border-radius: 50px;
  background-color: white;
  height: 2.5rem;
  width: 6rem;
  font-weight: bold;
  box-shadow: 0px 0px 5px #858CA2;

  &:hover{
    cursor: pointer;
  }
`;

export const DivInfo = Styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  font-size: 0.8rem;
  color: #898991;

  .fa-info-circle{
    margin-right: 4px;
    font-size: 1rem;
  }
`;
