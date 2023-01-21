import styles from "./Login.module.scss"

export default function Login ({
  credentials,
  // setCredentials,
  handleChangeAuth,
  login
}) {
  return (
    <>
      <h2>Login</h2>
      <form 
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault()
        login()
      }}
      >
        Email: <input type='text' value={credentials.email} name='email' onChange={handleChangeAuth} />
        Password: <input type='type' value={credentials.password} name='password' onChange={handleChangeAuth} />
        <input className={styles.button} type='submit' value='Login User' />
      </form>
    </>

  )
}
