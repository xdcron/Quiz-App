import { useState } from "react";
import quizQuestions from "./questions";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  function handleStartQuiz() {
    setStartQuiz(true);
  }

  return (
    <div className="container">
      <Heading />
      {!startQuiz && <StartQuiz onStartQuiz={handleStartQuiz} />}
      {startQuiz && <Question setStartQuiz={setStartQuiz} />}
    </div>
  );
}

function Heading() {
  return <h1>THE GREATEST QUIZ EVER</h1>;
}

function Question({ setStartQuiz }) {
  const [question, setQuestion] = useState(quizQuestions[0]);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const isCorrect = answer === question.answer;

  function handleNextQuestion(e) {
    e.preventDefault();
    if (!answer) return;
    setQuestion(quizQuestions[question.questionNumber]);
    isCorrect ? setScore((scr) => scr + 1) : setScore(score);
    console.log(score);
    console.log(question);
    setAnswer(null);
  }

  function handleSkip() {
    setQuestion(quizQuestions[question.questionNumber]);
  }

  function handleFinish() {
    if (question.questionNumber === quizQuestions.length) {
      isCorrect ? setScore((scr) => scr + 1) : setScore(score);
      setShowResults(true);
    }
  }

  function handleReset() {
    setStartQuiz(false);
    setQuestion(quizQuestions[0]);
    setAnswer(null);
    setScore(0);
    setShowResults(false);
  }

  function handleMessage() {
    if (score > quizQuestions.length / 2 && score < quizQuestions.length)
      return "Not Bad at all 😌🧐🦁";
    if (score < quizQuestions.length / 2)
      return "better luck next time 😢😭😥🤡";
    if (score === quizQuestions.length)
      return "WOW Amazing, Is this Elon MusK? 😲😲🧠🧠🦾";
  }

  return (
    <form onSubmit={handleNextQuestion}>
      {showResults ? (
        <div className="start">
          <p>{`You got ${score} / ${quizQuestions.length}`}</p>
          <p>{handleMessage()}</p>
          <p>
            <strong>Good job on Completing the quiz.</strong>
          </p>

          <Button onClick={handleReset}>Try Again?</Button>
        </div>
      ) : (
        <>
          <h2>
            {question.questionNumber}. {question.question}
          </h2>
          <div className="options">
            {question.answerlist.map((que) => (
              <Options
                key={que}
                answer={answer}
                onAnswer={setAnswer}
                option={que}
              />
            ))}
          </div>

          <div className="buttons">
            {question.questionNumber < quizQuestions.length && (
              <Button onClick={handleSkip}>Skip</Button>
            )}
            {question.questionNumber < quizQuestions.length && (
              <Button onClick={handleReset}>Restart?</Button>
            )}
            <Button onClick={handleFinish}>
              {question.questionNumber < quizQuestions.length
                ? "Next"
                : "Finish"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

function Options({ option, onAnswer }) {
  function handleChoice() {
    onAnswer(option);
  }
  return (
    <label>
      <input
        type="radio"
        onChange={handleChoice}
        name={"question"}
        value={option}
      />
      {option}
    </label>
  );
}

function StartQuiz({ onStartQuiz }) {
  return (
    <div className="start">
      <h2>Take this Exciting quiz</h2>
      <Button onClick={onStartQuiz}>Start Quiz</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
