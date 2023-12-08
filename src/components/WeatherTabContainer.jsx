import { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../context/AppContext";

export default function WeatherTab() {
  const { switchDarkMode, activeTab, setActiveTab } = useContext(AppContext);

  return (
    <>
      <WeatherTabSC>
        <TabTextSC 
          $isActive={activeTab === 'today'} 
          switchDarkMode={switchDarkMode} 
          onClick={() => setActiveTab('today')}>
          Hoje
        </TabTextSC>
        <TabTextSC 
          $isActive={activeTab === 'nextDays'} 
          switchDarkMode={switchDarkMode} 
          onClick={() => setActiveTab('nextDays')}>
          Próximos dias
        </TabTextSC>
      </WeatherTabSC>
    </>
  );
};

const WeatherTabSC = styled.div`
  display: flex;
  margin-top: 4%;
  margin-left: 7%;
`;

const TabTextSC = styled.span`
  display: inline;
  cursor: pointer;
  color: ${props => props.$isActive ? (props.switchDarkMode ? '#fff' : '#000') : '#aaa'};
  margin-right: 3%;
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  user-select: none;
  &:hover {
    color: ${props => props.switchDarkMode ? '#fff' : '#000'};
  }
  @media (max-width: 620px) {
    font-size: 18px; 
  }
`;
