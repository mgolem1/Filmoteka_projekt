const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Kada imamo samo jednog korisnika u bazi', () =>{
  beforeEach(async () => {
    await Korisnik.deleteMany({})

    const passHash = await bcrypt.hash('tajna', 10)
    const korisnik = new Korisnik({ime: 'mgolem1', username: 'mirna', passHash})
    await korisnik.save()
  })

  test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'jopa',
      ime: 'jopa',
      pass: 'jopa'
    }

    await api
    .post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  })

  test('ispravno vraca pogresku ako vec postoji username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()
    const novi = {
      username: 'mirna',
      ime: 'jopa',
      pass: 'jopa'
    }

    const rezultat = await api
    .post('/api/korisnici')
    .send(novi)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    expect(rezultat.body.error).toContain('Već postoji korisnik')

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length)
  })  

})

afterAll(() => {
    mongoose.connection.close()
  })