import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css';
import api from '../api'



const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',

})
const navigate = useNavigate()
const [ error, setError] = useState(false)
const[errorMessage, setErrorMessage] = useState('')

const displayError = (error) => {
  setError(true)
  setErrorMessage(error)
}

 const changeInputHandler = (e) => {
  setUserData(prevState => {
    return {...prevState, [e.target.name]: e.target.value}
  })
 }
 

 const handleSignin = (e) => {
  e.preventDefault();
  console.log("signinsubmitted");
  console.log(userData);

  api.post('/login', {
    email: userData.email,
    password: userData.password
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        const accessToken = response.data.access_token
        console.log(accessToken)
        localStorage.setItem("ACCESS_TOKEN", accessToken)
        navigate('/');
      } else {
        displayError('Incorrect username or password');
      }
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response && error.response.status === 401) {
        displayError('Incorrect username or password');
      } else {
        displayError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin} className="form register__form">
          <p className={`form_error-message ${error ? 'visible': ''}`}>
           {errorMessage}
          </p>
          <input type="text" placeholder='Email'  name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
          <input type="password" placeholder='Password'  name='password' value={userData.password} onChange={changeInputHandler} autoFocus/>
         <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account ?<Link to='/register'>Sign Up</Link></small>
      </div>
    </section>
  )
}

export default Login;