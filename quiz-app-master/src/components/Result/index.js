import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

import Stats from './Stats';
import QNA from './QNA';

const Result = ({
  category,
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  useEffect(() => {
    // Define the function to make the API call
    const postResults = async () => {
        try {
            const response = await fetch('http://localhost:8000/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // If you're using authentication, include the necessary headers
                },
                body: JSON.stringify({
                    category: category,
                    totalQuestions: totalQuestions,
                    correctAnswers: correctAnswers,
                }),
                // Include credentials if you are using cookies
                credentials: 'include'
            });

            const data = await response.json();
            console.log(data);
            
        } catch (error) {
            console.error("Error posting results:", error);
        }
    };

    // Call the function
    postResults();

}, []);  // Empty dependency array means this useEffect will run once when the component is loaded.

  const handleTabClick = (e, { name }) => {
    setActiveTab(name);
  };

  return (
    <Container>
      <Menu fluid widths={2}>
        <Menu.Item
          name="Stats"
          active={activeTab === 'Stats'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name="QNA"
          active={activeTab === 'QNA'}
          onClick={handleTabClick}
        />
      </Menu>
      {activeTab === 'Stats' && (
        <Stats
          category ={category}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
        />
      )}
      {activeTab === 'QNA' && <QNA questionsAndAnswers={questionsAndAnswers} />}
      <br />
    </Container>
  );
};

Result.propTypes = {
  category : PropTypes.string.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default Result;
