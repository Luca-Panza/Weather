import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { AppContext } from "../context/AppContext";

export default function NextDaysChart() {
  const [graphsData, setGraphsData] = useState({});
  const { data, switchTemperature, switchDarkMode } = useContext(AppContext);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const lat = data?.coord?.lat;
    const lon = data?.coord?.lon;

    if (lat && lon) {
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      axios.get(urlForecast)
        .then(response => {
          setGraphsData(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter a temperatura dos próximos dias:', error);
        });
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

  const processDataForChart = (data, isFahrenheit) => {
    return data.list.map((item) => {
      const tempCelsius = item.main.temp - 273.15;
      const temperature = isFahrenheit ? (tempCelsius * 9/5) + 32 : tempCelsius;
      return {
        date: formatDateAxis(item.dt_txt),
        temperature: temperature,
      };
    });
  };

  const processedData = graphsData.list ? processDataForChart(graphsData, switchTemperature) : [];

  const generateTicks = (min, max, switchTemperature) => {
    const adjustedMin = switchTemperature ? (min * 9/5) + 32 : min;
    const adjustedMax = switchTemperature ? (max * 9/5) + 32 : max;
    const average = (adjustedMin + adjustedMax) / 2;
    const nearestTenBelowAverage = Math.floor(average / 10) * 10;
    const nearestTenAboveAverage = Math.ceil(average / 10) * 10;

    return [
      nearestTenBelowAverage - 10,
      nearestTenBelowAverage,
      nearestTenAboveAverage,
      nearestTenAboveAverage + 10,
    ];
  };

  const tempsCelsius = graphsData.list?.map(item => item.main.temp - 273.15) || [];
  const dataMin = Math.min(...tempsCelsius);
  const dataMax = Math.max(...tempsCelsius);
  const roundedDataMin = Math.floor(dataMin / 10) * 10;
  const roundedDataMax = Math.ceil(dataMax / 10) * 10;

  const ticks = generateTicks(roundedDataMin, roundedDataMax, switchTemperature);

  return (
    <>
      <MarginSC>
        <NextDaysContainerSC switchDarkMode={switchDarkMode}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke={switchDarkMode ? '#ffffff' : '#000000'} />
              <YAxis 
                stroke={switchDarkMode ? '#ffffff' : '#000000'}
                tick={{ fill: switchDarkMode ? '#ffffff' : '#000000' }}
                domain={[roundedDataMin => (Math.floor(roundedDataMin / 10) * 10), roundedDataMax => (Math.ceil(roundedDataMax / 10) * 10)]}
                ticks={ticks}
                tickFormatter={(value) => `${value.toFixed(1)} ${switchTemperature ? '°F' : '°C'}`}  
              />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)} ${switchTemperature ? '°F' : '°C'}`, 'Temperatura']}
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
  );
}

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
  border-radius: 10px;
  margin-top: 2%;
`;
