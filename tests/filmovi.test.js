const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const pomocni = require('./test_pomocni')

const api = supertest(app)

const Film = require('../models/film')

const auth = {
  "username": "mirna",
  "pass": "tajna"
}
  beforeEach( async () => {
    await Film.deleteMany({})
    let objektFilm = new Film(pomocni.pocetniFilmovi[0])
    await objektFilm.save()
    objektFilm = new Film(pomocni.pocetniFilmovi[1])
    await objektFilm.save()
    objektFilm = new Film(pomocni.pocetniFilmovi[2])
    await objektFilm.save()
  })

test('filmovi se vraćaju kao JSON', async () => {
 
  const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token
  await api
    .get('/api/filmovi')
    .auth(token, { type: 'bearer' })
    .expect(200)
    .expect('Content-Type', /application\/json/)    
})

test('dohvaća sve filmove korisnika', async () => {
  const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token
  const odgovor = await api.get('/api/filmovi').auth(token, { type: 'bearer' })

  expect(odgovor.body).toHaveLength(pomocni.pocetniFilmovi.length)
})

test('specificni naziv filma', async () => {
  const rez = await api.post("/api/login").send(auth)
  const token = rez.body.token
  const odgovor = await api.get('/api/filmovi').auth(token, { type: 'bearer' })

  const naziv = odgovor.body.map(p => p.naziv)
  expect(naziv).toContain('The Godfather')
})

test('dodavanje ispravnog filma', async () => {
    const noviFilm = {
      naziv: 'Seven',
      zanr:'psihološki triler',
      datum: '2019-05-30T19:20:14.298Z',
      stanje:'Posudba',
      kolicina: 1,
      korisnik:"6222474200918c751fe08b58"
    }
    const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token

    await api.post("/api/filmovi").
    send(noviFilm)
    .auth(token, { type: 'bearer' })
    .expect(200).expect('Content-Type', /application\/json/)

    const filmoviKraj = await pomocni.filmoviIzBaze()
    expect(filmoviKraj).toHaveLength(pomocni.pocetniFilmovi.length + 1)

    const naziv = filmoviKraj.map(p => p.naziv)    
    expect(naziv).toContain('Seven')
  
  })

  test('dodavanje filma bez naslova', async () => {
    const novifilm = {    
        zanr:'triler',
        datum: '2019-05-30T17:30:31.098+00:00',
        stanje:'Povrat',
        kolicina: 2,
        korisnik:"621f9d8929a1df6851025267"
    }
    const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token
    await api
    .post('/api/filmovi')
    .send(novifilm)
    .auth(token, { type: 'bearer' })
    .expect(400)  
  
    const filmKraj = await pomocni.filmoviIzBaze()
    expect(filmKraj).toHaveLength(pomocni.pocetniFilmovi.length)  
  
  })

  test('dohvat specificnog filma', async () => {
    const filmPoc = await pomocni.filmoviIzBaze()
    const trazeniFilm = filmPoc[0]

    const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token

  
    const odgovor = await api
    .get(`/api/filmovi/${trazeniFilm.id}`)
    .auth(token, { type: 'bearer' })
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const jsonPoruka = JSON.parse(JSON.stringify(trazeniFilm))
    expect(odgovor.body).toEqual(jsonPoruka)
  })

  test('ispravno brisanje filma', async () => {
    const filmPoc = await pomocni.filmoviIzBaze()
    const filmZaBrisanje = filmPoc[1]
    
    const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token

    await api
      .delete(`/api/filmovi/${filmZaBrisanje.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)
      
    

    const filmKraj = await pomocni.filmoviIzBaze()
    expect(filmKraj).toHaveLength(filmPoc.length - 1)
  
    const naziv = filmKraj.map(p => p.naziv)
    expect(naziv).not.toContain(filmZaBrisanje.naziv)
  
  })

  test("azuriranje filma", async () => {
    const podaci = await pomocni.filmoviIzBaze()
    const azurirani = {
      naziv: 'Mr. Nobody',
      zanr:'psihološki triler',
      stanje:'Posudba',
      kolicina: 3
    }
    //zatrazit token
    const rez = await api.post("/api/login").send(auth)
    const token = rez.body.token

    const nakon = await api.put("/api/filmovi/" + podaci[2].id).send(azurirani).auth(token, { type: 'bearer' })

    const objekt = {
        ...nakon.body,
        naziv: 'Mr. Nobody',
      zanr:'psihološki triler',
      stanje:'Posudba',
      kolicina: 3
    }
    expect(nakon.body).toEqual(objekt)

})


afterAll(() => {
  mongoose.connection.close()
})