import styled from "styled-components"

import HomeLeftContainer from "../patterns/HomeLeftContainer"
import HomeRightContainer from "../patterns/HomeRightContainer"

export default function HomePage() {

  return (
    <>
    <HomeContainerSC>
      <HomeLeftContainer />
      <HomeRightContainer /> 
    </HomeContainerSC>
    </>
  )
}

const HomeContainerSC = styled.div`
  width: 100vw;
  height:100vh;

  display: flex;
  align-items: center;
`