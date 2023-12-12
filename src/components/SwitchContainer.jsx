import styled from "styled-components";
import Switch from '@mui/material/Switch';
import { useContext } from 'react';

import { AppContext } from "../context/AppContext";

export default function SwitchContainer() {
  const { switchTemperature, setSwitchTemperature, switchDarkMode, setSwitchDarkMode } = useContext(AppContext);

  return (
    <>
      <SwitchSC switchDarkMode={switchDarkMode}>
        <div>
          <Switch checked={switchTemperature} onChange={(e) => setSwitchTemperature(e.target.checked)} />
          <label>°F</label>
        </div>
        <div>
          <Switch checked={switchDarkMode} onChange={(e) => setSwitchDarkMode(e.target.checked)} />
          <label>Dark Mode</label>
        </div>
      </SwitchSC>
    </>
  );      
}

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
