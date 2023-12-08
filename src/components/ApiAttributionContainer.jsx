import { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../context/AppContext";

export default function APIAttribution() {
  const { switchDarkMode } = useContext(AppContext);

  return (
    <>
      <APIAttributionSC switchDarkMode={switchDarkMode}>
        Dados fornecidos pela <APILink href="https://openweathermap.org/api" target="_blank">Open Weather API</APILink>
      </APIAttributionSC>
    </>
  );
}

const APIAttributionSC = styled.div`
  font-family: 'Poppins', sans-serif;
  user-select: none;
  font-size: 14px;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  margin-left: 5%;
  font-style: normal;
  font-weight: 400;
  position: fixed;
  bottom: 10%;   
`;

const APILink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #96A7F2;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;