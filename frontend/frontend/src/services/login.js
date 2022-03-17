import axios from 'axios'
const osnovniUrl = '/api/login'
const islogin=()=>{
  return true;
}
const prijava = async podaci => {
  
  const odgovor = await axios.post(osnovniUrl, podaci)
  return odgovor.data
}

export default {prijava,islogin}