import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import Loader from '../Loader';
import Main from '../Main';
import Quiz from '../Quiz';
import Result from '../Result';
import Login from '../Login';
import Signup from '../Signup';
import { shuffle } from '../../utils';
import Leaderboard from '../Result/Leaderboard';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = (email) => {
    // This is just a mock login for demonstration purposes.
    console.log("Logged in as", email);
    setIsAuthenticated(true);
  };

  const handleSignup = (username, password) => {
    // For demonstration, just log the signup credentials and switch to login.
    console.log("Signed up:", username, password);
    setIsSignupMode(false);
  };

  const startQuiz = (data, countdownTime) => {
    setLoading(true);
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = resultData => {
    setLoading(true);

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <Router>
        <Routes>

          {/* This Route will only render if `isSignupMode` is true */}
          {!isAuthenticated && !isSignupMode && 
            <Route exact path='/quiz-app/signup' element={<Signup onSignup={handleSignup} />} />
          }

          {!isAuthenticated  && 
            <Route exact path='/quiz-app/' element={<Login onLogin={handleLogin} />} />
          }
  
          {/* Other authenticated routes */}
          {isAuthenticated && !loading && !isQuizStarted && !isQuizCompleted && 
            <Route exact path='/quiz-app/main' element={<Main startQuiz={startQuiz} />} />
          }
          
          {isAuthenticated && !loading && isQuizStarted && 
            <Route exact path='/quiz-app/quiz' element={<Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />} />
          }
  
          {isAuthenticated && !loading && isQuizCompleted && 
            <Route exact path='quiz-app/result' element={<Result {...resultData} />} />
          }
          <Route path="/quiz-app/leaderboard" element={<Leaderboard />} />
          
          <Route path="*" element={<Loader/>} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
