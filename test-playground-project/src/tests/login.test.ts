import { Test, Assert, Click, Type, TypePassword } from 'tomation'
import LoginPage from '../pages/login.page'

// Test: successful login with valid credentials
export function LoginSuccessTest() {
  Test('Login success', () => {
    // Enter valid credentials
    LoginPage.login({ username: 'admin', password: '1234' })

    // Expect the status label to show "Success"
    Assert(LoginPage.loginStatus).textIs('Success')
  })
}

// Test: failed login with invalid credentials
export function LoginErrorTest() {
  Test('Login error', () => {
    // Enter invalid credentials
    LoginPage.login({ username: 'wrong-user', password: 'wrong-pass' })

    // Expect the status label to show "Error"
    Assert(LoginPage.loginStatus).textIs('Error')
  })
}
