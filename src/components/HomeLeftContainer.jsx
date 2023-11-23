import styled from "styled-components"

import coatLogo from "../assets/coat.png"

export default function HomeLeftContainer() {

  return (
    <>
      <HomeLeftContainerSC>
        <HeaderSC>
          <img src={coatLogo} alt="Logo"></img>
          <h1>Levo um casaquinho?</h1>
        </HeaderSC>
        <SearchBarSC>
          <input type="text" placeholder="Procure por uma cidade"></input>
          <ButtonSC type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 38 40" fill="none">
              <path d="M17.508 29.0741C22.7625 29.0741 27.0221 24.4311 27.0221 18.7037C27.0221 12.9763 22.7625 8.33334 17.508 8.33334C12.2535 8.33334 7.9939 12.9763 7.9939 18.7037C7.9939 24.4311 12.2535 29.0741 17.508 29.0741Z" stroke="#8B9CAF" strokeWidth="1.55556" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M29.4006 31.6667L26.5464 28.5555" stroke="#8B9CAF" strokeWidth="1.55556" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ButtonSC>
        </SearchBarSC>
      </HomeLeftContainerSC>
    </>
  )      
}

const HomeLeftContainerSC = styled.div`
  width: 35%;
  height:100%;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderSC = styled.header`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;

  margin-top: 25px;
  user-select: none;
  img{
    width: 20%;
    object-fit: contain;
    margin-right: 3%;
    margin-left: 6%;
  }
  h1{
    width: 75%;
    color: #222;

    font-family: 'Poppins', sans-serif;
    font-size: 3vw;
    font-style: normal;
    font-weight: 600;
  }
`;

const SearchBarSC = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;

  &:hover input {
    opacity: 0.8;
  }
  input{
    position: relative;
    width: 80%;
    height: 70px;
    flex-shrink: 0;

    border: none;
    border-radius: 24px;
    background: #EDEDEF;

    box-shadow: 0px 24px 48px 0px rgba(49, 79, 124, 0.08);


    padding-left: 5%; 
    color: #424243;

    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
`;

const ButtonSC = styled.button`
  position: absolute;
  font-size: 40px;
  border: none;
  background: transparent;
  color: #424243;
  cursor: pointer;

  left: 29%;

`;


