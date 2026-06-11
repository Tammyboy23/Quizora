# Quizora ❓

Quizora is a modern quiz application built with React, Vite, and Express. It lets users browse quizzes, take timed practice or exam-style sessions, create new quizzes, and explore a growing collection of quiz content.

You can view the live demo here: [Quizora](https://quizora-tammy.netlify.app)

## ✨ Features

- Browse and explore available quizzes
- Take quizzes in Practice Mode or Exam Mode
- Select the number of questions before starting
- Track quiz scores and progress
- Create new quizzes from a topic or subject
- Use an AI-powered quiz generation flow when an API key is available
- View and manage profile-related information

## 🛠️ Tech Stack

- Frontend: React, Vite, React Router, React Icons
- Backend: Node.js, Express
- Data: JSON-based quiz storage
- AI Quiz Generation: Groq API (optional)

## 📁 Project Structure

- Frontend/: React app and quiz UI
- backend/: Express server and routes
- backend/quiz.json: Shared quiz data store

## ▶️ Getting Started

### 1. Install dependencies

Frontend
```bash
cd Frontend
npm install
```

Backend
```bash
cd backend
npm install
```

### 2. Start the backend

```bash
cd backend
node app.js
```

### 3. Start the frontend

```bash
cd Frontend
npm run dev
```

The app should now be available in your browser.

## 🔐 Environment Variables

If you want AI quiz generation to work, add an API key to your backend environment:

```bash
API_KEY=your_groq_api_key_here
```

If no API key is provided, the app will still create a fallback quiz locally.

## 🧠 How it Works

- The frontend communicates with the Express backend through API routes.
- Quiz data is stored in JSON and served to the Explore and Quiz pages.
- The Create page sends a request to generate a quiz and saves it so it appears in Explore immediately.

## 📌 Notes

This project was originally built as a mini project for academic use and has since grown into a functional quiz platform with quiz creation and exploration features.