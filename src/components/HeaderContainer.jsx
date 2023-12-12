import { useContext } from 'react';
import styled from "styled-components"
import coatLogo from "../assets/coat.png"

import { AppContext } from "../context/AppContext";

export default function HeaderContainer() {
  const { switchDarkMode } = useContext(AppContext);

  return (
    <>
        <HeaderSC switchDarkMode={switchDarkMode}>
          <img src={coatLogo} alt="Logo"></img>
          <h1>Levo um casaquinho?</h1>
        </HeaderSC>
    </>
  );
}

const HeaderSC = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 25px;
  user-select: none;

  img {
    object-fit: contain;
    width: 20%;
    margin-right: 3%;
    margin-left: 6%;
  }

  h1 {
    color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
    width: 75%;
    font-family: 'Poppins', sans-serif;
    font-size: 3vw;
    font-weight: 600;
  }
`;