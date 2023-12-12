import styled from "styled-components";
import { useState, useEffect, useContext } from 'react';

import { AppContext } from "../context/AppContext";

export default function DayStatusContainer() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { switchDarkMode } = useContext(AppContext);

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

  return (
    <>
      <DayStatusSC switchDarkMode={switchDarkMode}>
        <Line switchDarkMode={switchDarkMode}/>
        <p>{date}</p>
        <p>{time}</p>
      </DayStatusSC>
    </>
  );
}

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: ${props => props.switchDarkMode ? '#292724' : '#EDEDED'};
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
  color: ${props => props.switchDarkMode ? '#ffffff' : '#222'};
  user-select: none;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 15px; 
  }
`;
