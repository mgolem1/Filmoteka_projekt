import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import SignUpForm from "./SignUpForma"
import React from 'react';



  test('pritisak button za signup', () => {
      const component = render(<SignUpForm></SignUpForm>)
            const btn = component.getByText("Registriraj se")
        
            fireEvent.click(btn)
            expect(fireEvent.click(btn)).toBeTruthy()
 
  })