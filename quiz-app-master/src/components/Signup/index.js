import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confpassword, setConfPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the onSignup function with username and password
      const res = await fetch('http://localhost:8000/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
          Username:username,
          email:email,
          password:password,
          confpassword: confpassword
        })
      })
      const data = await res.json();
      console.log("Above Data"); 
      console.log(data);
       console.log("Below Data");
      if(data.status === 422 || data.error){
        window.alert(data.error);
        console.log('Invalid Register');
      }
      else{
        window.alert('Register Successful');
        console.log('Register Success');
        navigate('/quiz-app/');
      }
    onSignup(username, password);
  };

  return (
      <div className='image'>
                <section className="vh-100 bg-image">
                    <div className="mask d-flex align-items-center gradient-custom-3">
                        <div className="container h-100 p-3">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Register</h2>
                                            <form method='POST'>
                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://media.istockphoto.com/id/1188904068/vector/mail-post-envelope-icon-shape-postage-logo-symbol-e-mail-communication-sign-button-vector.jpg?s=612x612&w=0&k=20&c=6Q9FMZpSdWRic5dfbEQFA4X3CQPT6tyejWVENbhnjZE=' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="name" name ='Username' onChange={(e) => setUsername(e.target.value)} id="form3Example3cg" className="form-control form-control-lg" placeholder='Username' />
                                                </div>

                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://media.istockphoto.com/id/1188904068/vector/mail-post-envelope-icon-shape-postage-logo-symbol-e-mail-communication-sign-button-vector.jpg?s=612x612&w=0&k=20&c=6Q9FMZpSdWRic5dfbEQFA4X3CQPT6tyejWVENbhnjZE=' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="email" name ='email' onChange={(e) => setEmail(e.target.value)} id="form3Example3cg" className="form-control form-control-lg" placeholder='Your Email' />
                                                </div>

                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://static.vecteezy.com/system/resources/thumbnails/002/335/856/small/password-lock-icon-free-vector.jpg' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="password" name='password'onChange={(e) => setPassword(e.target.value)} id="form3Example4cg" className="form-control form-control-lg" placeholder='Password' />
                                                </div>
                                                <div className="form-outline mb-4" style={{ display: 'flex' }}>
                                                    <img src='https://static.vecteezy.com/system/resources/thumbnails/002/335/856/small/password-lock-icon-free-vector.jpg' alt='' style={{ width: '50px', height: '50px' }} />
                                                    <input type="password" name='password'onChange={(e) => setConfPassword(e.target.value)} id="form3Example4cg" className="form-control form-control-lg" placeholder='confirm Password' />
                                                </div>


                                                <div className="d-flex justify-content-center">
                                                    <button type="button"
                                                        className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>
                                                        Register
                                                    </button>
                                                </div>

                                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/quiz-app/"
                                                    className="fw-bold text-body"><u>Login here</u></Link></p>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
  );
}

export default Signup;
