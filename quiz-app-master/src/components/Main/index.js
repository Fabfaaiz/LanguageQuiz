import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('SQL');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('Easy');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);
    const API1 = `https://quizapi.io/api/v1/questions?apiKey=YeXjOlyNYf08PeD0WW5OAWqYQ9UmZU9GPfdIer4U&category=${category}&limit=${numOfQuestions}&difficulty=${difficulty}`
    fetch(API1)
      .then(respone => respone.json())
      .then(data =>
        setTimeout(() => {
          setProcessing(false);
          startQuiz(
            data,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  const fetchData1 = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz-data', {
          method: 'GET',
          credentials: 'include', // This is necessary to handle cookies.
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      let data = await response.json();
      console.log(category);
      console.log(difficulty);
      const filteredData = data.filter(item => item.category === category && item.difficulty === difficulty);
      console.log(filteredData);
      data = filteredData.slice(0,numOfQuestions);
      console.log(data);
      setTimeout(() => {
      setProcessing(false);
          startQuiz(
            data,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)

  } catch (error) {
      console.error('Error fetching data:', error);
      setTimeout(() => {
        if (!navigator.onLine) {
          setOffline(true);
        } else {
          setProcessing(false);
          setError(error);
        }
      }, 1000)
  }
}


  if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>Programming Quiz</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Link to='/quiz-app/quiz'>
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Start Quiz'}
                  onClick={fetchData1}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
              </Link>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
