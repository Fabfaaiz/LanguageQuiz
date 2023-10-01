import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';
import { Link } from 'react-router-dom';

const Quiz = ({ data, countdownTime, endQuiz }) => {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [mf,setmf]=useState(0); 
  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
  };
  const handleNext = () => {
    let point = 0;
    let real_answer='', real_option='';
    Object.entries(data[questionIndex].correct_answers).map(([key, value]) => {
      if (value === 'true') {
          real_option = key.split('_')[1].toUpperCase();
      }})

      Object.entries(data[questionIndex].answers).map(([key, value]) => {
        if (value !== null && (key.split('_')[1].toUpperCase() === real_option)) {
            real_answer = value;
        }
  })

  
  
    if (userSlectedAns === real_answer) {
      if(data[questionIndex].difficulty === 'Easy') {
        point = 1;
      }

      else if(data[questionIndex].difficulty === 'Medium'){
        point=3;
      }
    
      else if(data[questionIndex].difficulty ==='Hard'){
        point=5;
      } 
    }
    if(data[questionIndex].difficulty ==='Hard'){setmf(5) }

    else if(data[questionIndex].difficulty ==='Medium') {setmf(3)}

    else if(data[questionIndex].difficulty ==='Easy') {setmf(1)}

    const qna = questionsAndAnswers;
    console.log("  ");
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      // correct_answer: he.decode(data[questionIndex].correct_answer),
      correct_answer: real_answer,
      point
    });
    console.log('Questions',data.length *mf);
    console.log(data[0].category);
    if (questionIndex === data.length - 1) { 
      return endQuiz({
        category: data[0].category,
        totalQuestions: data.length * mf,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna
      })
      ;
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = timeTaken => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers
    });
  };

  return (
    <Item.Header>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {Object.entries(data[questionIndex].answers).map(([key, value]) => {
                      if (value !== null) {
                        const letter = key.split('_')[1].toUpperCase();
                        const decodedOption = value;
                        return (
                          <Menu.Item
                            key={decodedOption}
                            name={decodedOption}
                            active={userSlectedAns === decodedOption}
                            onClick={handleItemClick}
                          >
                            <b style={{ marginRight: '8px' }}>{letter}</b>
                            {decodedOption}
                          </Menu.Item>
                        );
                      }
                      return null; // It's good practice to return null if not rendering anything
                    })}

                  </Menu>
                </Item.Meta>
                <Divider />
                <Link to ={data.length -1 === questionIndex?`/quiz-app/result`:`/quiz-app/quiz`}>
                <Item.Extra>
                  <Button
                    primary
                    content="Next"
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSlectedAns}
                  />
                </Item.Extra>
                </Link>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired
};

export default Quiz;
