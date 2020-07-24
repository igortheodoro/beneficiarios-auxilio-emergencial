import Styled from "styled-components";

export const DivTitle = Styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 5px #858CA2;
  padding: 28px;
  display: flex;
  justify-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px;
`;

export const RoundedDiv = Styled.div`
  width: 90px;
  height: 90px;
  background-color: #fff;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px #858CA2;
  font-size: 2.5rem;
  
  .fa-users{
    color: #5978CE;
  }

  .fa-coins{
    color: #ceb159;
  }

  .fa-venus{
    color: #ce5967;
  }

`;
