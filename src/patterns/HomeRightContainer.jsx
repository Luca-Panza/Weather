import { useContext } from "react";
import styled from "styled-components";
import { StyleSheetManager } from 'styled-components';

import APIAttribution from "../components/ApiAttributionContainer";
import NextDaysChart from "../components/ChartContainer";
import CityInfo from "../components/CityInfoContainer";
import TodayContainer from "../components/TodayContainer";
import WeatherTab from "../components/WeatherTabContainer";
import { AppContext } from "../context/AppContext";

export default function HomeRightContainer() {
  const { switchDarkMode, activeTab } = useContext(AppContext);

  return (
    <>
      <StyleSheetManager shouldForwardProp={(prop) => !['switchDarkMode'].includes(prop)}>
        <HomeRightContainerSC switchDarkMode={switchDarkMode}>
          <WeatherTab/>
          <CityInfo/>

          {activeTab === 'today' && (<TodayContainer/>)}
          {activeTab === 'nextDays' && (<NextDaysChart/>)}

          <APIAttribution/>
        </HomeRightContainerSC>
      </StyleSheetManager>
    </>
  )
}

const HomeRightContainerSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  background-color: ${(props) => props.switchDarkMode ? '#282723' : '#EFEFEF'};
`;