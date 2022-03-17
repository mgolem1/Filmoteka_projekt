import React, {useState,useEffect} from 'react'
import filmAkcija from "../services/filmovi"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const FilmForma = (props) => {
    const [ naziv, noviNaziv ] = useState('')
    const [ zanr, noviZanr ] = useState('')
    const [ stanje, novaStanje ] = useState('Posudba')
    const [ kolicina, novaKolicina ] = useState('')
    const [ film, novFilm ] = useState([])
    const [korisnik, postaviKorisnika] = useState(null);
    

    useEffect(()=>{
      const saved = sessionStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(saved);
      postaviKorisnika(value)
    },[])
    window.onunload = function () {
      sessionStorage.removeItem('prijavljeniKorisnik');  
    }
      
      const promjenaNaziv = (e) => {
        noviNaziv(e.target.value)
      }
      
      const promjenaZanr= (e) => {
        noviZanr(e.target.value) 
      }
      
      const promjenaStanja = (e) => {
        novaStanje(e.target.value)
      }
      const promjenaKolicine = (e) => {
        novaKolicina(e.target.value)
      }

    
    const noviFilm = (e) => {
       try{
        e.preventDefault();
        var datum = new Date();
        e.preventDefault()
        const noviObjekt = {
         // id: film.length + 1,
          naziv: naziv,
          datum: datum.getFullYear()+'-'+datum.getMonth()+'-'+datum.getDate(),
          zanr: zanr,
          stanje: stanje,
          kolicina:kolicina
      }
        filmAkcija.stvori(noviObjekt).then((res) => {
        novFilm(film.concat(res.data))})
        noviNaziv('')
        noviZanr('')
        novaStanje('Posudba')
        novaKolicina('')
        alert("Uspješn dodan film!")
       }catch (exception) {
        window.alert("Nuspješno!");
  }}
  
  return (
    <div>
      
      {(korisnik!==null)?(
      <Form onSubmit={noviFilm} id="form">
              <Form.Label>Naziv filma: </Form.Label>
              <Form.Control type='text'value={naziv} onChange={promjenaNaziv} className="input1" placeholder="name..."></Form.Control><br></br>
              <Form.Label>Žanr: </Form.Label>
              <Form.Control as="select" onChange={promjenaZanr} value={zanr}>
              <option>Choose...</option>
              <option>Triler</option>
              <option>Komedija</option>
              <option>Misterija</option>
              <option>Romantika</option>
              <option>Horor</option>
              <option>Akcija</option>
              <option>Avantura</option>
              <option>Anime</option>
            </Form.Control><br></br>
              <Form.Label>Količina filma: </Form.Label>
              <Form.Control type='text'value={kolicina} onChange={promjenaKolicine} className="input2" placeholder='količina...'></Form.Control><br></br>
              <Form.Label>Vrsta troška:</Form.Label><br/>
              <input type='radio' value='Posudba' checked={stanje==='Posudba'} onChange={promjenaStanja}/><Form.Label>Posudba</Form.Label>
              <input type='radio' value='Povrat' checked={stanje==='Povrat'} onChange={promjenaStanja}/><Form.Label>Povrat</Form.Label><br/>
              
              <Button className='button-primary' type="submit">Submit</Button>
              <Button className='button-primary' size="sm" onClick={
                ()=>{
                  novFilm('')
                  noviZanr('')
                  novaStanje('Posudba')
                  novaKolicina('')

                }
              }>Cancel</Button>
              
          
          </Form>):(
            <h2>Morate se prijaviti</h2>
          )}
    </div>
  );
};
export default FilmForma;