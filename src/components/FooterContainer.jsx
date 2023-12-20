import { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../context/AppContext";

export default function FooterContainer() {
  const { switchDarkMode } = useContext(AppContext);

  return (
    <>
        <FooterSC switchDarkMode={switchDarkMode}>
          <p>Todos os direitos reservados. 2023.</p>
        </FooterSC>
    </>
  )
}

const FooterSC = styled.footer`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 10%;

  position: fixed;     
  bottom: 0%;         
  user-select: none;

  p {
    color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    font-weight: 400;
    line-height: 48px;
  }
`;
