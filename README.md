# LanguageQuiz

This is a programming Language quiz website using REACT, JAVASCRIPT, Express and Nodejs.

User First needs to register/Login, then routes in backend will check if data is valid. After that user can choose in which category they want to test their knowledge. They can also select difficulty level, no. of questions and can also set timer for the quiz. To see wheter user is Logged in or not I have used JWT Authentication. Then, we will fetch data for user from quiz database. After we will call result route to store user result in user database.

If user is Loggedin then they can also see Leaderboard based on different Langauges. The person with most points will be on the top along with total points and accuracy.

I created 2 data base to handle the data 
1. UserSchema --> Username, Email, password, score 
2. QuizSchmea --> Quiz questions

Once the user has completed the quiz or if his/her time is over then their Grades will be calculated and result will be declared under 'Result' secction. After this the user can see the correct answer for the quiz questions under 'Q&A' section

Frontend wil run on http://localhost:3000/quiz-app

Backend will run on http://localhost:8000/

