import styled from "styled-components"

import HomeLeftContainer from "./components/HomeLeftContainer"
import HomeRightContainer from "./components/HomeRightContainer"

export default function App() {

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