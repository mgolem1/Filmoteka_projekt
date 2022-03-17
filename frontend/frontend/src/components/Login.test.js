
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import LoginForm from "./LoginForma"
import App from "../App";
import React from 'react';
import {jest} from '@jest/globals';




export function getUserInfo() {
  const userInfo = window.sessionStorage.getItem('prijavljeniKorisnik');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return {};
}

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});
describe('getUserInfo', () => {
      beforeEach(() => {
        window.sessionStorage.clear();
        jest.restoreAllMocks();
      });
      test('should get user info from session storage', () => {
        const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
        window.sessionStorage.setItem('prijavljeniKorisnik', JSON.stringify({username: "mirna", pass: "tajna"}));
        const actualValue = getUserInfo();
        expect(actualValue).toEqual({username: "mirna", pass: "tajna"});
        expect(getItemSpy).toBeCalledWith('prijavljeniKorisnik');
      });
    
      test('should get empty object if no user info in session storage', () => {
        const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
        const actualValue = getUserInfo();
        expect(actualValue).toEqual({});
        expect(window.sessionStorage.getItem).toBeCalledWith('prijavljeniKorisnik');
        expect(getItemSpy).toBeCalledWith('prijavljeniKorisnik');
      });

      test("button submit pritisnut",()=>{
        const {debug, getByText} = render(<LoginForm/>)
        expect(getByText('Prijava').tagName).toBe('BUTTON') //Looks for an element with the text Submit, just for the sake of being different.
        const jsdomAlert = window.alert;
         window.alert = () => {};
         fireEvent.click(getByText('Prijava'))
        return(expect(fireEvent.click(getByText('Prijava'))).toBeTruthy())
        window.alert = jsdomAlert;
      })

      test("ako se korisnik prijavio",()=>{
            window.sessionStorage.setItem('prijavljeniKorisnik', JSON.stringify({username: "mirna", pass: "tajna"}));
            const korisnik = getUserInfo();
            const komp = render(<LoginForm></LoginForm>)
            expect(komp.container).toHaveTextContent("Dobro došli")
      })
    });
