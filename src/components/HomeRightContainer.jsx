import styled from "styled-components"
import axios from 'axios';
import { StyleSheetManager } from 'styled-components';
import { useState, useEffect, useContext } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

import { AppContext } from "../context/AppContext";

export default function HomeRightContainer() {

  const [activeTab, setActiveTab] = useState('today');
  const [graphsData, setGraphsData] = useState({});
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

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (data?.coord?.lat && data?.coord?.lon) {
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`;
      axios.get(urlForecast)
        .then(response => {
          setGraphsData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter a temperatura dos próximos dias:', error);
        });
    } else {
      console.log("Coordenadas não disponíveis");
    }
  }, [data]);

  const formatDateTooltip = (dateTime) => {
    const daysFull = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const date = new Date(dateTime);
    const dayFull = daysFull[date.getDay()];
    const formattedDate = `${dayFull}, ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    return formattedDate;
  };
  
  const formatDateAxis = (dateTime) => {
    const daysShort = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const date = new Date(dateTime);
    const dayShort = daysShort[date.getDay()];
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')} (${dayShort})`;
    return formattedDate;
  };

  const processDataForChart = (data) => {
    return data.list.map((item) => ({
      date: formatDateAxis(item.dt_txt),
      temperature: item.main.temp - 273.15,
    }));
  };

  const generateTicks = (min, max) => {
    const average = (min + max) / 2;
    
    const nearestTenBelowAverage = Math.floor(average / 10) * 10;
    const nearestTenAboveAverage = Math.ceil(average / 10) * 10;
    
    const ticksArray = [
      nearestTenBelowAverage - 10,
      nearestTenBelowAverage,
      nearestTenAboveAverage + 10,
      nearestTenAboveAverage + 20
    ];
    
    return ticksArray;
  };

  const tempsCelsius = graphsData.list?.map(item => item.main.temp - 273.15) || [];
  const dataMin = Math.min(...tempsCelsius);
  const dataMax = Math.max(...tempsCelsius);
  const roundedDataMin = Math.floor(dataMin / 10) * 10;
  const roundedDataMax = Math.ceil(dataMax / 10) * 10;

  return (
    <>
    <StyleSheetManager shouldForwardProp={(prop) => !['switchDarkMode'].includes(prop)}>
    <HomeRightContainerSC switchDarkMode={switchDarkMode}>

      <TextSC>
        <TabText $isActive={activeTab === 'today'} switchDarkMode={switchDarkMode} onClick={() => setActiveTab('today')}>
          Hoje
        </TabText>
        <TabText $isActive={activeTab === 'nextDays'} switchDarkMode={switchDarkMode} onClick={() => setActiveTab('nextDays')}>
          Próximos dias
        </TabText>
      </TextSC>

      <CityInfoSC switchDarkMode={switchDarkMode}>
        {cityName}
        <CoordsSC switchDarkMode={switchDarkMode}>Lat: {cityLat} Long: {cityLon}</CoordsSC>
      </CityInfoSC>

      {activeTab === 'today' && (
        <>
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

        {activeTab === 'nextDays' && (
            <>
            <MarginSC>
              <NextDaysContainerSC switchDarkMode={switchDarkMode}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={processDataForChart(graphsData)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke={switchDarkMode ? '#ffffff' : '#000000'} />
                    <YAxis 
                      stroke={switchDarkMode ? '#ffffff' : '#000000'}
                      tick={{ fill: switchDarkMode ? '#ffffff' : '#000000' }}
                      domain={[roundedDataMin => (Math.floor(roundedDataMin / 10) * 10), roundedDataMax => (Math.ceil(roundedDataMax / 10) * 10)]}
                      ticks={generateTicks(roundedDataMin, roundedDataMax)}
                      tickFormatter={value => `${value}°C`} 
                    />
                    <Tooltip 
                      formatter={(value) => [`${value.toFixed(1)} °C`, 'Temperatura']}
                      labelFormatter={(label) => formatDateTooltip(label)}
                    />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#292724"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </NextDaysContainerSC>
            </MarginSC>
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
  background-color: ${(props) => props.switchDarkMode ? '#282723' : '#EFEFEF'};
`;

const TextSC = styled.div`
  display: flex;
  margin-top: 4%;
  margin-left: 7%;
`;

const TabText = styled.span`
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
    color: #000;
  }
  @media (max-width: 620px) {
    font-size: 18px; 
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

  @media (max-width: 620px) {
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

const MarginSC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;


  const NextDaysContainerSC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.switchDarkMode ? '#808080' : '#ffffff'};
  border: 1px solid #D8D8D8;
  user-select: none;
  width: 80%;
  height: 90%;
  border-radius:10px;
  margin-top: 2%;
`;
