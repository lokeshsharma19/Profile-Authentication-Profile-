# Dev Game

## Overview
**Dev Game** is an interactive MERN stack application designed for developers to test and enhance their coding skills through a series of quizzes and challenges. The game leverages advanced functionalities like JWT authentication, MongoDB complex queries, and browser console exploration to create a unique and engaging experience.

## Main Features
- **Developer Quiz Game**: Users can play an interactive game where they solve developer-themed quizzes to progress through levels.
  - **Console Challenges**: Hidden keys are placed in the browser console. Developers need to find these keys to move forward in the game.
  - **Leveling System**: Progress through different levels by solving increasingly challenging questions.
  - **Leaderboard**: The game features a leaderboard where scores are calculated based on the **time taken** to complete quizzes and the **difficulty level** of the quiz.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Complex MongoDB Queries**: Efficient and optimized queries are used to handle game data and user progression.
- **Token Management**: Access tokens are stored in local storage, and refresh tokens are securely managed in cookies.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with complex query optimization
- **Authentication**: JSON Web Tokens (JWT) for secure user sessions

## How It Works
1. **Register and Login**: Users sign up and log in using JWT-based authentication.
2. **Play the Game**: Once logged in, users can start the **Dev Game**. They will find clues and keys in the browser console, which are essential to progressing through the game.
3. **Solve Quizzes**: Each level contains developer-themed quizzes that players need to solve to advance.
4. **Leaderboard**: The scores are calculated based on:
   - The **time taken** to complete each quiz.
   - The **level of difficulty** of each quiz.
   - Scores are displayed on a leaderboard, showing how players rank against each other.

