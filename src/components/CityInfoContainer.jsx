import { useContext } from "react";
import styled from "styled-components";

import { AppContext } from "../context/AppContext";

export default function CityInfo() {
  const { data, switchDarkMode } = useContext(AppContext);

  const cityName = data?.name;
  const cityLat = data?.coord?.lat?.toFixed(2); 
  const cityLon = data?.coord?.lon?.toFixed(2);

  return (
    <>
      <CityInfoSC switchDarkMode={switchDarkMode}>
        {cityName}
        <CoordsSC switchDarkMode={switchDarkMode}>Lat: {cityLat} Long: {cityLon}</CoordsSC>
      </CityInfoSC>
    </>
  )
}

const CityInfoSC = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 60px;
  font-style: normal;
  font-weight: 300;
  line-height: 60px;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  margin-top: 5%;
  margin-left: 5%;
  user-select: none;

  @media (max-width: 800px) {
    font-size: 50px;
  }

  @media (max-width: 620px) {
    font-size: 40px; 
  }
`;

const CoordsSC = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  color: ${(props) => props.switchDarkMode ? '#ffffff' : '#222'};
  margin-top: 1%;
  margin-left: 1%;
  user-select: none;
`;
