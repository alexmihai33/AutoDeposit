import './App.css'

import Hero from './components/Hero'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Piese from './components/Piese';
import Clients from './components/Clients';
import Comenzi from './components/Comenzi';
import Header from './components/Header';


function App() {

  return (
    <BrowserRouter>
      <div id="app" className="d-flex flex-column h-100">
        <Header />
        <Container className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/piese" element={<Piese />} />
            <Route path="/clienti" element={<Clients />} />
            <Route path="/comenzi" element={<Comenzi />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>

  )
}

export default App
