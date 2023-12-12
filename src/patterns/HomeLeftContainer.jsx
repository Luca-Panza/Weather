import styled from "styled-components"
import { StyleSheetManager } from 'styled-components';
import { useContext } from 'react';

import { AppContext } from "../context/AppContext";

import HeaderContainer from "../components/HeaderContainer";
import FooterContainer from "../components/FooterContainer";
import SwitchContainer from "../components/SwitchContainer";
import DayStatusContainer from "../components/DaysStatusContainer";
import WeatherStatusContainer from "../components/WeatherStatusContainer";
import SearchBarContainer from "../components/SearchBarContainer";

export default function HomeLeftContainer() {

  const { switchDarkMode } = useContext(AppContext);

  return (
    <>
    <StyleSheetManager shouldForwardProp={(prop) => !['switchDarkMode'].includes(prop)}>
      <HomeLeftContainerSC switchDarkMode={switchDarkMode}>

      <HeaderContainer/>

      <SearchBarContainer/>

        <WeatherStatusContainer/>
        <DayStatusContainer/>
        <SwitchContainer/>

        <FooterContainer/>
        
      </HomeLeftContainerSC>
      </StyleSheetManager>
    </>
  )      
}

const HomeLeftContainerSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 35%;
  height: 100%;
  background-color: ${(props) => props.switchDarkMode ? '#1d1c19' : '#ffffff'};
`;
