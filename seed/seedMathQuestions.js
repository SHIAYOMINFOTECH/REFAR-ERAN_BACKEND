const mongoose = require('mongoose');
const MathQuestion = require('./models/MathQuestion');

// MongoDB Connection URI
mongoose.connect('mongodb://127.0.0.1:27017/YOUR_DATABASE_NAME', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error:", err));

const questions = [
  { question: '2 + 3', answer: 5 },
  { question: '8 - 3', answer: 5 },
  { question: '4 * 2', answer: 8 },
  { question: '9 % 2', answer: 1 },
  { question: '6 / 2', answer: 3 },
  { question: '5 + 7', answer: 12 },
  { question: '10 - 6', answer: 4 },
  { question: '7 * 3', answer: 21 },
  { question: '8 % 5', answer: 3 },
  { question: '12 / 3', answer: 4 },
  { question: '9 + 1', answer: 10 },
  { question: '6 - 2', answer: 4 },
  { question: '3 * 5', answer: 15 },
  { question: '10 % 4', answer: 2 },
  { question: '18 / 6', answer: 3 },
  { question: '11 + 9', answer: 20 },
  { question: '4 - 1', answer: 3 },
  { question: '7 * 4', answer: 28 },
  { question: '9 % 3', answer: 0 },
  { question: '15 / 3', answer: 5 },
  { question: '3 + 8', answer: 11 },
  { question: '14 - 5', answer: 9 },
  { question: '6 * 7', answer: 42 },
  { question: '20 % 4', answer: 0 },
  { question: '8 / 4', answer: 2 },
  { question: '17 + 3', answer: 20 },
  { question: '10 - 5', answer: 5 },
  { question: '2 * 6', answer: 12 },
  { question: '16 % 3', answer: 1 },
  { question: '12 / 4', answer: 3 },
  { question: '5 + 5', answer: 10 },
  { question: '20 - 6', answer: 14 },
  { question: '9 * 3', answer: 27 },
  { question: '13 % 4', answer: 1 },
  { question: '15 / 5', answer: 3 },
  { question: '4 + 6', answer: 10 },
  { question: '8 - 2', answer: 6 },
  { question: '6 * 3', answer: 18 },
  { question: '12 % 5', answer: 2 },
  { question: '7 / 1', answer: 7 },
  { question: '10 + 7', answer: 17 },
  { question: '3 - 1', answer: 2 },
  { question: '2 * 8', answer: 16 },
  { question: '19 % 6', answer: 1 },
  { question: '10 / 5', answer: 2 },
  { question: '5 + 6', answer: 11 },
  { question: '14 - 8', answer: 6 },
  { question: '8 * 4', answer: 32 },
  { question: '12 % 7', answer: 5 },
  { question: '20 / 4', answer: 5 },
  { question: '6 + 3', answer: 9 },
  { question: '10 - 3', answer: 7 },
  { question: '3 * 6', answer: 18 },
];

const seedMathQuestions = async () => {
  try {
    await MathQuestion.deleteMany({});
    await MathQuestion.insertMany(questions);
    console.log("✅ Math Questions Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.log("Seeding Error:", err);
    process.exit(1);
  }
};

seedMathQuestions();
