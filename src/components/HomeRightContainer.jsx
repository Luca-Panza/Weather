import styled from "styled-components"
import { StyleSheetManager } from 'styled-components';
import { useState, useContext } from "react" 

import { AppContext } from "../context/AppContext";

export default function HomeRightContainer() {

  const [activeTab, setActiveTab] = useState('today');
  const { data, switchTemperature, switchDarkMode } = useContext(AppContext);

  const cityName = data?.name;
  const cityLat = data?.coord?.lat?.toFixed(2); 
  const cityLon = data?.coord?.lon?.toFixed(2);
  const minTempCelsius = data?.main?.temp_min;
  const maxTempCelsius = data?.main?.temp_max;
  const minTemp = minTempCelsius !== undefined ? (switchTemperature ? celsiusToFahrenheit(minTempCelsius).toFixed(1) : minTempCelsius.toFixed(1)) : null;
  const maxTemp = maxTempCelsius !== undefined ? (switchTemperature ? celsiusToFahrenheit(maxTempCelsius).toFixed(1) : maxTempCelsius.toFixed(1)) : null;
  const humidity = data?.main?.humidity;
  const windSpeed = data?.wind?.speed !== undefined ? (switchTemperature ? msToMph(data?.wind?.speed).toFixed(1) : data?.wind?.speed.toFixed(1)) : null;
  const windSpeedUnit = switchTemperature ? 'mph' : 'm/s';
  const tempUnit = switchTemperature ? '° F' : '° C';

  function msToMph(speedMs) {
    return speedMs * 2.23694;
  }

  function celsiusToFahrenheit(tempCelsius) {
    return (tempCelsius * 9/5) + 32;
  }

  return (
    <>
    <StyleSheetManager shouldForwardProp={(prop) => !['switchDarkMode'].includes(prop)}>
    <HomeRightContainerSC switchDarkMode={switchDarkMode}>

      <TextSC>
        <TabText $isActive={activeTab === 'today'} onClick={() => setActiveTab('today')}>
          Hoje
        </TabText>
        <TabText $isActive={activeTab === 'nextDays'} onClick={() => setActiveTab('nextDays')}>
          Próximos dias
        </TabText>
      </TextSC>

      {activeTab === 'today' && (
        <>
          <CityInfoSC switchDarkMode={switchDarkMode}>
            {cityName}
            <CoordsSC switchDarkMode={switchDarkMode}>Lat: {cityLat} Long: {cityLon}</CoordsSC>
          </CityInfoSC>

          <WeatherInfoSC>
            <WeatherBox>
              <WeatherTitle>Minima</WeatherTitle>
              <WeatherData>{minTemp}{tempUnit}</WeatherData>
            </WeatherBox>
            <WeatherBox>
              <WeatherTitle>Máxima</WeatherTitle>
              <WeatherData>{maxTemp}{tempUnit}</WeatherData>
            </WeatherBox>
            <WeatherBox>
              <WeatherTitle>Umidade</WeatherTitle>
              <WeatherData>{humidity}%</WeatherData>
            </WeatherBox>
            <WeatherBox>
              <WeatherTitle>Velocidade do vento</WeatherTitle>
              <WeatherData>{windSpeed} {windSpeedUnit}</WeatherData>
            </WeatherBox>
          </WeatherInfoSC>

          <CoatStatusSC switchDarkMode={switchDarkMode}>
            {minTempCelsius <= 17 ? 'Sim, você deve levar um casaquinho!' : 'Não, você não deve levar um casaquinho!'}
          </CoatStatusSC>

        </>
        
      )}

      <APIAttribution switchDarkMode={switchDarkMode}>
        Dados fornecidos pela <APILink href="https://openweathermap.org/api" target="_blank">Open Weather API</APILink>
      </APIAttribution>

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
  background-color: ${(props) => props.switchDarkMode ? '#4F4F4F' : '#EFEFEF'};
`;

const TextSC = styled.div`
  display: flex;
  margin-top: 4%;
  margin-left: 7%;
`;

const TabText = styled.span`
  display: inline;
  cursor: pointer;
  color: ${props => props.$isActive ? '#000' : '#aaa'};
  margin-right: 3%;
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  user-select: none;
  &:hover {
    color: #000;
  }
`;

const CityInfoSC = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 70px;
  font-style: normal;
  font-weight: 300;
  line-height: 40px;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  margin-top: 5%;
  margin-left: 5%;
  user-select: none;
  @media (max-width: 800px) {
    font-size: 60px;
  }

  @media (max-width: 600px) {
    font-size: 40px; 
  }
`;

const CoordsSC = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  margin-top: 1%;
  margin-left: 1%;
  user-select: none;
`;

const WeatherInfoSC = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 90%;
  height: 30%;
  gap: 5%;
  margin-top: 2%;
  margin-left: 5%;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 30%;
  margin: 10px;
  padding: 20px;
  background: linear-gradient(117deg, #4D4494 22.83%, #4F43AE 90.03%);
  border-radius: 32px;
  box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);
  user-select: none;
`;

const WeatherTitle = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #FFF;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: 16px; 
  }
`;

const WeatherData = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #FFF;
  font-weight: bold;
  @media (max-width: 600px) {
    font-size: 18px; 
  }
`;

const CoatStatusSC = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: italic;
  color: #AFADAD;
  margin-top:100px;
  margin-left: 7%;
  user-select: none;
`;

const APIAttribution = styled.div`
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



