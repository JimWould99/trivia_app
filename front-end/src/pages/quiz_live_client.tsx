import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/socket";
import Header from "../components/header";

const Quiz_client = () => {
  const location = useLocation();
  const { question } = location.state;
  const { socket, setSocket } = useContext(SocketContext);

  /*useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);*/

  const [currentQuestion, setCurrentQuestion] = useState<object>(question);

  const [decision, setDecision] = useState<string>("deciding");

  socket.on("question", (receivedQuestion) => {
    console.log("set questions", receivedQuestion);
    setCurrentQuestion(receivedQuestion);
  });

  const checkAnswer = (answer, time) => {
    return;
  };
  return (
    <>
      <p>d</p>
      {currentQuestion && (
        <Quiz_display
          question={currentQuestion}
          checkAnswer={checkAnswer}
        ></Quiz_display>
      )}
    </>
  );
};

const Quiz_display = ({ question, checkAnswer }) => {
  const [time, setTime] = useState<number>(30);
  console.log("question:", question);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev_time) => {
        if (prev_time - 1 === 0) {
          checkAnswer(5);
        }
        return prev_time - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
          <div className="p-2" onClick={() => checkAnswer(1, time)}>
            <p
              className="bg-lime-400 hover:bg-lime-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerOne}
            </p>
          </div>
          <div className="p-2" onClick={() => checkAnswer(2, time)}>
            <p
              className="bg-yellow-400 hover:bg-yellow-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerTwo}
            </p>
          </div>
          <div className="p-2" onClick={() => checkAnswer(3, time)}>
            <p
              className="bg-blue-400 hover:bg-blue-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {question.answerThree}
            </p>
          </div>
          <div className="p-2" onClick={() => checkAnswer(4, time)}>
            <p
              className="bg-red-400 hover:bg-red-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
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

export default Quiz_client;
