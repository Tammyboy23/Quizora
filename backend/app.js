const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/dashboard')
const quizRouter = require('./routes/quiz')
const exploreRouter = require('./routes/explore')
const createRouter = require('./routes/create')
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use('/dashboard', userRouter);
app.use('/quiz', quizRouter );
app.use('/explore', exploreRouter);
app.use('/create', createRouter);



app.listen(PORT, () => {
    console.log("Quizora Server Running")
})