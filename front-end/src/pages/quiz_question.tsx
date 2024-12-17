import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Quiz_finish from "./quiz_finish";
import { v4 as uuidv4 } from "uuid";

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

  const [decision, setDecision] = useState<string>("deciding");

  const [correctQuestions, setCorrectQuestions] = useState<number>(0);

  const [end, setEnd] = useState<boolean>(false);

  console.log(quizId);
  useEffect(() => {
    if (
      quizId === "geography" ||
      quizId === "general" ||
      quizId === "animals" ||
      quizId === "history" ||
      quizId === "politics"
    ) {
      return;
    }
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
    if (
      quizId !== "geography" &&
      quizId !== "general" &&
      quizId !== "animals" &&
      quizId !== "politics" &&
      quizId !== "history"
    ) {
      return;
    }
    const fetchQuizzes = async () => {
      const options = {
        method: "GET",
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/questions_api_${quizId}`,
        options
      );
      const json = await response.json();
      if (response.ok) {
        let questionSet = [];

        json.response.forEach((question, index) => {
          question["answerOne"] = question.allAnswers[0];
          question["answerTwo"] = question.allAnswers[1];
          question["answerThree"] = question.allAnswers[2];
          question["answerFour"] = question.allAnswers[3];
          question.allAnswers.forEach((answer, index) => {
            if (answer === question.correctAnswer) {
              question["correctAnswer"] = index + 1;
            }
          });
          question["quizId"] = quizId;
          question["id"] = uuidv4();
          question["question"] = question.value;
          questionSet.push(question);
        });

        setQuestions(questionSet);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (questions && question_num >= questions.length) {
      setEnd(true);
      return;
    }
    const interval = setInterval(() => {
      setQuestionNum((prev_num) => {
        return prev_num + 1;
      });
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [questions, question_num]);

  const checkAnswer = (selectedAnswer: number) => {
    // console.log("questions length", questions.length);
    // console.log("question num", question_num);

    if (selectedAnswer === questions[question_num].correctAnswer) {
      setDecision("correct");
      setCorrectQuestions((prev) => prev + 1);
    } else {
      setDecision("incorrect");
    }

    setTimeout(() => {
      if (question_num + 1 === questions.length) {
        setEnd(true);
        return;
      }
      setQuestionNum((prev_num) => {
        return prev_num + 1;
      });
      setDecision("deciding");
    }, 2000);
  };

  return (
    <>
      {questions && questions[question_num] && !end && (
        <Quiz_Question
          key={questions[question_num].id}
          question={questions[question_num]}
          checkAnswer={checkAnswer}
          decision={decision}
        ></Quiz_Question>
      )}
      {end && (
        <Quiz_finish
          correctQuestions={correctQuestions}
          questions={questions}
          quizId={quizId}
          setEnd={setEnd}
        ></Quiz_finish>
      )}
    </>
  );
};

export const Quiz_Question = ({ question, checkAnswer, decision }) => {
  const [time, setTime] = useState<number>(30);

  const [OneStyling, setOneStyling] = useState<string>(
    "bg-lime-400 hover:bg-lime-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl "
  );
  const [TwoStyling, setTwoStyling] = useState<string>(
    "bg-yellow-400 hover:bg-yellow-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
  );
  const [ThreeStyling, setThreeStyling] = useState<string>(
    "bg-blue-400 hover:bg-blue-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
  );
  const [FourStyling, setFourStyling] = useState<string>(
    "bg-red-400 hover:bg-red-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
  );
  const [buttonStyling, setButtonStyling] = useState<string>("p-2");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev_time) => {
        if (prev_time - 1 === 0) {
          checkAnswer(5);
        }
        return prev_time - 1;
      });
    }, 1000);

    if (decision !== "deciding") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [decision]);

  useEffect(() => {
    if (decision !== "deciding") {
      let one = "bg-red-400 opacity-40";
      let two = "bg-red-400 opacity-40";
      let three = "bg-red-400 opacity-40";
      let four = "bg-red-400 opacity-40";
      if (question.correctAnswer === 1) {
        one = "bg-green-400";
      } else if (question.correctAnswer === 2) {
        two = "bg-green-400";
      } else if (question.correctAnswer === 3) {
        three = "bg-green-400";
      } else if (question.correctAnswer === 4) {
        four = "bg-green-400";
      }
      setOneStyling(
        `${one} rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
      setTwoStyling(
        `${two}  rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
      setThreeStyling(
        `${three}  rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
      setFourStyling(
        `${four}  rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
      setButtonStyling("p-2 pointer-events-none");
    }
  }, [decision]);

  return (
    <>
      <Header></Header>

      <div className="flex justify-center py-6">
        <h1 className="text-3xl">{question && question.question}</h1>
      </div>
      <div className="bg-slate-200 pb-8">
        <div className="flex justify-between py-10 px-14">
          <div className="rounded-full bg-sky-900 w-20 h-20 flex justify-center content-center items-center">
            <p className="text-white font-bold text-4xl">{time}</p>
          </div>
          {decision === "incorrect" && (
            <p className="flex flex-col items-center justify-center font-bold text-3xl text-red-500">
              Incorrect
            </p>
          )}
          {decision === "correct" && (
            <p className="flex flex-col items-center justify-center font-bold text-3xl text-green-500">
              Correct
            </p>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              className=" text-md text-black font-bold bg-green-400 rounded p-3 hover:bg-white hover:text-black"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-2">
          <div className={buttonStyling} onClick={() => checkAnswer(1)}>
            <p
              className={OneStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerOne}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(2)}>
            <p
              className={TwoStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerTwo}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(3)}>
            <p
              className={ThreeStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerThree}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(4)}>
            <p
              className={FourStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerFour}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question_collection;
