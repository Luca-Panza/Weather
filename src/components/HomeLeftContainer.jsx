import styled from "styled-components"
import Switch from '@mui/material/Switch';
import { RotatingLines } from 'react-loader-spinner';
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

import coatLogo from "../assets/coat.png"
import searchIcon from "../assets/search.svg"
import { AppContext } from "../context/AppContext";

export default function HomeLeftContainer() {

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [switchDarkMode, setSwitchDarkMode] = useState(false);
  const { data , setData, switchTemperature , setSwitchTemperature } = useContext(AppContext);
  const inputRef = useRef(null);

  const tempUnit = switchTemperature ? '°F' : '°C';
  const minTempCelsius = data?.main?.temp_min;
  const minTemp = minTempCelsius !== undefined ? (switchTemperature ? celsiusToFahrenheit(minTempCelsius).toFixed(1) : minTempCelsius.toFixed(1)) : null;
  
  //Função para converter Celsius para Fahrenheit
  function celsiusToFahrenheit(tempCelsius) {
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
  
    const cityToSearch = cityName || inputValue;
  
    console.log(cityToSearch);
    setInputValue('');
  
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    console.log(apiKey);
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=${apiKey}&units=metric`;
    axios.get(urlWeather)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error('Erro ao obter a temperatura atual:', error);
      });
  }

  function getWeatherDescriptionAndColor(weatherMain) {
    const weatherTypes = {
      Clear: { text: "Céu aberto", color: "orange" },
      Clouds: { text: "Nublado", color: "gray" },
      Rain: { text: "Chovendo", color: "blue" },
      Snow: { text: "Nevando", color: "lightgray" },
      Thunderstorm: { text: "Tempestade", color: "purple" },
      Drizzle: { text: "Chuviscando", color: "lightblue" },
      Mist: { text: "Neblina", color: "lightgray" }
    };
  
    return weatherTypes[weatherMain] || { text: "", color: "black" };
  }

  return (
    <>
      <HomeLeftContainerSC>

        <HeaderSC>
          <img src={coatLogo} alt="Logo"></img>
          <h1>Levo um casaquinho?</h1>
        </HeaderSC>

        <SearchBarSC>
          <input type="text" ref={inputRef} placeholder="Procure por uma cidade" onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} value={inputValue} ></input>
          <ButtonSC type="submit" onClick={clickHandler}>
            <img src={searchIcon} alt="Search" />
          </ButtonSC>
        </SearchBarSC>

        <WeatherStatusSC>
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

        <DayStatusSC>
          <Line />
          <p>{date}</p>
          <p>{time}</p>
        </DayStatusSC>

        <SwitchSC>
          <div>
            <Switch checked={switchTemperature} onChange={(e) => setSwitchTemperature(e.target.checked)}/>
            <label>°F</label>
          </div>
          <div>
            <Switch checked={switchDarkMode} onChange={(e) => setSwitchDarkMode(e.target.checked)}/>
            <label>Dark Mode</label>
          </div>
        </SwitchSC>

        <FooterSC>
          <p>Todos os direitos reservados. 2023.</p>
        </FooterSC>
        
      </HomeLeftContainerSC>
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
  background-color: #ffffff;
`;

const HeaderSC = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 25px;
  user-select: none;

  img {
    object-fit: contain;
    width: 20%;
    margin-right: 3%;
    margin-left: 6%;
  }

  h1 {
    color: #222;
    width: 75%;
    font-family: 'Poppins', sans-serif;
    font-size: 3vw;
    font-weight: 600;
  }
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
    background: #EDEDEF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    color: #424243;
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
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
  div{
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  > img {
    user-select: none;
  }
  > p {
  color: #EC6E4C;
  font-family: 'Poppins', sans-serif;
  font-size: 70px;
  font-style: normal;
  font-weight: 300;
  }
  }
  p{
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px; 
  }
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #EDEDED;
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
  color: #222;
  user-select: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
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
    color: #222;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 400;
  }
`;

const FooterSC = styled.footer`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 10%;
  margin-top: 5%;
  user-select: none;

  p {
    color: #222;
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    font-weight: 400;
    line-height: 48px;
  }
`;
