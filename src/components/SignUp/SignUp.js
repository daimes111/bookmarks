import styles from "./SignUp.module.scss"

export default function SignUp ({
  credentials,
  handleChangeAuth,
  signUp
}) {
  return (
    <>
      <h2>Sign Up</h2>
      <form 
      className={styles.form}
      onSubmit={(evt) => {
        evt.preventDefault()
        signUp()
      }}
      >
        Email: <input type='text' value={credentials.email} name='email' onChange={handleChangeAuth} />
        Password: <input type='text' value={credentials.password} name='password' onChange={handleChangeAuth} />
        Name: <input type='text' value={credentials.name} name='name' onChange={handleChangeAuth} />
        <input className={styles.button} type='submit' value='Create New User' />
      </form>
    </>
  )
}
