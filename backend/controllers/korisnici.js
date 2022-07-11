const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    const korisnik = new Korisnik({
            username: sadrzaj.username,
            ime: sadrzaj.ime,
            passHash: passHash,
            _id:sadrzaj._id
        })
        
         korisnik.save( ( err ) => {
                         if( err ){
                            return console.log( err );
                         } else{
                            return console.log( 'You have registered successfully' );
                         }
                      } );
        
        //console.log(token)
        
        

    
        const userToken = {
            username: korisnik.username,
            id: korisnik._id
        }

        const token = jwt.sign(userToken, process.env.SECRET)
        
    res.status(200).send({
            token:token, username: korisnik.username, ime: korisnik.ime,_id:korisnik._id
        })
})

module.exports = korisniciRouter