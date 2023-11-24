import styled from "styled-components"
import Switch from '@mui/material/Switch';
import { useState, useEffect  } from "react"

import coatLogo from "../assets/coat.png"
import searchIcon from "../assets/search.svg"

export default function HomeLeftContainer() {

  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [switchTemperature, setSwitchTemperature] = useState(false);
  const [switchDarkMode, setSwitchDarkMode] = useState(false);

  //Código para pegar a data e hora atual

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      
      const formattedDate = now.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
      let dayOfWeek = now.toLocaleDateString('pt-BR', { weekday: 'long' });
      dayOfWeek = `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)},`; // Adicionando vírgula após o dia da semana
      
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

    /*axios.post(`${import.meta.env.VITE_API_URL}/signIn`, {email, password})

        .then((res) => {
          setUser(res.data)
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data));

          }) 
        .catch(e => alert(e.response.data.message));*/

    }

  return (
    <>
      <HomeLeftContainerSC>
        <HeaderSC>
          <img src={coatLogo} alt="Logo"></img>
          <h1>Levo um casaquinho?</h1>
        </HeaderSC>
        <SearchBarSC>
          <input type="text" placeholder="Procure por uma cidade" onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} value={inputValue} ></input>
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
    font-style: normal;
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
    font-style: normal;
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
  background-color:yellow;
  margin-top: 5%;
`;

const DayStatusSC = styled.div`
  width: 60%;
  height: 10%;
  user-select: none;

  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #222;

  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const SwitchSC = styled.div`
  width: 100%;
  height: auto;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left:60%;
  margin-top: 5%;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  label {
    color: #222;

    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px;
  }
`;

const FooterSC = styled.footer`
  width: 100%;
  height: 10%;
  background-color:yellow;
  margin-top: 5%;

  display: flex;  
  align-items: flex-end;
  justify-content: center;
  user-select: none;
  
  p{
    color: #222;

font-family: Poppins;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
  }
  `;