import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Question_collection = () => {
  /*
logic- a timer
    */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quizId = queryParams.get("quizId");

  const [questions, setQuestions] = useState<Array>();
  const [currentQuestion, setCurrentQuestion] = useState<object>();

  const [question_num, setQuestionNum] = useState<number>(0);

  console.log(quizId);
  useEffect(() => {
    const fetchQuestions = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizId }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/show_questions`,
        options
      );
      const json = await response.json();
      console.log(json.questions);
      // console.log(quiz.name, ":", json.questions, "quiz id", quiz.id);
      if (response.ok) {
        setQuestions(json.questions);
      }
    };
    fetchQuestions();

    console.log("questions", questions);
  }, []);

  useEffect(() => {
    if (questions && question_num >= questions.length) {
      console.log("end");
      return;
    }
    const interval = setInterval(() => {
      setQuestionNum((prev_num) => {
        return prev_num + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questions, question_num]);

  return (
    <>
      {questions && questions[question_num].id && (
        <Quiz_Question
          key={questions[question_num].id}
          question={questions[question_num]}
        ></Quiz_Question>
      )}
    </>
  );
};

const Quiz_Question = ({ question }) => {
  const [time, setTime] = useState<number>(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev_time) => {
        return prev_time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  /*
have a timer of 30 seconds-

    */
  return (
    <>
      <h1 className="text-3xl">{question && question.question}</h1>
      <div>
        <div>
          <div className="rounded-full bg-sky-900 w-20 h-20 flex justify-center content-center items-center">
            <p className="text-white font-bold text-4xl">10</p>
          </div>
          <button>Submit button</button>
        </div>
        <div>
          <div>
            <p>{question.answerOne}</p>
          </div>
          <div>
            <p>{question.answerTwo}</p>
          </div>
          <div>
            <p>{question.answerThree}</p>
          </div>
          <div>
            <p>{question.answerFour}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question_collection;
