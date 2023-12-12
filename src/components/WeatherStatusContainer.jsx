import styled from "styled-components";
import { RotatingLines } from 'react-loader-spinner';
import { useContext } from 'react';

import { AppContext } from "../context/AppContext";

export default function WeatherStatusContainer() {
  const { data, switchTemperature, switchDarkMode } = useContext(AppContext);

  const tempUnit = switchTemperature ? '°F' : '°C';
  const minTempCelsius = data?.main?.temp_min;
  const minTemp = minTempCelsius !== undefined ? (switchTemperature ? tempCelsiusToFahrenheit(minTempCelsius).toFixed(1) : minTempCelsius.toFixed(1)) : null;
  
  function tempCelsiusToFahrenheit(tempCelsius) {
    return (tempCelsius * 9/5) + 32;
  }

  function getWeatherDescriptionAndColor(weatherMain) {
    const weatherTypes = {
      Clear: { text: "Céu aberto", color: "#FFA07A" },
      Clouds: { text: "Nublado", color: "#B0C4DE" },
      Rain: { text: "Chovendo", color: "#ADD8E6" },
      Snow: { text: "Nevando", color: "#D3D3D3" },
      Thunderstorm: { text: "Tempestade", color: "#9370DB" },
      Drizzle: { text: "Chuviscando", color: "#B0E0E6" },
      Mist: { text: "Neblina", color: "#F5F5F5" }
    };
  
    return weatherTypes[weatherMain] || { text: "", color: "black" };
  }

  return (
    <>
      <WeatherStatusSC switchDarkMode={switchDarkMode}>
        {data?.weather && data.weather.length > 0 ? (
          <>
            <div>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description}></img>
              <p>{minTemp}{tempUnit}</p>
            </div>
            <p style={{ color: getWeatherDescriptionAndColor(data.weather[0].main).color }}>
              {getWeatherDescriptionAndColor(data.weather[0].main).text}
            </p>
          </>
        ) : (
          <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
        )}
      </WeatherStatusSC>
    </>
  );      
}

const WeatherStatusSC = styled.div`
  width: 80%;
  height: 25%;
  gap: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    height: 15%;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    > img {
      filter: ${props => props.switchDarkMode ? 'drop-shadow(4mm 4mm 6mm rgba(128, 128, 128, .7))' : 'drop-shadow(4mm 4mm 6mm rgba(0, 0, 0, .7))' };
      width: 25%;
      user-select: none;
    }
    > p {
      color: #EC6E4C;
      font-family: 'Poppins', sans-serif;
      font-size: 50px;
      font-style: normal;
      font-weight: 300;
      @media (max-width: 800px) {
        font-size: 40px;
      }
      @media (max-width: 600px) {
        font-size: 30px; 
      }
    }
  }
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    user-select: none;
    @media (max-width: 800px) {
      font-size: 20px;
    }
  }
`;
