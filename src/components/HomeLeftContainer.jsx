import styled from "styled-components"
import { StyleSheetManager } from 'styled-components';
import Switch from '@mui/material/Switch';
import { RotatingLines } from 'react-loader-spinner';
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

import searchIcon from "../assets/search.svg"
import { AppContext } from "../context/AppContext";

import HeaderContainer from "./HeaderContainer";
import FooterContainer from "./FooterContainer";

export default function HomeLeftContainer() {

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { data , setData, switchTemperature , setSwitchTemperature, switchDarkMode, setSwitchDarkMode } = useContext(AppContext);
  const inputRef = useRef(null);

  const tempUnit = switchTemperature ? '°F' : '°C';
  const minTempCelsius = data?.main?.temp_min;
  const minTemp = minTempCelsius !== undefined ? (switchTemperature ? tempCelsiusToFahrenheit(minTempCelsius).toFixed(1) : minTempCelsius.toFixed(1)) : null;
  
  //Função para converter Celsius para Fahrenheit
  function tempCelsiusToFahrenheit(tempCelsius) {
    return (tempCelsius * 9/5) + 32;
  }

  //Código para focar no input ao carregar a página
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //Código para pegar a data e hora atual
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      
      const formattedDate = now.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
      let dayOfWeek = now.toLocaleDateString('pt-BR', { weekday: 'long' });
      dayOfWeek = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)},`;
      
      const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      setDate(`${formattedDate}`);
      setTime(`${dayOfWeek} ${formattedTime}`);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  //Código para pegar a cidade atual a partir das coordenadas
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        getCityFromCoordinates(latitude, longitude);
      }, error => {
        console.error("Erro ao obter localização", error);
      });
    } else {
      console.log("Geolocalização não está disponível");
    }
  }, []);

  //Código para pegar a cidade atual a partir da coordenadas
  const getCityFromCoordinates = (latitude, longitude) => {
    const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;
    const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geocodingApiKey}`;
  
    axios.get(urlGeocoding)
      .then(response => {
        const city = response.data.results[0].components.city;
        clickHandler(null, city);
      })
      .catch(error => {
        console.error('Erro ao obter nome da cidade:', error);
      });
  };

  //Código para enviar input usando enter
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      clickHandler(e);
    }
  }

  //Código para enviar input usando botão
  function clickHandler(e, cityName = null) {
    if (e) e.preventDefault();
  
    const city = cityName || inputValue;

    setInputValue('');
  
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(urlWeather)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter a temperatura atual:', error);
      });
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
    <StyleSheetManager shouldForwardProp={(prop) => !['switchDarkMode'].includes(prop)}>
      <HomeLeftContainerSC switchDarkMode={switchDarkMode}>

      <HeaderContainer/>

        <SearchBarSC switchDarkMode={switchDarkMode}>
          <input type="text" ref={inputRef} placeholder="Procure por uma cidade" onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} value={inputValue} ></input>
          <ButtonSC type="submit" onClick={clickHandler}>
            <img src={searchIcon} alt="Search" />
          </ButtonSC>
        </SearchBarSC>

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

        <DayStatusSC switchDarkMode={switchDarkMode}>
          <Line switchDarkMode={switchDarkMode}/>
          <p>{date}</p>
          <p>{time}</p>
        </DayStatusSC>

        <SwitchSC switchDarkMode={switchDarkMode}>
          <div>
            <Switch checked={switchTemperature} onChange={(e) => setSwitchTemperature(e.target.checked)}/>
            <label>°F</label>
          </div>
          <div>
            <Switch checked={switchDarkMode} onChange={(e) => setSwitchDarkMode(e.target.checked)}/>
            <label>Dark Mode</label>
          </div>
        </SwitchSC>

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

const SearchBarSC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  &:hover input {
    opacity: 0.8;
  }
  input {
    position: relative;
    width: 80%;
    height: 70px;
    flex-shrink: 0;
    padding-left: 5%;
    border: none;
    border-radius: 24px;
    background: ${(props) => props.switchDarkMode ? '#292724' : '#EDEDEF'};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.switchDarkMode ? '#EDEDEF' : '#424243'};
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 500;
    @media (max-width: 920px) {
    font-size: 12px;
  }
    @media (max-width: 600px) {
    font-size: 10px; 
  }
  }
`;

const ButtonSC = styled.button`
  position: absolute;
  left: 28%;
  color: #424243;
  border: none;
  background: transparent;
  cursor: pointer;
  
`;

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
  div{
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
  p{
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

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: ${(props) => props.switchDarkMode ? '#292724' : '#EDEDED'};
  margin-bottom: 10%;
`;

const DayStatusSC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 10%;
  text-align: center;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  user-select: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 15px; 
  }
`;

const SwitchSC = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-left: 60%;
  margin-top: 5%;
  user-select: none;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  label {
    color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 400;
    @media (max-width: 600px) {
    font-size: 10px; 
  }
  }
`;