const mongoose = require('mongoose')

const filmSchema =  new mongoose.Schema({
  naziv: {
    type: String,
    minlength: 5,
    require:true
  },
  zanr: {
    type: String,
    required: true
  },
  datum: {
    type: Date,
    required:true
  },
  stanje: {
    type: String,
    minlength: 5,
   
  },
  kolicina: {
    type: Number,
    max:5,
    require:true
  },
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Korisnik"
  }
})

filmSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Film', filmSchema, 'filmovi')
