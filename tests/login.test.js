const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('prijava korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const prijava = {
        username: "mirna",
        pass: "tajna"
      }

    await api
    .post('/api/login')
    .send(prijava)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(prijava.username)
  })


  afterAll(() => {
    mongoose.connection.close()
  })