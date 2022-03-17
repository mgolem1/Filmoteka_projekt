import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render,fireEvent} from '@testing-library/react'
import Film from "../components/Film"



test('renderira film', () => {
const film = {
    naziv: 'test',
    zanr:'triler',
    datum: new Date(),
    stanje:'Posudba',
    kolicina:2,
    korisnik:"62224799353b4ff6c54022f7"
   
    }
    const komponenta = render(
        <Film naziv={film.naziv} zanr={film.zanr} ></Film>)
    expect(komponenta.container).toHaveTextContent('test')
})
const onClick = jest.fn()

test('Brisanje podataka', () => {
        const {komponenta,getByText} = render(
            <Film></Film>)
        fireEvent.click(getByText('Briši'))
        expect(fireEvent.click(getByText('Briši'))).toBeTruthy()
    
})
test('Uredi podataka', () => {
    const {komponenta,getByText} = render(
        <Film></Film>)
    fireEvent.click(getByText('Uredi'))
    expect(fireEvent.click(getByText('Uredi'))).toBeTruthy()

})