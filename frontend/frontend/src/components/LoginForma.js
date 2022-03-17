import React, {useState,useEffect} from 'react'
import filmAkcija from "../services/filmovi"
import prijavaAkcije from "../services/login"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import '../styles/login.css'
import SignUpForma from './SignUpForma';


const LoginForma = () => {
  const [username, postaviUsername] = useState("");
  const [pass, postaviPass] = useState("");
  const [view, setView] = useState(true)

  const chng = () => {
      setView(!view)
  }
    const [korisnik, postaviKorisnika] = useState();
    useEffect(()=>{
      const saved = sessionStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(saved);
      postaviKorisnika(value)
    },[])
    console.log(sessionStorage)
    
    window.onunload = function () {
      sessionStorage.removeItem('prijavljeniKorisnik');    
    }

    const userLogin = async (e) => {
        e.preventDefault();
        try {
          const korisnik = await prijavaAkcije.prijava({
            username,
            pass,
          });
          console.log(username)
          sessionStorage.setItem(
            "prijavljeniKorisnik",
            JSON.stringify(korisnik)
          );
          console.log(korisnik)
          filmAkcija.postaviToken(korisnik.token);
          postaviKorisnika(korisnik);
          postaviUsername("");
          postaviPass("");
        } catch (exception) {
          alert("Neispravni podaci");
        } 
      };
      console.log(korisnik)
      if(view){
  return (
  <div className="container">
     {(korisnik===null)?(
        <Form onSubmit={userLogin}>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" value={username} name="Username" placeholder="username" className="form-control" onChange={(e)=>postaviUsername(e.target.value)} ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password: : </Form.Label>
            <Form.Control type="password" value={pass} name="Pass" placeholder="password" className="form-control" onChange={(e)=>postaviPass(e.target.value)}></Form.Control>
          </Form.Group>
          <Button className="button-primary" type="submit" id="loginButton">Prijava</Button>
          <br></br>
                <span>Don't have an account?</span>
                <Button variant="outline-primary" size="sm" onClick={chng}>Create one</Button>

        </Form>):(
          <h2>Dobro došli</h2>
        )}
  </div>
)}
else{
  return (
    <div className="container">
        <SignUpForma></SignUpForma>
        <br></br>
        <span>Changed your mind?</span>
        <Button variant="outline-primary" size="sm" onClick={chng}>Back to log in</Button>
    </div>
)
}

};

export default LoginForma;