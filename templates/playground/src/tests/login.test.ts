import { Test, Assert, Click, Type, TypePassword } from 'tomation'
import { usernameInput, passwordInput, loginButton, loginStatus } from '../pages/login.page'

// Test: successful login with valid credentials
export function LoginSuccessTest() {
  Test('Login success', () => {
    // Enter valid credentials
    Type('admin').in(usernameInput)
    TypePassword('1234').in(passwordInput)
    Click(loginButton)

    // Expect the status label to show "Success"
    Assert(loginStatus).textIs('Success')
  })
}

// Test: failed login with invalid credentials
export function LoginErrorTest() {
  Test('Login error', () => {
    // Enter invalid credentials
    Type('wrong-user').in(usernameInput)
    TypePassword('wrong-pass').in(passwordInput)
    Click(loginButton)

    // Expect the status label to show "Error"
    Assert(loginStatus).textIs('Error')
  })
}
