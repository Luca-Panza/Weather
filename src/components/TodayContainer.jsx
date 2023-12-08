import { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../context/AppContext";

export default function TodayContainer() {
  const { data, switchTemperature, switchDarkMode } = useContext(AppContext);

  const minTempCelsius = data?.main?.temp_min;
  const maxTempCelsius = data?.main?.temp_max;
  const minTemp = minTempCelsius !== undefined ? (switchTemperature ? tempCelsiusToFahrenheit(minTempCelsius).toFixed(1) : minTempCelsius.toFixed(1)) : null;
  const maxTemp = maxTempCelsius !== undefined ? (switchTemperature ? tempCelsiusToFahrenheit(maxTempCelsius).toFixed(1) : maxTempCelsius.toFixed(1)) : null;
  const humidity = data?.main?.humidity;
  const windSpeed = data?.wind?.speed !== undefined ? (switchTemperature ? msToMph(data?.wind?.speed).toFixed(1) : data?.wind?.speed.toFixed(1)) : null;
  const windSpeedUnit = switchTemperature ? 'mph' : 'm/s';
  const tempUnit = switchTemperature ? '° F' : '° C';

  function msToMph(speedMs) {
    return speedMs * 2.23694;
  }

  function tempCelsiusToFahrenheit(tempCelsius) {
    return (tempCelsius * 9/5) + 32;
  }

  return (
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
  );
};

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
