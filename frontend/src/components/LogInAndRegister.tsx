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
    [errorMessage, setErrorMessage] = useState('')

  const { setLoggedIn, setUsername } = useLogInStore()

  const toggleFormFn = () => {
    setToggleForm({
      login: !toggleForm.login,
      register: !toggleForm.register
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

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

      if (!response.ok) {
        const responseData: ApiResponse = await response.json()
        if (responseData.message) {
          console.error('Login failed:', responseData.message)
          setErrorMessage(responseData.message)
        } else {
          throw new Error('Login failed')
        }
        return
      }

      const responseData: ApiResponse = await response.json()
      if (responseData.username) {
        const user_name = responseData.username

        if (responseData.success) {
          sessionStorage.setItem('username', JSON.stringify(user_name))
          sessionStorage.setItem('loggedIn', JSON.stringify(true))
          setLoggedIn()

          setUsername(user_name)
        }
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

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const responseData: ApiResponse = await response.json()
      if (responseData.success) {
        console.log('Username:', responseData.username)
      } else {
        console.error('Registration failed:', responseData.message)
      }
    } catch (error) {
      errorHandling('POST', 'on Register', error)
      throw new Error('Error registering user')
    }
  }

  return (
    <>
      {toggleForm.login ? (
        <h1 className="login">Log in</h1>
      ) : (
        <h1 className="register">Register</h1>
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
