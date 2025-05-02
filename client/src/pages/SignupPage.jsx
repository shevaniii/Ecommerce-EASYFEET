import React from 'react'

const SignupPage = () => {
  return (
    <div>
      <form>
        <label for='username'></label>
        <input type='text' placeholder='enter username' required /><br />
        <label for='email'></label>
        <input type='email' placeholder='enter email' required /><br />
        <label for='password'></label>
        <input type='password' placeholder='enter password' required /><br />
        <input type ='submit' value='submit' />
        <button >login</button>
      </form>
    </div>
  )
}

export default SignupPage
