import styled from "styled-components"
import { useState } from "react" 

export default function HomeRightContainer() {

  const [activeTab, setActiveTab] = useState('today');

  return (
    <HomeRightContainerSC>

      <TextSC>
        <TabText $isActive={activeTab === 'today'} onClick={() => setActiveTab('today')}>
          Hoje
        </TabText>
        <TabText $isActive={activeTab === 'nextDays'} onClick={() => setActiveTab('nextDays')}>
          Próximos dias
        </TabText>
      </TextSC>

      <CityInfoSC>
        São Paulo
        <CoordsSC>Lat: 44.34 Long: 10.99</CoordsSC>
      </CityInfoSC>

      <WeatherInfoSC>
        <WeatherBox>
          <WeatherTitle>Minima</WeatherTitle>
          <WeatherData>31° C</WeatherData>
        </WeatherBox>
        <WeatherBox>
          <WeatherTitle>Máxima</WeatherTitle>
          <WeatherData>48° C</WeatherData>
        </WeatherBox>
        <WeatherBox>
          <WeatherTitle>Umidade</WeatherTitle>
          <WeatherData>64%</WeatherData>
        </WeatherBox>
        <WeatherBox>
          <WeatherTitle>Velocidade do vento</WeatherTitle>
          <WeatherData>12 m/s</WeatherData>
        </WeatherBox>
      </WeatherInfoSC>

      <CoatStatusSC>
      Não, você não deve levar um casaquinho!
      </CoatStatusSC>

      <APIAttribution>
        Dados fornecidos pela <APILink href="https://openweathermap.org/api" target="_blank">Open Weather API</APILink>
      </APIAttribution>

    </HomeRightContainerSC>
  )
}

const HomeRightContainerSC = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  background-color: #EFEFEF;
`;

const TextSC = styled.div`
  display: flex;
  margin-top: 4%;
  margin-left: 50px;
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
  font-size: 90px;
  font-style: normal;
  font-weight: 300;
  line-height: 40px;
  color: #222;
  margin-top: 5%;
  margin-left: 5%;
  user-select: none;
`;

const CoordsSC = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  color: #222;
  margin-top: 2%;
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
`;

const WeatherData = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #FFF;
  font-weight: bold;
`;

const CoatStatusSC = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-style: italic;
  color: #AFADAD;
  margin-top: 50px;
  margin-left: 7%;
  user-select: none;
`;

const APIAttribution = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #222;
  margin-top: 20%;
  margin-left: 7%;
  font-style: normal;
  font-weight: 400;
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



