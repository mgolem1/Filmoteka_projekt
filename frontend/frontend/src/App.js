import React from 'react';
import {  BrowserRouter as Router,  Routes,  Route,Link  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Login from './components/LoginForma'
import Novifilm from './components/FilmForna'
import Home from "./components/Home"
import NotFound from './components/NotFound';
import FilmoviSvi from './components/TablicaForma'
import Logout from "./components/LogOut"
import  Container from 'react-bootstrap/Container';

const App=()=>{
  const padding = { padding: 5, color: '#bdbdbd' };
    return(
      <Router>
      <div>
      <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Filmoteka</Navbar.Brand>
              <Nav className="mr-auto">
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/login">Log In</Link>
                <Link style={padding} to="/novifilmovi">Novi film</Link>
                <Link style={padding} to="/svifilmovi">Svi filmovi</Link>
                <Link style={padding} to="/logout">Log Out</Link>
              </Nav>
            </Container>
          </Navbar>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/novifilmovi' element={<Novifilm/>}>
          </Route>
          <Route path='/svifilmovi' element={<FilmoviSvi/>}>
          </Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route element={<NotFound/>}></Route>
        </Routes>
      </div>
    </Router>
    )
  
}
export default App;