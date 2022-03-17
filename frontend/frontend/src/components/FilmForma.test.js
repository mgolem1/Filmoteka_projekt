import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Novifilmovi from "./FilmForna"


test("regenerira se ovi podatak",()=>{
  window.sessionStorage.clear()
  window.sessionStorage.setItem('prijavljeniKorisnik', JSON.stringify({username: "mirna", pass: "tajna"}));
  const {komponenta,getByText} = render(
    <Novifilmovi></Novifilmovi>)
  fireEvent.click(getByText('Submit'))
  expect(fireEvent.click(getByText('Submit'))).toBeTruthy()
      })
