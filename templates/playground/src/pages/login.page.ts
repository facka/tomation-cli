import { is, innerTextIs } from 'tomation'

// --- Login Page Elements ---

// Username input field (id="username-input")
export const usernameInput = is.identifiedBy('username-input')
  .as('Username Input')

// Password input field (id="password-input")
export const passwordInput = is.identifiedBy('password-input')
  .as('Password Input')

// Login button identified by its visible text
export const loginButton = is.BUTTON
  .where(innerTextIs('Login'))
  .as('Login Button')

// Status label that shows the result of the login attempt (id="login-status")
export const loginStatus = is.identifiedBy('login-status')
  .as('Login Status')
