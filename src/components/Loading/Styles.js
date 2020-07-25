import Styled from "styled-components";

export const Loading = Styled.div`
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffa3;

  .fa-spinner{
    color: #eded28;
    animation: spinning 1s infinite; 
    font-size: 2.5rem; 
  }

  @keyframes spinning {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
`;
