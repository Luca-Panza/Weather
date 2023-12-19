import styled from "styled-components";
import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import searchIcon from "../assets/search.svg";
import { AppContext } from "../context/AppContext";

export default function SearchBarContainer() {
  
  const [inputValue, setInputValue] = useState('');
  const { setData, switchDarkMode } = useContext(AppContext);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  const getCityFromCoordinates = (latitude, longitude) => {
    const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;
    const urlGeocoding = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geocodingApiKey}`;

    axios.get(urlGeocoding)
      .then(response => {
        const city = response.data.results[0].components.city;
        clickHandler(null, city);
      })
      .catch(error => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao obter a temperatura atual.',
          confirmButtonText: 'Ok',
          background: switchDarkMode ? '#2d2d2d' : '#fff',
          color: switchDarkMode ? '#fff' : '#2d2d2d',
          confirmButtonColor: switchDarkMode ? '#4e4e4e' : '#7cd1f9'
        });
    });
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      clickHandler(e);
    }
  };

  const clickHandler = (e, cityName = null) => {
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
        Swal.fire({
          title: 'Cidade não encontrada',
          text: 'Não foi possível encontrar a cidade. Tente digitar novamente.',
          confirmButtonText: 'Ok',
          background: switchDarkMode ? '#2d2d2d' : '#fff',
          color: switchDarkMode ? '#fff' : '#2d2d2d',
          confirmButtonColor: switchDarkMode ? '#4e4e4e' : '#7cd1f9'
        });
      });
  };

  return (
    <>
      <SearchBarSC switchDarkMode={switchDarkMode}>
        <input 
          type="text" 
          ref={inputRef} 
          placeholder="Procure por uma cidade" 
          onChange={e => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown} 
          value={inputValue} 
        />
        <ButtonSC type="submit" onClick={clickHandler}>
          <img src={searchIcon} alt="Search" />
        </ButtonSC>
      </SearchBarSC>
    </>
  );      
}

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
    user-select: none;
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
