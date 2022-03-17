import React, {useState,useEffect} from 'react'


const LoginStr = (props) =>{
    
    const [korisnik, postaviKorisnika] = useState();
    useEffect(()=>{
      const saved = sessionStorage.getItem("prijavljeniKorisnik");
      const value = JSON.parse(saved);
      postaviKorisnika(value)
    },[])
    
   const logout=()=>{
    sessionStorage.clear();
   }
      return (
          <div>
        {(korisnik===null)?(
            <h2>Odjavljeni ste</h2>
        ):(
        <button onClick={logout()}>Log Out</button>
      )}
      </div>
      )
}
export default LoginStr