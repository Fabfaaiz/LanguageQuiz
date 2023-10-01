import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/signin',{
          method:"POST",
          credentials: "include",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
            email:email,
            password:password,
          })
        })
        const data = await res.json();
         console.log(data);
        if(data.status === 422 || data.status === 400 || data.error){
          window.alert(data.error);
          console.log('Inavalid Login');
        }
        else{
          window.alert('Login Successful');
          console.log('Login Success');
          navigate('/quiz-app/main');
          onLogin(email);
        }
      
    };
  
    return (
        <div>
            <div className='image'>
                <section className="vh-100 bg-image">
                    <div className="mask d-flex align-items-center gradient-custom-3">
                        <div className="container h-100 p-3">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Login</h2>
                                            <form method='POST'>
                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://media.istockphoto.com/id/1188904068/vector/mail-post-envelope-icon-shape-postage-logo-symbol-e-mail-communication-sign-button-vector.jpg?s=612x612&w=0&k=20&c=6Q9FMZpSdWRic5dfbEQFA4X3CQPT6tyejWVENbhnjZE=' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="email" name ='email' onChange={(e) => setEmail(e.target.value)} id="form3Example3cg" className="form-control form-control-lg" placeholder='Your Email' />
                                                </div>

                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://static.vecteezy.com/system/resources/thumbnails/002/335/856/small/password-lock-icon-free-vector.jpg' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="password" name='password'onChange={(e) => setPassword(e.target.value)} id="form3Example4cg" className="form-control form-control-lg" placeholder='Password' />
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    
                                                    <button type="button"
                                                        className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Login </button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">Want to create an account? <Link to="/quiz-app/signup"
                                                    className="fw-bold text-body"><u>Register Here</u></Link></p>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
  }
  
  export default Login;