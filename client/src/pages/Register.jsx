import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css';
import api from '../api'




const Register = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname:'',
    email: '',
    password: '',
    confirmpassword:'',
})

const navigate  = useNavigate()

const handleSignUp = (e) => {
  e.preventDefault()
  console.log("signUp submitted")
  
  if(userData.password !== userData.confirmpassword) {
    displayError('passwords do not match');
  }  
    api.post('/signup',{
      firstname:userData.firstname,
      lastname:userData.lastname,
      email:userData.email,
      password:userData.password,
      confirm_password:userData.confirmpassword
    }).then((response)=> {
      console.log(response)
     alert("Signin Succesfull")
     navigate('/login')
    }).catch((e) => {
      displayError(e.response.data["error"])
      console.log(e.response.data["error"])
    })
;}


 const changeInputHandler = (e) => {
  setUserData(prevState => {
    return {...prevState, [e.target.name]: e.target.value}
  })
 
 }

const [ error, setError] = useState(false)

const[errorMessage, setErrorMessage] = useState('')
const displayError = (error) => {
  setError(true)
  setErrorMessage(error)
}
  return (
    <section className="register">
      <div className="container">
        <h2>Sign up</h2>
        <form onSubmit={handleSignUp} className="form register__form">
          <p className={`form_error-message ${error ? 'visible': ''}`}>
            {errorMessage}
          </p>
          <input type="text" placeholder='First name'  name='firstname' value={userData.firstname} onChange={changeInputHandler} autoFocus required/>
          <input type="text" placeholder='Last name'  name='lastname' value={userData.lastname} onChange={changeInputHandler} autoFocus required/>
          <input type="email" placeholder='Email'  name='email' value={userData.email} onChange={changeInputHandler} autoFocus required/>
          <input type="password" placeholder='Password'  name='password' minLength={8} value={userData.password} onChange={changeInputHandler} autoFocus required/>
          <input type="password" placeholder='Confirm Password' minLength={8} name='confirmpassword' value={userData.confirmpassword} onChange={changeInputHandler} autoFocus required/>
         <button type='submit' className='btn primary'>SignUp</button>
        </form>
        <small>Already have an account ?<Link to='/login'>Sign In</Link></small>
      </div>
    </section>
  )
}

export default Register