import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../components/header";
import { SocketContext } from "../context/socket";

const Quiz_live = () => {
  const location = useLocation();
  const { quizId, room, username } = location.state;
  const { socket, setSocket } = useContext(SocketContext);

  const [questions, setQuestions] = useState<Array>();

  const [currentQuestion, setCurrentQuestion] = useState<object>();

  const [decision, setDecision] = useState<string>("deciding");

  const [feedback, setFeedback] = useState<boolean>(false);

  console.log("socket", socket);
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
      console.log("questions", json.questions);
      // console.log(quiz.name, ":", json.questions, "quiz id", quiz.id);
      if (response.ok) {
        setQuestions(json.questions);
        socket.emit("game_connection", json.questions, room);
      }
    };
    fetchQuestions();
  }, []);

  socket.on("question", (question) => {
    setDecision("deciding");
    setCurrentQuestion(question);
  });

  socket.on("feedback", (feedback) => {
    setFeedback(true);
    setDecision(feedback);
  });

  const checkAnswer = (selectedAnswer: number, time: number) => {
    let answer;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      answer = true;
    } else {
      answer = false;
    }
    socket.emit("check-answer", {
      username: username,
      time: time,
      correct: answer,
    });
  };

  return (
    <>
      <p>quiz live</p>
      {currentQuestion && (
        <Quiz_Question
          question={currentQuestion}
          checkAnswer={checkAnswer}
          decision={decision}
        ></Quiz_Question>
      )}
    </>
  );
};

const Quiz_Question = ({ question, checkAnswer, decision }) => {
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

export default Quiz_live;
