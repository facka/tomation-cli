// Entry point for the Tomation starter template
import tomation from 'tomation'
import { LoginSuccessTest, LoginErrorTest } from './tests/login.test'

(() => {
  tomation({
    matches: 'https://facka.github.io/tomation-playground/',
    tests: [
      LoginSuccessTest,
      LoginErrorTest
    ],
    speed: 'NORMAL',
    debug: true,
  });
})() 
