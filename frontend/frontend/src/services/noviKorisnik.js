import axios from 'axios'
const osnovniUrl = '/api/korisnici'

const registracija = async podaci => {
    return axios.post(osnovniUrl, podaci)
}

export default {registracija}