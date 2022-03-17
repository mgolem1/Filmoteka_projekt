import React, {useState,useEffect} from 'react'
import filmAkcija from "../services/filmovi"
import Film from "../components/Film"
import "../styles/Novi.css"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

const TablicaForma = () =>{
  
  const [ film, noviFilm ] = useState([])
  const [korisnik, postaviKorisnika] = useState();
  const [filtrirani,setFiltrirani]=useState([])

    useEffect(()=>{
      const saved = sessionStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(saved);
      postaviKorisnika(value)
    },[postaviKorisnika])
    useEffect(()=>{
      filmAkcija.dohvatiSve().then((res) => noviFilm(res.data));
      
    },[])
    useEffect(()=>{
    filmAkcija.dohvatiSve().then((res) => setFiltrirani(res.data));
  },[])

    const Filtracija=(value)=>{
      
      if(value=="Posudba"){
        noviFilm(filtrirani.filter(t => t.stanje=="Posudba"))
      }
      else if(value=="Povrat"){
        noviFilm(filtrirani.filter(t => t.stanje=="Povrat"))
      }
      else{
        filmAkcija.dohvatiSve().then((res) => noviFilm(res.data));
      }
    }
  const brisiFilm = (id) => {
    try{
      filmAkcija.brisi(id)
      .then(response => {
          noviFilm(film.filter(t => t.id !== id))})
          .then(response => {
            setFiltrirani(filtrirani.filter(t => t.id !== id))
          //filmAkcija.dohvatiSve().then((res) => setFiltrirani(res.data));
      })
    } catch (exception) {
      alert("Ne možete brisati tuđe filmove samo vlastite");
    }
    
  }
  
  const urediFilm = (id) => {
    const filmic = film.find(t => t.id === id)
    let stariKolicina = filmic.kolicina;
   let noviKolicina = prompt(`Unesite novu kolićinu filma za ${filmic.kolicina}:`)
  
    const modFilm = {
        ...filmic,
        kolicina: noviKolicina == null ? stariKolicina : noviKolicina
    }
  
    filmAkcija.osvjezi(id, modFilm)
        .then(response => {
            noviFilm(film.map(t => t.id !== id ? t : response.data))
        })
  }
  const [posuđeno, noviPosudeno] = useState(0);
  useEffect(() => {
      let sumaPosudeno = 0;
      let sumaVraceno = 0;
      let nizPosudeno = film.filter(t => t.stanje === 'Posudba');
      let nizVraceno = film.filter(t => t.stanje === 'Povrat');
      nizPosudeno.forEach(t => sumaPosudeno += Number(t.kolicina));
      nizVraceno.forEach(t => sumaVraceno += Number(t.kolicina));
      noviPosudeno(sumaPosudeno - sumaVraceno)
  }, [film])

return(
    <div>
      {(korisnik!==null)?(
         <><Button className='btn btn-secondary' size="sm" value='Posudba' onClick={() => {
        Filtracija("Posudba")
      } }>Samo posuđeni</Button><Button className='btn btn-secondary' size="sm" value='Povrat' onClick={() => {
        Filtracija("Povrat")
      } }>Samo vračeni</Button><Button className='btn btn-secondary' size="sm" value="Svi" onClick={() => {
        Filtracija("Svi")
      } }>Svi filmovi</Button>
      <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>NAZIV FILMA</th>
              <th>ŽANR</th>
              <th>DATUM</th>
              <th>STANJE</th>
              <th>KOLIČINA</th>
            </tr>
          </thead>
          <tbody>
            {film.map((t) => <Film key={t.id} naziv={t.naziv} zanr={t.zanr} datum={t.datum} stanje={t.stanje} kolicina={t.kolicina}
              uredi={() => urediFilm(t.id)}
              brisi={() => brisiFilm(t.id)} />)}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td id="td">Ukupno:</td>
              <td>{posuđeno}</td>
            </tr>
          </tfoot>
        </Table></>):(
          <h2>Morate se prijaviti!</h2>
        )}
        
        </div>
)}
export default TablicaForma;