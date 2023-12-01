import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from './context/AppContext';
import HomePage from "./pages/HomePage"

export default function App() {

  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
    </>
  )
}