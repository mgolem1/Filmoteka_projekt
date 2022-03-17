const Film = require('../models/film')	
const Korisnik = require('../models/korisnik')	

const pocetniFilmovi = [
    {
      id: 1,
      naziv: 'The Godfather',
      zanr:'triler',
      datum: '2019-05-30T17:30:31.098Z',
      stanje:'Povrat',
      kolicina:2,
      korisnik:"62224799353b4ff6c54022f7"
    },
    {
      id: 2,
      naziv: 'The Godfather 2',
      zanr:'triler',
      datum: '2019-05-30T18:39:34.091Z',
      stanje:'Posudba',
      kolicina: 1,
      korisnik:"62224799353b4ff6c54022f7"
    },
    {
      id: 3,
      naziv: 'Mr. Nobody',
      zanr:'psihološki triler',
      datum: '2019-05-30T19:20:14.298Z',
      stanje:'Posudba',
      kolicina: 1,
      korisnik:"62224799353b4ff6c54022f7"
    }
  ]

const filmoviIzBaze = async () => {
  const filmovi = await Film.find({})
  return filmovi.map(p => p.toJSON())
}

const korisniciUBazi = async () => {
  const korisnici = await Korisnik.find({})
  return korisnici.map(k => k.toJSON())
}


module.exports = {
  pocetniFilmovi, filmoviIzBaze, korisniciUBazi
}