import React, {useState,useEffect} from 'react'
import filmAkcija from "../services/filmovi"
import registracijaAkcija from "../services/noviKorisnik"
import '../styles/login.css'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const SignUpForma = () => {
  const [username, postaviUsername] = useState("");
    const [ime, postaviIme] = useState("");
    const [pass, postaviPass] = useState("");
    const [password2, setPassword2] = useState("")
    const [korisnik, postaviKorisnika] = useState();


    useEffect(()=>{
      const saved = sessionStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(saved);
      postaviKorisnika(value)
    },[])

    
    window.onunload = function () {
      sessionStorage.removeItem('prijavljeniKorisnik');  
    }
    const changePassword2 = (e) => {
      setPassword2(e.target.value)
  }
    const userSignUp = async (e) => {
        e.preventDefault();
        if (password2 === pass) {
          const korisnik = await registracijaAkcija.registracija({
            username,
            ime,
            pass,
          });
          window.sessionStorage.setItem(
            "prijavljeniKorisnik",
            JSON.stringify(korisnik)
          );
          filmAkcija.postaviToken(korisnik.token);
          postaviKorisnika(korisnik);
          postaviUsername("");
          postaviIme("")
          postaviPass("");

        } else {
          alert("razlicite lozike")
      }
      
      };

  return(
    <div className="container">
      {(korisnik===null)?(
        <Form onSubmit={userSignUp}>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username: </Form.Label>
          
          <Form.Control type="text" value={username} name="Username" placeholder="username" className="form-control" onChange={(e)=>postaviUsername(e.target.value)} ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ime i prezime:</Form.Label>
          <Form.Control type="text" value={ime} name="Ime" placeholder="ime i prezime" className="form-control" onChange={(e)=>postaviIme(e.target.value)} ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={pass} name="Pass" placeholder="password" className="form-control" onChange={(e)=>postaviPass(e.target.value)} ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Type password again to confirm:</Form.Label>
          <Form.Control type="password" value={password2}  placeholder="password" onChange={changePassword2} />
          </Form.Group>
        <Button className="button-primary" type="submit">Registriraj se</Button>
        
      </Form>):(
          <h2>Dobro došli {ime}</h2>
        )}
    </div>
  
)};

export default SignUpForma;