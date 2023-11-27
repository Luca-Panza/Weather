import styled from "styled-components"
import Switch from '@mui/material/Switch';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import coatLogo from "../assets/coat.png"
import searchIcon from "../assets/search.svg"

export default function HomeLeftContainer() {

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [switchTemperature, setSwitchTemperature] = useState(false);
  const [switchDarkMode, setSwitchDarkMode] = useState(false);
  const inputRef = useRef(null);

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
  

  //Código para enviar input usando enter

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      clickHandler(e);
    }
  }

  //Código para enviar input usando botão

  function clickHandler (e) {
		e.preventDefault();

    console.log(inputValue);
    setInputValue('');

    const apiKey = import.meta.env.VITE_API_KEY;
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  
      axios.get(urlWeather)
      .then(response => {
        console.log('Temperatura Atual:', response.data);
        setData(response.data);
        console.log(data);
      })
      .catch(error => {
        console.error('Erro ao obter a temperatura atual:', error);
      });
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
          
        </WeatherStatusSC>

        <DayStatusSC>
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
    box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);
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
  background-color: yellow;
  margin-top: 5%;
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
