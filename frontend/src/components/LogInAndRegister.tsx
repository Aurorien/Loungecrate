import { useState } from 'react'
import { useLogInStore } from '../utils/store'
import { ApiResponse } from '../utils/interfaces'
import { errorHandling } from '../utils/errorHandling'

function LogInAndRegister() {
  const [formData, setFormData] = useState({
      username: '',
      password: ''
    }),
    [toggleForm, setToggleForm] = useState({
      login: true,
      register: false
    }),
    [errorMessage, setErrorMessage] = useState(''),
    [successMessage, setSuccessMessage] = useState('')

  const { setLoggedIn, setUsername } = useLogInStore()

  const toggleFormFn = () => {
    setToggleForm({
      login: !toggleForm.login,
      register: !toggleForm.register
    })
  }

  const validateForm = () => {
    const usernamePattern = /^[a-zA-Z0-9]+$/
    const passwordPattern = /^[a-zA-Z0-9]+$/

    if (
      !formData.username ||
      formData.username.length < 4 ||
      formData.username.length > 50
    ) {
      setErrorMessage(
        'Registration Failed. Username must be at least 4 and max 50 characters long.'
      )
      return false
    }

    if (!usernamePattern.test(formData.username)) {
      setErrorMessage(
        'Registration Failed. Username can only contain letters (English alphabet) and numbers.'
      )
      return false
    }

    if (!formData.password || formData.password.length < 8) {
      setErrorMessage(
        'Registration Failed. Password must be at least 8 characters long.'
      )
      return false
    }

    if (!passwordPattern.test(formData.password)) {
      setErrorMessage(
        'Registration Failed. Password can only contain letters (English alphabet) and numbers.'
      )
      return false
    }

    setErrorMessage('')
    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    try {
      if (toggleForm.login) {
        await loginUser(formData)
      } else {
        await registerUser(formData)
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    }
  }
  const loginUser = async ({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<void> => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const responseData: ApiResponse = await response.json()

      if (!response.ok && responseData.message) {
        console.error('Login failed:', responseData.message)
        setErrorMessage(responseData.message)
      }

      if (responseData.username && responseData.success) {
        const user_name = responseData.username
        sessionStorage.setItem('username', JSON.stringify(user_name))
        sessionStorage.setItem('loggedIn', JSON.stringify(true))
        setLoggedIn()

        setUsername(user_name)
      }
    } catch (error) {
      errorHandling('POST', 'on Log in', error)
      throw new Error('Failed to log in.')
    }
  }

  const registerUser = async ({
    username,
    password
  }: {
    username: string
    password: string
  }): Promise<void> => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const responseData: ApiResponse = await response.json()

      if (!response.ok) {
        const errorMessage: string =
          responseData.message || 'Registration failed'
        console.error('Registration failed:', errorMessage)
        setErrorMessage(errorMessage)
      } else if (responseData.message) {
        setSuccessMessage(responseData.message)
      }
    } catch (error) {
      errorHandling('POST', 'on Register', error)
      throw new Error(
        'Error registering user: Username already in use, or Internal Server Error'
      )
    }
  }

  return (
    <>
      {toggleForm.login ? (
        <h1 data-testid="login" className="login">
          Log in
        </h1>
      ) : (
        <h1 data-testid="register" className="register">
          Register
        </h1>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          data-testid="username"
          name="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          data-testid="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          data-testid="submit"
          disabled={!formData.username || !formData.password}
        >
          {toggleForm.login ? 'Log In' : 'Register'}
        </button>
        {successMessage && (
          <div data-testid="success-message" className="success-message">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div data-testid="error-message" className="error-message">
            {errorMessage}
          </div>
        )}
      </form>
      <div>
        <div onClick={toggleFormFn}>
          {toggleForm.login ? 'Register' : 'Log In'}
        </div>
      </div>
    </>
  )
}

export default LogInAndRegister
