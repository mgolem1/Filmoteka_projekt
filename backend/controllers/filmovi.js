const filmoviRouter=require('express').Router()
const Film=require('../models/film')
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const dohvatiToken = req => {
  const auth = req.get('authorization')
  console.log(auth)
  if (auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7)
  }
  return null
}

filmoviRouter.get('/', async (req, res) => {
  /*const filmovi = await Film.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(filmovi)*/


    const podatak = req.body
    const token = dohvatiToken(req)
    console.log(token+".................2")
    if(token){
          const dekToken = jwt.verify(token, process.env.SECRET)
          if (!token || !dekToken.id){
            return res.status(401).json({error: 'Neispravni token'})
          }
          const korisnik = await Korisnik.findById(dekToken.id)
          const filmovi = await Film.find({})
       
        if(filmovi.length===0){
          return res.status(400).json({error: 'Još nema upisanih filmova'})}
        const id=korisnik._id
       
        
        const slanje=await filmovi.map((f)=>{
          if(id==f.korisnik.valueOf()){
            return f
          }
        })
        var filtered = slanje.filter(function (el) {
          return el != null;
        });
          
          res.json(filtered)
    }
    else{
          const filmovi = await Film.find({})
        .populate('korisnik', { username: 1, ime: 1 })
        if(filmovi.length!==0){
          res.json(filmovi)
        }
        else{
          return res.status(400).json({error: 'Još nema upisanih filmova'})
        }
    }
})


filmoviRouter.get('/:id', async(req, res, next) => {

      //auth
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "pogresan token" })
    }

    const korisnik = await Korisnik.findById(dekToken.id)
    const id = req.params.id

    var p = await Film.findById(id)

    if (p && String(p.korisnik) === String(korisnik._id)) {
        res.status(200).json(p).end()
    }
    else {
        res.status(404).end()
    }
  })

  filmoviRouter.delete('/:id',async  (req, res) => {
    const token = dohvatiToken(req)
    const id = req.params.id
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'Neispravni token'})
    }

    const korisnik = await Korisnik.findById(dekToken.id)
    const originalniPodatak = await Film.findById(id)
    if (String(korisnik._id) !== String(originalniPodatak.korisnik)) {
        return res.status(401).json({ error: "niste autor podatka" })
    }

    //brisi
    await Film.findByIdAndRemove(id)

    //brisi i id iz korisnikove liste podataka
    korisnik.podaci = korisnik.filmovi.filter(p => String(p) != String(originalniPodatak._id))
    await korisnik.save()

    res.status(204).end()

    
      
  })
  
  filmoviRouter.put('/:id', (req, res,next) => {
    const podatak = req.body
    
    const id = req.params.id
  
    const filmic = new Film({
      _id:id,
        naziv: podatak.naziv,
        znar: podatak.zanr,
        datum: new Date(),
        stanje:podatak.stanje,
        kolicina:podatak.kolicina
      })
  
    Film.findByIdAndUpdate(id,filmic, {new: true})
    .then( noviFilm => {
      res.json(noviFilm)
    })
    .catch(err => next(err))
  
  })
  
  filmoviRouter.post('/',async  (req, res, next) => {
    
    const podatak = req.body
    const token = dohvatiToken(req)
    console.log(token)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'Neispravni token'})
    }
    const korisnik = await Korisnik.findById(dekToken.id)
    if(korisnik){
      const film = new Film({
        naziv: podatak.naziv,
        zanr: podatak.zanr,
        datum: new Date(),
        stanje:podatak.stanje,
        kolicina:podatak.kolicina,
        korisnik: korisnik._id
    })
    if(!podatak.naziv){
      return res.status(400).json({
        error: 'Nedostaje naziv'
      })
    }
    if(!podatak.kolicina){
      return res.status(400).json({
        error: 'Nedostaje kolićina!'
      })
    }
  
    const spremljeniFilm = await film.save()
    korisnik.filmovi = korisnik.filmovi.concat(spremljeniFilm._id)
    await korisnik.save()

  res.json(spremljeniFilm)
    }
    else{
      res.status(400).json({error:"Morate se prijaviti"});
    }
    
  })
  
  module.exports = filmoviRouter