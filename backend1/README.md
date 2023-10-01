To run this on local computer

Install all the dependencies in package.json
Then run node app.js

I created 2 schema 1. Userschema
                   2. QuizSchema

First when user register, it checks that all details should be filled correctly, similar for Login route. After that we use jwt token to authenticate the user once logged in. Then, we will fetch data for user quiz from quiz database. After we will call result route to store user result in user database. Also there is Leadderboard route to display all user in descending order of their points in each categories.

Server will run on localhost:8000 on your pc. 


