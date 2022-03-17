const bcrypt = require('bcrypt')
const korisniciRouter = require('express').Router()
const Korisnik = require('../models/korisnik')

korisniciRouter.get('/', async (req, res) => {
    const korisnici = await Korisnik.find({}).populate('filmovi')
    res.json(korisnici)
  })

korisniciRouter.post('/', async (req, res) => {
    const sadrzaj = req.body

    const runde = 10
    const passHash = await bcrypt.hash(sadrzaj.pass, runde)

    const postoji=await Korisnik.findOne({username: sadrzaj.username})
    if(postoji){
        return res.status(401).json({
            error: 'Već postoji korisnik'
        })
    }
    else{
        const korisnik = new Korisnik({
            username: sadrzaj.username,
            ime: sadrzaj.ime,
            passHash: passHash,
            _id:sadrzaj._id
        })
    
        const noviKorisnik = await korisnik.save()
        res.json(noviKorisnik)
    }
    
})

module.exports = korisniciRouter