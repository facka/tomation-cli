import { is, innerTextIs, Task, Type, TypePassword, Click } from 'tomation'

// --- Login Page Elements ---

// Username input field (id="username-input")
const usernameInput = is.identifiedBy('username-input')
  .as('Username Input')

// Password input field (id="password-input")
const passwordInput = is.identifiedBy('password-input')
  .as('Password Input')

// Login button identified by its visible text
const loginButton = is.BUTTON
  .where(innerTextIs('Login'))
  .as('Login Button')

// Status label that shows the result of the login attempt (id="login-status")
const loginStatus = is.identifiedBy('login-status')
  .as('Login Status')

// --- Login Actions ---

// Function to perform a login action with given credentials
const login = Task('Login', (params: { username: string, password: string }) => {
  const { username, password } = params
  Type(username).in(usernameInput)
  TypePassword(password).in(passwordInput)
  Click(loginButton)
})

export default {
  // UI Elements
  usernameInput,
  passwordInput,
  loginButton,
  loginStatus,
  // Actions
  login
} 