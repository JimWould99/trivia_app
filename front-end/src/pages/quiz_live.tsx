import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../components/header";
import { SocketContext } from "../context/socket";
import Response_display from "../components/response_display.jsx";
import Leaderboard_display from "../components/leaderboard.js";

const Quiz_live = () => {
  const location = useLocation();
  const { quizId, room, username, user } = location.state;
  const { socket, setSocket } = useContext(SocketContext);

  const [questions, setQuestions] = useState<Array>();

  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const [decision, setDecision] = useState<string>("deciding");

  const [feedback, setFeedback] = useState<Array | null>(null);

  const [selected, setSelected] = useState<number | null>(null);

  const [ranking, setRanking] = useState<object | null>(null);
  const [displayRanking, setDisplayRanking] = useState<boolean>(false);

  useEffect(() => {
    if (user === "client") {
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
      console.log("questions", json.questions);
      // console.log(quiz.name, ":", json.questions, "quiz id", quiz.id);
      if (response.ok) {
        socket.emit("game_connection", json.questions, room);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    socket.on("setQuestions", (questions: Array) => {
      setQuestions(questions);
    });

    socket.on("increase_index", (question) => {
      console.log("received new");
      setDisplayRanking(false);
      setQuestionIndex((prev) => prev + 1);
    });

    const updateRanking = (feedback: Array) => {
      console.log("ranking", ranking);
      const holder = { ...ranking };

      feedback.forEach((user) => {
        if (holder[user.username] === undefined) {
          holder[user.username] = 0;
        }
        if (user.correct) {
          let divisor = 1 + user.time / 30;
          let score = 10 * divisor;
          holder[user.username] += score;
        }
      });
      setRanking(holder);

      console.log("ranking after", holder);
    };

    socket.on("feedback", (recieved_feedback: Array) => {
      console.log("feedback", recieved_feedback);
      setSelected(null);
      recieved_feedback.forEach((user) => {
        if (user.username === username) {
          if (user.correct) {
            setDecision("correct");
          } else {
            setDecision("incorrect");
          }
        }
      });

      setTimeout(() => {
        setFeedback(recieved_feedback);
        setDecision("deciding");
        setTimeout(() => {
          setFeedback(null);
          updateRanking(recieved_feedback);
          setDisplayRanking(true);
        }, 2.5 * 1000);
      }, 1 * 1000);
    });

    return () => {
      socket.off("feedback");
      socket.off("increase_index");
      socket.off("setQuestions");
    };
  }, [ranking]);

  const checkAnswer = (selectedAnswer: number, time: number) => {
    console.log("check answer function", time);
    setSelected(selectedAnswer);
    let answer;
    if (selectedAnswer === questions[questionIndex].correctAnswer) {
      answer = true;
    } else {
      answer = false;
    }
    socket.emit(
      "check-answer",
      {
        username: username,
        time: time,
        correct: answer,
      },
      room
    );
  };
  console.log("questions", questions);
  console.log("question index", questionIndex);
  return (
    <>
      <p>quiz live</p>
      {questions && questions[questionIndex] && (
        <Quiz_Question
          question={questions[questionIndex]}
          checkAnswer={checkAnswer}
          decision={decision}
          key={questions[questionIndex].id}
          selected={selected}
          feedback={feedback}
          ranking={ranking}
          displayRanking={displayRanking}
        ></Quiz_Question>
      )}
      {!questions && <p>Loading..</p>}
    </>
  );
};

const Quiz_Question = ({
  question,
  checkAnswer,
  decision,
  selected,
  feedback,
  ranking,
  displayRanking,
}) => {
  const [time, setTime] = useState<number>(30);
  const [OneStyling, setOneStyling] = useState<string>(
    "box-border hover:border-lime-300 border-2 border-lime-400 bg-lime-400 hover:bg-lime-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl "
  );
  const [TwoStyling, setTwoStyling] = useState<string>(
    "box-border hover:border-yellow-300  border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
  );
  const [ThreeStyling, setThreeStyling] = useState<string>(
    "box-border hover:border-blue-300 border-2 border-blue-400 bg-blue-400 hover:bg-blue-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
  );
  const [FourStyling, setFourStyling] = useState<string>(
    "box-border hover:border-red-300 border-2 border-red-400 bg-red-400 hover:bg-red-300 rounded flex justify-center p-2 text-2xl font-bold cursor-pointer drop-shadow-xl"
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
      let one = "bg-red-400 opacity-40 box-border border-2 border-red-400";
      let two = "bg-red-400 opacity-40 box-border border-2 border-red-400";
      let three = "bg-red-400 opacity-40 box-border border-2 border-red-400";
      let four = "bg-red-400 opacity-40 box-border border-2 border-red-400";
      if (question.correctAnswer === 1) {
        one = "bg-green-400 box-border border-2 border-green-400";
      } else if (question.correctAnswer === 2) {
        two = "bg-green-400 box-border border-2 border-green-400";
      } else if (question.correctAnswer === 3) {
        three = "bg-green-400 box-border border-2 border-green-400";
      } else if (question.correctAnswer === 4) {
        four = "bg-green-400 box-border border-2 border-green-400";
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

  useEffect(() => {
    if (selected) {
      setButtonStyling("p-2 pointer-events-none");
    }
    console.log("selected", selected);
    if (selected === 1) {
      setOneStyling(
        `box-border border-2 border-white bg-lime-200 rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
    } else if (selected === 2) {
      setTwoStyling(
        `box-border border-2 border-white bg-yellow-200 rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
    } else if (selected === 3) {
      setThreeStyling(
        `box-border border-2 border-white bg-blue-200 rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
    } else if (selected === 4) {
      setFourStyling(
        `box-border border-2 border-white bg-red-200 rounded flex justify-center p-2 text-2xl font-bold drop-shadow-xl `
      );
    }
  }, [selected]);
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
          {decision === "deciding" && feedback && (
            <Response_display responses={feedback}></Response_display>
          )}
          {decision === "deciding" && displayRanking && (
            <Leaderboard_display users={ranking}></Leaderboard_display>
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
          <div className={buttonStyling} onClick={() => checkAnswer(1, time)}>
            <p
              className={OneStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {selected === 1 && (
                <div
                  style={{ position: "absolute", left: "35%" }}
                  className="rounded-full h-8 w-8 bg-white"
                ></div>
              )}
              {question.answerOne}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(2, time)}>
            <p
              className={TwoStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {selected === 2 && (
                <div
                  style={{ position: "absolute", left: "35%" }}
                  className="rounded-full h-8 w-8 bg-white"
                ></div>
              )}
              {question.answerTwo}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(3, time)}>
            <p
              className={ThreeStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {selected === 3 && (
                <div
                  style={{ position: "absolute", left: "35%" }}
                  className="rounded-full h-8 w-8 bg-white"
                ></div>
              )}
              {question.answerThree}
            </p>
          </div>
          <div className={buttonStyling} onClick={() => checkAnswer(4, time)}>
            <p
              className={FourStyling}
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {selected === 4 && (
                <div
                  style={{ position: "absolute", left: "35%" }}
                  className="rounded-full h-8 w-8 bg-white"
                ></div>
              )}
              {question.answerFour}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz_live;
