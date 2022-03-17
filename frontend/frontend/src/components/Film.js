import React from "react";

const Film = (props) => {
    return(
        <tr>
            <td>{props.naziv}</td>
            <td>{props.zanr}</td>
            <td>{props.datum}</td>
             <td>{props.stanje}</td>
             <td>{props.kolicina}</td>
             <td>
                <button onClick={props.uredi} id="button-uredi">Uredi</button>
                <button onClick={props.brisi} id="button-brisi">Briši</button>
                
            </td> 
        </tr>
    )
}

export default Film