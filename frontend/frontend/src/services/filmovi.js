import axios from 'axios'

const osnovniUrl = '/api/filmovi'

let token = null
const postaviToken = (noviToken) => {
    token = `bearer ${noviToken}`
}


const dohvatiSve = async() => {   
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.get(osnovniUrl, config)
    return odgovor
}
 
const stvori = async noviObjekt => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = id => {
    const config = {
        headers: {Authorization: token}
    }
    return axios.delete(`${osnovniUrl}/${id}`, config)
}
 
export default { dohvatiSve, stvori, osvjezi, brisi, postaviToken}