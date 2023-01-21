import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import { useState, useEffect } from 'react'
import styles from "./Auth.module.scss"

export default function Auth ({ 
    signUp, 
    login, 
    credentials, 
    handleChangeAuth, 
    token, 
    setToken 
}) {
  const [showSignUp, setShowSignUp] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getToken = () => {
      const token = window.localStorage.getItem('token')
      if (!token || token === 'null' || token === 'undefined') return null
      const payload = JSON.parse(window.atob(token.split('.')[1]))
      if (payload.exp < Date.now() / 1000) {
        window.localStorage.removeItem('token')
        return null
      }
      return token
    }
    const myToken = getToken()
    const data = myToken ? JSON.parse(window.atob(myToken.split('.')[1])).user : null
    setUser(data)
    setToken(myToken)
  }, [])
  return (
    <>
      {user && user.name
        ? <h1 className={styles.h1}>Welcome {user.name.toUpperCase()}</h1>
        : <>
          <button
          className={styles.button}
            onClick={() => {
              setShowSignUp(!showSignUp)
            }}
          > {
                            showSignUp ? 'Sign Up with a New Account or Click here to Login Existing User' : 'Sign in existing user or click here to Create a New Account'
                        }
          </button>

          {
                        showSignUp
                          ? <SignUp
                              credentials={credentials}
                              signUp={signUp}
                              handleChangeAuth={handleChangeAuth}
                            />
                          : <Login
                              credentials={credentials}
                              login={login}
                              handleChangeAuth={handleChangeAuth}
                            />
                    }
        </>}
    </>
  )
}
