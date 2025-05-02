import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <form>
        <label for='email'></label>
        <input type='email' placeholder='enter email' required /><br />
        <label for='password'></label>
        <input type='password' placeholder='enter password' required /><br />
        <input type ='submit' value='login' />
        <input type='reset' value ='clear' />
      </form>
    </div>
  )
}

export default LoginPage
